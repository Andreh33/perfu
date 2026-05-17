/**
 * Per-route Metadata builder.
 *
 * Centralises the boilerplate for `generateMetadata` across pages: title,
 * description, hreflang language alternates, OpenGraph + Twitter cards.
 *
 * Each route page is expected to translate its title/description from
 * `metadata.*` namespace (or any namespace it owns) and pass them in. The OG
 * image URL is composed from `/api/og` with the route title + tagline; for
 * product pages, callers can override via `ogImage` to use the `/api/og/[slug]`
 * dynamic template.
 */
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/seo/structured-data";

export interface RouteMetadataInput {
  readonly locale: string;
  readonly title: string;
  readonly description: string;
  /** Path WITHOUT locale prefix, leading slash optional. "" or "/" for home. */
  readonly path: string;
  /** Optional subtitle for the generic OG card; defaults to the description. */
  readonly ogSubtitle?: string;
  /** Override the OG image URL (e.g. for product `/api/og/[slug]`). */
  readonly ogImage?: string;
}

function normalisePath(path: string): string {
  if (path === "" || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

function localisedHref(locale: string, path: string): string {
  const normal = normalisePath(path);
  if (locale === routing.defaultLocale) {
    return normal === "" ? "/" : normal;
  }
  return `/${locale}${normal}`;
}

export function buildRouteMetadata(input: RouteMetadataInput): Metadata {
  const { locale, title, description, path, ogSubtitle, ogImage } = input;
  const siteUrl = getSiteUrl();

  // hreflang languages map.
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = localisedHref(l, path);
  }
  languages["x-default"] = localisedHref(routing.defaultLocale, path);

  const ogParams = new URLSearchParams({ locale });
  ogParams.set("title", title);
  if (ogSubtitle) ogParams.set("subtitle", ogSubtitle);
  const computedOgImage =
    ogImage ?? `${siteUrl}/api/og?${ogParams.toString()}`;

  const canonical = localisedHref(locale, path);

  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: "Perfumes Dubai",
      title,
      description,
      url: `${siteUrl}${canonical === "/" ? "" : canonical}`,
      locale,
      images: [{ url: computedOgImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [computedOgImage],
    },
    alternates: {
      canonical,
      languages,
    },
  };
}
