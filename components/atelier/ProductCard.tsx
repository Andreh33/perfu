"use client";

// Client because of the 3D hover transform, GSAP stagger entry and the
// shimmer overlay that needs a small ref to its container element.
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import type { Perfume } from "@/lib/products";
import { FAMILIES } from "@/lib/families";
import { NoteGlyph } from "./NoteGlyph";

type Locale = "es" | "en" | "ar";
type CardSize = "L" | "M" | "S";

const aspectBySize: Record<CardSize, string> = {
  L: "aspect-[4/5]",
  M: "aspect-[4/5]",
  S: "aspect-[3/4]",
};

const headingBySize: Record<CardSize, string> = {
  L: "text-[var(--text-3xl)] leading-[1.05]",
  M: "text-[var(--text-2xl)] leading-[1.1]",
  S: "text-[var(--text-xl)] leading-[1.15]",
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProductCard({
  product,
  size,
  index,
  locale,
  labels,
}: {
  product: Perfume;
  size: CardSize;
  index: number;
  locale: Locale;
  labels: {
    from: string;
    acquire: string;
    notes: string;
    limited: string;
    newTag: string;
    bestseller: string;
    intensity: string;
  };
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const family = FAMILIES[product.family];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 32, clipPath: "inset(30% 0 0 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0 0)",
          duration: 0.9,
          delay: (index % 6) * 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [index]);

  const familyLabel =
    locale === "es"
      ? family.label_es
      : locale === "ar"
        ? family.label_ar
        : family.label_en;

  const name =
    locale === "es"
      ? product.names.es
      : locale === "ar"
        ? product.names.ar
        : product.names.en;

  const showArabicSubtitle = locale !== "ar";

  // Primary image alt: name + family + perfumer's house — descriptive, not
  // generic, in keeping with the audit rules in CLAUDE.md §10.
  const alt = `${product.names.en} · ${family.label_en} fragrance`;

  return (
    <article
      ref={ref}
      className={cn(
        "group/card relative isolate flex flex-col p-[var(--space-5)]",
        "overflow-hidden",
        // Warm-tinted card surface: subtle gold wash baked into the bg.
        // Hairline gold border-top (with fade) + a faint inner shadow.
        "border-t border-[var(--gold-200)]/[0.08]",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02),inset_0_-40px_40px_-40px_rgba(0,0,0,0.4)]",
        "transition-[background,border-color] duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)]",
        "hover:border-[var(--gold-200)]/[0.25]",
      )}
      style={{
        perspective: "800px",
        background:
          "linear-gradient(180deg, rgba(184,147,90,0.05) 0%, transparent 30%), var(--obsidian-200)",
      }}
      data-card-index={index}
      data-card-size={size}
    >
      {/* warm radial lighting — stronger than before */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 30% 35%, rgba(212,182,119,0.14) 0%, rgba(184,147,90,0.04) 35%, transparent 65%)",
        }}
      />

      {/* ambient hover glow — appears behind the bottle on hover */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 opacity-0",
          "transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-soft-expo)]",
          "group-hover/card:opacity-100",
        )}
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(212,182,119,0.16) 0%, transparent 70%)",
        }}
      />

      {/* gold vertical stripe drawing on hover — thicker, with glow */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-px origin-bottom scale-y-0",
          "bg-[var(--gold-200)] transition-transform duration-[600ms] ease-[var(--ease-soft-expo)]",
          "group-hover/card:scale-y-100",
        )}
        style={{ boxShadow: "0 0 8px 1px rgba(184, 147, 90, 0.4)" }}
      />

      {/* edition/new/bestseller tags */}
      <div className="absolute top-[var(--space-5)] right-[var(--space-5)] z-10 flex flex-col items-end gap-1">
        {product.new && (
          <span className="small-caps text-[var(--text-xs)] text-[var(--gold-200)]">
            {labels.newTag}
          </span>
        )}
        {product.edition.type === "limited" && (
          <span className="small-caps text-[var(--text-xs)] text-[var(--ink-300)] tabular-nums">
            {labels.limited} · {product.edition.number}
          </span>
        )}
        {product.bestseller && !product.new && (
          <span className="small-caps text-[var(--text-xs)] text-[var(--ink-300)]">
            {labels.bestseller}
          </span>
        )}
      </div>

      {/* bottle imagery */}
      <Link
        href={`/atelier/${product.slug}`}
        className="relative block w-full"
        aria-label={`${name} — ${familyLabel}`}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden",
            aspectBySize[size],
            "transition-transform duration-[800ms] ease-[var(--ease-silk)]",
            "group-hover/card:[transform:rotateY(3deg)_rotateX(1deg)]",
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Image
            src={product.images.bottle_primary}
            alt={alt}
            fill
            sizes={
              size === "L"
                ? "(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 720px"
                : size === "M"
                  ? "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 560px"
                  : "(max-width: 768px) 100vw, 40vw, 420px"
            }
            className="object-contain p-[var(--space-6)]"
            priority={index < 3}
          />
          {/* gold shimmer that crosses the bottle on hover */}
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-y-0 -left-[30%] w-[30%]",
              "[background:linear-gradient(115deg,transparent_0%,rgba(212,182,119,0.35)_50%,transparent_100%)]",
              "transition-[left] duration-[1400ms] ease-[var(--ease-soft-expo)]",
              "group-hover/card:left-[130%]",
            )}
          />
        </div>
      </Link>

      {/* meta block */}
      <div className="mt-[var(--space-5)] flex flex-1 flex-col gap-[var(--space-3)]">
        {/* gold-200 instead of gold-300 here so the family eyebrow
            crosses WCAG AA 4.5:1 contrast on obsidian-400 backgrounds.
            gold-300 (#8e6e3f) sits at 3.6:1, gold-200 (#b8935a) at 6.1:1. */}
        <span
          className="small-caps text-[var(--gold-200)]"
          style={{ letterSpacing: "0.16em" }}
        >
          {familyLabel}
        </span>

        <h3
          className={cn(
            "font-display italic text-[var(--ink-100)] tracking-[-0.01em]",
            headingBySize[size],
          )}
        >
          <Link href={`/atelier/${product.slug}`} className="hover:text-[var(--gold-100)] transition-colors duration-[var(--duration-quick)]">
            {name}
          </Link>
        </h3>

        {showArabicSubtitle && (
          <p
            lang="ar"
            dir="rtl"
            className="font-arabic-display text-[var(--text-sm)] text-[var(--ink-400)]"
          >
            {product.names.ar}
          </p>
        )}

        {/* top notes */}
        <div className="mt-[var(--space-2)] flex flex-wrap items-center gap-[var(--space-3)]">
          <span className="small-caps text-[var(--text-xs)] text-[var(--ink-400)]">
            {labels.notes}
          </span>
          {product.notes.top.slice(0, 3).map((n) => {
            const noteName =
              locale === "es"
                ? n.name_es
                : locale === "ar"
                  ? n.name_ar
                  : n.name_en;
            return (
              <span
                key={n.icon}
                className="inline-flex items-center gap-1.5 text-[var(--ink-300)]"
              >
                <NoteGlyph name={n.icon} size={18} />
                <span className="text-[var(--text-xs)]">{noteName}</span>
              </span>
            );
          })}
        </div>

        {/* separator */}
        <div className="mt-auto pt-[var(--space-4)]">
          <div className="h-px w-full bg-[var(--ink-500)]" />
          <div className="mt-[var(--space-4)] flex items-end justify-between gap-3">
            <div className="flex flex-col">
              <span className="small-caps text-[var(--text-xs)] text-[var(--ink-400)]">
                {labels.from}
              </span>
              <span className="font-body text-[var(--text-md)] tabular-nums text-[var(--ink-100)]">
                € {product.prices.ml50}
              </span>
            </div>

            <Link
              href={`/atelier/${product.slug}`}
              className="group/cta inline-flex items-center gap-2 text-[var(--ink-100)] transition-colors hover:text-[var(--gold-100)]"
            >
              <span className="small-caps text-[var(--text-xs)]">
                {labels.acquire}
              </span>
              <span
                aria-hidden
                className="inline-block transition-transform duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)] group-hover/cta:translate-x-1 rtl:rotate-180 rtl:group-hover/cta:-translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
