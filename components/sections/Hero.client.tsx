"use client";
// Client boundary required: orchestrates the Hero entrance via GSAP timeline,
// listens for the global `preloader:done` CustomEvent to gate the start of
// choreography, and dynamically loads the WebGL canvas with `ssr: false`
// (only allowed from a Client Component in Next 16).

import dynamic from "next/dynamic";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const Hero3D = dynamic(() => import("@/components/three/Hero3D"), {
  ssr: false,
  loading: () => null,
});

declare global {
  // The preloader sets this flag the moment it dispatches `preloader:done`
  // so that consumers mounting after the event still know it has fired.
  // eslint-disable-next-line no-var
  var __pdPreloaderDone: boolean | undefined;
}

interface HeroClientProps {
  fallbackSrc: string;
  fallbackAlt: string;
  children: ReactNode;
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function HeroClient({
  fallbackSrc,
  fallbackAlt,
  children,
}: HeroClientProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasActive, setCanvasActive] = useState(true);

  // Pause the canvas render loop when the hero leaves the viewport.
  useEffect(() => {
    if (reducedMotion) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setCanvasActive(entry.isIntersecting);
      },
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;

      const eyebrow = root.querySelector<HTMLElement>("[data-hero-eyebrow]");
      const line1Words = Array.from(
        root.querySelectorAll<HTMLElement>("[data-hero-line=\"1\"] .word-inner"),
      );
      const line2Words = Array.from(
        root.querySelectorAll<HTMLElement>("[data-hero-line=\"2\"] .word-inner"),
      );
      const subtitle = root.querySelector<HTMLElement>("[data-hero-subtitle]");
      const cta = root.querySelector<HTMLElement>("[data-hero-cta]");

      // Reduced-motion users see the content already settled.
      if (reducedMotion) {
        gsap.set(
          [eyebrow, ...line1Words, ...line2Words, subtitle, cta].filter(
            (n): n is HTMLElement => n !== null,
          ),
          { clearProps: "all", opacity: 1, y: 0, clipPath: "none" },
        );
        return;
      }

      // Initial hidden state.
      if (eyebrow) {
        gsap.set(eyebrow, { clipPath: "inset(100% 0 0 0)" });
      }
      gsap.set([...line1Words, ...line2Words], { yPercent: 110 });
      if (subtitle) {
        gsap.set(subtitle, { opacity: 0, y: 12 });
      }
      if (cta) {
        gsap.set(cta, { opacity: 0, y: 12 });
      }

      let tl: gsap.core.Timeline | null = null;
      let started = false;

      const start = () => {
        if (started) return;
        started = true;
        tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        if (eyebrow) {
          tl.to(
            eyebrow,
            { clipPath: "inset(0% 0 0 0)", duration: 0.6 },
            0,
          );
        }
        tl.to(
          line1Words,
          { yPercent: 0, duration: 0.9, stagger: 0.12 },
          0.2,
        );
        tl.to(
          line2Words,
          { yPercent: 0, duration: 0.9, stagger: 0.12 },
          0.38,
        );
        if (subtitle) {
          tl.to(
            subtitle,
            { opacity: 1, y: 0, duration: 0.7 },
            1.2,
          );
        }
        if (cta) {
          tl.to(cta, { opacity: 1, y: 0, duration: 0.7 }, 1.5);
        }
      };

      // If the preloader already finished (race), start immediately.
      if (typeof window !== "undefined" && window.__pdPreloaderDone) {
        start();
      } else if (typeof window !== "undefined") {
        const onDone = () => {
          window.__pdPreloaderDone = true;
          start();
          window.removeEventListener("preloader:done", onDone);
        };
        window.addEventListener("preloader:done", onDone, { once: true });
        // Safety net: if no event arrives in 6s (slow path / no preloader),
        // still play the entrance so the hero never sits frozen.
        const safety = window.setTimeout(start, 6000);
        return () => {
          window.removeEventListener("preloader:done", onDone);
          window.clearTimeout(safety);
          if (tl) tl.kill();
        };
      }

      return () => {
        if (tl) tl.kill();
      };
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  );

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* WebGL canvas always rendered behind a stable <img>; we DO NOT use
          Suspense fallback swap because the SSR/CSR boundary collision with
          R3F's portal under React 19 + dynamic+ssr:false produces a
          NotFoundError on commit (`removeChild`). Instead the image is the
          first paint, and the canvas overlays it once mounted, fading the
          image out. */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fallbackSrc}
          alt={fallbackAlt}
          className="h-full w-full object-cover"
          draggable={false}
        />
        {!reducedMotion ? (
          <div className="absolute inset-0">
            <Hero3D active={canvasActive} />
          </div>
        ) : null}
      </div>

      {/* Children = textual overlay (server-rendered with the refs above). */}
      {children}
    </div>
  );
}
