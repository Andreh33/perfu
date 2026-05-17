import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { Link } from "@/i18n/navigation";
import { ProductHero } from "@/components/product/ProductHero";
import { HorizontalGallery } from "@/components/product/HorizontalGallery";
import { Narrative } from "@/components/product/Narrative";
import { OlfactoryPyramid } from "@/components/product/OlfactoryPyramid";
import { Ritual } from "@/components/product/Ritual";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Reviews } from "@/components/product/Reviews";
import { StickyAcquireCTA } from "@/components/product/StickyAcquireCTA";
import { ALL_SLUGS, getProductBySlug } from "@/lib/products";
import { FAMILIES } from "@/lib/families";

type PageParams = { locale: string; slug: string };
type LocaleKey = "es" | "en" | "ar";

function resolveLocale(locale: string): LocaleKey {
  if (locale === "en" || locale === "es" || locale === "ar") return locale;
  return "es";
}

export function generateStaticParams(): Array<PageParams> {
  const out: Array<PageParams> = [];
  for (const locale of routing.locales) {
    for (const slug of ALL_SLUGS) {
      out.push({ locale, slug });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Not found · Perfumes Dubai" };
  }
  const localeKey = resolveLocale(locale);
  const name = product.names[localeKey];
  const description = product.description[localeKey][0] ?? "";

  const ogImage = `/api/og/${slug}?locale=${localeKey}`;

  // Build language alternates for hreflang.
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    const prefix = l === routing.defaultLocale ? "" : `/${l}`;
    languages[l] = `${prefix}/atelier/${slug}`;
  }

  return {
    title: `${name} · Perfumes Dubai`,
    description,
    openGraph: {
      title: name,
      description,
      type: "website",
      siteName: "Perfumes Dubai",
      images: [{ url: ogImage, width: 1200, height: 630, alt: name }],
      locale: localeKey,
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description,
      images: [ogImage],
    },
    alternates: {
      languages,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<React.JSX.Element> {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug);
  if (!product) notFound();

  const localeKey = resolveLocale(locale);
  const t = await getTranslations({ locale, namespace: "product" });
  const tAtelier = await getTranslations({ locale, namespace: "atelier" });

  const family = FAMILIES[product.family];
  const familyLabel =
    localeKey === "es"
      ? family.label_es
      : localeKey === "ar"
        ? family.label_ar
        : family.label_en;

  // JSON-LD Product schema. We use the 50ml SKU price as the headline.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.names.en,
    description: product.description.en[0] ?? "",
    brand: { "@type": "Brand", name: "Perfumes Dubai" },
    sku: `${product.slug}-50ml`,
    category: family.label_en,
    image: [product.images.bottle_primary],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: product.prices.ml50,
      highPrice: product.prices.ml100,
      offerCount: 2,
      availability: "https://schema.org/InStock",
    },
  };

  // Card labels shared with related-products grid.
  const cardLabels = {
    from: tAtelier("card.from"),
    acquire: tAtelier("card.acquire"),
    notes: tAtelier("card.notes"),
    limited: tAtelier("card.limited"),
    newTag: tAtelier("card.new"),
    bestseller: tAtelier("card.bestseller"),
    intensity: "",
  };

  // Build month name map from the messages namespace for the reviews block.
  const monthNames: Record<string, string> = {};
  for (let i = 1; i <= 12; i += 1) {
    monthNames[String(i)] = t(`months.${i}` as const);
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // We trust our own schema literal; this is sanitised by serialisation.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <Section spacing="tight" className="pt-[140px] pb-0">
        <Container width="wide">
          <nav
            aria-label="breadcrumb"
            className="small-caps flex items-center gap-[var(--space-3)] text-[var(--text-xs)] tracking-[0.16em] text-[var(--ink-400)]"
          >
            <Link href="/" className="hover:text-[var(--gold-100)]">
              {tAtelier("breadcrumb.home")}
            </Link>
            <span aria-hidden>/</span>
            <Link
              href="/atelier"
              className="hover:text-[var(--gold-100)]"
            >
              {tAtelier("breadcrumb.atelier")}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-[var(--ink-200)]">
              {product.names[localeKey]}
            </span>
            <span aria-hidden className="mx-2 text-[var(--ink-500)]">
              ·
            </span>
            <span className="text-[var(--ink-400)]">{familyLabel}</span>
          </nav>
        </Container>
      </Section>

      {/* A · HERO */}
      <Section spacing="tight" className="pt-[var(--space-5)] pb-0">
        <Container width="wide">
          <ProductHero product={product} locale={localeKey} />
        </Container>
      </Section>

      {/* B · HORIZONTAL GALLERY */}
      <HorizontalGallery
        images={product.images.editorial}
        productName={product.names.en}
      />

      {/* C · NARRATIVE */}
      <Narrative
        product={product}
        locale={localeKey}
        sectionLabel={t("sections.narrative")}
      />

      {/* D · OLFACTORY PYRAMID */}
      <Section spacing="spacious" tone="elevated" id="pyramid">
        <Container width="wide">
          <div className="mb-[var(--space-7)] flex flex-col gap-[var(--space-3)]">
            <Text as="h2" variant="small-caps" tone="gold">
              {t("sections.pyramid")}
            </Text>
            <Text variant="subhead" italic tone="muted" className="max-w-[48ch]">
              {t("sections.pyramid_intro")}
            </Text>
          </div>
          <OlfactoryPyramid product={product} locale={localeKey} />
        </Container>
      </Section>

      {/* E · RITUAL */}
      <Ritual
        product={product}
        locale={localeKey}
        sectionLabel={t("sections.ritual")}
        caption={t("sections.ritual_caption")}
      />

      {/* F · RELATED PRODUCTS */}
      <RelatedProducts
        slug={product.slug}
        locale={localeKey}
        sectionLabel={t("sections.related")}
        backLabel={t("sections.back_to_atelier")}
        cardLabels={cardLabels}
      />

      {/* G · REVIEWS */}
      <Reviews
        slug={product.slug}
        locale={localeKey}
        sectionLabel={t("sections.reviews")}
        cityLabel={t("reviews.city_label")}
        monthNames={monthNames}
        dateFormat={String(t.raw("reviews.date_format"))}
      />

      {/* STICKY ACQUIRE BAR */}
      <StickyAcquireCTA product={product} locale={localeKey} />
    </>
  );
}
