import { setRequestLocale } from "next-intl/server";
import { Manifesto } from "@/components/sections/Manifesto";
import { Hero } from "@/components/sections/Hero";
import { AudioToggle } from "@/components/sections/AudioToggle";

type LocaleParams = { locale: string };

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
