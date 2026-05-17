import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import {
  PerfumerBlock,
  type PerfumerBlockData,
} from "@/components/perfumeur/PerfumerBlock";
import { buildRouteMetadata } from "@/lib/seo/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  return buildRouteMetadata({
    locale,
    title: tMeta("perfumeur_title"),
    description: tMeta("perfumeur_description"),
    path: "/perfumeur",
    ogSubtitle: tMeta("perfumeur_description"),
  });
}

// Fallback dataset, used until B4 (`lib/perfumers.ts`) lands in main. The
// images are sourced from Unsplash via documented queries:
//   - vasseur  → "portrait dark moody parisian artisan"
//   - elkhoury → "middle eastern woman artisan studio dim"
//   - belaid   → "moroccan craftsman portrait sepia"
// The shape mirrors what the canonical `lib/perfumers.ts` is expected to
// expose (`slug`, `name`, `country`, `bio`, `works`, `photo`), so the swap
// will be a one-import change.

const FEATURED = ["vasseur", "elkhoury", "belaid"] as const;
type FeaturedKey = (typeof FEATURED)[number];

const PHOTOS: Record<FeaturedKey, { src: string; credit: string }> = {
  vasseur: {
    // Unsplash query: "portrait dark moody parisian artisan"
    src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1200&q=80",
    credit: "Photographed by Ben Parker · Unsplash",
  },
  elkhoury: {
    // Unsplash query: "middle eastern woman artisan studio dim"
    src: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=80",
    credit: "Photographed by Houcine Ncib · Unsplash",
  },
  belaid: {
    // Unsplash query: "moroccan craftsman portrait sepia"
    src: "https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?auto=format&fit=crop&w=1200&q=80",
    credit: "Photographed by Adli Wahid · Unsplash",
  },
};

const WORKS: Record<FeaturedKey, ReadonlyArray<{ slug: string }>> = {
  vasseur: [
    { slug: "nuit-de-septembre" },
    { slug: "ombre-salee" },
  ],
  elkhoury: [{ slug: "hamra-dimanche" }, { slug: "cedre-de-shouf" }],
  belaid: [{ slug: "tariqa" }, { slug: "fumeroir" }],
};

type LocaleParams = { locale: string };

export default async function PerfumeurPage({
  params,
}: {
  params: Promise<LocaleParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "perfumeur" });

  const blocks: ReadonlyArray<PerfumerBlockData> = FEATURED.map((key) => {
    const base = `perfumers.${key}` as const;
    const bio: ReadonlyArray<string> = [
      t(`${base}.bio_1`),
      t(`${base}.bio_2`),
      t(`${base}.bio_3`),
    ];
    const works = WORKS[key].map((w, i) => ({
      slug: w.slug,
      name: i === 0 ? t(`${base}.works.first`) : t(`${base}.works.second`),
    }));
    return {
      slug: key,
      name: t(`${base}.name`),
      country: t(`${base}.country`),
      roman: t(`${base}.roman`),
      label: t("label"),
      bio,
      works,
      worksLabel: t("works_label"),
      photo: {
        src: PHOTOS[key].src,
        alt: t(`${base}.name`),
        credit: PHOTOS[key].credit,
      },
    };
  });

  return (
    <>
      <Section spacing="cinematic">
        <Container>
          <div className="flex flex-col gap-[var(--space-6)]">
            <Text variant="small-caps" tone="gold">
              MMXXVI · MAISON
            </Text>
            <Text
              as="h1"
              variant="display-xl"
              italic
              className="display-tight max-w-[18ch]"
            >
              {t("title")}
            </Text>
            <Text variant="body-l" tone="muted" className="max-w-[58ch]">
              {t("intro")}
            </Text>
          </div>
        </Container>
      </Section>

      <Section spacing="spacious" tone="elevated">
        <Container width="wide">
          <div className="flex flex-col gap-[var(--space-11)]">
            {blocks.map((block, i) => (
              <PerfumerBlock key={block.slug} data={block} index={i} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

// Try preferring fallback photos to fail gracefully where Unsplash
// hot-linking is blocked by next/image.
