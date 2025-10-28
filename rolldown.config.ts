import { defineConfig } from "rolldown";

export default defineConfig({
  input: "scripts/migration/index.ts",
  output: {
    dir: "bin/migration",
    format: "esm",
    minify: true,
    sourcemap: false,
  },
  treeshake: true,
});
