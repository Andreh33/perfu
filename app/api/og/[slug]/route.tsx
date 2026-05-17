/**
 * Dynamic Open Graph image for the product page.
 *
 * Returns a 1200x630 PNG with the brand monogram, family small-caps,
 * fragrance name in display serif, and a discreet price band. Uses only
 * the subset of HTML/CSS supported by Satori (no grid, no transforms beyond
 * the basics).
 *
 * Runtime: Edge so the response streams from the closest POP. The bundle is
 * intentionally tiny — no font is bundled; we rely on Satori's fallback for
 * a clean serif rendering that still feels editorial.
 */
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { FAMILIES } from "@/lib/families";

export const runtime = "edge";

export const contentType = "image/png";

type Locale = "es" | "en" | "ar";

function resolveLocale(v: string | null): Locale {
  if (v === "es" || v === "en" || v === "ar") return v;
  return "en";
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<Response> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return new Response("Not found", { status: 404 });
  }

  const url = new URL(request.url);
  const locale = resolveLocale(url.searchParams.get("locale"));
  const family = FAMILIES[product.family];
  const familyLabel =
    locale === "es"
      ? family.label_es
      : locale === "ar"
        ? family.label_ar
        : family.label_en;
  const name = product.names[locale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background:
            "linear-gradient(135deg, #08080A 0%, #1F1F1D 60%, #4A4438 100%)",
          color: "#F2EBD9",
          position: "relative",
        }}
      >
        {/* Bloom dorado top-left */}
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -180,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(212,182,119,0.35) 0%, rgba(212,182,119,0) 70%)",
            display: "flex",
          }}
        />

        {/* HEADER · monogram + provenance */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 9999,
                border: "1px solid #B89360",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: 28,
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

        {/* CENTER · family + name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            zIndex: 1,
            maxWidth: 1000,
          }}
        >
          <span
            style={{
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#D4B677",
            }}
          >
            {familyLabel} · {product.intensity}
          </span>
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: 140,
              lineHeight: 1,
              color: "#F2EBD9",
              letterSpacing: -2,
            }}
          >
            {name}
          </span>
        </div>

        {/* FOOTER · price + perfumer */}
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
            From {product.inspiration_country}
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 4,
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
              From
            </span>
            <span
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 44,
                color: "#D4B677",
              }}
            >
              € {product.prices.ml50} · 50 ml
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
