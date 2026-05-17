/**
 * STRIPE PAYMENT LINKS — slots vacíos para que el cliente pegue las URLs
 * creadas en https://dashboard.stripe.com/payment-links
 *
 * Pasos para el cliente:
 *  1. Para cada perfume (20) crear DOS Payment Links: uno por tamaño (50ml, 100ml).
 *  2. En cada link: Product = nombre del perfume + tamaño, Modo = one-time payment,
 *     moneda = EUR, precio = el definido en lib/products.ts.
 *  3. success_url = https://perfumesdubai.com/checkout/success?slug={slug}&size={size}
 *  4. cancel_url  = https://perfumesdubai.com/atelier/{slug}
 *  5. Pegar cada URL en su slot abajo (formato https://buy.stripe.com/...).
 *
 * TODO: cuando todas las URLs estén pegadas, este archivo se valida con
 *       `npm run stripe:validate` (script opcional a crear) — fallará si
 *       algún slot sigue vacío en producción.
 */

import { ALL_SLUGS } from "@/lib/products";

export type StripeLink = string; // https://buy.stripe.com/...

export type ProductLinks = {
  ml50: StripeLink;
  ml100: StripeLink;
};

// 20 slugs × 2 tamaños = 40 slots vacíos.
export const STRIPE_LINKS: Record<string, ProductLinks> = Object.fromEntries(
  ALL_SLUGS.map((slug) => [slug, { ml50: "", ml100: "" }]),
);

export function getStripeLink(
  slug: string,
  size: "ml50" | "ml100",
): string {
  return STRIPE_LINKS[slug]?.[size] ?? "";
}

export function hasStripeLink(
  slug: string,
  size: "ml50" | "ml100",
): boolean {
  return Boolean(getStripeLink(slug, size));
}
