import { z } from "zod";

export const emailSchema = z
  .string()
  .email()
  .transform((email) => email.toLowerCase());

export const passwordSchema = z
  .string()
  .min(8)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  );

export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/)
  .transform((phone) => phone.replace(/\s+/g, ""));

export type Email = z.infer<typeof emailSchema>;
export type Password = z.infer<typeof passwordSchema>;
export type Phone = z.infer<typeof phoneSchema>;
