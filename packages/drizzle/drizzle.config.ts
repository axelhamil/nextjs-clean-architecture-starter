import { resolve } from "node:path";
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: resolve(__dirname, "../../.env") });

if (!process.env.DATABASE_URL)
  throw new Error("DATABASE_URL is not defined in root .env file");

export default defineConfig({
  schema: "./src/schema/*",
  out: "./migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
  dialect: "postgresql",
});
