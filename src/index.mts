import { noClassInInterfaceProps } from "./no-class-in-interface.mjs";
import { noConstructStackSuffix } from "./no-construct-stack-suffix.mjs";
import { noImportPrivate } from "./no-import-private.mjs";
import { noMutablePropsInterface } from "./no-mutable-props-interface.mjs";
import { noMutablePublicFields } from "./no-mutable-public-fields.mjs";
import { noParentNameConstructIdMatch } from "./no-parent-name-construct-id-match.mjs";
import { noPublicClassFields } from "./no-public-class-fields.mjs";
import { pascalCaseConstructId } from "./pascal-case-construct-id.mjs";

const plugin = {
  rules: {
    "no-class-in-interface": noClassInInterfaceProps,
    "no-construct-stack-suffix": noConstructStackSuffix,
    "no-import-private": noImportPrivate,
    "no-parent-name-construct-id-match": noParentNameConstructIdMatch,
    "no-public-class-fields": noPublicClassFields,
    "pascal-case-construct-id": pascalCaseConstructId,
    "no-mutable-public-fields": noMutablePublicFields,
    "no-mutable-props-interface": noMutablePropsInterface,
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
        "cdk/no-mutable-public-fields": "warn",
        "cdk/no-mutable-props-interface": "warn",
      },
    },
  },
};

export default plugin;
