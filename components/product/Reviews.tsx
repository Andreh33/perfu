import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { getReviewsForProduct } from "@/lib/reviews";

interface ReviewsProps {
  slug: string;
  locale: "es" | "en" | "ar";
  sectionLabel: string;
  cityLabel: string;
  monthNames: Record<string, string>;
  dateFormat: string;
}

function applyTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

export function Reviews({
  slug,
  locale,
  sectionLabel,
  cityLabel,
  monthNames,
  dateFormat,
}: ReviewsProps) {
  const reviews = getReviewsForProduct(slug);
  if (reviews.length === 0) return null;

  return (
    <Section spacing="spacious" id="reviews">
      <Container width="wide">
        <Text
          as="h2"
          variant="small-caps"
          tone="gold"
          className="mb-[var(--space-7)] block text-center"
        >
          {sectionLabel}
        </Text>

        <ul className="grid grid-cols-1 gap-[var(--space-5)] md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => {
            const parts = review.date.split("-");
            const year = parts[0] ?? "";
            const monthKey = parts[1] ? String(parseInt(parts[1], 10)) : "";
            const monthLabel = monthNames[monthKey] ?? "";
            const dateText = applyTemplate(dateFormat, {
              month: monthLabel,
              year,
            });

            return (
              <li
                key={`${review.name}-${i}`}
                className="flex h-full flex-col gap-[var(--space-3)] border border-[var(--ink-500)] bg-[var(--obsidian-200)] p-[var(--space-5)]"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display italic text-[var(--text-md)] text-[var(--ink-100)]">
                    {review.name}
                  </span>
                  <span className="small-caps text-[var(--text-xs)] tracking-[0.16em] text-[var(--ink-400)]">
                    {cityLabel} {review.city}
                  </span>
                </div>
                <p className="font-body text-[var(--text-sm)] leading-[1.6] text-[var(--ink-200)]">
                  {review.text[locale]}
                </p>
                <span className="mt-auto pt-[var(--space-2)] font-mono text-[var(--text-xs)] uppercase tracking-[0.08em] text-[var(--ink-400)] tabular-nums">
                  {dateText}
                </span>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

export default Reviews;
