"use client";
// Scroll-driven parallax wrapper. The child translates on Y based on
// how far the section sits from viewport centre. Pure scroll listener
// throttled by requestAnimationFrame.

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  strength?: number; // pixels of max displacement
  className?: string;
}

export function ParallaxImage({
  children,
  strength = 60,
  className = "",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const child = childRef.current;
    if (!wrap || !child) return;
    let raf = 0;

    function update() {
      const rect = wrap!.getBoundingClientRect();
      const vh = window.innerHeight;
      // Centre of section relative to viewport (-1 above, 0 centre, 1 below)
      const centre = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, centre));
      const ty = -clamped * strength;
      child!.style.transform = `translate3d(0, ${ty.toFixed(2)}px, 0) scale(1.06)`;
    }
    function onScroll() {
      if (raf !== 0) return;
      raf = requestAnimationFrame(() => {
        update();
        raf = 0;
      });
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      if (raf !== 0) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [strength]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={childRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "translate3d(0,0,0) scale(1.06)" }}
      >
        {children}
      </div>
    </div>
  );
}
