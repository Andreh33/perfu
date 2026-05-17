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
            "fixed bottom-[var(--space-5)] left-[var(--space-5)] z-[90]",
            "max-w-[380px] border border-[var(--ink-500)] bg-[var(--obsidian-200)]",
            "px-[var(--space-4)] py-[var(--space-4)]",
            "text-[var(--ink-200)] shadow-none",
          )}
        >
          <p className="font-body text-[var(--text-sm)] leading-[1.55]">
            {t("body")}
          </p>
          <div className="mt-[var(--space-3)]">
            <button
              type="button"
              onClick={dismiss}
              className={cn(
                "font-body text-xs font-medium uppercase tracking-[0.16em]",
                "text-[var(--ink-100)] hover:text-[var(--gold-100)]",
                "transition-colors duration-[var(--duration-quick)]",
                "border-b border-[var(--ink-400)] hover:border-[var(--gold-200)] pb-1",
              )}
            >
              {t("persist")}
            </button>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
