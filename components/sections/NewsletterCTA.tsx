"use client";
// Dramatic newsletter CTA — large italic display headline + ultra-thin
// underline input + gold submit. Reveal-on-scroll, magnetic hover,
// success state in-place.

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export function NewsletterCTA() {
  const t = useTranslations("home.newsletter");
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "err">("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus("err");
      return;
    }
    setStatus("sent");
  }

  return (
    <section
      ref={ref}
      className="relative w-full py-[var(--space-12)] px-[var(--space-6)]"
    >
      <div
        className="mx-auto max-w-[920px] flex flex-col items-center text-center"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 1100ms var(--ease-soft-expo), transform 1100ms var(--ease-soft-expo)",
        }}
      >
        <p className="pd-eyebrow">{t("eyebrow")}</p>
        <h2
          className="font-display italic mt-[var(--space-5)] mb-[var(--space-6)] text-[#f4e4bc]"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1,
            fontWeight: 300,
            textWrap: "balance",
          }}
        >
          {t("title")}
        </h2>
        <p
          className="font-display italic mb-[var(--space-9)] max-w-[52ch]"
          style={{
            fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
            color: "rgba(244, 228, 188, 0.65)",
            lineHeight: 1.7,
          }}
        >
          {t("body")}
        </p>

        {status === "sent" ? (
          <p
            className="font-body uppercase"
            style={{
              fontSize: "12px",
              letterSpacing: "0.45em",
              color: "#d4af37",
              textIndent: "0.45em",
            }}
          >
            {t("success")}
          </p>
        ) : (
          <form
            onSubmit={onSubmit}
            className="w-full max-w-[480px] flex flex-col sm:flex-row items-stretch gap-[var(--space-4)]"
          >
            <input
              type="email"
              placeholder={t("placeholder")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "err") setStatus("idle");
              }}
              className="flex-1 bg-transparent font-body py-[var(--space-4)] border-b focus:outline-none transition-colors duration-[var(--duration-quick)]"
              style={{
                fontSize: "14px",
                letterSpacing: "0.12em",
                color: "#f4e4bc",
                borderColor:
                  status === "err"
                    ? "rgba(201, 146, 138, 0.7)"
                    : "rgba(244, 228, 188, 0.35)",
              }}
              required
            />
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-[var(--space-3)] uppercase font-body border border-[#d4af37]/60 hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)] px-[var(--space-7)] py-[var(--space-4)]"
              style={{
                fontSize: "12px",
                letterSpacing: "0.4em",
                color: "#d4af37",
                textIndent: "0.4em",
              }}
            >
              {t("submit")}
              <span aria-hidden className="hero-arrow inline-block">→</span>
            </button>
          </form>
        )}
        {status === "err" && (
          <p
            className="font-body uppercase mt-[var(--space-4)]"
            style={{
              fontSize: "10px",
              letterSpacing: "0.4em",
              color: "rgba(201, 146, 138, 0.85)",
              textIndent: "0.4em",
            }}
          >
            {t("error")}
          </p>
        )}
      </div>
    </section>
  );
}
