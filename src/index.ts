import tsParser from "@typescript-eslint/parser";

import { name, version } from "../package.json";

import { constructConstructorProperty } from "./rules/construct-constructor-property";
import { noConstructInInterface } from "./rules/no-construct-in-interface";
import { noConstructStackSuffix } from "./rules/no-construct-stack-suffix";
import { noImportPrivate } from "./rules/no-import-private";
import { noMutablePropsInterface } from "./rules/no-mutable-props-interface";
import { noMutablePublicPropertyOfConstruct } from "./rules/no-mutable-public-property-of-construct";
import { noParentNameConstructIdMatch } from "./rules/no-parent-name-construct-id-match";
import { noPublicClassFields } from "./rules/no-public-class-fields";
import { noVariableConstructId } from "./rules/no-variable-construct-id";
import { pascalCaseConstructId } from "./rules/pascal-case-construct-id";
import { propsNameConvention } from "./rules/props-name-convention";
import { requireJSDoc } from "./rules/require-jsdoc";
import { requirePassingThis } from "./rules/require-passing-this";
import { requirePropsDefaultDoc } from "./rules/require-props-default-doc";

const rules = {
  "no-construct-in-interface": noConstructInInterface,
  "no-construct-stack-suffix": noConstructStackSuffix,
  "no-parent-name-construct-id-match": noParentNameConstructIdMatch,
  "no-public-class-fields": noPublicClassFields,
  "pascal-case-construct-id": pascalCaseConstructId,
  "require-passing-this": requirePassingThis,
  "no-variable-construct-id": noVariableConstructId,
  "no-mutable-public-property-of-construct": noMutablePublicPropertyOfConstruct,
  "no-mutable-props-interface": noMutablePropsInterface,
  "construct-constructor-property": constructConstructorProperty,
  "require-jsdoc": requireJSDoc,
  "require-props-default-doc": requirePropsDefaultDoc,
  "props-name-convention": propsNameConvention,
  "no-import-private": noImportPrivate,
};

const cdkPlugin = {
  meta: { name, version },
  rules,
};

const createFlatConfig = (rules: Record<string, unknown>) => {
  return {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      cdk: cdkPlugin,
    },
    rules,
  };
};

const recommended = createFlatConfig({
  "cdk/no-construct-in-interface": "error",
  "cdk/no-construct-stack-suffix": "error",
  "cdk/no-parent-name-construct-id-match": [
    "error",
    { disallowContainingParentName: false },
  ],
  "cdk/no-public-class-fields": "error",
  "cdk/pascal-case-construct-id": "error",
  "cdk/require-passing-this": ["error", { allowNonThisAndDisallowScope: true }],
  "cdk/no-variable-construct-id": "error",
  "cdk/no-mutable-public-property-of-construct": "warn",
  "cdk/no-mutable-props-interface": "warn",
  "cdk/construct-constructor-property": "error",
});

const strict = createFlatConfig({
  "cdk/no-construct-in-interface": "error",
  "cdk/no-construct-stack-suffix": "error",
  "cdk/no-parent-name-construct-id-match": [
    "error",
    { disallowContainingParentName: true },
  ],
  "cdk/no-public-class-fields": "error",
  "cdk/pascal-case-construct-id": "error",
  "cdk/require-passing-this": "error",
  "cdk/no-variable-construct-id": "error",
  "cdk/no-mutable-public-property-of-construct": "error",
  "cdk/no-mutable-props-interface": "error",
  "cdk/construct-constructor-property": "error",
  "cdk/require-jsdoc": "error",
  "cdk/require-props-default-doc": "error",
  "cdk/props-name-convention": "error",
  "cdk/no-import-private": "error",
});

const configs = {
  recommended,
  strict,
};

export { configs, rules };

export interface EslintCdkPlugin {
  rules: typeof rules;
  configs: typeof configs;
}

const eslintCdkPlugin: EslintCdkPlugin = {
  rules,
  configs,
};

export default eslintCdkPlugin;
