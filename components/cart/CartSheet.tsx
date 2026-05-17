"use client";
// Client component: cart drawer (backdrop + side panel). Uses `motion` for the
// slide-in transition. Reads currency from localStorage purely for symbol
// display — price conversion is intentionally NOT done here yet.
//
// NOTE: shadcn `Sheet` would add 2 packages + portal infra for what is, in
// effect, an `AnimatePresence` + fixed div. We do it by hand to keep the
// dependency surface clean and the bundle small.

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { Link as I18nLink } from "@/i18n/navigation";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useCart, type CartItem } from "@/lib/store/cart";
import { getProductBySlug, type Perfume } from "@/lib/products";
import { getStripeLink, hasStripeLink } from "@/lib/stripe-links";

type CurrencyCode = "eur" | "usd" | "aed";
const CURRENCY_KEY = "pd-currency";
const SYMBOL: Record<CurrencyCode, string> = {
  eur: "€",
  usd: "$",
  aed: "AED",
};

function isCurrency(v: string | null): v is CurrencyCode {
  return v === "eur" || v === "usd" || v === "aed";
}

// TODO(currency): wire real conversion rates here once a rates provider is
// chosen (likely a daily JSON endpoint cached at the edge). For now we just
// switch the symbol — EUR remains the only authoritative price.
function formatPrice(amount: number, currency: CurrencyCode): string {
  const intl = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  if (currency === "aed") return `${intl.format(amount)} ${SYMBOL.aed}`;
  return `${SYMBOL[currency]}${intl.format(amount)}`;
}

interface ResolvedLine {
  item: CartItem;
  perfume: Perfume;
  unit: number;
  lineTotal: number;
}

function localizedName(perfume: Perfume, locale: string): string {
  if (locale === "es") return perfume.names.es;
  if (locale === "ar") return perfume.names.ar;
  return perfume.names.en;
}

function CloseIcon() {
  return (
    <span aria-hidden="true" className="relative block h-3.5 w-3.5">
      <span className="absolute top-1/2 left-0 block h-px w-full rotate-45 bg-current" />
      <span className="absolute top-1/2 left-0 block h-px w-full -rotate-45 bg-current" />
    </span>
  );
}

function QtyControl({
  value,
  onMinus,
  onPlus,
  decreaseLabel,
  increaseLabel,
}: {
  value: number;
  onMinus: () => void;
  onPlus: () => void;
  decreaseLabel: string;
  increaseLabel: string;
}) {
  return (
    <div className="inline-flex items-center gap-[var(--space-3)] font-mono text-[var(--text-xs)] tabular-nums text-[var(--ink-200)]">
      <button
        type="button"
        aria-label={decreaseLabel}
        onClick={onMinus}
        className="flex h-6 w-6 items-center justify-center text-[var(--ink-300)] hover:text-[var(--gold-100)] transition-colors"
      >
        <span aria-hidden="true">−</span>
      </button>
      <span className="min-w-[1.25rem] text-center">{value}</span>
      <button
        type="button"
        aria-label={increaseLabel}
        onClick={onPlus}
        className="flex h-6 w-6 items-center justify-center text-[var(--ink-300)] hover:text-[var(--gold-100)] transition-colors"
      >
        <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}

function CartLineRow({
  line,
  currency,
  locale,
}: {
  line: ResolvedLine;
  currency: CurrencyCode;
  locale: string;
}) {
  const t = useTranslations("cart");
  const tAtelier = useTranslations("atelier");
  const updateQty = useCart((s) => s.updateQty);
  const removeItem = useCart((s) => s.removeItem);

  const sizeLabel =
    line.item.size === "ml50"
      ? tAtelier("sizes.ml50")
      : tAtelier("sizes.ml100");
  const intensity = line.perfume.intensity;
  const name = localizedName(line.perfume, locale);

  return (
    <li className="relative flex gap-[var(--space-4)] py-[var(--space-4)]">
      <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-[var(--obsidian-300)]">
        <Image
          src={line.perfume.images.bottle_primary}
          alt={name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-[var(--space-2)] pe-6">
        <Text
          as="p"
          variant="body-l"
          italic
          className="truncate text-[var(--ink-100)]"
        >
          {name}
        </Text>
        <Text as="p" variant="small-caps" tone="muted">
          {sizeLabel} · {intensity}
        </Text>

        <div className="mt-auto flex items-center justify-between gap-[var(--space-3)]">
          <QtyControl
            value={line.item.quantity}
            onMinus={() =>
              updateQty(
                line.item.slug,
                line.item.size,
                line.item.quantity - 1,
              )
            }
            onPlus={() =>
              updateQty(
                line.item.slug,
                line.item.size,
                line.item.quantity + 1,
              )
            }
            decreaseLabel={t("item.decrease")}
            increaseLabel={t("item.increase")}
          />
          <span className="font-mono text-[var(--text-xs)] tabular-nums text-[var(--ink-100)]">
            {formatPrice(line.lineTotal, currency)}
          </span>
        </div>
      </div>

      <button
        type="button"
        aria-label={t("item.remove")}
        onClick={() => removeItem(line.item.slug, line.item.size)}
        className="absolute top-[var(--space-4)] end-0 flex h-6 w-6 items-center justify-center text-[var(--ink-400)] hover:text-[var(--accent-rose)] transition-colors"
      >
        <CloseIcon />
      </button>
    </li>
  );
}

function CartEmpty({ onClose }: { onClose: () => void }) {
  const t = useTranslations("cart");
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[var(--space-5)] px-[var(--space-6)] text-center">
      <Text variant="subhead" italic tone="secondary">
        {t("empty.title")}
      </Text>
      <I18nLink
        href="/atelier"
        onClick={onClose}
        className="font-body text-xs font-medium uppercase tracking-[0.16em] text-[var(--gold-200)] hover:text-[var(--gold-100)] transition-colors"
      >
        {t("empty.cta")}
      </I18nLink>
    </div>
  );
}

function CheckoutBlock({
  lines,
  total,
  currency,
  locale,
}: {
  lines: ResolvedLine[];
  total: number;
  currency: CurrencyCode;
  locale: string;
}) {
  const t = useTranslations("cart");
  const [notice, setNotice] = useState<string | null>(null);

  // Single-item flow → direct Stripe Payment Link.
  if (lines.length === 1) {
    const only = lines[0];
    if (!only) return null;

    const onClick = () => {
      const link = getStripeLink(only.item.slug, only.item.size);
      if (!link) {
        setNotice(t("checkout.no_link_yet"));
        return;
      }
      window.open(link, "_blank", "noopener,noreferrer");
    };

    const ready = hasStripeLink(only.item.slug, only.item.size);

    return (
      <div className="flex flex-col gap-[var(--space-3)]">
        <Button
          type="button"
          variant="gold"
          onClick={onClick}
          className="w-full"
        >
          <span>{t("checkout.cta_single")}</span>
        </Button>
        {notice ? (
          <Text variant="small-caps" tone="muted" className="text-center">
            {notice}
          </Text>
        ) : null}
        {!ready ? (
          <Text variant="metadata" tone="dim" className="text-center">
            {t("checkout.no_link_yet")}
          </Text>
        ) : null}
      </div>
    );
  }

  // Multi-item flow → concierge mailto with pre-filled body.
  const subject = t("checkout.mailto_subject");
  const intro = t("checkout.mailto_intro");
  const bodyLines = lines.map((l) => {
    const name = localizedName(l.perfume, locale);
    const size = l.item.size === "ml50" ? "50 ml" : "100 ml";
    return `· ${name} — ${size} × ${l.item.quantity} — ${formatPrice(
      l.lineTotal,
      currency,
    )}`;
  });
  const body = [
    intro,
    "",
    ...bodyLines,
    "",
    `${t("total")}: ${formatPrice(total, currency)}`,
  ].join("\n");

  const href = `mailto:concierge@perfumesdubai.com?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

  return (
    <div className="flex flex-col gap-[var(--space-4)] border border-[var(--ink-500)] p-[var(--space-5)]">
      <Text variant="subhead" italic tone="primary">
        {t("checkout.multi_title")}
      </Text>
      <Text variant="body-s" tone="secondary">
        {t("checkout.multi_body")}
      </Text>
      <a
        href={href}
        className="group inline-flex w-full items-center justify-center gap-3 border border-[var(--gold-200)] px-7 py-4 font-body text-[var(--text-sm)] font-medium tracking-[0.16em] uppercase text-[var(--gold-200)] transition-[color,background] hover:bg-[var(--gold-200)] hover:text-[var(--obsidian-400)]"
      >
        {t("checkout.cta_multi")}
      </a>
    </div>
  );
}

export function CartSheet() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items);

  // Currency from localStorage (symbol-only for now). Lives in local state so
  // we re-render when the value flips from the Footer's switcher.
  const [currency, setCurrency] = useState<CurrencyCode>("eur");

  useEffect(() => {
    const read = () => {
      const saved =
        typeof window !== "undefined"
          ? window.localStorage.getItem(CURRENCY_KEY)
          : null;
      if (isCurrency(saved)) setCurrency(saved);
    };
    read();
    // Re-read each time the drawer opens (cheap and avoids storage event plumbing).
  }, [isOpen]);

  // Body scroll lock + Escape close while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("overflow-hidden");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [isOpen, close]);

  const lines = useMemo<ResolvedLine[]>(() => {
    const out: ResolvedLine[] = [];
    for (const item of items) {
      const perfume = getProductBySlug(item.slug);
      if (!perfume) continue; // Silently drop unknown slugs (catalogue may have changed).
      const unit =
        item.size === "ml50" ? perfume.prices.ml50 : perfume.prices.ml100;
      out.push({
        item,
        perfume,
        unit,
        lineTotal: unit * item.quantity,
      });
    }
    return out;
  }, [items]);

  const totalPieces = lines.reduce((s, l) => s + l.item.quantity, 0);
  const total = lines.reduce((s, l) => s + l.lineTotal, 0);

  const headerCount =
    totalPieces === 1
      ? t("pieces_one", { n: totalPieces })
      : t("pieces_other", { n: totalPieces });

  // Slide direction: in LTR the panel comes from the right; in RTL from the left.
  const closedX = isRtl ? "-100%" : "100%";

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[var(--obsidian-400)]/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          <motion.aside
            key="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-label={t("header")}
            initial={{ x: closedX }}
            animate={{ x: 0 }}
            exit={{ x: closedX }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed top-0 bottom-0 z-[101] flex w-full max-w-[480px] flex-col",
              "bg-[var(--obsidian-100)] text-[var(--ink-100)]",
              "shadow-[0_0_80px_rgba(0,0,0,0.4)]",
              isRtl ? "left-0" : "right-0",
            )}
          >
            {/* Header */}
            <header className="flex items-start justify-between gap-[var(--space-4)] px-[var(--space-6)] pt-[var(--space-6)] pb-[var(--space-4)]">
              <Text
                as="p"
                variant="small-caps"
                tone="secondary"
                className="text-[var(--ink-200)]"
              >
                {t("header")} · {headerCount}
              </Text>
              <button
                type="button"
                aria-label={t("item.remove")}
                onClick={close}
                className="-mr-1 flex h-8 w-8 items-center justify-center text-[var(--ink-200)] hover:text-[var(--gold-100)] transition-colors"
              >
                <CloseIcon />
              </button>
            </header>

            {/* Body */}
            {lines.length === 0 ? (
              <div className="flex-1">
                <CartEmpty onClose={close} />
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-[var(--ink-500)] overflow-y-auto px-[var(--space-6)]">
                  {lines.map((line) => (
                    <CartLineRow
                      key={`${line.item.slug}-${line.item.size}`}
                      line={line}
                      currency={currency}
                      locale={locale}
                    />
                  ))}
                </ul>

                {/* Footer · total + checkout */}
                <div className="border-t border-[var(--ink-500)] px-[var(--space-6)] py-[var(--space-5)]">
                  <div className="mb-[var(--space-5)] flex items-baseline justify-between">
                    <Text variant="small-caps" tone="muted">
                      {t("total")}
                    </Text>
                    <span className="flex items-baseline gap-[var(--space-2)]">
                      <Text as="span" variant="headline" italic>
                        {formatPrice(total, currency)}
                      </Text>
                      {currency !== "aed" ? (
                        <Text as="span" variant="small-caps" tone="muted">
                          {currency.toUpperCase()}
                        </Text>
                      ) : null}
                    </span>
                  </div>
                  <CheckoutBlock
                    lines={lines}
                    total={total}
                    currency={currency}
                    locale={locale}
                  />
                </div>
              </>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
