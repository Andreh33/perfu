"use client";
// Lightweight reveal wrapper for the Manifesto phrases. IntersectionObserver
// drives opacity + translateY on entry. No GSAP, no ScrollTrigger pin, no
// canvas rAF — the prior pinned timeline was creating dead-air zones and
// crashing React on commit when GSAP wrapped elements in a pin-spacer that
// React did not own.

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ManifestoRevealProps {
  children: ReactNode;
}

export function ManifestoReveal({ children }: ManifestoRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition:
          "opacity 1100ms var(--ease-soft-expo), transform 1100ms var(--ease-soft-expo)",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
