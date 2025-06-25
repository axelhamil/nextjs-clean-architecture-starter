import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["node_modules", "dist"],
    environment: "node",
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
    },
  },
});
