import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Manifesto } from "@/components/sections/Manifesto";
import { Hero } from "@/components/sections/Hero";
import { AudioToggle } from "@/components/sections/AudioToggle";
import { buildRouteMetadata } from "@/lib/seo/page-metadata";

type LocaleParams = { locale: string };

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

  return (
    <>
      <Hero locale={locale} />
      <Manifesto locale={locale} />
      <AudioToggle />
    </>
  );
}
