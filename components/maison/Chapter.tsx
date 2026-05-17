import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";
import { ChapterReveal } from "./ChapterReveal";
import { PullQuote } from "./PullQuote";

export type ChapterSlug = "recolte" | "alambic" | "maceration" | "flacon";
export type ChapterRoman = "I" | "II" | "III" | "IV";

interface ChapterProps {
  roman: ChapterRoman;
  slug: ChapterSlug;
  locale: string;
  /** First chapter loads its hero image with priority. */
  priority?: boolean;
}

/**
 * One narrative chapter of the Maison page.
 * Layout: sticky roman marker on the left (4 cols), editorial column on
 * the right (8 cols). Markers remain pinned for the duration of the
 * chapter's scroll, then unstick at the bottom of the grid.
 */
export async function Chapter({
  roman,
  slug,
  locale,
  priority = false,
}: ChapterProps) {
  const tc = await getTranslations({
    locale,
    namespace: `maison.chapter.${slug}`,
  });

  // Surface every paragraph defensively, since `t.raw` returns `unknown`.
  const rawParagraphs = tc.raw("paragraphs");
  const paragraphs = Array.isArray(rawParagraphs)
    ? rawParagraphs.filter((p): p is string => typeof p === "string")
    : [];
  const firstParagraph = paragraphs[0] ?? "";
  const beforeQuote = paragraphs.slice(1, 3);
  const afterQuote = paragraphs.slice(3);

  const imageUrl = tc("image_url");
  const imageAlt = tc("image_alt");
  const title = tc("title");
  const titleShort = tc("title_short");
  const pullQuote = tc("pull_quote");

  const isRtl = locale === "ar";

  return (
    <article
      className="grid grid-cols-1 gap-[var(--space-7)] lg:grid-cols-12 lg:gap-[var(--space-7)]"
      aria-labelledby={`chapter-${slug}-title`}
    >
      {/* LEFT · sticky roman marker */}
      <aside
        className={cn(
          "lg:col-span-4",
          "lg:sticky lg:top-[20vh] lg:self-start",
          "flex flex-col items-start gap-[var(--space-4)]",
        )}
      >
        <Text
          as="span"
          variant="display-xxl"
          tone="dim"
          italic
          aria-hidden="true"
          className="font-display leading-none text-[clamp(7rem,16vw,12rem)]"
        >
          {roman}
        </Text>
        <span
          aria-hidden="true"
          className="block h-[80px] w-px bg-[var(--gold-200)]"
        />
        <Text variant="small-caps" tone="gold" className="block">
          {isRtl
            ? `${titleShort} · ${roman}`
            : `CHAPTER ${roman} · ${titleShort}`}
        </Text>
      </aside>

      {/* RIGHT · editorial body */}
      <div className="lg:col-span-8">
        <ChapterReveal>
          <figure className="relative mb-[var(--space-7)] overflow-hidden">
            <div className="relative aspect-[4/5] w-full md:aspect-[3/4]">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                priority={priority}
                loading={priority ? undefined : "lazy"}
                decoding="async"
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover maison-image-warm"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--gold-300)]/[0.08] to-[var(--obsidian-400)]/40 mix-blend-overlay"
              />
            </div>
          </figure>
        </ChapterReveal>

        <ChapterReveal delay={80}>
          <Text
            as="h2"
            id={`chapter-${slug}-title`}
            variant="display-m"
            italic
            className="display-tight mb-[var(--space-6)] max-w-[16ch] text-[clamp(2.4rem,5vw,4rem)]"
          >
            {title}
          </Text>
        </ChapterReveal>

        {firstParagraph ? (
          <ChapterReveal delay={160}>
            <p className="drop-cap editorial-body font-body text-[var(--text-md)] leading-[1.7] text-[var(--ink-200)] mb-[var(--space-6)]">
              {firstParagraph}
            </p>
          </ChapterReveal>
        ) : null}

        {beforeQuote.map((p, idx) => (
          <ChapterReveal key={`pre-${idx}`} delay={240 + idx * 80}>
            <p className="editorial-body font-body text-[var(--text-md)] leading-[1.7] text-[var(--ink-200)] mb-[var(--space-6)]">
              {p}
            </p>
          </ChapterReveal>
        ))}

        <PullQuote quote={pullQuote} />

        {afterQuote.map((p, idx) => (
          <ChapterReveal key={`post-${idx}`} delay={idx * 80}>
            <p className="editorial-body font-body text-[var(--text-md)] leading-[1.7] text-[var(--ink-200)] mb-[var(--space-6)]">
              {p}
            </p>
          </ChapterReveal>
        ))}
      </div>
    </article>
  );
}
