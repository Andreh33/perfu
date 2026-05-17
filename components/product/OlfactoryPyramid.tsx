"use client";
// Client component: expandable note pills using motion's AnimatePresence,
// plus a viewport-triggered bloom animation per block. Both effects need
// state and ref measurements, so the whole pyramid lives on the client.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { NoteGlyph } from "@/components/atelier/NoteGlyph";
import { Text } from "@/components/ui/Text";
import { getNoteIcon } from "@/lib/notes";
import { FAMILIES, type Family } from "@/lib/families";
import type { Note, Perfume } from "@/lib/products";
import { cn } from "@/lib/cn";

interface OlfactoryPyramidProps {
  product: Perfume;
  locale: "es" | "en" | "ar";
}

type Tier = "top" | "heart" | "base";

const TIERS: ReadonlyArray<Tier> = ["top", "heart", "base"];

const tierGradientFor = (family: Family): Record<Tier, string> => {
  const accent = FAMILIES[family].accent;
  return {
    top: `linear-gradient(180deg, ${accent}1a 0%, transparent 100%)`,
    heart: `linear-gradient(180deg, ${accent}26 0%, ${accent}0d 100%)`,
    base: `linear-gradient(180deg, ${accent}33 0%, ${accent}14 100%)`,
  };
};

export function OlfactoryPyramid({ product, locale }: OlfactoryPyramidProps) {
  const t = useTranslations("product.sections");
  const headerKey: Record<Tier, string> = {
    top: t("pyramid_top"),
    heart: t("pyramid_heart"),
    base: t("pyramid_base"),
  };

  const blockBg = tierGradientFor(product.family);

  return (
    <div className="grid grid-cols-1 gap-[var(--space-5)] lg:grid-cols-3">
      {TIERS.map((tier, idx) => {
        const notes = product.notes[tier];
        return (
          <PyramidBlock
            key={tier}
            tier={tier}
            heading={headerKey[tier]}
            notes={notes}
            locale={locale}
            background={blockBg[tier]}
            order={idx}
          />
        );
      })}
    </div>
  );
}

interface PyramidBlockProps {
  tier: Tier;
  heading: string;
  notes: ReadonlyArray<Note>;
  locale: "es" | "en" | "ar";
  background: string;
  order: number;
}

function PyramidBlock({
  tier,
  heading,
  notes,
  locale,
  background,
  order,
}: PyramidBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reducedMotion]);

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={
        visible
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.95 }
      }
      transition={{
        duration: 0.85,
        delay: reducedMotion ? 0 : order * 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "relative flex flex-col gap-[var(--space-4)] p-[var(--space-6)]",
        "border border-[var(--ink-500)] bg-[var(--obsidian-200)]",
      )}
      style={{ backgroundImage: background }}
      data-pyramid-block={tier}
    >
      <Text variant="small-caps" tone="gold">
        {heading}
      </Text>

      <div className="flex flex-col gap-2">
        {notes.map((n) => {
          const noteName =
            locale === "es"
              ? n.name_es
              : locale === "ar"
                ? n.name_ar
                : n.name_en;
          const description = getNoteIcon(n.icon).description[locale];
          const isOpen = active === n.icon;
          return (
            <div key={n.icon} className="flex flex-col">
              <button
                type="button"
                onClick={() => setActive(isOpen ? null : n.icon)}
                aria-expanded={isOpen}
                className={cn(
                  "group flex items-center justify-between gap-3 border border-transparent px-[var(--space-3)] py-2",
                  "text-left transition-colors duration-[var(--duration-quick)]",
                  isOpen
                    ? "border-[var(--gold-200)] bg-[var(--obsidian-300)] text-[var(--gold-100)]"
                    : "text-[var(--ink-200)] hover:border-[var(--ink-400)] hover:text-[var(--gold-100)]",
                )}
              >
                <span className="flex items-center gap-3">
                  <NoteGlyph name={n.icon} size={22} />
                  <span className="font-body text-[var(--text-sm)]">{noteName}</span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "small-caps text-[var(--text-xs)] tracking-[0.16em] transition-transform",
                    isOpen
                      ? "text-[var(--gold-200)]"
                      : "text-[var(--ink-400)]",
                  )}
                >
                  {isOpen ? "—" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="desc"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-[var(--space-3)] py-[var(--space-3)] text-[var(--text-xs)] leading-[1.6] text-[var(--ink-300)] italic">
                      {description}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default OlfactoryPyramid;
