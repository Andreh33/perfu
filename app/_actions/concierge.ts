"use server";
// Mock concierge contact endpoint.
//
// Validates with Zod (lib/schemas/concierge.ts) and returns either
//   { ok: true, reference: "CNC-XXXX" }
//   { ok: false, errors: { <field>: true } }
//
// TODO Fase 12 · production:
//   - Same plumbing as `bespoke.ts`: forward `data` to Resend / Mailgun.
//   - Optionally fan out: route subjects starting with "Visit to" to the
//     boutique inbox, everything else to concierge@.

import {
  conciergeSchema,
  type ConciergeErrorField,
  type ConciergeResult,
} from "@/lib/schemas/concierge";
import { mintReference } from "@/lib/reference";

export async function submitConciergeMessage(
  _prev: ConciergeResult | null,
  formData: FormData,
): Promise<ConciergeResult> {
  const candidate = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  const parsed = conciergeSchema.safeParse(candidate);
  if (!parsed.success) {
    const errors: Partial<Record<ConciergeErrorField, true>> = {};
    for (const issue of parsed.error.issues) {
      const head = issue.path[0];
      if (typeof head === "string") {
        errors[head as ConciergeErrorField] = true;
      }
    }
    return { ok: false, errors };
  }

  await new Promise((r) => setTimeout(r, 320));

  return { ok: true, reference: mintReference("CNC", 4) };
}
