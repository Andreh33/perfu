// Server component. All interactivity lives in child clients
// (NewsletterForm, CurrencySwitcher).

import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { Link as I18nLink } from "@/i18n/navigation";
import { NewsletterForm } from "./NewsletterForm";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { DubaiSkyline } from "./DubaiSkyline";

interface FooterProps {
  locale: string;
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tCurrency = await getTranslations({ locale, namespace: "currency" });

  const isRtl = locale === "ar";
  const wordmark = isRtl ? "عطور دبي" : "PERFUMES DUBAI";

  const columns = [
    {
      key: "maison",
      title: t("columns.maison.title"),
      links: [
        { label: t("columns.maison.history"), href: "/maison" },
        { label: t("columns.maison.perfumer"), href: "/perfumeur" },
        { label: t("columns.maison.press"), href: "/maison#press" },
        { label: t("columns.maison.awards"), href: "/maison#awards" },
      ],
    },
    {
      key: "atelier",
      title: t("columns.atelier.title"),
      links: [
        { label: t("columns.atelier.catalogue"), href: "/atelier" },
        { label: t("columns.atelier.bestsellers"), href: "/atelier?tag=bestseller" },
        { label: t("columns.atelier.new"), href: "/atelier?tag=new" },
        { label: t("columns.atelier.bespoke"), href: "/bespoke" },
      ],
    },
    {
      key: "legal",
      title: t("columns.legal.title"),
      links: [
        { label: t("columns.legal.privacy"), href: "/legal/privacy" },
        { label: t("columns.legal.terms"), href: "/legal/terms" },
        { label: t("columns.legal.cookies"), href: "/legal/cookies" },
        { label: t("columns.legal.imprint"), href: "/legal/imprint" },
      ],
    },
  ] as const;

  return (
    <footer className="relative">
      <Section
        spacing="cinematic"
        tone="void"
        className="border-t border-[var(--ink-500)]/40"
      >
        <Container width="wide">
        <div className="flex flex-col gap-[var(--space-10)]">
          {/* ─────────── BLOCK 1 · NEWSLETTER ─────────── */}
          <div className="grid gap-[var(--space-6)] lg:grid-cols-[1.1fr_1fr] lg:gap-[var(--space-8)]">
            <div className="flex flex-col gap-[var(--space-4)]">
              <Text
                as="h2"
                variant="display-l"
                italic
                className="display-tight"
              >
                {t("newsletter.title")}
              </Text>
              <Text
                variant="body-l"
                tone="muted"
                className="max-w-[44ch]"
              >
                {t("newsletter.sub")}
              </Text>
            </div>
            <div className="flex items-end">
              <NewsletterForm
                placeholder={t("newsletter.placeholder")}
                submitLabel={t("newsletter.submit_label")}
                successLabel={t("newsletter.success")}
                errorLabel={t("newsletter.error")}
              />
            </div>
          </div>

          {/* ─────────── BLOCK 2 · LINKS + CONTACT ─────────── */}
          <div className="grid gap-[var(--space-6)] md:grid-cols-2 lg:grid-cols-4 lg:gap-[var(--space-7)]">
            {columns.map((col) => (
              <div key={col.key} className="flex flex-col gap-[var(--space-4)]">
                <Text variant="small-caps" tone="gold">
                  {col.title}
                </Text>
                <ul className="flex flex-col gap-[var(--space-3)]">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <I18nLink
                        href={link.href}
                        className="group relative inline-flex font-body text-xs font-medium uppercase tracking-[0.12em] text-[var(--ink-200)] hover:text-[var(--ink-100)] transition-colors duration-[var(--duration-quick)]"
                      >
                        <span className="relative">
                          {link.label}
                          <span
                            aria-hidden="true"
                            className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--gold-100)] transition-transform duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)] group-hover:scale-x-100"
                          />
                        </span>
                      </I18nLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* CONTACT — mailto / tel / anchor */}
            <div className="flex flex-col gap-[var(--space-4)]">
              <Text variant="small-caps" tone="gold">
                {t("columns.contact.title")}
              </Text>
              <ul className="flex flex-col gap-[var(--space-3)]">
                <li>
                  <a
                    href={`mailto:${t("columns.contact.email")}`}
                    className="font-body text-xs font-medium uppercase tracking-[0.12em] text-[var(--ink-200)] hover:text-[var(--ink-100)] transition-colors duration-[var(--duration-quick)]"
                  >
                    {t("columns.contact.email")}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${t("columns.contact.whatsapp").replace(/\s/g, "")}`}
                    className="font-body text-xs font-medium uppercase tracking-[0.12em] text-[var(--ink-200)] hover:text-[var(--ink-100)] transition-colors duration-[var(--duration-quick)]"
                  >
                    {t("columns.contact.whatsapp")}
                  </a>
                </li>
                <li>
                  <I18nLink
                    href="/boutique"
                    className="font-body text-xs font-medium uppercase tracking-[0.12em] text-[var(--ink-200)] hover:text-[var(--ink-100)] transition-colors duration-[var(--duration-quick)]"
                  >
                    {t("columns.contact.boutique")}
                  </I18nLink>
                </li>
                <li className="font-body text-xs font-medium uppercase tracking-[0.12em] text-[var(--ink-300)]">
                  {t("columns.contact.hours")}
                </li>
              </ul>
            </div>
          </div>

          {/* ─────────── BLOCK 3 · BOUTIQUE ─────────── */}
          <div className="flex flex-col gap-[var(--space-5)]">
            <div className="grid gap-[var(--space-6)] lg:grid-cols-[2fr_1fr] lg:gap-[var(--space-8)] lg:items-end">
              <DubaiSkyline cityWalkLabel={t("boutique.city_walk")} />
              <div className="flex flex-col gap-[var(--space-3)]">
                <Text variant="small-caps" tone="gold">
                  {t("boutique.label")}
                </Text>
                <Text
                  as="p"
                  variant="body-l"
                  className="text-[var(--ink-100)] max-w-[36ch]"
                >
                  {t("boutique.address")}
                </Text>
                <Text variant="small-caps" tone="muted">
                  {t("boutique.hours")}
                </Text>
                <div className="mt-[var(--space-3)]">
                  <I18nLink
                    href="/boutique"
                    className="group inline-flex font-body text-xs font-medium uppercase tracking-[0.16em] text-[var(--gold-200)] hover:text-[var(--gold-100)] transition-colors duration-[var(--duration-quick)]"
                  >
                    <span className="relative">
                      {t("boutique.cta_visit")}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)] group-hover:scale-x-100"
                      />
                    </span>
                  </I18nLink>
                </div>
              </div>
            </div>
            <div className="h-px w-full bg-[var(--gold-200)] opacity-30" />
          </div>

          {/* ─────────── CLOSE · WORDMARK + BOTTOM ─────────── */}
          <div className="flex flex-col gap-[var(--space-6)]">
            <div className="relative w-full" aria-hidden="true">
              <svg
                viewBox="0 0 1600 240"
                width="100%"
                height="auto"
                preserveAspectRatio="xMidYMid meet"
                className="block text-[var(--ink-400)]"
              >
                <text
                  x="50%"
                  y="62%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{
                    fontFamily: isRtl
                      ? 'var(--font-arabic-display, "Geeza Pro", serif)'
                      : 'var(--font-display, Georgia, serif)',
                    fontSize: "180px",
                    fontStyle: "italic",
                    letterSpacing: isRtl ? "0" : "-0.02em",
                  }}
                >
                  {wordmark}
                </text>
              </svg>
              <span className="sr-only">{wordmark}</span>
            </div>

            <div className="h-px w-full bg-[var(--ink-500)]" />

            <div className="flex flex-col items-start justify-between gap-[var(--space-4)] md:flex-row md:items-center">
              <Text variant="metadata" tone="dim">
                {t("bottom.copyright")}
              </Text>
              <div className="flex items-center gap-[var(--space-5)]">
                <Text variant="small-caps" tone="dim" as="span">
                  {tCurrency("label")}
                </Text>
                <CurrencySwitcher
                  label={tCurrency("label")}
                  labels={{
                    eur: tCurrency("eur"),
                    usd: tCurrency("usd"),
                    aed: tCurrency("aed"),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        </Container>
      </Section>
    </footer>
  );
}
