/**
 * Catalogue helpers: filter, sort, and grid layout calculations shared
 * between the server-rendered atelier page and the client-side filter
 * surface. URL search params are the source of truth — selectors here
 * are pure functions that accept already-parsed inputs.
 */
import { FAMILY_KEYS, type Family } from "./families";
import { PERFUMES, type Perfume } from "./products";

export type GenderFilter = "masculine" | "feminine" | "unisex";
export type IntensityFilter = "Eau de Parfum" | "Extrait de Parfum" | "Parfum";
export type SizeFilter = "ml50" | "ml100";
export type ViewMode = "grid" | "list";
export type SortMode = "featured" | "price_asc" | "price_desc" | "year_desc";

export const ALL_GENDERS: ReadonlyArray<GenderFilter> = [
  "masculine",
  "feminine",
  "unisex",
];

export const ALL_INTENSITIES: ReadonlyArray<IntensityFilter> = [
  "Eau de Parfum",
  "Extrait de Parfum",
  "Parfum",
];

export const ALL_SIZES: ReadonlyArray<SizeFilter> = ["ml50", "ml100"];

export type CatalogueFilters = {
  families: ReadonlyArray<Family>;
  genders: ReadonlyArray<GenderFilter>;
  intensities: ReadonlyArray<IntensityFilter>;
  sizes: ReadonlyArray<SizeFilter>;
  priceMin: number;
  priceMax: number;
  yearMin: number;
  yearMax: number;
  view: ViewMode;
  sort: SortMode;
};

export const PRICE_FLOOR = 180;
export const PRICE_CEIL = 1000;
export const YEAR_FLOOR = 2015;
export const YEAR_CEIL = 2025;

// Parse a comma-delimited param, keeping only allowed values.
function parseEnumList<T extends string>(
  raw: string | undefined,
  allowed: ReadonlyArray<T>,
): ReadonlyArray<T> {
  if (!raw) return [];
  const set = new Set(allowed);
  return raw
    .split(",")
    .map((v) => v.trim())
    .filter((v): v is T => set.has(v as T));
}

function parseNumber(
  raw: string | undefined,
  fallback: number,
  min: number,
  max: number,
): number {
  if (!raw) return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, Math.round(n)));
}

export function parseFiltersFromSearchParams(
  params: Record<string, string | string[] | undefined>,
): CatalogueFilters {
  const first = (key: string): string | undefined => {
    const v = params[key];
    if (Array.isArray(v)) return v[0];
    return v;
  };

  const view = first("view") === "list" ? "list" : "grid";
  const sortRaw = first("sort");
  const sort: SortMode =
    sortRaw === "price_asc" ||
    sortRaw === "price_desc" ||
    sortRaw === "year_desc"
      ? sortRaw
      : "featured";

  return {
    families: parseEnumList(first("family"), FAMILY_KEYS),
    genders: parseEnumList(first("gender"), ALL_GENDERS),
    intensities: parseEnumList(first("intensity"), ALL_INTENSITIES),
    sizes: parseEnumList(first("size"), ALL_SIZES),
    priceMin: parseNumber(first("priceMin"), PRICE_FLOOR, PRICE_FLOOR, PRICE_CEIL),
    priceMax: parseNumber(first("priceMax"), PRICE_CEIL, PRICE_FLOOR, PRICE_CEIL),
    yearMin: parseNumber(first("yearMin"), YEAR_FLOOR, YEAR_FLOOR, YEAR_CEIL),
    yearMax: parseNumber(first("yearMax"), YEAR_CEIL, YEAR_FLOOR, YEAR_CEIL),
    view,
    sort,
  };
}

export function applyFilters(
  source: ReadonlyArray<Perfume>,
  f: CatalogueFilters,
): ReadonlyArray<Perfume> {
  let out: Perfume[] = [...source];

  if (f.families.length > 0) {
    const fams = new Set(f.families);
    out = out.filter((p) => fams.has(p.family));
  }
  if (f.genders.length > 0) {
    const set = new Set(f.genders);
    out = out.filter((p) => set.has(p.gender));
  }
  if (f.intensities.length > 0) {
    const set = new Set(f.intensities);
    out = out.filter((p) => set.has(p.intensity));
  }
  // Size affects which price the user is shopping for; the perfume is only
  // excluded if the matching price falls outside the selected range.
  out = out.filter((p) => {
    const sizes: SizeFilter[] = f.sizes.length > 0 ? [...f.sizes] : ["ml50"];
    return sizes.some((s) => {
      const price = p.prices[s];
      return price >= f.priceMin && price <= f.priceMax;
    });
  });
  out = out.filter((p) => p.year >= f.yearMin && p.year <= f.yearMax);

  switch (f.sort) {
    case "price_asc":
      out.sort((a, b) => a.prices.ml50 - b.prices.ml50);
      break;
    case "price_desc":
      out.sort((a, b) => b.prices.ml50 - a.prices.ml50);
      break;
    case "year_desc":
      out.sort((a, b) => b.year - a.year);
      break;
    case "featured":
    default:
      // featured first, then new, then bestseller, then by year desc as tiebreaker.
      out.sort((a, b) => {
        const score = (p: Perfume): number =>
          (p.featured ? 4 : 0) + (p.new ? 2 : 0) + (p.bestseller ? 1 : 0);
        const diff = score(b) - score(a);
        if (diff !== 0) return diff;
        return b.year - a.year;
      });
      break;
  }

  return out;
}

export function getFilteredProducts(
  params: Record<string, string | string[] | undefined>,
): {
  filters: CatalogueFilters;
  products: ReadonlyArray<Perfume>;
  total: number;
} {
  const filters = parseFiltersFromSearchParams(params);
  const products = applyFilters(PERFUMES, filters);
  return { filters, products, total: PERFUMES.length };
}

/**
 * Grid card sizes follow an asymmetric pattern repeating every 6 cards:
 * [L, S, S, M, M, L] — using a 12-column grid where L=8col, M=6col, S=4col.
 * Featured products are biased toward L slots when possible by simply
 * pre-sorting before render (see `applyFilters` featured logic).
 */
export type CardSize = "L" | "M" | "S";

const PATTERN: ReadonlyArray<CardSize> = ["L", "S", "S", "M", "M", "L"];

export function getCardSize(index: number): CardSize {
  const size = PATTERN[index % PATTERN.length];
  return size ?? "M";
}

export const SIZE_TO_COLS: Record<CardSize, string> = {
  L: "lg:col-span-8",
  M: "lg:col-span-6",
  S: "lg:col-span-4",
};
