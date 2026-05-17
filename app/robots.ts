import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://perfumesdubai.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Disallow internal-only paths across all locale prefixes. The styleguide
        // is an engineering reference and not for public discovery, the /api
        // route serves OG cards & form actions, and /_next is build output.
        disallow: [
          "/styleguide",
          "/en/styleguide",
          "/ar/styleguide",
          "/api/",
          "/_next/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
