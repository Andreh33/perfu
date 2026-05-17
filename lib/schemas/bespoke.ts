import { z } from "zod";

// Olfactive families allowed in the bespoke form (matches the seven families
// in §4 of the brief). Kept as a tuple so the Zod enum below is type-narrow.
export const BESPOKE_FAMILIES = [
  "floral",
  "amber",
  "oud",
  "woody",
  "chypre",
  "leather",
  "aquatic",
] as const;

export type BespokeFamily = (typeof BESPOKE_FAMILIES)[number];

export const BESPOKE_BUDGETS = ["low", "mid", "high", "top"] as const;
export type BespokeBudget = (typeof BESPOKE_BUDGETS)[number];

export const BESPOKE_TIMELINES = ["q1", "q2", "q3", "none"] as const;
export type BespokeTimeline = (typeof BESPOKE_TIMELINES)[number];

export const bespokeSchema = z.object({
  name: z.string().trim().min(2, "name").max(120),
  email: z.string().trim().toLowerCase().email("email"),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal(""))
    .transform((value) => (value && value.length > 0 ? value : undefined)),
  families: z
    .array(z.enum(BESPOKE_FAMILIES))
    .min(1, "families")
    .max(BESPOKE_FAMILIES.length),
  budget: z.enum(BESPOKE_BUDGETS),
  timeline: z.enum(BESPOKE_TIMELINES),
  message: z.string().trim().min(10, "message").max(2000),
});

export type BespokeInput = z.input<typeof bespokeSchema>;
export type BespokeData = z.output<typeof bespokeSchema>;

export type BespokeErrorField =
  | "name"
  | "email"
  | "phone"
  | "families"
  | "budget"
  | "timeline"
  | "message"
  | "generic";

export type BespokeResult =
  | { ok: true; ref: string }
  | { ok: false; errors: Partial<Record<BespokeErrorField, true>> };
