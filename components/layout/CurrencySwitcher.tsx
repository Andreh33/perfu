"use client";
// Client component: localStorage persistence + dropdown popover with keyboard nav.
// UI-only — does not affect prices (that wiring lands with the cart in Phase 10).

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Currency = "eur" | "usd" | "aed";
const CURRENCIES: ReadonlyArray<Currency> = ["eur", "usd", "aed"];
const STORAGE_KEY = "pd-currency";

function isCurrency(v: string | null): v is Currency {
  return v === "eur" || v === "usd" || v === "aed";
}

interface CurrencySwitcherProps {
  label: string;
  labels: Record<Currency, string>;
}

export function CurrencySwitcher({ label, labels }: CurrencySwitcherProps) {
  const [active, setActive] = useState<Currency>("eur");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isCurrency(saved)) setActive(saved);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      const target = event.target;
      if (
        rootRef.current &&
        target instanceof Node &&
        !rootRef.current.contains(target)
      ) {
        close();
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const select = (next: Currency) => {
    setActive(next);
    localStorage.setItem(STORAGE_KEY, next);
    close();
  };

  return (
    <div ref={rootRef} className="relative inline-flex">
      {/* aria-label is composed so the accessible name includes the
          visible text (e.g. "Currency: EUR"). This avoids the WCAG
          label-content-name-mismatch failure where the visible label
          ("EUR") is not part of the accessible name ("Currency"). */}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${label}: ${labels[active]}`}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "font-body text-xs font-medium uppercase tracking-[0.16em]",
          "text-[var(--ink-200)] hover:text-[var(--gold-100)] transition-colors duration-[var(--duration-quick)]",
        )}
      >
        {labels[active]}
      </button>

      {open ? (
        <div
          role="menu"
          aria-label={label}
          className={cn(
            "absolute bottom-full right-0 mb-[var(--space-3)] z-50",
            "min-w-[120px] border border-[var(--ink-500)]",
            "bg-[var(--obsidian-300)]/95 backdrop-blur-md",
            "py-[var(--space-2)]",
          )}
        >
          {CURRENCIES.map((code) => {
            const isActive = code === active;
            return (
              <button
                key={code}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => select(code)}
                className={cn(
                  "flex w-full items-center gap-[var(--space-3)]",
                  "px-[var(--space-5)] py-[var(--space-2)]",
                  "font-body text-xs uppercase tracking-[0.16em]",
                  "transition-colors duration-200",
                  isActive
                    ? "text-[var(--gold-200)]"
                    : "text-[var(--ink-200)] hover:text-[var(--gold-100)]",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-block h-[5px] w-[5px] rounded-full",
                    isActive ? "bg-[var(--gold-200)]" : "bg-transparent",
                  )}
                />
                <span>{labels[code]}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
