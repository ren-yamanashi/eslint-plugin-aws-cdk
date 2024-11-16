import { noConstructNameIdMatch } from "./no-construct-name-id-match";
import { noImportPrivate } from "./no-import-private.mjs";
import { pascalCaseConstructId } from "./pascal-case-construct-id.mjs";

const plugin = {
  rules: {
    "no-import-private": noImportPrivate,
    "pascal-case-construct-id": pascalCaseConstructId,
    "no-construct-name-id-match": noConstructNameIdMatch,
  },
};

export default plugin;
