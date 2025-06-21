import { loadEnvConfig } from "@next/env";
import { z } from "@packages/libs";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("3000"),
});

export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;
