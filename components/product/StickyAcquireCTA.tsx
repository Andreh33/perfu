"use client";
// Client component: watches the hero acquire sentinel via IntersectionObserver
// and slides itself in once the original CTA leaves the viewport. Has its own
// (slug, size) state mirroring the hero so the visitor can still pick a size.

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { cn } from "@/lib/cn";
import type { CartSize } from "@/lib/store/cart";
import type { Perfume } from "@/lib/products";

interface StickyAcquireCTAProps {
  product: Perfume;
  locale: "es" | "en" | "ar";
}

export function StickyAcquireCTA({ product, locale }: StickyAcquireCTAProps) {
  const t = useTranslations("product");
  const [size, setSize] = useState<CartSize>("ml50");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Wait one tick for the hero sentinel to mount before binding.
    const id = window.setTimeout(() => {
      const sentinel = document.querySelector<HTMLElement>(
        "[data-acquire-sentinel]",
      );
      if (!sentinel) return;
      const io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          // When the sentinel scrolls out below the viewport, show the bar.
          setVisible(!entry.isIntersecting);
        },
        { threshold: 0, rootMargin: "0px 0px -120px 0px" },
      );
      io.observe(sentinel);
      return () => io.disconnect();
    }, 80);
    return () => window.clearTimeout(id);
  }, []);

  const price = size === "ml50" ? product.prices.ml50 : product.prices.ml100;
  const sizeLabel = size === "ml50" ? t("tabs.ml50") : t("tabs.ml100");
  const name = product.names[locale];

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-[var(--ink-500)] bg-[var(--obsidian-400)]/95 backdrop-blur-md",
        "transition-[clip-path,opacity] duration-[480ms] ease-[var(--ease-soft-expo)]",
      )}
      style={{
        clipPath: visible ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
        opacity: visible ? 1 : 0,
      }}
      data-sticky-acquire
    >
      <div className="mx-auto flex max-w-[1560px] flex-wrap items-center justify-between gap-[var(--space-4)] px-[var(--space-5)] py-[var(--space-3)] md:px-[var(--space-7)]">
        <div className="flex min-w-0 flex-col">
          <span className="font-display italic text-[var(--text-md)] text-[var(--ink-100)] truncate">
            {name}
          </span>
          <span className="small-caps text-[var(--text-xs)] tracking-[0.16em] text-[var(--ink-400)]">
            € {price} · {sizeLabel}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div
            role="radiogroup"
            aria-label={t("labels.size_label")}
            className="inline-flex border border-[var(--ink-500)]"
          >
            {(["ml50", "ml100"] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                role="radio"
                aria-checked={size === opt}
                onClick={() => setSize(opt)}
                className={cn(
                  "px-3 py-2 text-[var(--text-xs)] tracking-[0.08em] uppercase",
                  size === opt
                    ? "bg-[var(--ink-100)] text-[var(--obsidian-400)]"
                    : "text-[var(--ink-200)] hover:text-[var(--gold-100)]",
                )}
              >
                {opt === "ml50" ? t("tabs.ml50") : t("tabs.ml100")}
              </button>
            ))}
          </div>

          <AddToCartButton
            slug={product.slug}
            bottleSize={size}
            variant="gold"
            label={t("labels.sticky_acquire", {
              price: String(price),
              size: sizeLabel,
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default StickyAcquireCTA;
