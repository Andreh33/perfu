"use client";

// Client because the view + sort selectors mutate URL state on change.
import { useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { SortMode, ViewMode } from "@/lib/catalogue";
import { cn } from "@/lib/cn";

export function Toolbar({
  view,
  sort,
  labels,
}: {
  view: ViewMode;
  sort: SortMode;
  labels: {
    viewLabel: string;
    grid: string;
    list: string;
    sortLabel: string;
    sortOptions: Record<SortMode, string>;
  };
}): React.JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value.length > 0) params.set(key, value);
      else params.delete(key);
      const qs = params.toString();
      router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return (
    <div className="flex flex-wrap items-center gap-[var(--space-5)]">
      <div className="flex items-center gap-[var(--space-3)]">
        <span className="small-caps text-[var(--text-xs)] tracking-[0.16em] text-[var(--ink-400)]">
          {labels.viewLabel}
        </span>
        <ViewBtn
          label={labels.grid}
          active={view === "grid"}
          onClick={() => setParam("view", "grid")}
        />
        <span aria-hidden className="text-[var(--ink-500)]">·</span>
        <ViewBtn
          label={labels.list}
          active={view === "list"}
          onClick={() => setParam("view", view === "list" ? undefined : "list")}
        />
      </div>

      <div className="ms-auto flex items-center gap-[var(--space-3)]">
        <label
          htmlFor="atelier-sort"
          className="small-caps text-[var(--text-xs)] tracking-[0.16em] text-[var(--ink-400)]"
        >
          {labels.sortLabel}
        </label>
        <select
          id="atelier-sort"
          value={sort}
          onChange={(e) =>
            setParam("sort", e.target.value === "featured" ? undefined : e.target.value)
          }
          className="cursor-pointer bg-transparent text-[var(--text-sm)] text-[var(--ink-200)] outline-none hover:text-[var(--gold-100)]"
        >
          {(Object.entries(labels.sortOptions) as Array<[SortMode, string]>).map(
            ([k, v]) => (
              <option key={k} value={k} className="bg-[var(--obsidian-300)] text-[var(--ink-100)]">
                {v}
              </option>
            ),
          )}
        </select>
      </div>
    </div>
  );
}

function ViewBtn({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}): React.JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "small-caps text-[var(--text-xs)] tracking-[0.16em] transition-colors duration-[var(--duration-quick)]",
        active ? "text-[var(--gold-100)]" : "text-[var(--ink-300)] hover:text-[var(--ink-100)]",
      )}
    >
      {label}
    </button>
  );
}
