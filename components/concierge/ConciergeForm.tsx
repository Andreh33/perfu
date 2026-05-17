"use client";
// Concierge contact form — compact 4-field variant of BespokeForm.

import { useActionState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { submitConciergeMessage } from "@/app/_actions/concierge";
import type { ConciergeResult } from "@/lib/schemas/concierge";
import { cn } from "@/lib/cn";

const fieldBase =
  "w-full border-0 border-b border-[var(--ink-300)] bg-transparent py-3 text-[var(--ink-100)] placeholder:text-[var(--ink-400)] outline-none transition-colors duration-[var(--duration-quick)] focus:border-[var(--gold-200)]";
const labelBase =
  "font-body uppercase tracking-[0.12em] text-[var(--text-xs)] font-medium text-[var(--ink-300)]";

interface ConciergeFormProps {
  initialSubject?: string;
}

export function ConciergeForm({ initialSubject = "" }: ConciergeFormProps) {
  const t = useTranslations("concierge");
  const tErr = useTranslations("concierge.form.errors");

  const [state, action, isPending] = useActionState<
    ConciergeResult | null,
    FormData
  >(submitConciergeMessage, null);

  const formId = useId();
  const errs = state && state.ok === false ? state.errors : {};

  if (state && state.ok === true) {
    return (
      <motion.div
        role="status"
        aria-live="polite"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="border border-[var(--gold-200)]/40 px-[var(--space-6)] py-[var(--space-7)]"
      >
        <p className="font-display italic text-[var(--text-2xl)] leading-[1.25] text-[var(--gold-100)]">
          {t("success", { ref: state.reference })}
        </p>
      </motion.div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      className="flex w-full flex-col gap-[var(--space-6)]"
    >
      <div className="flex flex-col gap-[var(--space-2)]">
        <label htmlFor={`${formId}-name`} className={labelBase}>
          {t("form.name")}
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          className={fieldBase}
        />
        {errs.name ? (
          <p className="font-body text-xs text-[var(--accent-rose)]">
            {tErr("name")}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-[var(--space-2)]">
        <label htmlFor={`${formId}-email`} className={labelBase}>
          {t("form.email")}
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldBase}
        />
        {errs.email ? (
          <p className="font-body text-xs text-[var(--accent-rose)]">
            {tErr("email")}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-[var(--space-2)]">
        <label htmlFor={`${formId}-subject`} className={labelBase}>
          {t("form.subject")}
        </label>
        <input
          id={`${formId}-subject`}
          name="subject"
          type="text"
          required
          defaultValue={initialSubject}
          className={fieldBase}
        />
        {errs.subject ? (
          <p className="font-body text-xs text-[var(--accent-rose)]">
            {tErr("subject")}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-[var(--space-2)]">
        <label htmlFor={`${formId}-message`} className={labelBase}>
          {t("form.message")}
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={6}
          className={cn(fieldBase, "resize-none leading-[1.55]")}
        />
        {errs.message ? (
          <p className="font-body text-xs text-[var(--accent-rose)]">
            {tErr("message")}
          </p>
        ) : null}
      </div>

      <div className="pt-[var(--space-2)]">
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "group inline-flex items-center justify-center gap-3 font-body text-[var(--text-sm)] tracking-[0.16em] uppercase font-medium",
            "bg-[var(--gold-200)] text-[var(--obsidian-400)] hover:bg-[var(--gold-100)]",
            "px-7 py-4 transition-[background,opacity] disabled:opacity-60",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isPending ? "pending" : "idle"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              {isPending ? t("form.sending") : t("form.submit")}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </form>
  );
}
