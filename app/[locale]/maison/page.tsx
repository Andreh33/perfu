import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { Chapter, type ChapterRoman, type ChapterSlug } from "@/components/maison/Chapter";
import { ChapterDivider } from "@/components/maison/ChapterDivider";

type LocaleParams = { locale: string };

const CHAPTERS: ReadonlyArray<{ roman: ChapterRoman; slug: ChapterSlug }> = [
  { roman: "I", slug: "recolte" },
  { roman: "II", slug: "alambic" },
  { roman: "III", slug: "maceration" },
  { roman: "IV", slug: "flacon" },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "maison" });
  return {
    title: `${t("title")} · Perfumes Dubai`,
    description: t("intro_paragraph_1"),
  };
}

export default async function MaisonPage({
  params,
}: {
  params: Promise<LocaleParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "maison" });

  return (
    <>
      {/* HERO · editorial introduction */}
      <Section spacing="cinematic">
        <Container width="wide">
          <div className="flex flex-col gap-[var(--space-6)]">
            <Text variant="small-caps" tone="gold" className="block">
              {t("eyebrow")} · {t("eyebrow_section")}
            </Text>

            <Text
              as="h1"
              variant="display-xl"
              italic
              className="display-tight max-w-[18ch] text-[clamp(3.5rem,9vw,9rem)]"
            >
              {t("title")}
            </Text>

            <div className="mt-[var(--space-5)] grid grid-cols-1 gap-[var(--space-6)] lg:grid-cols-12">
              <div className="lg:col-span-4" aria-hidden="true" />
              <div className="lg:col-span-8">
                <p className="drop-cap editorial-body font-body text-[var(--text-md)] leading-[1.7] text-[var(--ink-200)] mb-[var(--space-6)]">
                  {t("intro_paragraph_1")}
                </p>
                <p className="editorial-body font-body text-[var(--text-md)] leading-[1.7] text-[var(--ink-300)]">
                  {t("intro_paragraph_2")}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CHAPTERS · I — IV */}
      <Section spacing="spacious">
        <Container width="wide">
          {CHAPTERS.map((chapter, idx) => (
            <div key={chapter.slug}>
              <Chapter
                roman={chapter.roman}
                slug={chapter.slug}
                locale={locale}
                priority={idx === 0}
              />
              {idx < CHAPTERS.length - 1 ? <ChapterDivider /> : null}
            </div>
          ))}
        </Container>
      </Section>
    </>
  );
}
