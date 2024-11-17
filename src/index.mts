import { noConstructStackSuffix } from "./no-construct-stack-suffix.mjs";
import { noImportPrivate } from "./no-import-private.mjs";
import { noParentNameConstructIdMatch } from "./no-parent-name-construct-id-match.mjs";
import { pascalCaseConstructId } from "./pascal-case-construct-id.mjs";

const plugin = {
  rules: {
    "no-import-private": noImportPrivate,
    "pascal-case-construct-id": pascalCaseConstructId,
    "no-parent-name-construct-id-match": noParentNameConstructIdMatch,
    "no-construct-stack-suffix": noConstructStackSuffix,
  },
};

export default plugin;
