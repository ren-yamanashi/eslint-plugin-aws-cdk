import { readFileSync } from "node:fs";
import path from "node:path";

import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import { nodeExternals } from "rollup-plugin-node-externals";

const pkgPath = path.resolve(process.cwd(), "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));

const config = defineConfig([
  {
    input: "src/index.ts",
    output: [
      {
        format: "cjs",
        dir: path.dirname(pkg.main),
        preserveModules: true,
        preserveModulesRoot: "src",
        interop: "auto",
        exports: "auto",
        sourcemap: true,
        entryFileNames: "[name].cjs",
      },
      {
        format: "esm",
        dir: path.dirname(pkg.module),
        preserveModules: true,
        preserveModulesRoot: "src",
        interop: "auto",
        exports: "auto",
        sourcemap: true,
        generatedCode: "es2015",
        entryFileNames: "[name].mjs",
      },
    ],
    plugins: [
      nodeExternals({ deps: true, packagePath: pkgPath }),
      nodeResolve({
        extensions: [".ts"],
      }),
      esbuild({
        target: "es2021",
        jsx: "automatic",
      }),
      commonjs(),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: pkg.types, format: "esm" }],
    plugins: [dts()],
  },
]);

export default config;
