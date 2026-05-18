// Hero — minimalist centred QASR-style composition. The animated liquid
// gold background is now mounted GLOBALLY in the layout root
// (<GlobalLiquidGoldBackground/>) so it covers every page; the Hero just
// reserves a 100svh viewport and centres the editorial type overlay on
// top of the global atmosphere.

import { getTranslations } from "next-intl/server";
import Link from "next/link";

interface HeroProps {
  locale: string;
}

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: "home.hero" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const isRtl = locale === "ar";

  const wordmark = isRtl ? "عطور دبي" : "PERFUMES";
  const wordmarkSub = isRtl ? "" : "DUBAI";

  return (
    <section
      id="hero"
      data-section="hero"
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden"
    >
      <div className="relative h-full w-full">
        <div className="absolute inset-0 grid place-items-center text-center px-[var(--space-5)]">
          <div className="flex flex-col items-center">
            {/* Eyebrow — ultra-thin tracking, ivory at 40% opacity */}
            <p
              className="font-body uppercase text-[10px] md:text-[11px] mb-[var(--space-6)] md:mb-[var(--space-7)]"
              style={{
                letterSpacing: "0.55em",
                color: "rgba(244, 228, 188, 0.5)",
                textIndent: "0.55em", // compensate the trailing space lost to letter-spacing
              }}
            >
              {t("eyebrow")}
            </p>

            {/* Wordmark — Fraunces extralight, very wide tracking. On RTL
                it switches to Arabic Naskh display. */}
            <h1
              className={`font-display font-extralight leading-[0.92] text-[var(--ink-100)] ${
                isRtl ? "font-arabic-display" : ""
              }`}
              style={{
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                letterSpacing: isRtl ? "0" : "0.24em",
                fontWeight: 200,
                color: "#f4e4bc",
                textShadow: "0 0 60px rgba(244, 228, 188, 0.18)",
              }}
            >
              {wordmark}
            </h1>
            {wordmarkSub && (
              <h2
                className="font-display font-extralight leading-[0.92] mt-[var(--space-2)]"
                style={{
                  fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                  letterSpacing: "0.24em",
                  fontWeight: 200,
                  color: "#f4e4bc",
                  textShadow: "0 0 60px rgba(244, 228, 188, 0.18)",
                }}
              >
                {wordmarkSub}
              </h2>
            )}

            {/* Gold divider — thin gradient line, fades at both ends. */}
            <div
              aria-hidden
              className="mx-auto my-[var(--space-7)] md:my-[var(--space-8)] h-px w-24 md:w-32"
              style={{
                background:
                  "linear-gradient(to right, transparent 0%, #d4af37 50%, transparent 100%)",
              }}
            />

            {/* Subtitle — italic, ultra-tracked, ivory at 60% */}
            <p
              className={`font-display italic mb-[var(--space-7)] md:mb-[var(--space-8)] max-w-[44ch] ${
                isRtl ? "font-arabic-display" : ""
              }`}
              style={{
                fontSize: "clamp(0.72rem, 0.9vw, 0.82rem)",
                letterSpacing: isRtl ? "0" : "0.42em",
                color: "rgba(244, 228, 188, 0.62)",
                textTransform: isRtl ? "none" : "lowercase",
                lineHeight: 1.7,
              }}
            >
              {t("subtitle")}
            </p>

            {/* CTA — same ultra-tracked refinement as the eyebrow, but in
                gold so it reads as the affordance. Underline draws on hover. */}
            <Link
              href={`/${locale}/atelier`}
              className="group inline-block uppercase font-body"
              style={{
                fontSize: "11px",
                letterSpacing: "0.55em",
                color: "#d4af37",
                textIndent: "0.55em",
              }}
            >
              <span className="relative">
                {t("cta").replace(/[→←]\s*$/, "").trim()}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-px origin-center scale-x-0 bg-[#d4af37] transition-transform duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)] group-hover:scale-x-100"
                />
              </span>
            </Link>

            {/* Maison signature beneath — the tiny "n° / edition" detail
                that anchors the composition. */}
            <p
              className="font-body uppercase mt-[var(--space-9)] md:mt-[var(--space-10)]"
              style={{
                fontSize: "9px",
                letterSpacing: "0.65em",
                color: "rgba(244, 228, 188, 0.28)",
                textIndent: "0.65em",
              }}
            >
              {tCommon("site_name")} · MMXXVI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
