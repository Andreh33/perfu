"use server";
// Mock bespoke-commission lead capture.
//
// Validates with Zod (lib/schemas/bespoke.ts) and returns either
//   { ok: true, ref: "BSP-XXXX" }
//   { ok: false, errors: { <field>: true } }
//
// TODO Fase 12 · production:
//   - Hand the validated `data` to Resend (transactional email) or Mailgun:
//       const res = await fetch("https://api.resend.com/emails", {
//         method: "POST",
//         headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
//         body: JSON.stringify({
//           from: "atelier@perfumesdubai.com",
//           to: "concierge@perfumesdubai.com",
//           subject: `Bespoke · ${data.name} (${ref})`,
//           text: renderBody(data, ref),
//         }),
//       });
//   - Persist the lead in Vercel Postgres / Supabase so the concierge inbox
//     has a queryable record.
//   - Optionally notify the perfumer rota via Slack webhook.

import {
  BESPOKE_BUDGETS,
  BESPOKE_FAMILIES,
  BESPOKE_TIMELINES,
  bespokeSchema,
  type BespokeErrorField,
  type BespokeResult,
} from "@/lib/schemas/bespoke";
import { mintReference } from "@/lib/reference";

function pickAll(formData: FormData, key: string): Array<string> {
  return formData.getAll(key).filter((v): v is string => typeof v === "string");
}

export async function submitBespokeLead(
  _prev: BespokeResult | null,
  formData: FormData,
): Promise<BespokeResult> {
  const families = pickAll(formData, "families").filter((value) =>
    (BESPOKE_FAMILIES as readonly string[]).includes(value),
  );
  const budgetRaw = formData.get("budget");
  const timelineRaw = formData.get("timeline");
  const budget =
    typeof budgetRaw === "string" &&
    (BESPOKE_BUDGETS as readonly string[]).includes(budgetRaw)
      ? budgetRaw
      : undefined;
  const timeline =
    typeof timelineRaw === "string" &&
    (BESPOKE_TIMELINES as readonly string[]).includes(timelineRaw)
      ? timelineRaw
      : undefined;

  const candidate = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    families,
    budget,
    timeline,
    message: formData.get("message"),
  };

  const parsed = bespokeSchema.safeParse(candidate);

  if (!parsed.success) {
    const errors: Partial<Record<BespokeErrorField, true>> = {};
    for (const issue of parsed.error.issues) {
      const head = issue.path[0];
      if (typeof head === "string") {
        errors[head as BespokeErrorField] = true;
      }
    }
    return { ok: false, errors };
  }

  // Simulate I/O latency so the form's pending state is visible.
  await new Promise((r) => setTimeout(r, 380));

  return { ok: true, ref: mintReference("BSP", 4) };
}
