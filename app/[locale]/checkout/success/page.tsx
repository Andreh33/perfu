import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { Link } from "@/components/ui/Link";
import { getProductBySlug } from "@/lib/products";

export const metadata: Metadata = {
  robots: "noindex, nofollow",
};

type Params = { locale: string };
type SearchParams = { slug?: string; size?: string };

export default async function CheckoutSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "checkout_success" });

  const sp = await searchParams;
  const product = sp.slug ? getProductBySlug(sp.slug) : undefined;
  const productName = product
    ? product.names[locale as "en" | "es" | "ar"] ?? product.names.en
    : null;

  return (
    <Section spacing="cinematic" tone="void">
      <Container width="narrow">
        <div className="flex flex-col items-start gap-[var(--space-6)] text-center md:items-center">
          <Text variant="small-caps" tone="gold">
            {t("eyebrow")}
          </Text>
          <Text
            as="h1"
            variant="display-l"
            italic
            className="display-tight md:text-center"
          >
            {t("title")}
          </Text>
          {productName ? (
            <Text variant="subhead" italic tone="secondary" className="md:text-center">
              {t("ordered", { name: productName })}
            </Text>
          ) : null}
          <Text variant="body-l" tone="muted" className="editorial-body md:text-center">
            {t("body")}
          </Text>
          <div className="mt-[var(--space-5)] flex flex-col gap-[var(--space-4)] md:flex-row md:items-center md:gap-[var(--space-6)]">
            <Link href="/atelier" variant="gold">
              {t("cta_continue")}
            </Link>
            <Link href="/concierge" variant="subtle">
              {t("cta_concierge")}
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
