"use client";
// Editorial stats block — four large numerals that count up from 0 when
// the section enters the viewport. Reads as an editorial "by the
// numbers" infographic.

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

interface Stat {
  end: number;
  suffix?: string;
  label: string;
}

export function CraftStats() {
  const t = useTranslations("home.stats");
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const stats: Stat[] = [
    { end: 20, label: t("fragrances") },
    { end: 8, label: t("perfumers") },
    { end: 18, suffix: t("months_suffix"), label: t("months_label") },
    { end: 3, label: t("cities") },
  ];

  return (
    <section
      ref={ref}
      className="relative w-full py-[var(--space-11)] md:py-[var(--space-12)] px-[var(--space-6)]"
    >
      <div className="mx-auto max-w-[1280px]">
        <p
          className="pd-eyebrow text-center"
          style={{ opacity: active ? 1 : 0, transition: "opacity 700ms" }}
        >
          {t("eyebrow")}
        </p>
        <h2
          className="font-display italic text-center mt-[var(--space-5)] mb-[var(--space-10)] md:mb-[var(--space-11)] text-[#f4e4bc]"
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            fontWeight: 300,
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 900ms, transform 900ms",
          }}
        >
          {t("title")}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-[var(--space-9)] md:gap-y-0">
          {stats.map((s, i) => (
            <StatCell key={i} stat={s} active={active} delay={i * 140} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCell({ stat, active, delay }: { stat: Stat; active: boolean; delay: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const startAt = performance.now() + delay;
    const duration = 1600;
    let raf = 0;
    const tick = () => {
      const now = performance.now();
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const p = Math.min(1, (now - startAt) / duration);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(stat.end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, delay, stat.end]);

  return (
    <div
      className="flex flex-col items-center text-center px-[var(--space-4)]"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 900ms ${delay}ms, transform 900ms ${delay}ms`,
      }}
    >
      <span
        className="font-display tabular-nums"
        style={{
          fontSize: "clamp(3.5rem, 7vw, 6rem)",
          fontWeight: 200,
          color: "#d4af37",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
        {stat.suffix ? (
          <span style={{ fontSize: "0.45em", color: "rgba(212, 175, 55, 0.75)", marginLeft: "0.1em" }}>
            {stat.suffix}
          </span>
        ) : null}
      </span>
      <span
        className="font-body uppercase mt-[var(--space-4)]"
        style={{
          fontSize: "10px",
          letterSpacing: "0.4em",
          color: "rgba(244, 228, 188, 0.55)",
          textIndent: "0.4em",
        }}
      >
        {stat.label}
      </span>
    </div>
  );
}
