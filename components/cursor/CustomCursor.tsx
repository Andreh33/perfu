"use client";
// Client component: depends on pointer events, matchMedia and rAF — DOM only.

import { useEffect, useRef } from "react";

type CursorVariant = "default" | "interactive" | "text" | "webgl";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [data-cursor="interactive"]';
const TEXT_SELECTOR = 'input, textarea, [contenteditable="true"], [data-cursor="text"]';
const WEBGL_SELECTOR = '[data-cursor="webgl"], canvas';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const variantRef = useRef<CursorVariant>("default");

  useEffect(() => {
    // Skip entirely on coarse pointers (touch). Also acts as our SSR guard.
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    document.body.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const setVariant = (next: CursorVariant) => {
      if (variantRef.current === next) return;
      variantRef.current = next;
      dot.dataset.variant = next;
      ring.dataset.variant = next;
    };

    const resolveVariant = (el: Element | null): CursorVariant => {
      if (!el) return "default";
      if (el.closest(TEXT_SELECTOR)) return "text";
      if (el.closest(INTERACTIVE_SELECTOR)) return "interactive";
      if (el.closest(WEBGL_SELECTOR)) return "webgl";
      return "default";
    };

    const onMove = (event: PointerEvent) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
      setVariant(resolveVariant(event.target as Element | null));
    };

    const onDown = () => {
      dot.dataset.pressed = "true";
      window.setTimeout(() => {
        if (dot) dot.dataset.pressed = "false";
      }, 200);
    };

    const onLeave = () => {
      dot.dataset.hidden = "true";
      ring.dataset.hidden = "true";
    };

    const onEnter = () => {
      dot.dataset.hidden = "false";
      ring.dataset.hidden = "false";
    };

    const loop = () => {
      const target = targetRef.current;
      const current = currentRef.current;
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;

      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      {/* Inline style so the custom cursor never relies on a stale CSS build. */}
      <style>{`
        .pd-cursor-dot,
        .pd-cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9998;
          will-change: transform, width, height, opacity;
          mix-blend-mode: normal;
        }
        .pd-cursor-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--gold-200);
          opacity: 0.7;
          transition:
            width 220ms var(--ease-soft-expo),
            height 220ms var(--ease-soft-expo),
            opacity 220ms var(--ease-soft-expo),
            border-radius 220ms var(--ease-soft-expo),
            background-color 220ms var(--ease-soft-expo);
        }
        .pd-cursor-ring {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          border: 1px solid var(--gold-200);
          opacity: 0;
          transition:
            width 360ms var(--ease-soft-expo),
            height 360ms var(--ease-soft-expo),
            opacity 360ms var(--ease-soft-expo);
        }
        .pd-cursor-ring[data-variant="interactive"] {
          width: 48px;
          height: 48px;
          opacity: 0.6;
          background: rgba(184, 147, 90, 0.12);
        }
        .pd-cursor-dot[data-variant="text"] {
          width: 2px;
          height: 24px;
          border-radius: 1px;
        }
        .pd-cursor-dot[data-variant="webgl"] {
          background: var(--gold-100);
          opacity: 0.9;
        }
        .pd-cursor-dot[data-pressed="true"] {
          width: 6px;
          height: 6px;
          transition:
            width 200ms var(--ease-firm-back),
            height 200ms var(--ease-firm-back);
        }
        .pd-cursor-dot[data-hidden="true"],
        .pd-cursor-ring[data-hidden="true"] {
          opacity: 0 !important;
        }
        @media (pointer: coarse) {
          .pd-cursor-dot, .pd-cursor-ring { display: none; }
        }
      `}</style>
      <div
        ref={dotRef}
        className="pd-cursor-dot"
        aria-hidden="true"
        data-variant="default"
      />
      <div
        ref={ringRef}
        className="pd-cursor-ring"
        aria-hidden="true"
        data-variant="default"
      />
    </>
  );
}
