"use client";
// Bespoke lead form — useActionState + underline-only inputs + success swap.

import { useActionState, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import {
  submitBespokeLead,
} from "@/app/_actions/bespoke";
import {
  BESPOKE_BUDGETS,
  BESPOKE_FAMILIES,
  BESPOKE_TIMELINES,
  type BespokeBudget,
  type BespokeFamily,
  type BespokeResult,
  type BespokeTimeline,
} from "@/lib/schemas/bespoke";
import { cn } from "@/lib/cn";

const fieldBase =
  "w-full border-0 border-b border-[var(--ink-300)] bg-transparent py-3 text-[var(--ink-100)] placeholder:text-[var(--ink-400)] outline-none transition-colors duration-[var(--duration-quick)] focus:border-[var(--gold-200)]";
const labelBase =
  "font-body uppercase tracking-[0.12em] text-[var(--text-xs)] font-medium text-[var(--ink-300)]";

export function BespokeForm() {
  const t = useTranslations("bespoke");
  const tErr = useTranslations("bespoke.form.errors");
  const tFam = useTranslations("bespoke.form.families_options");
  const tBudget = useTranslations("bespoke.form.budget_options");
  const tTime = useTranslations("bespoke.form.timeline_options");

  const [state, action, isPending] = useActionState<
    BespokeResult | null,
    FormData
  >(submitBespokeLead, null);

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
        className="border border-[var(--gold-200)]/40 px-[var(--space-6)] py-[var(--space-7)] text-[var(--ink-100)]"
      >
        <p className="font-display italic text-[var(--text-2xl)] leading-[1.25] text-[var(--gold-100)]">
          {t("success", { ref: state.ref })}
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
      {/* NAME */}
      <Field
        id={`${formId}-name`}
        label={t("form.name")}
        error={errs.name ? tErr("name") : undefined}
      >
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          className={fieldBase}
        />
      </Field>

      {/* EMAIL + PHONE */}
      <div className="grid gap-[var(--space-5)] md:grid-cols-2">
        <Field
          id={`${formId}-email`}
          label={t("form.email")}
          error={errs.email ? tErr("email") : undefined}
        >
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldBase}
          />
        </Field>
        <Field
          id={`${formId}-phone`}
          label={t("form.phone")}
          error={errs.phone ? tErr("phone") : undefined}
        >
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldBase}
          />
        </Field>
      </div>

      {/* FAMILIES — multi-check */}
      <fieldset className="flex flex-col gap-[var(--space-3)]">
        <legend className={labelBase}>{t("form.families")}</legend>
        <div className="grid grid-cols-2 gap-[var(--space-2)] md:grid-cols-4">
          {BESPOKE_FAMILIES.map((family: BespokeFamily) => (
            <label
              key={family}
              className="flex cursor-pointer items-center gap-[var(--space-2)] text-[var(--text-sm)] text-[var(--ink-200)] hover:text-[var(--ink-100)]"
            >
              <input
                type="checkbox"
                name="families"
                value={family}
                className="h-3 w-3 accent-[var(--gold-200)]"
              />
              <span>{tFam(family)}</span>
            </label>
          ))}
        </div>
        {errs.families ? (
          <p className="font-body text-xs text-[var(--accent-rose)]">
            {tErr("families")}
          </p>
        ) : null}
      </fieldset>

      {/* BUDGET + TIMELINE — two columns of radios */}
      <div className="grid gap-[var(--space-6)] md:grid-cols-2">
        <fieldset className="flex flex-col gap-[var(--space-3)]">
          <legend className={labelBase}>{t("form.budget")}</legend>
          <div className="flex flex-col gap-[var(--space-2)]">
            {BESPOKE_BUDGETS.map((budget: BespokeBudget) => (
              <label
                key={budget}
                className="flex cursor-pointer items-center gap-[var(--space-2)] text-[var(--text-sm)] text-[var(--ink-200)] hover:text-[var(--ink-100)]"
              >
                <input
                  type="radio"
                  name="budget"
                  value={budget}
                  className="h-3 w-3 accent-[var(--gold-200)]"
                />
                <span>{tBudget(budget)}</span>
              </label>
            ))}
          </div>
          {errs.budget ? (
            <p className="font-body text-xs text-[var(--accent-rose)]">
              {tErr("budget")}
            </p>
          ) : null}
        </fieldset>

        <fieldset className="flex flex-col gap-[var(--space-3)]">
          <legend className={labelBase}>{t("form.timeline")}</legend>
          <div className="flex flex-col gap-[var(--space-2)]">
            {BESPOKE_TIMELINES.map((timeline: BespokeTimeline) => (
              <label
                key={timeline}
                className="flex cursor-pointer items-center gap-[var(--space-2)] text-[var(--text-sm)] text-[var(--ink-200)] hover:text-[var(--ink-100)]"
              >
                <input
                  type="radio"
                  name="timeline"
                  value={timeline}
                  className="h-3 w-3 accent-[var(--gold-200)]"
                />
                <span>{tTime(timeline)}</span>
              </label>
            ))}
          </div>
          {errs.timeline ? (
            <p className="font-body text-xs text-[var(--accent-rose)]">
              {tErr("timeline")}
            </p>
          ) : null}
        </fieldset>
      </div>

      {/* MESSAGE */}
      <Field
        id={`${formId}-message`}
        label={t("form.message")}
        error={errs.message ? tErr("message") : undefined}
      >
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={5}
          className={cn(fieldBase, "resize-none leading-[1.55]")}
        />
      </Field>

      {/* SUBMIT */}
      <div className="flex flex-col gap-[var(--space-3)] pt-[var(--space-2)]">
        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "group inline-flex items-center justify-center gap-3 font-body text-[var(--text-sm)] tracking-[0.16em] uppercase font-medium",
            "bg-[var(--gold-200)] text-[var(--obsidian-400)] hover:bg-[var(--gold-100)]",
            "px-7 py-4 transition-[background,opacity]",
            "disabled:opacity-60",
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
        {errs.generic ? (
          <p className="font-body text-xs text-[var(--accent-rose)]">
            {tErr("generic")}
          </p>
        ) : null}
      </div>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-[var(--space-2)]">
      <label htmlFor={id} className={labelBase}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="font-body text-xs text-[var(--accent-rose)]">{error}</p>
      ) : null}
    </div>
  );
}
