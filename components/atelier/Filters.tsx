"use client";

// Client because the filter surface mutates URL state on every change
// (via next-intl router.push) and manages a mobile drawer + collapsible
// sections.
import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { FAMILIES, FAMILY_KEYS, type Family } from "@/lib/families";
import {
  ALL_GENDERS,
  ALL_INTENSITIES,
  ALL_SIZES,
  PRICE_CEIL,
  PRICE_FLOOR,
  YEAR_CEIL,
  YEAR_FLOOR,
  type CatalogueFilters,
  type GenderFilter,
  type IntensityFilter,
  type SizeFilter,
} from "@/lib/catalogue";
import { cn } from "@/lib/cn";
import { FilterChip } from "./FilterChip";
import { RangeSlider } from "./RangeSlider";

type Locale = "es" | "en" | "ar";

type FilterLabels = {
  title: string;
  family: string;
  gender: string;
  intensity: string;
  price: string;
  size: string;
  year: string;
  clear: string;
  open: string;
  close: string;
  apply: string;
  genders: Record<GenderFilter, string>;
  intensities: Record<IntensityFilter, string>;
  sizes: Record<SizeFilter, string>;
};

export function Filters({
  initial,
  locale,
  labels,
  resultCount,
}: {
  initial: CatalogueFilters;
  locale: Locale;
  labels: FilterLabels;
  resultCount: number;
}): React.JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const buildQuery = useCallback(
    (next: Partial<CatalogueFilters>): string => {
      const params = new URLSearchParams(searchParams.toString());
      const f: CatalogueFilters = { ...initial, ...next };

      const setOrDelete = (key: string, value: string | undefined): void => {
        if (value && value.length > 0) params.set(key, value);
        else params.delete(key);
      };

      setOrDelete(
        "family",
        f.families.length > 0 ? f.families.join(",") : undefined,
      );
      setOrDelete(
        "gender",
        f.genders.length > 0 ? f.genders.join(",") : undefined,
      );
      setOrDelete(
        "intensity",
        f.intensities.length > 0 ? f.intensities.join(",") : undefined,
      );
      setOrDelete(
        "size",
        f.sizes.length > 0 ? f.sizes.join(",") : undefined,
      );
      setOrDelete(
        "priceMin",
        f.priceMin !== PRICE_FLOOR ? String(f.priceMin) : undefined,
      );
      setOrDelete(
        "priceMax",
        f.priceMax !== PRICE_CEIL ? String(f.priceMax) : undefined,
      );
      setOrDelete(
        "yearMin",
        f.yearMin !== YEAR_FLOOR ? String(f.yearMin) : undefined,
      );
      setOrDelete(
        "yearMax",
        f.yearMax !== YEAR_CEIL ? String(f.yearMax) : undefined,
      );

      const qs = params.toString();
      return qs ? `?${qs}` : "";
    },
    [initial, searchParams],
  );

  const push = useCallback(
    (next: Partial<CatalogueFilters>): void => {
      const qs = buildQuery(next);
      router.push(`${pathname}${qs}`, { scroll: false });
    },
    [buildQuery, pathname, router],
  );

  const toggleFamily = (f: Family): void => {
    const has = initial.families.includes(f);
    const families = has
      ? initial.families.filter((x) => x !== f)
      : [...initial.families, f];
    push({ families });
  };
  const toggleGender = (g: GenderFilter): void => {
    const has = initial.genders.includes(g);
    const genders = has
      ? initial.genders.filter((x) => x !== g)
      : [...initial.genders, g];
    push({ genders });
  };
  const toggleIntensity = (i: IntensityFilter): void => {
    const has = initial.intensities.includes(i);
    const intensities = has
      ? initial.intensities.filter((x) => x !== i)
      : [...initial.intensities, i];
    push({ intensities });
  };
  const toggleSize = (s: SizeFilter): void => {
    const has = initial.sizes.includes(s);
    const sizes = has
      ? initial.sizes.filter((x) => x !== s)
      : [...initial.sizes, s];
    push({ sizes });
  };

  const clearAll = (): void => {
    router.push(pathname, { scroll: false });
  };

  const hasActive = useMemo(
    () =>
      initial.families.length > 0 ||
      initial.genders.length > 0 ||
      initial.intensities.length > 0 ||
      initial.sizes.length > 0 ||
      initial.priceMin !== PRICE_FLOOR ||
      initial.priceMax !== PRICE_CEIL ||
      initial.yearMin !== YEAR_FLOOR ||
      initial.yearMax !== YEAR_CEIL,
    [initial],
  );

  const intensityLabelKey = (i: IntensityFilter): string => labels.intensities[i];

  const body = (
    <div className="flex flex-col gap-[var(--space-6)]">
      <FilterSection title={labels.family}>
        <div className="flex flex-wrap gap-[var(--space-2)]">
          {FAMILY_KEYS.map((f) => {
            const label =
              locale === "es"
                ? FAMILIES[f].label_es
                : locale === "ar"
                  ? FAMILIES[f].label_ar
                  : FAMILIES[f].label_en;
            return (
              <FilterChip
                key={f}
                label={label}
                active={initial.families.includes(f)}
                onClick={() => toggleFamily(f)}
              />
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title={labels.gender}>
        <div className="flex flex-wrap gap-[var(--space-2)]">
          {ALL_GENDERS.map((g) => (
            <FilterChip
              key={g}
              label={labels.genders[g]}
              active={initial.genders.includes(g)}
              onClick={() => toggleGender(g)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title={labels.intensity}>
        <div className="flex flex-wrap gap-[var(--space-2)]">
          {ALL_INTENSITIES.map((i) => (
            <FilterChip
              key={i}
              label={intensityLabelKey(i)}
              active={initial.intensities.includes(i)}
              onClick={() => toggleIntensity(i)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title={labels.price}>
        <RangeSlider
          min={PRICE_FLOOR}
          max={PRICE_CEIL}
          step={10}
          value={[initial.priceMin, initial.priceMax]}
          onChange={([min, max]) => push({ priceMin: min, priceMax: max })}
          formatValue={(n) => `€ ${n}`}
          ariaLabelMin={`${labels.price} min`}
          ariaLabelMax={`${labels.price} max`}
        />
      </FilterSection>

      <FilterSection title={labels.size}>
        <div className="flex flex-wrap gap-[var(--space-2)]">
          {ALL_SIZES.map((s) => (
            <FilterChip
              key={s}
              label={labels.sizes[s]}
              active={initial.sizes.includes(s)}
              onClick={() => toggleSize(s)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title={labels.year}>
        <RangeSlider
          min={YEAR_FLOOR}
          max={YEAR_CEIL}
          step={1}
          value={[initial.yearMin, initial.yearMax]}
          onChange={([min, max]) => push({ yearMin: min, yearMax: max })}
          formatValue={(n) => String(n)}
          ariaLabelMin={`${labels.year} min`}
          ariaLabelMax={`${labels.year} max`}
        />
      </FilterSection>

      {hasActive && (
        <button
          type="button"
          onClick={clearAll}
          className="small-caps inline-flex items-center justify-center gap-2 border border-[var(--ink-500)] py-[var(--space-3)] text-[var(--text-xs)] tracking-[0.16em] text-[var(--ink-200)] hover:border-[var(--gold-200)] hover:text-[var(--gold-100)] transition-colors duration-[var(--duration-quick)]"
        >
          {labels.clear}
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="small-caps inline-flex items-center gap-2 border border-[var(--ink-500)] px-[var(--space-4)] py-[var(--space-3)] text-[var(--text-xs)] tracking-[0.16em] text-[var(--ink-200)] hover:border-[var(--gold-200)] hover:text-[var(--gold-100)] lg:hidden"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span>{labels.open}</span>
        {hasActive && (
          <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--gold-200)]" />
        )}
      </button>

      {/* Desktop sticky sidebar */}
      <aside
        className="hidden w-[280px] shrink-0 lg:sticky lg:top-[120px] lg:block lg:self-start"
        aria-label={labels.title}
      >
        {body}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={labels.title}>
          <button
            type="button"
            aria-label={labels.close}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-[var(--obsidian-400)]/70 backdrop-blur-sm"
          />
          <div
            className={cn(
              "absolute inset-y-0 right-0 flex h-full w-[88%] max-w-[420px] flex-col",
              "bg-[var(--obsidian-300)] p-[var(--space-5)]",
              "overflow-y-auto",
            )}
          >
            <div className="mb-[var(--space-5)] flex items-center justify-between">
              <span className="small-caps text-[var(--text-xs)] tracking-[0.16em] text-[var(--ink-200)]">
                {labels.title}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="small-caps text-[var(--text-xs)] tracking-[0.16em] text-[var(--ink-300)] hover:text-[var(--gold-100)]"
              >
                {labels.close}
              </button>
            </div>
            {body}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="small-caps mt-[var(--space-6)] inline-flex items-center justify-center gap-2 bg-[var(--gold-200)] py-[var(--space-4)] text-[var(--text-xs)] tracking-[0.16em] text-[var(--obsidian-400)] hover:bg-[var(--gold-100)]"
            >
              {labels.apply} ({resultCount})
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): React.JSX.Element {
  const [open, setOpen] = useState(true);
  return (
    <section className="flex flex-col gap-[var(--space-3)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between text-left"
        aria-expanded={open}
      >
        <span className="small-caps text-[var(--text-xs)] tracking-[0.16em] text-[var(--ink-200)]">
          {title}
        </span>
        <span
          aria-hidden
          className={cn(
            "inline-block text-[var(--ink-400)] transition-transform duration-[var(--duration-quick)] ease-[var(--ease-soft-expo)]",
            open ? "rotate-90" : "rotate-0",
          )}
        >
          ›
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </section>
  );
}
