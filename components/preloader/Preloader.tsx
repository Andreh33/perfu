"use client";
// Client component: needs window/document access (DOM event dispatch, font and
// asset readiness probes), timers (minDuration/maxDuration gates) and direct
// style mutation for the curtain choreography. None of this can run on the
// server; the surrounding <PreloaderShell> renders the static visible frame
// during SSR so this component progressively enhances on hydration.

import { useEffect, useRef, useState, useCallback } from "react";
import { criticalAssets, type CriticalAsset } from "@/lib/preload-manifest";

interface PreloaderProps {
  copy: {
    assembling: string;
    labels: {
      shaders: string;
      textures: string;
      scene: string;
      composing: string;
      timeout: string;
    };
    arabicBadge: string;
  };
}

type Phase = "loading" | "logo-out" | "curtain-up" | "curtain-down" | "done";

const MIN_DURATION_MS = 1800;
const MAX_DURATION_MS = 4500;
const SLOW_THRESHOLD_MS = 4500;

const PROGRESS_LINE_WIDTH = 200;

function preloadAsset(asset: CriticalAsset): Promise<void> {
  return new Promise((resolve) => {
    if (asset.kind === "image") {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = asset.url;
      return;
    }
    // texture / gltf — fetch into HTTP cache so the GPU consumer hits warm.
    fetch(asset.url, { cache: "force-cache" })
      .then(() => resolve())
      .catch(() => resolve());
  });
}

function tryPreloadHeroFallback(): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    // Will resolve silently with onerror if the asset does not exist.
    img.src = "/hero-fallback.jpg";
  });
}

export function Preloader({ copy }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");
  const [isSlow, setIsSlow] = useState(false);
  const startRef = useRef<number>(0);
  const resolvedCountRef = useRef(0);
  const totalCountRef = useRef(1);
  const lastProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  const beginExit = useCallback(() => {
    if (typeof window === "undefined") return;
    if (reducedMotionRef.current) {
      // No choreography under reduced-motion: brief fade and remove.
      setPhase("done");
      window.setTimeout(() => {
        (window as typeof window & { __pdPreloaderDone?: boolean }).__pdPreloaderDone = true;
        window.dispatchEvent(new CustomEvent("preloader:done"));
      }, 16);
      return;
    }
    // T0 — logo fades + scales out (480ms via CSS).
    setPhase("logo-out");
    // T+320ms — curtain begins rising (480ms after logo-out start).
    window.setTimeout(() => {
      setPhase("curtain-up");
    }, 320);
    // T+320 + 720 = T+1040 — curtain has covered, now retracts upward.
    window.setTimeout(() => {
      setPhase("curtain-down");
    }, 320 + 720);
    // T+1040 + 1100 = T+2140 — fully revealed, unmount + signal.
    window.setTimeout(() => {
      setPhase("done");
      (window as typeof window & { __pdPreloaderDone?: boolean }).__pdPreloaderDone = true;
      window.dispatchEvent(new CustomEvent("preloader:done"));
    }, 320 + 720 + 1100);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    startRef.current = performance.now();

    // Build the asset readiness promise set.
    const promises: Array<Promise<void>> = [];

    // Fonts.
    if (document.fonts && typeof document.fonts.ready?.then === "function") {
      promises.push(
        document.fonts.ready.then(
          () => undefined,
          () => undefined,
        ),
      );
    }
    // Hero fallback (resolves silently if missing — kept for forward-compat).
    promises.push(tryPreloadHeroFallback());
    // Critical assets declared by lib/preload-manifest.ts.
    for (const asset of criticalAssets) {
      promises.push(preloadAsset(asset));
    }

    totalCountRef.current = promises.length || 1;

    // Resolved-count tick.
    promises.forEach((p) => {
      p.finally(() => {
        resolvedCountRef.current += 1;
      });
    });

    // Reduced-motion path: just wait minDuration then exit.
    if (reducedMotionRef.current) {
      const t = window.setTimeout(() => {
        setProgress(1);
        beginExit();
      }, 200);
      return () => {
        window.clearTimeout(t);
      };
    }

    // Slow-load label flip after threshold.
    const slowTimer = window.setTimeout(() => {
      setIsSlow(true);
    }, SLOW_THRESHOLD_MS);

    // Main rAF: compute weighted progress; gate exit on min/max duration.
    let stopped = false;
    let exitTriggered = false;

    const tick = () => {
      if (stopped) return;
      const elapsed = performance.now() - startRef.current;
      const timeRatio = Math.min(elapsed / MIN_DURATION_MS, 1);
      const assetRatio = resolvedCountRef.current / totalCountRef.current;
      const weighted = timeRatio * 0.6 + assetRatio * 0.4;
      const next = Math.min(1, Math.max(lastProgressRef.current, weighted));
      lastProgressRef.current = next;
      setProgress(next);

      const assetsDone = resolvedCountRef.current >= totalCountRef.current;
      const minDone = elapsed >= MIN_DURATION_MS;
      const maxReached = elapsed >= MAX_DURATION_MS;

      if (!exitTriggered && ((assetsDone && minDone) || maxReached)) {
        exitTriggered = true;
        // Snap to 1, then wait 320ms before the exit choreography.
        lastProgressRef.current = 1;
        setProgress(1);
        window.setTimeout(() => {
          beginExit();
        }, 320);
        return;
      }
      rafRef.current = window.requestAnimationFrame(tick);
    };
    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      stopped = true;
      window.clearTimeout(slowTimer);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [beginExit]);

  // IMPORTANT: never return null. Unmounting this complex subtree (nested SVG
  // text + multiple absolutely-positioned divs at the body root) intermittently
  // produced `removeChild` NotFoundError in React 19's commit phase, especially
  // when the inline body::after grain overlay or browser extensions altered
  // body children between renders. We keep the DOM tree alive forever and just
  // hide it from layout + paint + a11y once the choreography ends.
  const pct = Math.round(progress * 100);
  let currentLabel: string;
  if (isSlow) {
    currentLabel = copy.labels.timeout;
  } else if (pct < 25) {
    currentLabel = copy.labels.shaders;
  } else if (pct < 50) {
    currentLabel = copy.labels.textures;
  } else if (pct < 75) {
    currentLabel = copy.labels.scene;
  } else {
    currentLabel = copy.labels.composing;
  }

  const logoOut = phase === "logo-out" || phase === "curtain-up" || phase === "curtain-down";
  const curtainState =
    phase === "curtain-up"
      ? "up"
      : phase === "curtain-down"
        ? "down"
        : "idle";

  const isDone = phase === "done";

  return (
    <div
      data-preloader
      role={isDone ? "presentation" : "progressbar"}
      aria-hidden={isDone ? true : undefined}
      aria-valuemin={isDone ? undefined : 0}
      aria-valuemax={isDone ? undefined : 100}
      aria-valuenow={isDone ? undefined : pct}
      aria-label={isDone ? undefined : copy.assembling}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        // Hidden from paint, layout and pointer events after the exit
        // choreography completes. We do NOT unmount the subtree — see the
        // comment above the early-return removal.
        pointerEvents: isDone ? "none" : "auto",
        visibility: isDone ? "hidden" : "visible",
        background: "var(--obsidian-400)",
        color: "var(--ink-100)",
        contain: "strict",
      }}
    >
      {/* Grain overlay (decorative) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          mixBlendMode: "overlay",
          pointerEvents: "none",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.72  0 0 0 0 0.57  0 0 0 0 0.35  0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "160px 160px",
        }}
      />

      {/* Logo + line + label (centered) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-7)",
          transition:
            "transform 480ms var(--ease-soft-expo), opacity 480ms var(--ease-soft-expo)",
          transform: logoOut ? "scale(0.96)" : "scale(1)",
          opacity: logoOut ? 0 : 1,
        }}
      >
        <PreloaderLogo />

        {/* Progress line + traveling dot */}
        <div
          style={{
            position: "relative",
            width: PROGRESS_LINE_WIDTH,
            height: 1,
            background: "color-mix(in srgb, var(--gold-200) 40%, transparent)",
          }}
        >
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: -2,
              left: 0,
              width: 5,
              height: 5,
              borderRadius: 999,
              background: "var(--gold-100)",
              boxShadow: "0 0 12px var(--gold-100), 0 0 4px var(--gold-200)",
              transform: `translateX(${progress * (PROGRESS_LINE_WIDTH - 5)}px)`,
              transition: "transform 280ms var(--ease-soft-expo)",
              willChange: "transform",
            }}
          />
        </div>

        {/* Label */}
        <p
          className="small-caps tabular"
          style={{
            marginTop: 0,
            fontSize: "var(--text-xs)",
            color: "var(--ink-300)",
            letterSpacing: "0.18em",
            fontFamily: "var(--font-body)",
          }}
        >
          {copy.assembling} · {pct}% · {currentLabel}
        </p>
      </div>

      {/* Arabic badge — bottom right */}
      <span
        lang="ar"
        dir="rtl"
        className="font-arabic-display"
        style={{
          position: "absolute",
          bottom: "var(--space-5)",
          right: "var(--space-5)",
          fontSize: "var(--text-sm)",
          color: "var(--ink-300)",
          opacity: 0.75,
          letterSpacing: 0,
        }}
      >
        {copy.arabicBadge}
      </span>

      {/* Gold curtain — covers + reveals.
          Phase idle:        clip-path inset(100% 0 0 0) — hidden below.
          Phase curtain-up:  animates to inset(0 0 0 0) — fills screen.
          Phase curtain-down:animates to inset(0 0 100% 0) — retracts upward,
                              uncovering the page beneath.
       */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          background: "var(--gold-200)",
          clipPath:
            curtainState === "idle"
              ? "inset(100% 0 0 0)"
              : curtainState === "up"
                ? "inset(0 0 0 0)"
                : "inset(0 0 100% 0)",
          transition:
            curtainState === "up"
              ? "clip-path 720ms var(--ease-soft-expo)"
              : curtainState === "down"
                ? "clip-path 1100ms var(--ease-soft-expo)"
                : "none",
          willChange: "clip-path",
        }}
      />
    </div>
  );
}

/**
 * Logo as outlined SVG text — fill none, gold stroke 1px, dash-offset draws
 * letter by letter. Split into two <text> nodes ("PERFUMES" + "DUBAI") so the
 * second word can stagger 80ms behind the first. Reduced-motion users see the
 * letters already drawn (CSS @media rule below short-circuits the animation).
 */
function PreloaderLogo() {
  return (
    <svg
      width="480"
      height="120"
      viewBox="0 0 480 120"
      role="img"
      aria-label="Perfumes Dubai"
      style={{
        display: "block",
        maxWidth: "min(480px, 80vw)",
        height: "auto",
        overflow: "visible",
      }}
    >
      <text
        x="240"
        y="52"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="44"
        fontWeight={300}
        letterSpacing="0.12em"
        fill="transparent"
        stroke="var(--gold-200)"
        strokeWidth={1}
        style={{
          strokeDasharray: 1400,
          strokeDashoffset: 1400,
          animation:
            "preloader-draw 1800ms var(--ease-soft-expo) forwards",
          animationDelay: "0ms",
        }}
      >
        PERFUMES
      </text>
      <text
        x="240"
        y="100"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="44"
        fontWeight={300}
        letterSpacing="0.32em"
        fill="transparent"
        stroke="var(--gold-200)"
        strokeWidth={1}
        style={{
          strokeDasharray: 900,
          strokeDashoffset: 900,
          animation:
            "preloader-draw 1800ms var(--ease-soft-expo) forwards",
          animationDelay: "320ms",
        }}
      >
        DUBAI
      </text>
    </svg>
  );
}
