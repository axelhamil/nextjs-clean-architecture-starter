import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  CORS_ORIGIN: z.string(),
  DATABASE_URL: z.string(),
  NODE_ENV: z.string(),
  PORT: z.string().default("3000"),
});

export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;
