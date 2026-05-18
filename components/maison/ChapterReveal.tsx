"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface ChapterRevealProps {
  children: ReactNode;
  /** Delay before this element starts animating, in ms. */
  delay?: number;
  /** Tag to render. */
  as?: "div" | "section" | "article";
  className?: string;
}

/**
 * Editorial fade-up reveal. Triggers a single time when the wrapper crosses
 * 18% into the viewport. `prefers-reduced-motion` is honoured via CSS
 * (see globals.css), so we keep the markup deterministic on the server.
 */
export function ChapterReveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: ChapterRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // (reduced-motion gate disabled — reveal plays for every user)
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  const Component = Tag as "div";

  return (
    <Component
      ref={ref}
      data-shown={shown ? "true" : "false"}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("maison-reveal", className)}
    >
      {children}
    </Component>
  );
}
