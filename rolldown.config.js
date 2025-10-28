import { defineConfig } from "rolldown";

export default defineConfig({
  input: "scripts/migration/index.ts",
  output: {
    file: "bin/migration.mjs",
    format: "esm",
    minify: true,
    sourcemap: false,
    inlineDynamicImports: true,
  },
  platform: "node",
  treeshake: true,
});
