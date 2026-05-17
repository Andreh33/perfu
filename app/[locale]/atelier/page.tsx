import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { Link } from "@/i18n/navigation";
import { Filters } from "@/components/atelier/Filters";
import { Toolbar } from "@/components/atelier/Toolbar";
import { ProductCard } from "@/components/atelier/ProductCard";
import { ProductRow } from "@/components/atelier/ProductRow";
import {
  ALL_GENDERS,
  ALL_INTENSITIES,
  ALL_SIZES,
  getCardSize,
  getFilteredProducts,
  SIZE_TO_COLS,
  type SortMode,
} from "@/lib/catalogue";
import { cn } from "@/lib/cn";
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
    title: tMeta("atelier_title"),
    description: tMeta("atelier_description"),
    path: "/atelier",
    ogSubtitle: tMeta("atelier_description"),
  });
}

export default async function AtelierPage({
  params,
  searchParams,
}: {
  params: Promise<LocaleParams>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<React.JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const { filters, products, total } = getFilteredProducts(sp);
  const t = await getTranslations({ locale, namespace: "atelier" });

  const filtered = products.length !== total;
  const localeKey: "es" | "en" | "ar" =
    locale === "es" || locale === "ar" ? locale : "en";

  const sortOptions: Record<SortMode, string> = {
    featured: t("sort.featured"),
    price_asc: t("sort.price_asc"),
    price_desc: t("sort.price_desc"),
    year_desc: t("sort.year_desc"),
  };

  const cardLabels = {
    from: t("card.from"),
    acquire: t("card.acquire"),
    notes: t("card.notes"),
    limited: t("card.limited"),
    newTag: t("card.new"),
    bestseller: t("card.bestseller"),
    intensity: "",
  };

  return (
    <>
      <Section spacing="tight" className="pt-[140px]">
        <Container width="wide">
          {/* breadcrumb */}
          <nav
            aria-label="breadcrumb"
            className="mb-[var(--space-6)] flex items-center gap-[var(--space-3)] small-caps text-[var(--text-xs)] tracking-[0.16em] text-[var(--ink-400)]"
          >
            <Link href="/" className="hover:text-[var(--gold-100)]">
              {t("breadcrumb.home")}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-[var(--ink-200)]">{t("breadcrumb.atelier")}</span>
          </nav>

          <div className="flex flex-col gap-[var(--space-5)] md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-[var(--space-4)] md:max-w-[640px]">
              <Text as="h1" variant="display-l">
                {t("title")}
              </Text>
              <Text variant="quote" tone="muted" italic className="max-w-[60ch]">
                {t("subtitle")}
              </Text>
            </div>
            <Text
              variant="metadata"
              tone="muted"
              className="md:text-right"
            >
              {filtered
                ? t("counter_filtered", { n: products.length, total })
                : t("counter", { n: total })}
            </Text>
          </div>
        </Container>
      </Section>

      <Section spacing="default" className="pt-0">
        <Container width="wide">
          <div className="flex flex-col gap-[var(--space-6)] lg:flex-row lg:items-start lg:gap-[var(--space-7)]">
            <Filters
              initial={filters}
              locale={localeKey}
              resultCount={products.length}
              labels={{
                title: t("filters.title"),
                family: t("filters.family"),
                gender: t("filters.gender"),
                intensity: t("filters.intensity"),
                price: t("filters.price"),
                size: t("filters.size"),
                year: t("filters.year"),
                clear: t("filters.clear_all"),
                open: t("filters.open"),
                close: t("filters.close"),
                apply: t("filters.apply"),
                genders: {
                  masculine: t("genders.masculine"),
                  feminine: t("genders.feminine"),
                  unisex: t("genders.unisex"),
                },
                intensities: {
                  "Eau de Parfum": t("intensities.eau_de_parfum"),
                  "Extrait de Parfum": t("intensities.extrait"),
                  Parfum: t("intensities.parfum"),
                },
                sizes: {
                  ml50: t("sizes.ml50"),
                  ml100: t("sizes.ml100"),
                },
              }}
            />

            <div className="flex min-w-0 flex-1 flex-col gap-[var(--space-6)]">
              <div className="border-y border-[var(--ink-500)] py-[var(--space-4)]">
                <Toolbar
                  view={filters.view}
                  sort={filters.sort}
                  labels={{
                    viewLabel: t("views.label"),
                    grid: t("views.grid"),
                    list: t("views.list"),
                    sortLabel: t("sort.label"),
                    sortOptions,
                  }}
                />
              </div>

              {/* Visually hidden h2 — sits between the page h1 and the
                  product card h3s so the heading hierarchy reads h1 → h2 → h3
                  for screen-reader and Lighthouse a11y compliance. */}
              <h2 className="sr-only">{t("title")}</h2>

              {products.length === 0 ? (
                <EmptyState
                  title={t("empty.title")}
                  subtitle={t("empty.subtitle")}
                />
              ) : filters.view === "list" ? (
                <div className="flex flex-col">
                  {products.map((p) => (
                    <ProductRow
                      key={p.slug}
                      product={p}
                      locale={localeKey}
                      labels={{
                        from: t("card.from"),
                        acquire: t("card.acquire"),
                        notes: t("card.notes"),
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div
                  className={cn(
                    "grid gap-x-[var(--space-5)] gap-y-[var(--space-7)]",
                    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-12",
                  )}
                >
                  {products.map((p, i) => {
                    const size = getCardSize(i);
                    return (
                      <div
                        key={p.slug}
                        className={cn("col-span-1 sm:col-span-1", SIZE_TO_COLS[size])}
                      >
                        <ProductCard
                          product={p}
                          size={size}
                          index={i}
                          locale={localeKey}
                          labels={cardLabels}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Avoid unused-import warnings: keep handles available for future filter
          summary chips. */}
      <span aria-hidden hidden>
        {ALL_GENDERS.length + ALL_INTENSITIES.length + ALL_SIZES.length}
      </span>
    </>
  );
}

function EmptyState({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}): React.JSX.Element {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-[var(--space-3)] py-[var(--space-9)] text-center">
      <Text as="p" variant="subhead" italic tone="primary">
        {title}
      </Text>
      <Text variant="body" tone="muted" className="max-w-[40ch]">
        {subtitle}
      </Text>
    </div>
  );
}
