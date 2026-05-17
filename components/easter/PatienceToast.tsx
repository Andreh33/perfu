"use client";
// Easter egg — when the user scrolls violently fast, a small bilingual
// reminder appears, asking them to slow down. Custom toast (not Sonner) so
// we control the typography precisely.

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useScrollVelocity } from "@/lib/hooks/useScrollVelocity";

export function PatienceToast() {
  const [show, setShow] = useState(false);

  useScrollVelocity(
    () => {
      setShow(true);
      window.setTimeout(() => setShow(false), 2000);
    },
    { threshold: 4000, sustain: 200, throttle: 10_000 },
  );

  return (
    <AnimatePresence>
      {show ? (
        <div
          aria-live="polite"
          className="pointer-events-none fixed inset-0 z-[9000] flex items-center justify-center"
        >
          <motion.div
            key="pd-patience"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="border border-[var(--gold-200)] bg-[var(--obsidian-100)]/95 px-[var(--space-6)] py-[var(--space-4)] backdrop-blur-sm"
          >
            <p className="flex items-baseline gap-[var(--space-4)] text-[var(--gold-100)]">
              <span
                className="font-arabic-display text-[var(--text-3xl)] italic leading-none"
                dir="rtl"
                lang="ar"
              >
                اصبر
              </span>
              <span
                aria-hidden
                className="block h-[20px] w-px bg-[var(--gold-200)] opacity-50"
              />
              <span className="font-display text-[var(--text-xl)] italic leading-none tracking-[-0.01em]">
                Be patient
              </span>
            </p>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
