"use client";
// Top-of-viewport scroll progress bar — a 1 px hairline that fills with
// gold as the user scrolls down the page. Subtle editorial detail.

import { useEffect, useRef, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max <= 0 ? 0 : Math.min(1, Math.max(0, scrollTop / max));
      setProgress(p);
    }
    function onScroll() {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        update();
        rafRef.current = null;
      });
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 right-0 z-[99] h-px"
      style={{ background: "rgba(244, 228, 188, 0.06)" }}
    >
      <div
        className="h-full origin-left"
        style={{
          background:
            "linear-gradient(to right, #8e6e3f 0%, #d4af37 50%, #f4e4bc 100%)",
          transform: `scaleX(${progress})`,
          transformOrigin: "left center",
          transition: "transform 80ms linear",
          boxShadow: "0 0 12px rgba(212, 175, 55, 0.6)",
        }}
      />
    </div>
  );
}
