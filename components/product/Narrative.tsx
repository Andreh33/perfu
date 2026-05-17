import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { PullQuote } from "@/components/maison/PullQuote";
import { ChapterReveal } from "@/components/maison/ChapterReveal";
import { getPerfumer } from "@/lib/perfumers";
import type { Perfume } from "@/lib/products";

interface NarrativeProps {
  product: Perfume;
  locale: "es" | "en" | "ar";
  sectionLabel: string;
}

/**
 * Two-column editorial narrative. The image hugs the left rail in a 4/5
 * aspect, the text fills the right with a drop-cap first paragraph and a
 * pull-quote drawn from the perfumer's voice.
 */
export function Narrative({
  product,
  locale,
  sectionLabel,
}: NarrativeProps) {
  const paragraphs = product.description[locale];
  const editorialImage =
    product.images.editorial[1] ??
    product.images.editorial[0] ??
    product.images.bottle_primary;
  const perfumer = getPerfumer(product.perfumer);

  // Surface the perfumer's voice as a pull quote, with a small synthesized
  // sentence keyed off the dominant heart note. Reads as a remembered line
  // rather than a marketing slogan.
  const heartNote = product.notes.heart[0];
  const heartName = heartNote
    ? locale === "es"
      ? heartNote.name_es
      : locale === "ar"
        ? heartNote.name_ar
        : heartNote.name_en
    : product.tags[0] ?? "memory";

  const quoteMap: Record<"es" | "en" | "ar", string> = {
    en: `Every bottle has to remember something. This one remembers ${heartName}.`,
    es: `Cada frasco tiene que recordar algo. Este recuerda ${heartName}.`,
    ar: `كلّ قنينة عليها أن تتذكّر شيئاً. هذه تتذكّر ${heartName}.`,
  };

  const split = Math.ceil(paragraphs.length / 2);
  const intro = paragraphs.slice(0, split);
  const outro = paragraphs.slice(split);

  return (
    <Section spacing="spacious" id="story">
      <Container width="wide">
        <ChapterReveal>
          <Text variant="small-caps" tone="gold" className="block mb-[var(--space-6)]">
            {sectionLabel}
          </Text>
        </ChapterReveal>

        <div className="grid grid-cols-1 gap-[var(--space-7)] lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={editorialImage}
                alt={`${product.names.en} · editorial portrait`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            {intro.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "drop-cap editorial-body font-body text-[var(--text-md)] leading-[1.7] text-[var(--ink-100)] mb-[var(--space-5)]"
                    : "editorial-body font-body text-[var(--text-md)] leading-[1.7] text-[var(--ink-200)] mb-[var(--space-5)]"
                }
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        <PullQuote
          quote={quoteMap[locale]}
          attribution={perfumer ? `— ${perfumer.name}` : undefined}
        />

        {outro.length > 0 ? (
          <div className="mx-auto max-w-[68ch]">
            {outro.map((p, i) => (
              <p
                key={i}
                className="editorial-body font-body text-[var(--text-md)] leading-[1.7] text-[var(--ink-200)] mb-[var(--space-5)]"
              >
                {p}
              </p>
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

export default Narrative;
