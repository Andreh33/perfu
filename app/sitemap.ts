import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { ALL_SLUGS } from "@/lib/products";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://perfumesdubai.com";

const STATIC_PATHS = [
  "",
  "/atelier",
  "/maison",
  "/perfumeur",
  "/bespoke",
  "/boutique",
  "/journal",
  "/concierge",
  "/legal/privacy",
  "/legal/terms",
  "/legal/cookies",
] as const;

function localizedPath(locale: string, path: string) {
  if (locale === routing.defaultLocale) {
    return `${BASE_URL}${path || "/"}`;
  }
  return `${BASE_URL}/${locale}${path}`;
}

function alternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const locale of routing.locales) {
    map[locale] = localizedPath(locale, path);
  }
  map["x-default"] = localizedPath(routing.defaultLocale, path);
  return map;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    for (const locale of routing.locales) {
      entries.push({
        url: localizedPath(locale, path),
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1.0 : path === "/atelier" ? 0.9 : 0.6,
        alternates: { languages: alternates(path) },
      });
    }
  }

  for (const slug of ALL_SLUGS) {
    for (const locale of routing.locales) {
      const path = `/atelier/${slug}`;
      entries.push({
        url: localizedPath(locale, path),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: alternates(path) },
      });
    }
  }

  return entries;
}
