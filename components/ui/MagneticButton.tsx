"use client";
// Magnetic CTA — when the cursor approaches, the button (and its inner
// children) gently translate toward the pointer, then snap back on
// leave. Adds the feeling that the interface is alive without being
// gimmicky. Pure JS on pointermove of the wrapper, no library.

import { useEffect, useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  strength?: number; // 0..1
  className?: string;
  as?: "div" | "span";
}

export function MagneticButton({
  children,
  strength = 0.35,
  className = "",
  as = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = ref.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    function onMove(e: PointerEvent) {
      const rect = wrap!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      // Apply easing — magnetic pull stronger near centre, falls off at edges.
      targetX = dx * strength;
      targetY = dy * strength;
      tick();
    }
    function onLeave() {
      targetX = 0;
      targetY = 0;
      tick();
    }
    function tick() {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      inner!.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;
      const dist = Math.hypot(targetX - currentX, targetY - currentY);
      if (dist > 0.1) {
        raf = requestAnimationFrame(tick);
      }
    }

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={`inline-block ${className}`}>
      <div ref={innerRef} className="inline-block will-change-transform">
        {children}
      </div>
    </Tag>
  );
}
