import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { FeaturedFragrances } from "@/components/sections/FeaturedFragrances";
import { Manifesto } from "@/components/sections/Manifesto";
import { CraftStats } from "@/components/sections/CraftStats";
import { MaisonTeaser } from "@/components/sections/MaisonTeaser";
import { PullQuoteSection } from "@/components/sections/PullQuote";
import { NewsletterCTA } from "@/components/sections/NewsletterCTA";
import { AudioToggle } from "@/components/sections/AudioToggle";
import { buildRouteMetadata } from "@/lib/seo/page-metadata";

type LocaleParams = { locale: string };
type Locale = "es" | "en" | "ar";

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return buildRouteMetadata({
    locale,
    title: t("home_title"),
    description: t("home_description"),
    path: "",
    ogSubtitle: t("tagline"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<LocaleParams>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localeKey = locale as Locale;

  return (
    <>
      <Hero locale={locale} />
      <FeaturedFragrances locale={localeKey} />
      <Manifesto locale={locale} />
      <CraftStats />
      <MaisonTeaser locale={locale} />
      <PullQuoteSection locale={locale} />
      <NewsletterCTA />
      <AudioToggle />
    </>
  );
}
