import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FAMILIES } from "@/lib/families";
import type { Perfume } from "@/lib/products";
import { NoteGlyph } from "./NoteGlyph";

/**
 * List view row for the LIST toggle. Server-renderable; no hover 3D —
 * the entry point of interaction is an underline-draw on the name and a
 * sliding arrow on the CTA.
 */
type Locale = "es" | "en" | "ar";

export function ProductRow({
  product,
  locale,
  labels,
}: {
  product: Perfume;
  locale: Locale;
  labels: {
    from: string;
    acquire: string;
    notes: string;
  };
}): React.JSX.Element {
  const family = FAMILIES[product.family];
  const familyLabel =
    locale === "es"
      ? family.label_es
      : locale === "ar"
        ? family.label_ar
        : family.label_en;
  const name =
    locale === "es"
      ? product.names.es
      : locale === "ar"
        ? product.names.ar
        : product.names.en;

  return (
    <article className="group/row flex flex-col gap-[var(--space-5)] border-t border-[var(--ink-500)] py-[var(--space-5)] md:flex-row md:items-stretch">
      <Link
        href={`/atelier/${product.slug}`}
        className="relative block h-[260px] w-full shrink-0 overflow-hidden bg-[var(--obsidian-200)] md:w-[200px]"
      >
        <Image
          src={product.images.bottle_primary}
          alt={`${product.names.en} · ${family.label_en} fragrance`}
          fill
          sizes="(max-width: 768px) 100vw, 200px"
          className="object-contain p-[var(--space-5)]"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-[var(--space-4)]">
        <div className="flex flex-col gap-[var(--space-3)]">
          <span
            className="small-caps text-[var(--gold-300)]"
            style={{ letterSpacing: "0.16em" }}
          >
            {familyLabel} · {product.year}
          </span>

          <h3 className="font-display italic text-[var(--text-3xl)] leading-[1.05] text-[var(--ink-100)]">
            <Link
              href={`/atelier/${product.slug}`}
              className="relative inline-block"
            >
              <span className="relative">
                {name}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--gold-200)] transition-transform duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)] group-hover/row:scale-x-100"
                />
              </span>
            </Link>
          </h3>

          <div className="flex flex-wrap items-center gap-[var(--space-4)]">
            <span className="small-caps text-[var(--text-xs)] text-[var(--ink-400)]">
              {labels.notes}
            </span>
            {product.notes.top.map((n) => {
              const noteName =
                locale === "es"
                  ? n.name_es
                  : locale === "ar"
                    ? n.name_ar
                    : n.name_en;
              return (
                <span
                  key={n.icon}
                  className="inline-flex items-center gap-1.5 text-[var(--ink-300)]"
                >
                  <NoteGlyph name={n.icon} size={18} />
                  <span className="text-[var(--text-xs)]">{noteName}</span>
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex items-end justify-between gap-3 border-t border-[var(--ink-500)] pt-[var(--space-4)]">
          <div className="flex flex-col">
            <span className="small-caps text-[var(--text-xs)] text-[var(--ink-400)]">
              {labels.from}
            </span>
            <span className="font-body text-[var(--text-md)] tabular-nums text-[var(--ink-100)]">
              € {product.prices.ml50}
            </span>
          </div>

          <Link
            href={`/atelier/${product.slug}`}
            className="group/cta inline-flex items-center gap-2 text-[var(--ink-100)] hover:text-[var(--gold-100)]"
          >
            <span className="small-caps text-[var(--text-xs)]">
              {labels.acquire}
            </span>
            <span
              aria-hidden
              className="inline-block transition-transform duration-[var(--duration-medium)] ease-[var(--ease-soft-expo)] group-hover/cta:translate-x-1 rtl:rotate-180 rtl:group-hover/cta:-translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
