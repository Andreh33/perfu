"use client";
// Client component: the hero hosts the dynamic-imported R3F scene, plus a
// stateful price/size selector, a wishlist toggle, and an IntersectionObserver
// sentinel that the sticky CTA listens to. All client-only behaviour, so we
// keep the whole hero on the client to avoid prop-drilling refs.

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import { Text } from "@/components/ui/Text";
import { Link } from "@/i18n/navigation";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { FAMILIES } from "@/lib/families";
import { getPerfumer } from "@/lib/perfumers";
import type { Perfume } from "@/lib/products";
import { cn } from "@/lib/cn";
import type { CartSize } from "@/lib/store/cart";

// The R3F canvas is dynamic-imported so the server bundle stays free of
// three.js / WebGL. ssr:false keeps Next from attempting to render it
// during the server pass.
const BottleScene = dynamic(
  () => import("@/components/three/BottleScene").then((m) => m.BottleScene),
  { ssr: false },
);

interface ProductHeroProps {
  product: Perfume;
  locale: "es" | "en" | "ar";
}

const YEAR_ROMAN: Record<number, string> = {
  2020: "MMXX",
  2021: "MMXXI",
  2022: "MMXXII",
  2023: "MMXXIII",
  2024: "MMXXIV",
  2025: "MMXXV",
  2026: "MMXXVI",
};

function romanForYear(year: number): string {
  return YEAR_ROMAN[year] ?? String(year);
}

export function ProductHero({ product, locale }: ProductHeroProps) {
  const t = useTranslations("product");
  const [size, setSize] = useState<CartSize>("ml50");
  const [wished, setWished] = useState(false);

  const family = FAMILIES[product.family];
  const perfumer = getPerfumer(product.perfumer);
  const familyLabel =
    locale === "es"
      ? family.label_es
      : locale === "ar"
        ? family.label_ar
        : family.label_en;

  const name = product.names[locale];
  const description = product.description[locale];
  const firstLine = description[0] ?? "";

  const price = size === "ml50" ? product.prices.ml50 : product.prices.ml100;
  const sizeLabel = size === "ml50" ? t("tabs.ml50") : t("tabs.ml100");

  const sampleMailto = `mailto:concierge@perfumesdubai.com?subject=${encodeURIComponent(
    `Sample request — ${product.names.en}`,
  )}`;

  const showArabicName = locale !== "ar";

  return (
    <section
      className="relative grid min-h-screen grid-cols-1 gap-[var(--space-7)] pt-[var(--space-9)] pb-[var(--space-8)] lg:grid-cols-12 lg:items-center"
      data-product-hero
    >
      {/* LEFT · 3D bottle ─────────────────────────────────────── */}
      <div className="relative h-[60vh] min-h-[420px] w-full lg:col-span-7 lg:h-[88vh]">
        <BottleScene product={product} />
      </div>

      {/* RIGHT · meta + CTA ──────────────────────────────────── */}
      <div className="relative flex flex-col gap-[var(--space-5)] px-[var(--space-5)] md:px-[var(--space-7)] lg:col-span-5 lg:pr-[var(--space-8)]">
        {/* wishlist heart */}
        <button
          type="button"
          aria-label={t("cta.wishlist")}
          aria-pressed={wished}
          onClick={() => setWished((v) => !v)}
          className={cn(
            "absolute top-0 right-[var(--space-5)] flex h-10 w-10 items-center justify-center rounded-full",
            "border border-[var(--ink-500)] transition-colors duration-[var(--duration-quick)]",
            "hover:border-[var(--gold-200)]",
            wished
              ? "bg-[var(--gold-200)] text-[var(--obsidian-400)]"
              : "text-[var(--ink-300)] hover:text-[var(--gold-100)]",
          )}
        >
          <Heart
            size={18}
            strokeWidth={1.4}
            fill={wished ? "currentColor" : "none"}
            aria-hidden
          />
        </button>

        {/* eyebrow */}
        <Text variant="small-caps" tone="gold">
          {familyLabel.toUpperCase()}
          {product.tags[0] ? ` · ${product.tags[0].toUpperCase()}` : null}
          {product.tags[1] ? ` · ${product.tags[1].toUpperCase()}` : null}
          {" · "}
          {romanForYear(product.year)}
        </Text>

        {/* title */}
        <Text
          as="h1"
          variant="display-l"
          italic
          className="max-w-[14ch] text-wrap-balance"
        >
          {name}
        </Text>

        {showArabicName ? (
          <Text
            as="p"
            variant="subhead"
            italic
            tone="muted"
            className="font-arabic-display"
            lang="ar"
            dir="rtl"
          >
            {product.names.ar}
          </Text>
        ) : null}

        {/* separator */}
        <span
          aria-hidden
          className="my-[var(--space-2)] block h-px w-20 bg-[var(--gold-200)]"
        />

        {/* subtitle */}
        <Text
          as="p"
          variant="subhead"
          italic
          tone="secondary"
          className="max-w-[42ch]"
        >
          {firstLine}
        </Text>

        {/* perfumer */}
        {perfumer ? (
          <Text variant="body-s" tone="muted">
            {t("labels.created_by")}{" "}
            <Link
              href={{ pathname: "/perfumeur", hash: perfumer.id }}
              className="text-[var(--ink-200)] underline-offset-4 hover:text-[var(--gold-100)] hover:underline"
            >
              {perfumer.name}
            </Link>
            {" · "}
            <span className="text-[var(--ink-400)]">{perfumer.origin}</span>
          </Text>
        ) : null}

        {/* edition badge */}
        <div>
          <span
            className={cn(
              "inline-flex items-center gap-2 border px-[var(--space-3)] py-1.5",
              "small-caps text-[var(--text-xs)] tracking-[0.16em]",
              product.edition.type === "limited"
                ? "border-[var(--gold-200)] text-[var(--gold-200)]"
                : "border-[var(--ink-500)] text-[var(--ink-300)]",
            )}
          >
            {product.edition.type === "limited"
              ? `${t("labels.limited_edition")} · ${t("labels.edition_number", {
                  n: product.edition.number ?? "—",
                })}`
              : t("labels.permanent")}
          </span>
        </div>

        {/* size selector */}
        <fieldset className="mt-[var(--space-3)] flex flex-col gap-2">
          <legend className="small-caps mb-2 text-[var(--text-xs)] tracking-[0.16em] text-[var(--ink-400)]">
            {t("labels.size_label")}
          </legend>
          <div role="radiogroup" className="inline-flex border border-[var(--ink-500)]">
            {(["ml50", "ml100"] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                role="radio"
                aria-checked={size === opt}
                onClick={() => setSize(opt)}
                className={cn(
                  "px-[var(--space-5)] py-3 text-[var(--text-sm)] tracking-[0.08em] uppercase",
                  "transition-colors duration-[var(--duration-quick)]",
                  size === opt
                    ? "bg-[var(--ink-100)] text-[var(--obsidian-400)]"
                    : "text-[var(--ink-200)] hover:text-[var(--gold-100)]",
                )}
              >
                {opt === "ml50" ? t("tabs.ml50") : t("tabs.ml100")}
              </button>
            ))}
          </div>
        </fieldset>

        {/* CTAs */}
        <div className="mt-[var(--space-4)] flex flex-col gap-3 sm:flex-row">
          <AddToCartButton
            slug={product.slug}
            bottleSize={size}
            variant="gold"
            label={`${t("cta.acquire")} — € ${price}`}
            className="flex-1"
          />
          <a
            href={sampleMailto}
            className={cn(
              "group inline-flex items-center justify-center gap-3 px-7 py-4",
              "font-body text-[var(--text-sm)] tracking-[0.16em] uppercase font-medium",
              "border border-[var(--ink-500)] text-[var(--ink-200)]",
              "transition-colors hover:border-[var(--gold-200)] hover:text-[var(--gold-100)]",
            )}
          >
            {t("cta.sample")}
          </a>
        </div>

        {/* sentinel for sticky CTA — sits below the acquire button so the
            observer fires once the hero CTA scrolls past the fold. */}
        <span
          data-acquire-sentinel
          aria-hidden
          className="block h-px w-full"
        />

        {/* meta strip */}
        <dl className="mt-[var(--space-5)] grid grid-cols-2 gap-[var(--space-4)] text-[var(--text-xs)]">
          <div>
            <dt className="small-caps tracking-[0.16em] text-[var(--ink-400)]">
              {t("labels.intensity_label")}
            </dt>
            <dd className="mt-1 text-[var(--ink-200)]">{product.intensity}</dd>
          </div>
          <div>
            <dt className="small-caps tracking-[0.16em] text-[var(--ink-400)]">
              {t("labels.origin_label")}
            </dt>
            <dd className="mt-1 text-[var(--ink-200)]">
              {product.inspiration_country}
            </dd>
          </div>
        </dl>

        <span className="sr-only">{sizeLabel}</span>
      </div>
    </section>
  );
}

export default ProductHero;
