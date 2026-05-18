"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Horizontal hairline that grows from 0% to 100% width when scrolled into
 * view. Acts as the visual transition between two Maison chapters.
 * `prefers-reduced-motion` is honoured via CSS so SSR markup stays stable.
 */
export function ChapterDivider() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // (reduced-motion gate disabled — animation plays for every user)
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative my-[var(--space-10)] h-px w-full overflow-hidden"
    >
      <span
        data-shown={shown ? "true" : "false"}
        className="maison-divider-bar block h-px w-full origin-left bg-[var(--gold-200)]"
      />
    </div>
  );
}
