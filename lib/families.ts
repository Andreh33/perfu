/**
 * Olfactive families for Perfumes Dubai.
 * Each entry pairs a culturally-aware trilingual label with an accent
 * token from globals.css and a short editorial description used in the
 * catalogue cards and filter chips.
 */
export const FAMILIES = {
  oud: {
    label_en: "Oud",
    label_es: "Oud",
    label_ar: "العود",
    accent: "var(--gold-300)",
    short_en: "Deep, woody, smoky, animalic.",
    short_es: "Profundo, leñoso, ahumado, animal.",
    short_ar: "عميق، خشبي، مدخن.",
  },
  floral: {
    label_en: "Floral",
    label_es: "Floral",
    label_ar: "زهري",
    accent: "var(--accent-rose)",
    short_en: "Petals, dew, sunlit gardens.",
    short_es: "Pétalos, rocío, jardines al sol.",
    short_ar: "بتلات، ندى.",
  },
  amber: {
    label_en: "Amber",
    label_es: "Ámbar",
    label_ar: "العنبر",
    accent: "var(--accent-amber)",
    short_en: "Warm resin, vanilla, slow.",
    short_es: "Resina cálida, vainilla, lento.",
    short_ar: "راتنج دافئ.",
  },
  woody: {
    label_en: "Woody",
    label_es: "Maderoso",
    label_ar: "خشبي",
    accent: "var(--ink-400)",
    short_en: "Cedar, sandalwood, dry warmth.",
    short_es: "Cedro, sándalo, calor seco.",
    short_ar: "أرز، صندل.",
  },
  spicy: {
    label_en: "Spicy",
    label_es: "Especiado",
    label_ar: "حار",
    accent: "var(--accent-amber)",
    short_en: "Pepper, saffron, cardamom.",
    short_es: "Pimienta, azafrán, cardamomo.",
    short_ar: "فلفل، زعفران.",
  },
  aquatic: {
    label_en: "Aquatic",
    label_es: "Acuático",
    label_ar: "مائي",
    accent: "var(--accent-jade)",
    short_en: "Sea spray, ozone, calm.",
    short_es: "Salitre, ozono, calma.",
    short_ar: "بحر، أوزون.",
  },
  fresh: {
    label_en: "Fresh",
    label_es: "Fresco",
    label_ar: "منعش",
    accent: "var(--accent-jade)",
    short_en: "Citrus, mint, morning light.",
    short_es: "Cítrico, menta, luz de mañana.",
    short_ar: "حمضي، نعناع.",
  },
} as const;

export type Family = keyof typeof FAMILIES;

export const FAMILY_KEYS: ReadonlyArray<Family> = Object.keys(FAMILIES) as Family[];

export function getFamilyLabel(
  family: Family,
  locale: "en" | "es" | "ar",
): string {
  const entry = FAMILIES[family];
  if (locale === "es") return entry.label_es;
  if (locale === "ar") return entry.label_ar;
  return entry.label_en;
}

export function getFamilyShort(
  family: Family,
  locale: "en" | "es" | "ar",
): string {
  const entry = FAMILIES[family];
  if (locale === "es") return entry.short_es;
  if (locale === "ar") return entry.short_ar;
  return entry.short_en;
}
