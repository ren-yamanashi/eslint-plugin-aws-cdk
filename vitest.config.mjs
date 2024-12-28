import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    root: "src",
    include: ["__tests__/**/*.test.ts"],
  },
});
