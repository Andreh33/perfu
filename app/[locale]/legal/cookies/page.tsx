import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

type LocaleParams = { locale: string };

const SECTIONS = ["s1", "s2", "s3", "s4"] as const;

export default async function CookiesPage({
  params,
}: {
  params: Promise<LocaleParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "legal" });

  return (
    <Section spacing="cinematic">
      <Container width="narrow">
        <div className="flex flex-col gap-[var(--space-7)]">
          <header className="flex flex-col gap-[var(--space-4)] border-b border-[var(--ink-500)] pb-[var(--space-6)]">
            <Text variant="small-caps" tone="gold">
              LEGAL
            </Text>
            <Text as="h1" variant="display-l" italic className="display-tight">
              {t("cookies.title")}
            </Text>
            <Text variant="metadata" tone="dim">
              {t("last_updated")}
            </Text>
          </header>

          <Text variant="body-l" tone="secondary" className="max-w-[60ch]">
            {t("cookies.intro")}
          </Text>

          <div className="flex flex-col gap-[var(--space-7)]">
            {SECTIONS.map((s) => (
              <article key={s} className="flex flex-col gap-[var(--space-3)]">
                <Text
                  as="h2"
                  variant="subhead"
                  italic
                  className="text-[var(--ink-100)]"
                >
                  {t(`cookies.sections.${s}_title`)}
                </Text>
                <Text variant="body" tone="muted" className="max-w-[60ch]">
                  {t(`cookies.sections.${s}_body`)}
                </Text>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
