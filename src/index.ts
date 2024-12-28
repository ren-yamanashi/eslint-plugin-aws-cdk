import { noClassInInterface } from "./no-class-in-interface.js";
import { noConstructStackSuffix } from "./no-construct-stack-suffix.js";
import { noImportPrivate } from "./no-import-private.js";
import { noMutablePropsInterface } from "./no-mutable-props-interface.js";
import { noMutablePublicFields } from "./no-mutable-public-fields.js";
import { noParentNameConstructIdMatch } from "./no-parent-name-construct-id-match.js";
import { noPublicClassFields } from "./no-public-class-fields.js";
import { noVariableConstructId } from "./no-variable-construct-id.js";
import { pascalCaseConstructId } from "./pascal-case-construct-id.js";
import { requirePassingThis } from "./require-passing-this.js";

const plugin = {
  rules: {
    "no-class-in-interface": noClassInInterface,
    "no-construct-stack-suffix": noConstructStackSuffix,
    "no-parent-name-construct-id-match": noParentNameConstructIdMatch,
    "no-public-class-fields": noPublicClassFields,
    "pascal-case-construct-id": pascalCaseConstructId,
    "no-mutable-public-fields": noMutablePublicFields,
    "no-mutable-props-interface": noMutablePropsInterface,
    "require-passing-this": requirePassingThis,
    "no-variable-construct-id": noVariableConstructId,
    "no-import-private": noImportPrivate,
  },
  configs: {
    recommended: {
      plugins: ["cdk"],
      rules: {
        "cdk/no-class-in-interface": "error",
        "cdk/no-construct-stack-suffix": "error",
        "cdk/no-parent-name-construct-id-match": "error",
        "cdk/no-public-class-fields": "error",
        "cdk/pascal-case-construct-id": "error",
        "cdk/require-passing-this": "error",
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
      },
    },
  },
};

export default plugin;
