"use client";
// Client component: needs router push, pathname, click-outside & keyboard handling.

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

type LocaleCode = (typeof routing.locales)[number];

const LOCALE_KEYS: ReadonlyArray<LocaleCode> = routing.locales;

export function LocaleSwitcher() {
  const t = useTranslations("locale_switcher");
  const active = useLocale() as LocaleCode;
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const close = useCallback(() => {
    setOpen(false);
    setFocusedIndex(-1);
  }, []);

  // Click outside closes the menu.
  useEffect(() => {
    if (!open) return;
    function onPointer(event: MouseEvent) {
      const target = event.target;
      if (
        rootRef.current &&
        target instanceof Node &&
        !rootRef.current.contains(target)
      ) {
        close();
      }
    }
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open, close]);

  // Move DOM focus when the focused index changes (keyboard nav).
  useEffect(() => {
    if (!open || focusedIndex < 0) return;
    itemRefs.current[focusedIndex]?.focus();
  }, [focusedIndex, open]);

  function onTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
      setFocusedIndex(0);
    }
  }

  function onMenuKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((idx) => (idx + 1) % LOCALE_KEYS.length);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex(
        (idx) => (idx - 1 + LOCALE_KEYS.length) % LOCALE_KEYS.length,
      );
    }
  }

  function selectLocale(next: LocaleCode) {
    close();
    if (next === active) return;
    // Preserve current pathname; createNavigation handles prefix rewriting.
    router.replace(pathname, { locale: next });
  }

  return (
    <div ref={rootRef} className="relative inline-flex">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("label")}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "flex h-9 w-9 items-center justify-center gap-[3px]",
          "text-[var(--ink-200)] transition-colors duration-200",
          "hover:text-[var(--gold-100)] focus-visible:text-[var(--gold-100)]",
          "focus-visible:outline-none",
        )}
      >
        <span className="h-[3px] w-[3px] rounded-full bg-current" />
        <span className="h-[3px] w-[3px] rounded-full bg-current" />
        <span className="h-[3px] w-[3px] rounded-full bg-current" />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label={t("label")}
          onKeyDown={onMenuKeyDown}
          className={cn(
            "absolute top-full right-0 mt-[var(--space-3)] z-50",
            "min-w-[160px] border border-[var(--ink-500)]",
            "bg-[var(--obsidian-300)]/95 backdrop-blur-md",
            "py-[var(--space-2)]",
          )}
        >
          {LOCALE_KEYS.map((code, index) => {
            const isActive = code === active;
            return (
              <button
                key={code}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                role="menuitemradio"
                aria-checked={isActive}
                type="button"
                onClick={() => selectLocale(code)}
                className={cn(
                  "group relative flex w-full items-center gap-[var(--space-3)]",
                  "px-[var(--space-5)] py-[var(--space-2)]",
                  "font-body text-xs uppercase tracking-[0.16em]",
                  "transition-colors duration-200",
                  "focus-visible:outline-none",
                  isActive
                    ? "text-[var(--gold-200)]"
                    : "text-[var(--ink-200)] hover:text-[var(--gold-100)] focus-visible:text-[var(--gold-100)]",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-block h-[5px] w-[5px] rounded-full transition-opacity",
                    isActive
                      ? "bg-[var(--gold-200)] opacity-100"
                      : "bg-current opacity-0",
                  )}
                />
                <span>{t(code)}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
