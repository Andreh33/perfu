// Hero — large editorial centred composition. The animated liquid gold
// is mounted globally in the layout root (<GlobalLiquidGoldBackground/>),
// so the Hero is just a transparent 100svh stage for centred type and a
// scroll indicator.

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
      className="relative w-full h-[100svh] min-h-[720px] overflow-hidden"
    >
      <div className="absolute inset-0 grid place-items-center text-center px-[var(--space-5)]">
        <div className="flex flex-col items-center">
          {/* Eyebrow */}
          <p
            className="font-body uppercase text-[11px] md:text-[12px] mb-[var(--space-7)] md:mb-[var(--space-8)]"
            style={{
              letterSpacing: "0.55em",
              color: "rgba(244, 228, 188, 0.55)",
              textIndent: "0.55em",
            }}
          >
            {t("eyebrow")}
          </p>

          {/* Massive wordmark — Aboreto font (Arabic-calligraphy
              influenced Latin display) for ES/EN, Naskh display for AR. */}
          <h1
            className={isRtl ? "font-arabic-display" : ""}
            style={{
              fontFamily: isRtl ? undefined : "var(--font-wordmark)",
              fontSize: "clamp(3rem, 11vw, 9.5rem)",
              letterSpacing: isRtl ? "0" : "0.16em",
              fontWeight: 400,
              lineHeight: 0.95,
              color: "#f4e4bc",
              textShadow: "0 0 80px rgba(244, 228, 188, 0.18)",
            }}
          >
            {wordmark}
          </h1>
          {wordmarkSub && (
            <h2
              className="mt-[var(--space-2)] md:mt-[var(--space-3)]"
              style={{
                fontFamily: "var(--font-wordmark)",
                fontSize: "clamp(3rem, 11vw, 9.5rem)",
                letterSpacing: "0.16em",
                fontWeight: 400,
                lineHeight: 0.95,
                color: "#f4e4bc",
                textShadow: "0 0 80px rgba(244, 228, 188, 0.18)",
              }}
            >
              {wordmarkSub}
            </h2>
          )}

          {/* Gold divider */}
          <div
            aria-hidden
            className="mx-auto my-[var(--space-8)] md:my-[var(--space-9)] h-px w-32 md:w-40"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, #d4af37 50%, transparent 100%)",
            }}
          />

          {/* Subtitle — bigger and richer */}
          <p
            className={`font-display italic mb-[var(--space-8)] max-w-[52ch] ${isRtl ? "font-arabic-display" : ""}`}
            style={{
              fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)",
              letterSpacing: isRtl ? "0" : "0.4em",
              color: "rgba(244, 228, 188, 0.75)",
              textTransform: isRtl ? "none" : "lowercase",
              lineHeight: 1.7,
            }}
          >
            {t("subtitle")}
          </p>

          {/* Twin CTAs — primary gold + ghost ivory */}
          <div className="flex flex-col sm:flex-row items-center gap-[var(--space-5)] md:gap-[var(--space-7)] mt-[var(--space-4)]">
            <Link
              href={`/${locale}/atelier`}
              className="group inline-flex items-center gap-[var(--space-3)] uppercase font-body border border-[#d4af37]/60 hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)] px-[var(--space-7)] py-[var(--space-5)]"
              style={{
                fontSize: "12px",
                letterSpacing: "0.4em",
                color: "#d4af37",
                textIndent: "0.4em",
              }}
            >
              {t("cta").replace(/[→←]\s*$/, "").trim()}
              <span aria-hidden className="hero-arrow inline-block">
                {isRtl ? "←" : "→"}
              </span>
            </Link>
            <Link
              href={`/${locale}/maison`}
              className="group inline-flex items-center gap-[var(--space-2)] uppercase font-body"
              style={{
                fontSize: "11px",
                letterSpacing: "0.4em",
                color: "rgba(244, 228, 188, 0.7)",
                textIndent: "0.4em",
              }}
            >
              <span className="relative">
                {isRtl ? "تعرّف على الدار" : "DISCOVER THE MAISON"}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-px scale-x-0 origin-center bg-current transition-transform duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)] group-hover:scale-x-100"
                />
              </span>
            </Link>
          </div>

          {/* Maison signature */}
          <p
            className="font-body uppercase mt-[var(--space-10)] md:mt-[var(--space-11)]"
            style={{
              fontSize: "10px",
              letterSpacing: "0.6em",
              color: "rgba(244, 228, 188, 0.35)",
              textIndent: "0.6em",
            }}
          >
            {tCommon("site_name")} · MMXXVI
          </p>
        </div>
      </div>

      {/* Scroll indicator — bottom-centre, a hairline with a falling dot. */}
      <div
        aria-hidden
        className="absolute bottom-[var(--space-6)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-[var(--space-3)]"
      >
        <span
          className="font-body uppercase"
          style={{
            fontSize: "9px",
            letterSpacing: "0.5em",
            color: "rgba(244, 228, 188, 0.45)",
            textIndent: "0.5em",
          }}
        >
          {isRtl ? "اسحب للأسفل" : "SCROLL"}
        </span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}
