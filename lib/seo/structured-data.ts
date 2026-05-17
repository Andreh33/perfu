/**
 * Structured data helpers (schema.org JSON-LD).
 *
 * These factories return strongly-typed objects that can be serialised as
 * JSON-LD. Rendering is the responsibility of the `<JsonLd />` component, so
 * these functions stay pure and side-effect free.
 *
 * Why typed objects (not strings)?
 *   - We want JSON.stringify to escape values consistently.
 *   - Tests and code-mod tools can inspect the shape.
 *   - Future fields (sameAs URLs, NAP variants per locale) are easier to add.
 *
 * Schemas implemented:
 *   - Organization        (used in root layout)
 *   - WebSite + SearchAction (used in root layout)
 *   - BreadcrumbList      (callable per page when relevant)
 */
import type { AppLocale } from "@/i18n/routing";

const DEFAULT_SITE_URL = "https://perfumesdubai.com";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_SITE_URL;
}

export interface PostalAddressLD {
  readonly "@type": "PostalAddress";
  readonly streetAddress: string;
  readonly addressLocality: string;
  readonly addressCountry: string;
}

export interface OrganizationLD {
  readonly "@context": "https://schema.org";
  readonly "@type": "Organization";
  readonly name: string;
  readonly url: string;
  readonly logo: string;
  readonly sameAs: ReadonlyArray<string>;
  readonly address: PostalAddressLD;
  readonly contactPoint: ReadonlyArray<{
    readonly "@type": "ContactPoint";
    readonly contactType: string;
    readonly email: string;
    readonly availableLanguage: ReadonlyArray<string>;
  }>;
}

export interface WebSiteLD {
  readonly "@context": "https://schema.org";
  readonly "@type": "WebSite";
  readonly name: string;
  readonly url: string;
  readonly inLanguage: ReadonlyArray<string>;
  readonly potentialAction: {
    readonly "@type": "SearchAction";
    readonly target: {
      readonly "@type": "EntryPoint";
      readonly urlTemplate: string;
    };
    readonly "query-input": string;
  };
}

export interface BreadcrumbItemLD {
  readonly "@type": "ListItem";
  readonly position: number;
  readonly name: string;
  readonly item: string;
}

export interface BreadcrumbListLD {
  readonly "@context": "https://schema.org";
  readonly "@type": "BreadcrumbList";
  readonly itemListElement: ReadonlyArray<BreadcrumbItemLD>;
}

export function organizationSchema(): OrganizationLD {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Perfumes Dubai",
    url,
    logo: `${url}/favicon.ico`,
    sameAs: [
      // Placeholders — replace with real handles once accounts are claimed.
      "https://www.instagram.com/perfumesdubai",
      "https://www.linkedin.com/company/perfumesdubai",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "City Walk, Building 4, Ground Floor",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "concierge@perfumesdubai.com",
        availableLanguage: ["es", "en", "ar"],
      },
    ],
  };
}

export function websiteSchema(locale: AppLocale): WebSiteLD {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Perfumes Dubai",
    url,
    inLanguage: ["es", "en", "ar"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        // Even though we have no functional search yet, declaring this makes
        // Google's sitelinks search box eligible once the endpoint exists.
        urlTemplate: `${url}/${locale}/atelier?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  items: ReadonlyArray<{ name: string; path: string }>,
): BreadcrumbListLD {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: `${url}${entry.path.startsWith("/") ? entry.path : `/${entry.path}`}`,
    })),
  };
}
