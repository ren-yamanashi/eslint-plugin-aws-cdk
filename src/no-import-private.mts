import * as path from "path";

import { Rule } from "eslint";

/**
 * Split the directory path into segments (split at `/`)
 * @param dirPath - The directory path to split
 * @returns The segments of the directory path
 */
const getDirSegments = (dirPath: string): string[] => {
  return dirPath.split(path.sep).filter((segment) => segment !== "");
};

export const noImportPrivate: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Cannot import modules from private dir at different levels of the hierarchy.",
    },
    messages: {
      noImportPrivate:
        "Cannot import modules from private dir at different levels of the hierarchy.",
    },
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value?.toString() ?? "";
        const currentFilePath = context.filename;
        const currentDirPath = path.dirname(currentFilePath);

        if (importPath.includes("/private")) {
          const absoluteCurrentDirPath = path.resolve(currentDirPath);
          const absoluteImportPath = path.resolve(currentDirPath, importPath);

          // NOTE: Get the directory from the import path up to the private directory
          const importDirBeforePrivate =
            absoluteImportPath.split("/private")[0];

          const currentDirSegments = getDirSegments(absoluteCurrentDirPath);
          const importDirSegments = getDirSegments(importDirBeforePrivate);
          if (
            currentDirSegments.some(
              (segment, index) => segment !== importDirSegments[index]
            )
          ) {
            context.report({ node, messageId: "noImportPrivate" });
          }
        }
      },
    };
  },
};
