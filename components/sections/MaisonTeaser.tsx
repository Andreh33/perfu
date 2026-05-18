// Maison teaser — split editorial: large image left (with subtle
// parallax-style scale on hover), editorial text right with eyebrow,
// large italic display headline, body and CTA. Server Component;
// parallax is pure CSS.

import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./Reveal";

interface Props {
  locale: string;
}

export async function MaisonTeaser({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "home.maison_teaser" });
  const isRtl = locale === "ar";

  return (
    <section
      id="maison-teaser"
      className="relative w-full py-[var(--space-11)] md:py-[var(--space-12)] px-[var(--space-6)]"
    >
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-8)] md:gap-[var(--space-10)] items-center">
        <Reveal>
          <div
            className="group/img relative overflow-hidden"
            style={{
              aspectRatio: "4 / 5",
              border: "1px solid rgba(212, 175, 55, 0.12)",
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?w=1200&q=85&fit=crop"
              alt={t("image_alt")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-silk)] group-hover/img:scale-[1.05]"
              style={{ filter: "saturate(0.85) brightness(0.8)" }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 30% 30%, rgba(212, 175, 55, 0.12) 0%, transparent 60%)",
                mixBlendMode: "screen",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(5, 2, 1, 0) 50%, rgba(5, 2, 1, 0.4) 100%)",
              }}
            />
            {/* Roman numeral overlay */}
            <span
              aria-hidden
              className="absolute bottom-[var(--space-6)] right-[var(--space-7)] font-display italic"
              style={{
                fontSize: "clamp(3rem, 5vw, 4.5rem)",
                fontWeight: 200,
                color: "rgba(244, 228, 188, 0.45)",
                lineHeight: 1,
              }}
            >
              II
            </span>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className={`flex flex-col ${isRtl ? "lg:items-end lg:text-right" : ""}`}>
            <p className="pd-eyebrow">{t("eyebrow")}</p>
            <h2
              className="font-display italic mt-[var(--space-5)] text-[#f4e4bc]"
              style={{
                fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1,
                fontWeight: 300,
                textWrap: "balance",
              }}
            >
              {t("title")}
            </h2>
            <div
              aria-hidden
              className="my-[var(--space-6)] h-px w-24"
              style={{
                background:
                  "linear-gradient(to right, #d4af37 0%, transparent 100%)",
              }}
            />
            <p
              className="font-display italic max-w-[58ch]"
              style={{
                fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
                color: "rgba(244, 228, 188, 0.75)",
                lineHeight: 1.7,
              }}
            >
              {t("body_1")}
            </p>
            <p
              className="font-body mt-[var(--space-5)] max-w-[58ch]"
              style={{
                fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
                color: "rgba(244, 228, 188, 0.55)",
                lineHeight: 1.7,
              }}
            >
              {t("body_2")}
            </p>
            <Link
              href={`/${locale}/maison`}
              className="group inline-flex items-center gap-[var(--space-3)] uppercase font-body border border-[#d4af37]/60 hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)] px-[var(--space-7)] py-[var(--space-5)] mt-[var(--space-7)] w-fit"
              style={{
                fontSize: "12px",
                letterSpacing: "0.4em",
                color: "#d4af37",
                textIndent: "0.4em",
              }}
            >
              {t("cta")}
              <span aria-hidden className="hero-arrow inline-block">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
