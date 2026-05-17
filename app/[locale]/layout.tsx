import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing, type AppLocale } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { CartSheet } from "@/components/cart/CartSheet";
import { PreloaderMount } from "./preloader-mount";
import { RouteCurtain } from "@/components/layout/RouteCurtain";
import { PatienceToast } from "@/components/easter/PatienceToast";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getSiteUrl,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo/structured-data";
import { GlobalErrorCapture } from "@/components/diagnostics/GlobalErrorCapture";
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
  const siteUrl = getSiteUrl();
  const ogImage = `${siteUrl}/api/og?locale=${locale}`;

  // Build hreflang language alternates for the locale root.
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = l === routing.defaultLocale ? siteUrl : `${siteUrl}/${l}`;
  }
  languages["x-default"] = siteUrl;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("title"),
      template: `%s · Perfumes Dubai`,
    },
    description: t("description"),
    applicationName: "Perfumes Dubai",
    formatDetection: { email: false, address: false, telephone: false },
    openGraph: {
      type: "website",
      siteName: "Perfumes Dubai",
      title: t("title"),
      description: t("description"),
      locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: t("title") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [ogImage],
    },
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
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
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  const typedLocale = locale as AppLocale;

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"}>
      <body
        className={`${fontVariables} ${
          isRtl ? "font-arabic" : "font-body"
        } bg-[var(--obsidian-400)] text-[var(--ink-100)] antialiased`}
      >
        {/* Skip-to-content link — visible only on keyboard focus. Required for
            screen-reader & keyboard users to bypass navbar/preloader. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[1000] focus:bg-[var(--obsidian-200)] focus:px-4 focus:py-2 focus:text-sm focus:uppercase focus:tracking-[0.16em] focus:text-[var(--gold-100)] focus:outline focus:outline-2 focus:outline-[var(--gold-200)]"
        >
          {tA11y("skip_to_content")}
        </a>

        {/* Organisation + WebSite structured data — temporarily disabled while
            we isolate the React 19 HostHoistable removeChild crash. JSON-LD
            scripts are hoisted to <head> by the reconciler and seem to be the
            element type that loses its parent ref on certain re-renders. */}
        {/* <JsonLd id="ld-org" data={organizationSchema()} /> */}
        {/* <JsonLd id="ld-website" data={websiteSchema(typedLocale)} /> */}

        {/* Preloader is mounted OUTSIDE of <LenisProvider> and before the
            i18n client provider so it appears on the very first paint, before
            Lenis can take over scroll. It receives copy as plain props from a
            server wrapper, so it does not depend on client hydration. */}
        <GlobalErrorCapture />
        {/* Global vignette — sits above body bg + ambient halo + grain.
            Drawn as a discrete element (not a body pseudo) so it does NOT
            interfere with React reconciliation. */}
        <div className="pd-vignette" aria-hidden />
        <PreloaderMount locale={locale} />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <LenisProvider>
            <CustomCursor />
            <Navbar locale={locale} />
            <main id="main" className="min-h-screen">
              <RouteCurtain>{children}</RouteCurtain>
            </main>
            <Footer locale={locale} />
            <CartSheet />
            <CookieBanner />
            <PatienceToast />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
