"use client";
// Generic scroll-reveal wrapper. Adds data-shown=true via
// IntersectionObserver once the element enters the viewport; CSS in
// globals.css (.pd-reveal[data-shown=true]) handles the transition.

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          if (delay > 0) {
            const t = window.setTimeout(() => setShown(true), delay);
            return () => window.clearTimeout(t);
          }
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`pd-reveal ${className}`}
      data-shown={shown ? "true" : "false"}
    >
      {children}
    </div>
  );
}
