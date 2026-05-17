import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { buildRouteMetadata } from "@/lib/seo/page-metadata";

type LocaleParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  return buildRouteMetadata({
    locale,
    title: tMeta("journal_title"),
    description: tMeta("journal_description"),
    path: "/journal",
    ogSubtitle: tMeta("journal_description"),
  });
}

export default async function JournalPage({
  params,
}: {
  params: Promise<LocaleParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "journal" });
  const tNews = await getTranslations({
    locale,
    namespace: "footer.newsletter",
  });

  return (
    <Section spacing="cinematic">
      <Container width="wide">
        <div className="grid gap-[var(--space-8)] lg:grid-cols-[1.4fr_0.6fr] lg:items-end lg:gap-[var(--space-10)]">
          <div className="flex flex-col gap-[var(--space-6)]">
            <Text variant="small-caps" tone="gold">
              MMXXVI · COMING SOON
            </Text>
            <Text
              as="h1"
              variant="display-xxl"
              italic
              className="display-tight max-w-[16ch]"
            >
              {t("title")}
            </Text>
            <div className="relative flex flex-col gap-[var(--space-4)] max-w-[58ch]">
              <Text variant="body-l" tone="secondary">
                {t("body_1")}
              </Text>
              <Text variant="body-l" tone="muted">
                {t("body_2")}
              </Text>
            </div>

            <div className="relative mt-[var(--space-5)] h-px w-full max-w-[420px] overflow-hidden">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 block h-full bg-[var(--gold-200)]"
                style={{
                  width: "100%",
                  animation:
                    "stroke-draw 1.8s var(--ease-soft-expo) forwards",
                  transform: "scaleX(0)",
                  transformOrigin: "left center",
                }}
              />
              <style>{`
                @keyframes journal-line {
                  to { transform: scaleX(1); }
                }
              `}</style>
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 block h-full w-full origin-left bg-[var(--gold-200)]"
                style={{
                  animation: "journal-line 1.6s var(--ease-soft-expo) forwards",
                  transform: "scaleX(0)",
                }}
              />
            </div>

            <div className="mt-[var(--space-6)] flex flex-col gap-[var(--space-3)]">
              <Text variant="small-caps" tone="dim">
                {t("newsletter_cta")}
              </Text>
              <NewsletterForm
                placeholder={tNews("placeholder")}
                submitLabel={tNews("submit_label")}
                successLabel={tNews("success")}
                errorLabel={tNews("error")}
              />
            </div>
          </div>

          {/* Arabic decorative aside — always visible, not translated */}
          <aside
            aria-hidden="true"
            className="hidden lg:flex lg:flex-col lg:items-end lg:justify-end lg:gap-[var(--space-3)]"
          >
            <p
              className="font-arabic-display text-[var(--text-5xl)] italic leading-[1.1] text-[var(--gold-100)]"
              dir="rtl"
              lang="ar"
            >
              {t("arabic_aside")}
            </p>
            <span className="block h-px w-[120px] bg-[var(--gold-200)] opacity-50" />
          </aside>
        </div>
      </Container>
    </Section>
  );
}
