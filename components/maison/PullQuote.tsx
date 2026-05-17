"use client";

import { useEffect, useRef, useState } from "react";

interface PullQuoteProps {
  /** Plain text quote — the component wraps it with typographic curly quotes. */
  quote: string;
  /** Optional attribution shown small-caps below. */
  attribution?: string;
}

/**
 * Centered editorial pull quote rendered as a real <blockquote>.
 * On entry, opens with a vertical clip-path reveal. CSS handles reduced
 * motion to keep the SSR markup deterministic.
 */
export function PullQuote({ quote, attribution }: PullQuoteProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) {
      setOpen(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setOpen(true);
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
      className="my-[var(--space-9)] flex flex-col items-center text-center"
    >
      <span
        aria-hidden="true"
        className="mb-[var(--space-4)] block h-px w-12 bg-[var(--gold-200)]"
      />
      <blockquote
        data-shown={open ? "true" : "false"}
        className="maison-pullquote font-display text-[var(--text-3xl)] md:text-[var(--text-4xl)] italic leading-[1.18] tracking-[-0.01em] text-[var(--ink-100)] max-w-[50ch]"
      >
        <span aria-hidden="true" className="text-[var(--gold-200)]">
          {"“"}
        </span>
        {quote}
        <span aria-hidden="true" className="text-[var(--gold-200)]">
          {"”"}
        </span>
      </blockquote>
      {attribution ? (
        <cite className="mt-[var(--space-4)] block font-body text-[var(--text-xs)] uppercase tracking-[0.16em] text-[var(--ink-400)] not-italic">
          {attribution}
        </cite>
      ) : null}
    </div>
  );
}
