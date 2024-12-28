import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.strict,
  ...tsEslint.configs.stylistic,
  {
    files: [
      "src/*.{mts,ts}",
      "src/**/*.{mts,ts}",
      "tests/*.{mts,ts}",
      "tests/**/*.{mts,ts}",
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        projectService: true,
        project: "./tsconfig.json",
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      /**
       *
       * Disable rules
       *
       */
      "@typescript-eslint/consistent-indexed-object-style": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      /**
       *
       * Enable rules
       *
       */
      "@typescript-eslint/explicit-module-boundary-types": "error",
      // NOTE: If `@typescript-eslint/require-await` is enabled, `require-await` must be disabled
      // https://typescript-eslint.io/rules/require-await/#how-to-use
      "require-await": "off",
      "@typescript-eslint/require-await": "error",
      // NOTE: If `@typescript-eslint/no-empty-function` is enabled, `no-empty-function` must be disabled
      // https://typescript-eslint.io/rules/no-empty-function/#how-to-use
      "no-empty-function": "off",
      "@typescript-eslint/no-empty-function": "warn",
      "import/order": [
        "warn",
        {
          alphabetize: { order: "asc" },
          "newlines-between": "always",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  // NOTE: Files specified in `ignores` are globally ignored by ESLint.
  //       Reference: https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
  {
    ignores: [
      "dist",
      "node_modules",
      ".vscode",
      "package.json",
      "vitest.config.mjs",
      "docs",
      "examples",
    ],
  }
);
