// Editorial pull quote — large italic display centred between sections.
// Reveal-on-scroll wrapper from Reveal component.

import { getTranslations } from "next-intl/server";
import { Reveal } from "./Reveal";

interface Props {
  locale: string;
}

export async function PullQuoteSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "home.pull_quote" });

  return (
    <section className="relative w-full py-[var(--space-11)] md:py-[var(--space-12)] px-[var(--space-6)]">
      <div className="mx-auto max-w-[1080px]">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span
              aria-hidden
              className="font-display italic block mb-[var(--space-6)]"
              style={{
                fontSize: "clamp(4rem, 8vw, 7rem)",
                color: "rgba(212, 175, 55, 0.4)",
                lineHeight: 0.5,
                fontWeight: 300,
              }}
            >
              &ldquo;
            </span>
            <blockquote
              className="font-display italic text-[#f4e4bc]"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.75rem)",
                letterSpacing: "-0.015em",
                lineHeight: 1.3,
                fontWeight: 300,
                textWrap: "balance",
                maxWidth: "32ch",
              }}
            >
              {t("quote")}
            </blockquote>
            <div
              aria-hidden
              className="my-[var(--space-7)] h-px w-16"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(212, 175, 55, 0.7), transparent)",
              }}
            />
            <p
              className="font-body uppercase"
              style={{
                fontSize: "11px",
                letterSpacing: "0.45em",
                color: "rgba(244, 228, 188, 0.5)",
                textIndent: "0.45em",
              }}
            >
              {t("attribution")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
