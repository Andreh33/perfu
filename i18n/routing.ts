import { defineRouting } from "next-intl/routing";

/**
 * Trilingual routing config.
 * - `es` is the default locale and renders without a URL prefix (`/`).
 * - `en` and `ar` always carry their prefix (`/en`, `/ar`).
 * - `ar` triggers RTL in the locale layout.
 */
export const routing = defineRouting({
  locales: ["es", "en", "ar"] as const,
  defaultLocale: "es",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
