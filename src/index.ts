import { noClassInInterface } from "./rules/no-class-in-interface";
import { noConstructStackSuffix } from "./rules/no-construct-stack-suffix";
import { noImportPrivate } from "./rules/no-import-private";
import { noMutablePropsInterface } from "./rules/no-mutable-props-interface";
import { noMutablePublicFields } from "./rules/no-mutable-public-fields";
import { noParentNameConstructIdMatch } from "./rules/no-parent-name-construct-id-match";
import { noPublicClassFields } from "./rules/no-public-class-fields";
import { noVariableConstructId } from "./rules/no-variable-construct-id";
import { pascalCaseConstructId } from "./rules/pascal-case-construct-id";
import { propsNameConvention } from "./rules/props-name-convention";
import { requireJSDoc } from "./rules/require-jsdoc";
import { requirePassingThis } from "./rules/require-passing-this";
import { requirePropsDefaultDoc } from "./rules/require-props-default-doc";

const rules = {
  "no-class-in-interface": noClassInInterface,
  "no-construct-stack-suffix": noConstructStackSuffix,
  "no-parent-name-construct-id-match": noParentNameConstructIdMatch,
  "no-public-class-fields": noPublicClassFields,
  "pascal-case-construct-id": pascalCaseConstructId,
  "no-mutable-public-fields": noMutablePublicFields,
  "no-mutable-props-interface": noMutablePropsInterface,
  "require-passing-this": requirePassingThis,
  "no-variable-construct-id": noVariableConstructId,
  "require-jsdoc": requireJSDoc,
  "require-props-default-doc": requirePropsDefaultDoc,
  "props-name-convention": propsNameConvention,
  "no-import-private": noImportPrivate,
};

const configs = {
  recommended: {
    plugins: ["cdk"],
    rules: {
      "cdk/no-class-in-interface": "error",
      "cdk/no-construct-stack-suffix": "error",
      "cdk/no-parent-name-construct-id-match": "error",
      "cdk/no-public-class-fields": "error",
      "cdk/pascal-case-construct-id": "error",
      "cdk/require-passing-this": [
        "error",
        { allowNonThisAndDisallowScope: true },
      ],
      "cdk/no-variable-construct-id": "error",
      "cdk/no-mutable-public-fields": "warn",
      "cdk/no-mutable-props-interface": "warn",
    },
  },
  strict: {
    plugins: ["cdk"],
    rules: {
      "cdk/no-class-in-interface": "error",
      "cdk/no-construct-stack-suffix": "error",
      "cdk/no-parent-name-construct-id-match": "error",
      "cdk/no-public-class-fields": "error",
      "cdk/pascal-case-construct-id": "error",
      "cdk/require-passing-this": "error",
      "cdk/no-variable-construct-id": "error",
      "cdk/no-mutable-public-fields": "error",
      "cdk/no-mutable-props-interface": "error",
      "cdk/no-import-private": "error",
      "cdk/require-props-default-doc": "error",
      "cdk/props-name-convention": "error",
      "cdk/require-jsdoc": "error",
    },
  },
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
