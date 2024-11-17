import { noImportPrivate } from "./no-import-private.mjs";
import { noParentNameChildIdMatch } from "./no-parent-name-child-id-match.mjs";
import { pascalCaseConstructId } from "./pascal-case-construct-id.mjs";

const plugin = {
  rules: {
    "no-import-private": noImportPrivate,
    "pascal-case-construct-id": pascalCaseConstructId,
    "no-parent-name-child-id-match": noParentNameChildIdMatch,
  },
};

export default plugin;
