import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { RouteCurtain } from "@/components/layout/RouteCurtain";
import { PatienceToast } from "@/components/easter/PatienceToast";
import "../globals.css";

type LocaleParams = { locale: string };

export function generateStaticParams(): Array<LocaleParams> {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LocaleParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<LocaleParams>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering for this segment with the resolved locale.
  setRequestLocale(locale);

  const messages = await getMessages();
  const isRtl = locale === "ar";

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"}>
      <body
        className={`${fontVariables} ${
          isRtl ? "font-arabic" : "font-body"
        } bg-[var(--obsidian-400)] text-[var(--ink-100)] antialiased`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LenisProvider>
            <CustomCursor />
            <Navbar locale={locale} />
            <main className="min-h-screen">
              <RouteCurtain>{children}</RouteCurtain>
            </main>
            <Footer locale={locale} />
            <CookieBanner />
            <PatienceToast />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
