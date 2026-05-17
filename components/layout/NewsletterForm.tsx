"use client";
// Client component: useActionState + arrow→check morph + focus interplay.

import { useActionState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  subscribeToNewsletter,
  type NewsletterResult,
} from "@/app/_actions/newsletter";
import { cn } from "@/lib/cn";

interface NewsletterFormProps {
  placeholder: string;
  submitLabel: string;
  successLabel: string;
  errorLabel: string;
}

export function NewsletterForm({
  placeholder,
  submitLabel,
  successLabel,
  errorLabel,
}: NewsletterFormProps) {
  const [state, action, isPending] = useActionState<
    NewsletterResult | null,
    FormData
  >(subscribeToNewsletter, null);

  const success = state?.ok === true;
  const error = state?.ok === false ? state.error : null;

  return (
    <form action={action} className="flex w-full max-w-[460px] flex-col gap-[var(--space-3)]">
      <div className="relative flex items-end gap-[var(--space-4)]">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={placeholder}
          aria-label={placeholder}
          aria-invalid={error ? "true" : undefined}
          className={cn(
            "peer flex-1 border-0 border-b border-[var(--ink-300)] bg-transparent",
            "py-3 text-[var(--ink-100)] placeholder:text-[var(--ink-400)]",
            "outline-none transition-colors duration-[var(--duration-quick)]",
            "focus:border-[var(--gold-200)]",
          )}
        />
        <button
          type="submit"
          aria-label={submitLabel}
          disabled={isPending || success}
          className={cn(
            "relative flex h-10 w-10 items-center justify-center",
            "text-[var(--ink-100)] hover:text-[var(--gold-100)]",
            "transition-colors duration-[var(--duration-quick)] disabled:opacity-60",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {success ? (
              <motion.svg
                key="check"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <path d="M4 12 L10 18 L20 6" />
              </motion.svg>
            ) : (
              <motion.svg
                key="arrow"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 4 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              >
                <line x1="4" y1="12" x2="20" y2="12" />
                <path d="M14 6 L20 12 L14 18" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "min-h-[1.25rem] font-body text-xs tracking-[0.04em] transition-colors duration-200",
          success
            ? "text-[var(--gold-100)]"
            : error
              ? "text-[var(--accent-rose)]"
              : "text-transparent",
        )}
      >
        {success ? successLabel : error ? errorLabel : "—"}
      </p>
    </form>
  );
}
