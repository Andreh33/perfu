"use client";
// Client component: needs DOM event listeners (Escape, body scroll lock) and
// the `motion` library for staggered clip-path entrance.

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link as I18nLink } from "@/i18n/navigation";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  closeLabel: string;
  links: ReadonlyArray<{ href: string; label: string; key: string }>;
}

export function MobileMenu({ open, onClose, closeLabel, links }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("overflow-hidden");

    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[var(--obsidian-400)]/95 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label={closeLabel}
            onClick={onClose}
            className="absolute top-[var(--space-5)] right-[var(--space-5)] h-10 w-10 cursor-pointer"
          >
            <span className="relative block h-full w-full">
              <span className="absolute top-1/2 left-1/2 block h-px w-[18px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[var(--ink-100)]" />
              <span className="absolute top-1/2 left-1/2 block h-px w-[18px] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-[var(--ink-100)]" />
            </span>
          </button>

          <nav
            className="flex h-full w-full items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col items-center gap-[var(--space-5)] px-[var(--space-5)]">
              {links.map((l, i) => (
                <li key={l.key} className="overflow-hidden">
                  <motion.div
                    initial={{ clipPath: "inset(100% 0 0 0)", y: 12 }}
                    animate={{ clipPath: "inset(0 0 0 0)", y: 0 }}
                    exit={{ clipPath: "inset(0 0 100% 0)", y: -8 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.12 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <I18nLink
                      href={l.href}
                      onClick={onClose}
                      className="font-display text-[var(--text-3xl)] italic leading-[0.95] tracking-[-0.02em] text-[var(--ink-100)] hover:text-[var(--gold-100)] transition-colors duration-[var(--duration-quick)]"
                    >
                      {l.label.toLowerCase()}
                    </I18nLink>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
