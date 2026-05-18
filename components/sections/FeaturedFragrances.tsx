// Featured fragrances — picks 3 perfumes flagged featured=true and
// renders them as a magazine-style horizontal triptych. Each card hovers
// with a 3D rotate + gold shimmer + caption reveal. Server Component;
// hover interactivity is pure CSS (no client JS).

import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { PERFUMES } from "@/lib/products";
import { FAMILIES } from "@/lib/families";
import { Reveal } from "./Reveal";

type Locale = "es" | "en" | "ar";

interface Props {
  locale: Locale;
}

export async function FeaturedFragrances({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "home.featured" });

  const featured = PERFUMES.filter((p) => p.featured).slice(0, 3);

  return (
    <section
      id="featured"
      className="relative w-full py-[var(--space-11)] md:py-[var(--space-12)] px-[var(--space-6)]"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="flex flex-col items-center text-center mb-[var(--space-10)]">
          <p className="pd-eyebrow">{t("eyebrow")}</p>
          <h2
            className="font-display italic mt-[var(--space-5)] text-[#f4e4bc]"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 4.25rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              fontWeight: 300,
            }}
          >
            {t("title")}
          </h2>
          <p
            className="font-display italic mt-[var(--space-5)] max-w-[52ch]"
            style={{
              fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
              color: "rgba(244, 228, 188, 0.6)",
              lineHeight: 1.6,
            }}
          >
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-6)]">
          {featured.map((p, i) => {
            const family = FAMILIES[p.family];
            const name = p.names[locale] ?? p.names.en;
            const familyLabel = family[`label_${locale}` as `label_${Locale}`] ?? family.label_en;
            return (
              <Reveal key={p.slug} delay={i * 140}>
                <Link
                  href={`/atelier/${p.slug}`}
                  className="group/card relative block overflow-hidden"
                  style={{
                    aspectRatio: "3 / 4",
                    background: "rgba(20, 14, 8, 0.6)",
                    border: "1px solid rgba(212, 175, 55, 0.12)",
                  }}
                >
                  <div className="absolute inset-0 transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-silk)] group-hover/card:scale-[1.04]">
                    <Image
                      src={p.images.bottle_primary}
                      alt={`${p.names.en} — ${family.label_en}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                      style={{ filter: "saturate(0.85) brightness(0.85)" }}
                    />
                  </div>

                  {/* Warm gold gradient overlay reveal on hover */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 transition-opacity duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)] group-hover/card:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212, 175, 55, 0.25) 0%, transparent 70%)",
                      mixBlendMode: "screen",
                    }}
                  />

                  {/* Bottom info veil — always visible, gets brighter on hover */}
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-2/3"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(5, 2, 1, 0.7) 50%, rgba(5, 2, 1, 0.95) 100%)",
                    }}
                  />

                  {/* Gold corner mark */}
                  <span
                    aria-hidden
                    className="absolute top-[var(--space-5)] left-[var(--space-5)] font-body uppercase"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.4em",
                      color: "#d4af37",
                      textIndent: "0.4em",
                    }}
                  >
                    Nº {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Card text — anchored bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-[var(--space-6)]">
                    <p
                      className="font-body uppercase mb-[var(--space-3)]"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "0.42em",
                        color: "rgba(212, 175, 55, 0.85)",
                        textIndent: "0.42em",
                      }}
                    >
                      {familyLabel}
                    </p>
                    <h3
                      className="font-display italic mb-[var(--space-4)]"
                      style={{
                        fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
                        color: "#f4e4bc",
                        lineHeight: 1.1,
                        letterSpacing: "-0.015em",
                        fontWeight: 300,
                      }}
                    >
                      {name}
                    </h3>
                    <div className="flex items-baseline justify-between">
                      <span
                        className="font-body uppercase"
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.3em",
                          color: "rgba(244, 228, 188, 0.55)",
                        }}
                      >
                        {t("from")} €{p.prices.ml50}
                      </span>
                      <span
                        aria-hidden
                        className="font-body uppercase translate-x-0 group-hover/card:translate-x-1 transition-transform duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)]"
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.3em",
                          color: "#d4af37",
                          textIndent: "0.3em",
                        }}
                      >
                        {t("explore")} →
                      </span>
                    </div>
                  </div>

                  {/* Hairline top border that fills on hover */}
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 right-0 h-px origin-left scale-x-0 group-hover/card:scale-x-100 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-soft-expo)]"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, rgba(212, 175, 55, 0.7), transparent)",
                    }}
                  />
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="flex justify-center mt-[var(--space-10)]">
          <Link
            href="/atelier"
            className="group inline-flex items-center gap-[var(--space-3)] font-body uppercase"
            style={{
              fontSize: "11px",
              letterSpacing: "0.45em",
              color: "#d4af37",
              textIndent: "0.45em",
            }}
          >
            <span className="relative">
              {t("see_all")}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 right-0 h-px scale-x-0 origin-center bg-current group-hover:scale-x-100 transition-transform duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)]"
              />
            </span>
            <span aria-hidden className="hero-arrow inline-block">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
