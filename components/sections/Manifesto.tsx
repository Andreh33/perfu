// Manifesto — a centred editorial sequence of four phrases with a hand-
// drawn drop motif in the middle. Replaces the prior 500vh pinned timeline:
// the pinned approach was reading as dead-air on long monitors and the GSAP
// pin+sticky interaction was clipping word-mask animations mid-state. A
// simple stacked composition with generous vertical rhythm gives the same
// editorial pause without the empty viewports.
//
// Server Component — no client JS required. Each phrase appears on enter
// via CSS scroll-driven animation (animation-timeline: view()), with a JS
// IntersectionObserver fallback baked into the Manifesto.client component
// for browsers that do not yet support scroll-driven animations.

import { getTranslations } from "next-intl/server";
import { ManifestoReveal } from "./Manifesto.client";

interface ManifestoProps {
  locale: string;
}

export async function Manifesto({ locale }: ManifestoProps) {
  const t = await getTranslations({ locale, namespace: "manifesto" });

  return (
    <section
      id="manifesto"
      className="relative w-full overflow-hidden py-[var(--space-11)] md:py-[var(--space-12)]"
    >
      <div className="mx-auto flex flex-col items-center gap-[var(--space-11)] md:gap-[var(--space-12)] px-[var(--space-6)] text-center">
        <ManifestoReveal>
          <h2 className="font-display italic text-[var(--ink-100)] text-[clamp(2.25rem,5.5vw,5rem)] leading-[1.02] tracking-[-0.025em] max-w-[18ch]">
            {t("phrases.p1")}
          </h2>
        </ManifestoReveal>

        <ManifestoReveal>
          <h2 className="font-display italic text-[var(--ink-100)] text-[clamp(2.25rem,5.5vw,5rem)] leading-[1.02] tracking-[-0.025em] max-w-[18ch]">
            {t("phrases.p2_a")}{" "}
            <span className="text-[var(--gold-200)]">{t("phrases.p2_b")}</span>
          </h2>
        </ManifestoReveal>

        <ManifestoReveal>
          <div className="flex flex-col items-center gap-[var(--space-7)]">
            {/* Hand-drawn SVG drop — pure paint, no canvas, no rAF. */}
            <svg
              width="80"
              height="120"
              viewBox="0 0 80 120"
              fill="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="manifesto-drop" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#d4b677" />
                  <stop offset="100%" stopColor="#8e6e3f" />
                </linearGradient>
              </defs>
              <path
                d="M40 8 C 18 50, 12 70, 12 80 a 28 28 0 0 0 56 0 C 68 70, 62 50, 40 8 Z"
                fill="url(#manifesto-drop)"
              />
              {/* Subtle highlight rim */}
              <path
                d="M30 78 Q 22 70 26 60"
                stroke="rgba(245, 241, 232, 0.4)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <p
              className="font-body uppercase text-[var(--gold-200)] text-[var(--text-sm)] max-w-[36ch]"
              style={{ letterSpacing: "0.32em" }}
            >
              {t("phrases.p3")}
            </p>
          </div>
        </ManifestoReveal>

        <ManifestoReveal>
          <h2 className="font-display italic text-[var(--ink-100)] text-[clamp(2.25rem,5.5vw,5rem)] leading-[1.02] tracking-[-0.025em] max-w-[24ch]">
            {t("phrases.p4")}
          </h2>
        </ManifestoReveal>
      </div>
    </section>
  );
}
