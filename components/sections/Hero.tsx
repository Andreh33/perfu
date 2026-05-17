// Server Component: composes the Hero markup with translated copy and hands
// the WebGL + entrance choreography off to <HeroClient>. The textual overlay
// is rendered server-side so it is fully visible without JS (degrades to a
// gracefully styled hero), then the client wrapper layers the canvas behind
// and animates the type forward.

import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { Text } from "@/components/ui/Text";
import { HeroClient } from "./Hero.client";

interface HeroProps {
  locale: string;
}

// Wrap each word in a masked span so the client entrance can stagger them.
// Mirrors the technique used by Manifesto.client (split-by-word reveal).
// Each word lives inside an overflow-hidden mask wrapper so the entrance can
// translate the inner span up from below. The trailing space is included
// INSIDE the inner span (followed by a non-breaking space for the visual gap)
// because plain whitespace nodes between adjacent inline-block siblings
// collapse in some layouts.
function splitWords(text: string): ReactNode[] {
  const words = text.split(/\s+/).filter(Boolean);
  return words.map((word, i) => {
    const trailing = i < words.length - 1 ? " " : "";
    return (
      <span
        key={`${word}-${i}`}
        className="word inline-block overflow-hidden align-baseline"
      >
        <span className="word-inner inline-block will-change-transform">
          {word}
          {trailing}
        </span>
      </span>
    );
  });
}

// Hero fallback. The image is a tiny placeholder shipped under /public; an
// upstream task should replace it with editorial photography.
// Suggested Unsplash queries to source the real asset:
//   "dubai desert dusk gold smoke fragrance bottle dark"
//   "amber gold oil ink dark moody"
const FALLBACK_SRC = "/hero-fallback.jpg";

export async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: "home.hero" });

  const line1 = t("title_line1");
  const line2 = t("title_line2");
  const isRtl = locale === "ar";

  return (
    <section
      id="hero"
      data-section="hero"
      className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-[var(--obsidian-400)]"
    >
      {/* Decorative fallback. The h1 below already conveys the section
          meaning to assistive tech; the image is purely atmospheric. An
          empty alt is the correct WCAG signal for a decorative image. */}
      <HeroClient fallbackSrc={FALLBACK_SRC} fallbackAlt="">
        {/* z-1 — grain overlay (mix-blend overlay over the canvas). */}
        {/* z-1 — extra atmospheric gold haze drawn over the canvas to push
            warmth + depth. Adds an upper-left ambient glow (as if a window
            cast warm light onto the smoke) and a darker lower-right zone.
            Cheaper than another shader pass and reads beautifully on dpr 1. */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 20% 25%, rgba(212, 182, 119, 0.12) 0%, transparent 55%), " +
              "radial-gradient(ellipse 50% 55% at 80% 85%, rgba(0, 0, 0, 0.35) 0%, transparent 60%)",
            mixBlendMode: "screen",
          }}
        />

        {/* z-2 — cinematic edge vignette. Heavier corners so the eye lands
            on the text. Replaces the prior radial — softer in centre, much
            stronger at edges (filmic). */}
        <div
          aria-hidden
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 110% 90% at 50% 55%, transparent 45%, rgba(0,0,0,0.55) 90%, rgba(0,0,0,0.8) 100%)",
          }}
        />

        {/* z-2.5 — soft gold edge bloom at the very top to suggest a slim
            light line. Sits under the text. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 z-[2] pointer-events-none h-[180px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(184, 147, 90, 0.08) 0%, transparent 100%)",
          }}
        />

        {/* z-3 — textual overlay. Aligned to the start edge with the
            cinematic outer margin. RTL flips automatically because we use
            logical paddings. */}
        <div
          className="relative z-[3] flex h-full w-full items-center"
          style={{
            paddingInlineStart: "var(--space-10)",
            paddingInlineEnd: "var(--space-6)",
            paddingBlock: "var(--space-7)",
          }}
        >
          <div className="flex flex-col gap-[var(--space-5)] max-w-[640px]">
            <Text
              as="span"
              variant="small-caps"
              tone="gold"
              data-hero-eyebrow
              className="text-[var(--text-xs)] whitespace-nowrap"
              style={{ willChange: "clip-path", letterSpacing: "0.18em" }}
            >
              {t("eyebrow")}
            </Text>

            <h1
              className="font-display text-[clamp(2.25rem,5.5vw,5.5rem)] leading-[0.95] tracking-[-0.03em] text-[var(--ink-100)]"
              style={{ textWrap: "balance" }}
            >
              <span
                className="block"
                data-hero-line="1"
                aria-label={line1.replace(/\s+\/$/, "")}
              >
                {splitWords(line1)}
              </span>
              <span className="block" data-hero-line="2">
                {splitWords(line2)}
                <span
                  aria-hidden
                  className="inline-block align-super text-[0.4em] text-[var(--gold-200)]"
                  style={{ marginInlineStart: "0.08em" }}
                >
                  ·
                </span>
              </span>
            </h1>

            <Text
              as="p"
              tone="muted"
              italic
              data-hero-subtitle
              className="max-w-[40ch] font-display text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.4]"
            >
              {t("subtitle")}
            </Text>

            <div data-hero-cta className="mt-[var(--space-3)]">
              <Link
                href={`/${locale}/atelier`}
                className="group relative inline-flex items-center gap-[var(--space-3)] font-body uppercase tracking-[0.22em] text-[var(--text-sm)] text-[var(--gold-200)] hover:text-[var(--gold-100)] transition-colors duration-[var(--duration-quick)]"
              >
                <span className="relative">
                  {t("cta").replace(/[→←]\s*$/, "").trim()}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)] group-hover:scale-x-100"
                  />
                </span>
                <span aria-hidden className="hero-arrow">
                  {isRtl ? "←" : "→"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </HeroClient>

      {/* Keyframes are declared inline so the Hero section is self-contained
          and does not require a globals.css edit just for one animation. */}
      {/* hero-arrow-bounce keyframes (LTR + RTL) live in app/globals.css */}
    </section>
  );
}
