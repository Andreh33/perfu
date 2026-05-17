"use server";
// Mock newsletter subscription endpoint. Validates email via Zod and returns
// a simple { ok, error } shape.
//
// TODO Fase 10/12: wire to Resend / Mailgun (whatever the client picks).
// Replace the inner body of `subscribeToNewsletter` with the real call.
// Recommended:
//   - Resend (https://resend.com) — `resend.contacts.create({ email })`.
//   - Mailgun  — `client.lists.members.createMember(list, { address: email })`.
// Keep the same return shape so the client form stays unchanged.

import { z } from "zod";

const schema = z.object({
  email: z.string().trim().toLowerCase().email(),
});

export type NewsletterResult =
  | { ok: true }
  | { ok: false; error: "invalid" };

export async function subscribeToNewsletter(
  _prev: NewsletterResult | null,
  formData: FormData,
): Promise<NewsletterResult> {
  const parsed = schema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { ok: false, error: "invalid" };
  }

  // Simulate I/O so the UI gets to show its in-flight state.
  await new Promise((r) => setTimeout(r, 320));

  return { ok: true };
}
