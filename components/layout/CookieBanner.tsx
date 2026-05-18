"use client";
// Client component: localStorage gate + delayed entrance.

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "pd-cookies-ack";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "1") return;
    const id = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          key="cookie-banner"
          role="region"
          aria-label="Cookie preferences"
          initial={{ clipPath: "inset(0 0 100% 0)", y: 12, opacity: 0 }}
          animate={{ clipPath: "inset(0 0 0 0)", y: 0, opacity: 1 }}
          exit={{ clipPath: "inset(0 0 100% 0)", y: 12, opacity: 0 }}
          transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "fixed bottom-[var(--space-4)] left-[var(--space-4)] right-[var(--space-4)] z-[90]",
            "flex flex-col gap-[var(--space-3)] sm:flex-row sm:items-center sm:justify-between sm:gap-[var(--space-5)]",
            "sm:right-auto sm:max-w-[420px]",
            "border border-[var(--ink-500)] bg-[var(--obsidian-200)]/95 backdrop-blur",
            "px-[var(--space-4)] py-[var(--space-3)]",
            "text-[var(--ink-200)] shadow-none",
          )}
        >
          <p className="font-body text-[12px] leading-[1.45] flex-1">
            {t("body")}
          </p>
          <div className="flex items-center gap-[var(--space-4)] shrink-0">
            <button
              type="button"
              onClick={dismiss}
              className={cn(
                "font-body text-[10px] font-medium uppercase tracking-[0.18em]",
                "text-[var(--gold-200)] hover:text-[var(--gold-100)]",
                "transition-colors duration-[var(--duration-quick)] whitespace-nowrap",
              )}
            >
              {t("persist")}
            </button>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="text-[var(--ink-300)] hover:text-[var(--ink-100)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 2 L12 12 M12 2 L2 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
