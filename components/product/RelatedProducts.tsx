import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/components/atelier/ProductCard";
import { getRelatedProducts } from "@/lib/products";

interface RelatedProductsProps {
  slug: string;
  locale: "es" | "en" | "ar";
  sectionLabel: string;
  backLabel: string;
  cardLabels: {
    from: string;
    acquire: string;
    notes: string;
    limited: string;
    newTag: string;
    bestseller: string;
    intensity: string;
  };
}

export function RelatedProducts({
  slug,
  locale,
  sectionLabel,
  backLabel,
  cardLabels,
}: RelatedProductsProps) {
  const related = getRelatedProducts(slug, 3);
  if (related.length === 0) return null;

  return (
    <Section spacing="spacious" tone="elevated">
      <Container width="wide">
        <Text
          variant="small-caps"
          tone="gold"
          className="mb-[var(--space-7)] block text-center"
        >
          {sectionLabel}
        </Text>

        <div className="grid grid-cols-1 gap-[var(--space-6)] md:grid-cols-3">
          {related.map((p, i) => (
            <ProductCard
              key={p.slug}
              product={p}
              size="S"
              index={i}
              locale={locale}
              labels={cardLabels}
            />
          ))}
        </div>

        <div className="mt-[var(--space-8)] flex justify-center">
          <Link
            href="/atelier"
            className="small-caps text-[var(--text-sm)] tracking-[0.16em] text-[var(--ink-200)] transition-colors hover:text-[var(--gold-100)]"
          >
            {backLabel}
          </Link>
        </div>
      </Container>
    </Section>
  );
}

export default RelatedProducts;
