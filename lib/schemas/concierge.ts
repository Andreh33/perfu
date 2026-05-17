import { z } from "zod";

export const conciergeSchema = z.object({
  name: z.string().trim().min(2, "name").max(120),
  email: z.string().trim().toLowerCase().email("email"),
  subject: z.string().trim().min(2, "subject").max(180),
  message: z.string().trim().min(10, "message").max(2000),
});

export type ConciergeData = z.output<typeof conciergeSchema>;

export type ConciergeErrorField =
  | "name"
  | "email"
  | "subject"
  | "message"
  | "generic";

export type ConciergeResult =
  | { ok: true; reference: string }
  | { ok: false; errors: Partial<Record<ConciergeErrorField, true>> };
