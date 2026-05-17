"use client";
// Client component: instantiates Lenis (browser-only), wires gsap.ticker raf
// loop and respects prefers-reduced-motion.

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { setLenis } from "@/lib/hooks/useLenis";

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    // Honour user motion preferences — no smooth scroll if reduce is set.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      smoothWheel: true,
      // Lenis v1.1 advises against syncTouch — leave native scroll on mobile.
    });

    setLenis(lenis);

    const tick = (time: number) => {
      // gsap.ticker hands time in seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
