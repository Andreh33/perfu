// Editorial block for a single perfumer. Server component. Renders an
// alternating two-column layout (image / copy) with a warm overlay on the
// portrait. The actual data shape lives in app/[locale]/perfumeur/page.tsx so
// this component stays presentational — easy to swap once lib/perfumers.ts
// from B4 lands in main.

import Image from "next/image";
import { Link as I18nLink } from "@/i18n/navigation";
import { Text } from "@/components/ui/Text";

export interface PerfumerWork {
  slug: string;
  name: string;
}

export interface PerfumerBlockData {
  slug: string;
  name: string;
  country: string;
  roman: string;
  label: string;
  bio: ReadonlyArray<string>;
  works: ReadonlyArray<PerfumerWork>;
  worksLabel: string;
  photo: {
    src: string;
    alt: string;
    credit: string;
  };
}

interface PerfumerBlockProps {
  data: PerfumerBlockData;
  index: number;
}

export function PerfumerBlock({ data, index }: PerfumerBlockProps) {
  const reverse = index % 2 === 1;

  return (
    <article className="grid grid-cols-1 gap-[var(--space-7)] lg:grid-cols-12 lg:gap-[var(--space-8)]">
      <div
        className={
          "relative aspect-[4/5] overflow-hidden lg:col-span-5 " +
          (reverse ? "lg:order-2" : "")
        }
      >
        <Image
          src={data.photo.src}
          alt={data.photo.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
          style={{ filter: "contrast(1.1) saturate(1.1) brightness(0.92)" }}
          priority={index === 0}
        />
        {/* warm overlay */}
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "linear-gradient(180deg, rgba(196,148,92,0.18) 0%, rgba(140,86,40,0.32) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 40%, rgba(8,8,10,0.6) 100%)",
          }}
        />
        <span className="absolute bottom-[var(--space-3)] left-[var(--space-3)] font-body text-[var(--text-xs)] uppercase tracking-[0.18em] text-[var(--ink-300)]">
          {data.photo.credit}
        </span>
      </div>

      <div
        className={
          "flex flex-col gap-[var(--space-5)] lg:col-span-7 lg:justify-center " +
          (reverse ? "lg:order-1" : "")
        }
      >
        <Text variant="small-caps" tone="gold">
          {data.label} · {data.roman} · {data.country}
        </Text>
        <Text
          as="h2"
          variant="display-l"
          italic
          className="display-tight max-w-[18ch]"
        >
          {data.name}
        </Text>
        <div className="flex flex-col gap-[var(--space-4)] max-w-[58ch]">
          {data.bio.map((paragraph, i) => (
            <Text
              key={i}
              variant="body-l"
              tone={i === 0 ? "secondary" : "muted"}
            >
              {paragraph}
            </Text>
          ))}
        </div>

        {data.works.length > 0 ? (
          <div className="flex flex-col gap-[var(--space-3)] pt-[var(--space-4)]">
            <Text variant="small-caps" tone="dim">
              {data.worksLabel}
            </Text>
            <ul className="flex flex-wrap gap-[var(--space-5)]">
              {data.works.map((work) => (
                <li key={work.slug}>
                  <I18nLink
                    href={`/atelier/${work.slug}`}
                    className="group flex items-center gap-[var(--space-3)]"
                  >
                    <span
                      aria-hidden
                      className="block h-[100px] w-[80px] border border-[var(--ink-500)] bg-gradient-to-br from-[var(--obsidian-100)] to-[var(--obsidian-300)]"
                    />
                    <span className="font-display italic text-[var(--text-lg)] text-[var(--ink-100)] group-hover:text-[var(--gold-100)] transition-colors duration-[var(--duration-quick)]">
                      {work.name}
                    </span>
                  </I18nLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
