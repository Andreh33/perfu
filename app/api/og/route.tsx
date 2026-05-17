/**
 * Generic Open Graph card.
 *
 * Used by routes that are not bound to a single product (home, atelier index,
 * maison, perfumeur, bespoke, boutique, journal, concierge). Reads optional
 * `?title=`, `?subtitle=` and `?locale=` query params; falls back to the
 * maison tagline.
 *
 * Runtime: edge for streamed delivery from the closest POP. Satori is the
 * renderer underneath `ImageResponse`, so the JSX is limited to flex layouts
 * and inline styles — no grid, no custom fonts bundled.
 */
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";
export const contentType = "image/png";

type Locale = "es" | "en" | "ar";

const TAGLINES: Record<Locale, string> = {
  es: "El arte de la fragancia, destilado del desierto y el tiempo.",
  en: "The art of fragrance, distilled from desert and time.",
  ar: "فن العطر، مستخلص من الصحراء والزمن.",
};

const DEFAULT_TITLES: Record<Locale, string> = {
  es: "Perfumes Dubai",
  en: "Perfumes Dubai",
  ar: "عطور دبي",
};

function resolveLocale(v: string | null): Locale {
  if (v === "es" || v === "en" || v === "ar") return v;
  return "en";
}

export function GET(request: NextRequest): Response {
  const url = new URL(request.url);
  const locale = resolveLocale(url.searchParams.get("locale"));
  const titleParam = url.searchParams.get("title");
  const subtitleParam = url.searchParams.get("subtitle");

  const title = titleParam && titleParam.length > 0
    ? titleParam
    : DEFAULT_TITLES[locale];
  const subtitle = subtitleParam && subtitleParam.length > 0
    ? subtitleParam
    : TAGLINES[locale];

  const isRtl = locale === "ar";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(135deg, #08080A 0%, #1F1F1D 55%, #4A4438 100%)",
          color: "#F2EBD9",
          position: "relative",
          direction: isRtl ? "rtl" : "ltr",
        }}
      >
        {/* Bloom dorado top-right */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -220,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(212,182,119,0.35) 0%, rgba(212,182,119,0) 70%)",
            display: "flex",
          }}
        />

        {/* HEADER · monograma + provenance */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 9999,
                border: "1.5px solid #B89360",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: 30,
                color: "#D4B677",
              }}
            >
              PD
            </div>
            <span
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 16,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#A09885",
              }}
            >
              Perfumes Dubai · Maison de Parfum
            </span>
          </div>

          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 14,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#A09885",
            }}
          >
            MMXXVI
          </span>
        </div>

        {/* CENTER · title + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            zIndex: 1,
            maxWidth: 1040,
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: title.length > 32 ? 86 : 116,
              lineHeight: 1.02,
              color: "#F2EBD9",
              letterSpacing: isRtl ? 0 : -1.5,
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 22,
              letterSpacing: isRtl ? 0 : 4,
              textTransform: isRtl ? "none" : "uppercase",
              color: "#D4B677",
              maxWidth: 880,
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </span>
        </div>

        {/* FOOTER · provenance + url */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 14,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#A09885",
            }}
          >
            City Walk · Dubai
          </span>
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 14,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#A09885",
            }}
          >
            perfumesdubai.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
