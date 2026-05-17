import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { Link as I18nLink } from "@/i18n/navigation";
import { BoutiqueMap } from "@/components/boutique/BoutiqueMap";

type LocaleParams = { locale: string };

const WHAT_KEYS = ["consultation", "discovery", "journey", "samples"] as const;

export default async function BoutiquePage({
  params,
}: {
  params: Promise<LocaleParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "boutique" });
  const tFooter = await getTranslations({
    locale,
    namespace: "footer.boutique",
  });

  return (
    <>
      <Section spacing="cinematic">
        <Container>
          <div className="flex flex-col gap-[var(--space-5)]">
            <Text variant="small-caps" tone="gold">
              MMXXVI · BOUTIQUE
            </Text>
            <Text
              as="h1"
              variant="display-xl"
              italic
              className="display-tight"
            >
              {t("title")}
            </Text>
            <Text variant="subhead" tone="secondary" italic className="max-w-[36ch]">
              {t("subtitle")}
            </Text>
            <Text variant="body-l" tone="muted" className="max-w-[58ch]">
              {t("intro")}
            </Text>
          </div>
        </Container>
      </Section>

      <Section spacing="spacious" tone="elevated">
        <Container width="wide">
          <div className="grid gap-[var(--space-7)] lg:grid-cols-[1.4fr_1fr] lg:gap-[var(--space-9)] lg:items-start">
            <BoutiqueMap
              cityWalkLabel={tFooter("city_walk")}
              caption={t("map_caption")}
            />
            <div className="flex flex-col gap-[var(--space-5)]">
              <InfoRow label={t("address_label")} value={t("address")} />
              <InfoRow label={t("hours_label")} value={t("hours")} />
              <InfoRow
                label={t("phone_label")}
                value={t("phone")}
                href={`tel:${t("phone").replace(/[\s+]/g, "")}`}
              />
              <InfoRow
                label={t("email_label")}
                value={t("email")}
                href={`mailto:${t("email")}`}
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="default">
        <Container width="wide">
          <div className="flex flex-col gap-[var(--space-6)]">
            <Text variant="small-caps" tone="gold">
              {t("what_title")}
            </Text>
            <div className="grid gap-[var(--space-5)] md:grid-cols-2 md:gap-[var(--space-7)]">
              {WHAT_KEYS.map((key) => (
                <article
                  key={key}
                  className="flex flex-col gap-[var(--space-3)] border-t border-[var(--ink-500)] pt-[var(--space-5)]"
                >
                  <Text variant="metadata" tone="gold">
                    {t(`what.${key}.title`)}
                  </Text>
                  <Text variant="body-l" tone="muted">
                    {t(`what.${key}.body`)}
                  </Text>
                </article>
              ))}
            </div>
            <div className="pt-[var(--space-6)]">
              <I18nLink
                href="/concierge?from=boutique"
                className="group inline-flex items-center gap-[var(--space-3)] font-body text-[var(--text-sm)] uppercase tracking-[0.18em] text-[var(--gold-200)] hover:text-[var(--gold-100)] transition-colors duration-[var(--duration-quick)]"
              >
                <span className="relative">
                  {t("cta")}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)] group-hover:scale-x-100"
                  />
                </span>
              </I18nLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  href?: string;
}

function InfoRow({ label, value, href }: InfoRowProps) {
  return (
    <div className="flex flex-col gap-[var(--space-2)] border-t border-[var(--ink-500)] pt-[var(--space-4)]">
      <Text variant="small-caps" tone="dim">
        {label}
      </Text>
      {href ? (
        <a
          href={href}
          className="font-body text-[var(--text-md)] text-[var(--ink-100)] hover:text-[var(--gold-100)] transition-colors duration-[var(--duration-quick)]"
        >
          {value}
        </a>
      ) : (
        <p className="font-body text-[var(--text-md)] text-[var(--ink-100)]">
          {value}
        </p>
      )}
    </div>
  );
}
