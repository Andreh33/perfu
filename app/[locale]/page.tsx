import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { Link } from "@/components/ui/Link";

type LocaleParams = { locale: string };

export default async function HomePage({
  params,
}: {
  params: Promise<LocaleParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");

  return (
    <Section spacing="cinematic">
      <Container>
        <div className="flex flex-col gap-[var(--space-7)]">
          <Text variant="small-caps" tone="gold">
            {t("hero.eyebrow")}
          </Text>
          <Text
            as="h1"
            variant="display-l"
            className="max-w-[18ch] display-tight"
            italic
          >
            {t("hero.title")}
          </Text>
          <Text variant="body-l" tone="muted" className="max-w-[44ch]">
            {t("hero.subtitle")}
          </Text>
          <div>
            <Link href="/styleguide">{t("links.styleguide")}</Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
