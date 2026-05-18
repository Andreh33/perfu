"use client";
// Client boundary required: GSAP timeline + ScrollTrigger pin + imperative
// canvas drawing for the gold drop. None of this can run on the server.

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register once on the client. ScrollTrigger asserts when re-registered, so
// guard against multiple HMR registrations + SSR.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ManifestoClientProps {
  phrases: {
    p1: string;
    p2_a: string;
    p2_b: string;
    p3: string;
    p4: string;
  };
  labels: {
    frame_caption: string;
  };
}

// Split a phrase into per-word wrappers so we can stagger them with GSAP.
// Two-layer span keeps the mask (overflow hidden) decoupled from the moving
// inner span. We render a normal space between words via React fragments to
// preserve natural whitespace flow when wrapping.
function splitWords(text: string): ReactNode[] {
  const words = text.split(/\s+/).filter(Boolean);
  return words.map((word, i) => (
    <span
      key={`${word}-${i}`}
      className="word inline-block overflow-hidden align-baseline"
    >
      <span className="word-inner inline-block will-change-transform">
        {word}
      </span>
      {i < words.length - 1 ? " " : null}
    </span>
  ));
}

function useReducedMotion(): boolean {
  // Always returns false — see comment in Hero.client.tsx and globals.css.
  return false;
}

// Static SVG drop used in reduced-motion mode.
function StaticDropSVG() {
  return (
    <svg
      viewBox="0 0 80 110"
      width="80"
      height="110"
      aria-hidden="true"
      className="block"
    >
      <defs>
        <linearGradient id="drop-grad-static" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--gold-100)" />
          <stop offset="100%" stopColor="var(--gold-300)" />
        </linearGradient>
      </defs>
      <path
        d="M40 8 C 18 50, 12 70, 12 80 a 28 28 0 0 0 56 0 C 68 70, 62 50, 40 8 Z"
        fill="url(#drop-grad-static)"
      />
    </svg>
  );
}

export function ManifestoClient({ phrases, labels }: ManifestoClientProps) {
  const reducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLHeadingElement>(null);
  const p2Ref = useRef<HTMLHeadingElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);
  const p4Ref = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live scroll progress (0..1) inside the pinned timeline, written by
  // ScrollTrigger.onUpdate and consumed by the canvas rAF loop.
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useGSAP(
    () => {
      if (reducedMotion) return;
      const container = containerRef.current;
      const pinTarget = pinTargetRef.current;
      const p1 = p1Ref.current;
      const p2 = p2Ref.current;
      const p3 = p3Ref.current;
      const p4 = p4Ref.current;
      if (!container || !pinTarget || !p1 || !p2 || !p3 || !p4) return;

      const phraseEls: HTMLElement[] = [p1, p2, p3, p4];
      const wordsOf = (el: HTMLElement) =>
        Array.from(el.querySelectorAll<HTMLElement>(".word-inner"));

      // Initial state: hide all phrases, raise their word-inner masks below.
      gsap.set(phraseEls, { autoAlpha: 0 });
      phraseEls.forEach((el) => {
        gsap.set(wordsOf(el), { yPercent: 110 });
      });
      // p3 has a paragraph + canvas; canvas opacity managed by its parent.

      // Master timeline driven by ScrollTrigger WITHOUT pin. The pinning
      // visual effect is achieved with CSS `position: sticky` on the inner
      // pinTarget (see JSX below). This avoids GSAP wrapping the pinTarget
      // in a `<div class="pin-spacer">`, which would break React 19's view
      // of the DOM tree (containerRef expects pinTargetRef as a direct
      // child, but the spacer would sit between them, causing removeChild
      // NotFoundError during reconciliation).
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        },
      });

      // Helper: phase boundaries inside a 0..1 timeline.
      // 4 phases of 25% each — enter ~15%, hold ~5%, exit ~5% within each.
      const reveal = (
        el: HTMLElement,
        start: number,
      ) => {
        const words = wordsOf(el);
        tl.to(el, { autoAlpha: 1, duration: 0.001 }, start);
        tl.to(
          words,
          {
            yPercent: 0,
            duration: 0.15,
            ease: "power3.out",
            stagger: 0.025,
          },
          start,
        );
      };

      const exit = (el: HTMLElement, start: number) => {
        tl.to(
          el,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.08,
            ease: "power3.inOut",
          },
          start,
        );
      };

      // Phase 1 — 0..0.25
      reveal(p1, 0.0);
      exit(p1, 0.22);

      // Phase 2 — 0.25..0.5
      reveal(p2, 0.28);
      exit(p2, 0.47);

      // Phase 3 — 0.5..0.75 (canvas + caption)
      // We keep p3 visible across most of the window so the drop has time
      // to fall. clip-path exit would clip the canvas oddly — fade instead.
      tl.to(p3, { autoAlpha: 1, duration: 0.04 }, 0.52);
      tl.to(
        wordsOf(p3),
        {
          yPercent: 0,
          duration: 0.12,
          ease: "power3.out",
          stagger: 0.02,
        },
        0.52,
      );
      tl.to(
        p3,
        { autoAlpha: 0, y: -16, duration: 0.06, ease: "power2.in" },
        0.74,
      );

      // Phase 4 — 0.75..1
      reveal(p4, 0.78);
      tl.to(
        p4,
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.06,
          ease: "power3.inOut",
        },
        0.97,
      );

      // Canvas setup with DPR for crisp lines.
      const canvas = canvasRef.current;
      let ctx: CanvasRenderingContext2D | null = null;
      let cssW = 600;
      let cssH = 800;
      const dpr =
        typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

      const setupCanvas = () => {
        if (!canvas) return;
        cssW = canvas.clientWidth || 600;
        cssH = canvas.clientHeight || 800;
        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
        ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(dpr, dpr);
        }
      };
      setupCanvas();
      const ro = new ResizeObserver(() => setupCanvas());
      if (canvas) ro.observe(canvas);

      // Drop renderer — runs every rAF, reads progressRef + maps to local
      // drop window 0.5..0.75.
      const drawDrop = () => {
        if (!ctx || !canvas) {
          rafRef.current = requestAnimationFrame(drawDrop);
          return;
        }
        const p = progressRef.current;
        // Local progress inside the phase 3 window.
        const local = Math.min(Math.max((p - 0.5) / 0.25, 0), 1);

        // Motion blur trail — semi-transparent obsidian wash each frame.
        ctx.fillStyle = "rgba(8, 8, 10, 0.18)";
        ctx.fillRect(0, 0, cssW, cssH);

        if (local <= 0 || local >= 1.001) {
          // Idle outside window — just keep clearing slowly.
          rafRef.current = requestAnimationFrame(drawDrop);
          return;
        }

        // Ease-in (sine) so drop accelerates.
        const eased = 1 - Math.cos((local * Math.PI) / 2);
        const dropH = 56;
        const x = cssW / 2;
        const yTop = 24;
        const yBottom = cssH - dropH - 24;
        const y = yTop + (yBottom - yTop) * eased;

        // Trail line — subtle gold trace from origin to current drop.
        ctx.beginPath();
        ctx.strokeStyle = "rgba(184, 147, 90, 0.10)";
        ctx.lineWidth = 1;
        ctx.moveTo(x, yTop);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Tear-drop path: rounded base + pointed apex pointing up.
        const w = 32;
        const apexY = y;
        const baseY = y + dropH;
        const midY = y + dropH * 0.55;
        ctx.beginPath();
        ctx.moveTo(x, apexY);
        ctx.quadraticCurveTo(x + w / 2, midY, x + w / 2, midY + 2);
        ctx.bezierCurveTo(
          x + w / 2,
          baseY,
          x - w / 2,
          baseY,
          x - w / 2,
          midY + 2,
        );
        ctx.quadraticCurveTo(x - w / 2, midY, x, apexY);
        ctx.closePath();

        const grad = ctx.createLinearGradient(x, apexY, x, baseY);
        // Tokens not directly readable as canvas fills — hardcode hexes
        // matching --gold-100 and --gold-300 from globals.css.
        grad.addColorStop(0, "#d4b677");
        grad.addColorStop(1, "#8e6e3f");
        ctx.fillStyle = grad;
        ctx.fill();

        // Highlight rim — thin lighter arc near the top of the drop.
        ctx.beginPath();
        ctx.strokeStyle = "rgba(245, 241, 232, 0.35)";
        ctx.lineWidth = 1;
        ctx.arc(x, midY + 4, w / 2 - 2, Math.PI * 1.05, Math.PI * 1.45);
        ctx.stroke();

        rafRef.current = requestAnimationFrame(drawDrop);
      };
      rafRef.current = requestAnimationFrame(drawDrop);

      // Lenis is wired to gsap.ticker upstream — ScrollTrigger picks updates
      // up automatically. One refresh after mount catches font-loading reflow.
      const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 200);

      return () => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        ro.disconnect();
        window.clearTimeout(refreshId);
        tl.kill();
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  );

  // ── Reduced-motion fallback: stacked, no pin, static drop ────────────
  if (reducedMotion) {
    return (
      <div className="flex flex-col items-center gap-[var(--space-9)] py-[var(--space-10)] px-[var(--space-6)]">
        <h2 className="font-display italic text-[var(--ink-100)] text-[clamp(2.5rem,8vw,6rem)] leading-[0.85] tracking-[-0.04em] text-center max-w-[18ch]">
          {phrases.p1}
        </h2>
        <h2 className="font-display italic text-[var(--ink-100)] text-[clamp(2.5rem,8vw,6rem)] leading-[0.85] tracking-[-0.04em] text-center max-w-[18ch]">
          {phrases.p2_a}{" "}
          <span className="text-[var(--gold-200)]">{phrases.p2_b}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] items-center gap-[var(--space-7)] max-w-[900px] w-full">
          <div className="flex items-center justify-center">
            <StaticDropSVG />
          </div>
          <p className="font-body small-caps text-[var(--text-md)] text-[var(--ink-200)] tracking-[0.16em] uppercase">
            {phrases.p3}
          </p>
        </div>
        <h2 className="font-display italic text-[var(--ink-100)] text-[clamp(2.5rem,8vw,6rem)] leading-[0.85] tracking-[-0.04em] text-center max-w-[24ch]">
          {phrases.p4}
        </h2>
      </div>
    );
  }

  // ── Motion path ─────────────────────────────────────────────────────
  // The outer container reserves 5x viewport-height so the user has scroll
  // distance to drive the timeline (ScrollTrigger end = "+=400%"). The inner
  // pinTarget uses CSS `position: sticky; top: 0` to stay visible during the
  // scroll — a React-safe alternative to ScrollTrigger.pin:true which would
  // wrap the element in a `<div class="pin-spacer">` and break the DOM tree
  // that React reconciles against.
  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <div
        ref={pinTargetRef}
        className="h-screen w-full flex items-center justify-center relative px-[var(--space-6)] sticky top-0"
        aria-label={labels.frame_caption || undefined}
      >
        {/* Phrase 1 */}
        <h2
          ref={p1Ref}
          className="phrase font-display italic text-[var(--ink-100)] text-[clamp(2.5rem,8vw,6rem)] leading-[0.85] tracking-[-0.04em] text-center max-w-[18ch] absolute inset-0 m-auto flex items-center justify-center"
        >
          <span className="block">{splitWords(phrases.p1)}</span>
        </h2>

        {/* Phrase 2 — gold accent word */}
        <h2
          ref={p2Ref}
          className="phrase font-display italic text-[var(--ink-100)] text-[clamp(2.5rem,8vw,6rem)] leading-[0.85] tracking-[-0.04em] text-center max-w-[18ch] absolute inset-0 m-auto flex items-center justify-center"
        >
          <span className="block">
            {splitWords(phrases.p2_a)}
            {" "}
            <span className="text-[var(--gold-200)] inline-block">
              <span className="word inline-block overflow-hidden align-baseline">
                <span className="word-inner inline-block will-change-transform">
                  {phrases.p2_b}
                </span>
              </span>
            </span>
          </span>
        </h2>

        {/* Phrase 3 — canvas drop + caption */}
        <div
          ref={p3Ref}
          className="phrase absolute inset-0 m-auto grid grid-cols-1 md:grid-cols-[1fr_1fr] items-center gap-[var(--space-7)] max-w-[1000px] px-[var(--space-6)] place-items-center"
        >
          <canvas
            ref={canvasRef}
            width={600}
            height={800}
            className="w-full h-auto max-h-[70vh] aspect-[3/4] object-contain bg-[var(--obsidian-400)]"
          />
          <p className="font-body small-caps text-[var(--text-md)] text-[var(--ink-200)] tracking-[0.16em] uppercase max-w-[28ch]">
            <span className="block">{splitWords(phrases.p3)}</span>
          </p>
        </div>

        {/* Phrase 4 */}
        <h2
          ref={p4Ref}
          className="phrase font-display italic text-[var(--ink-100)] text-[clamp(2.5rem,8vw,6rem)] leading-[0.85] tracking-[-0.04em] text-center max-w-[24ch] absolute inset-0 m-auto flex items-center justify-center"
        >
          <span className="block">{splitWords(phrases.p4)}</span>
        </h2>
      </div>
    </div>
  );
}
