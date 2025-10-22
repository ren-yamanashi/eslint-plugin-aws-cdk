import { consola } from "consola";
import { execSync } from "node:child_process";
import * as fs from "node:fs";
import { Result, RESULT_TYPE } from "../result";

export const migrateEslintDisableComments = (
  projectRoot: string
): Result<void> => {
  consola.start("Migrating eslint-disable comments...");

  try {
    // Find all files with cdk/ in eslint-disable comments
    const grepCommand = `grep -rl "eslint-disable.*cdk/" ${projectRoot} --exclude-dir=node_modules --exclude-dir=dist || true`;
    const files = execSync(grepCommand, { encoding: "utf-8" })
      .trim()
      .split("\n")
      .filter((f) => f);

    if (!files.length || (files.length === 1 && files[0] === ""))
      return {
        type: RESULT_TYPE.SUCCESS,
        message: "No eslint-disable comments to migrate",
      };

    for (const file of files) {
      if (!file) continue;
      const content = fs.readFileSync(file, "utf-8");
      const result = migrateEslintDisableCommentsContent(content);
      if (result.modified) fs.writeFileSync(file, result.content, "utf-8");
    }

    return {
      type: RESULT_TYPE.SUCCESS,
      message: "Successfully migrated eslint-disable comments",
    };
  } catch (error) {
    return {
      type: RESULT_TYPE.ERROR,
      message: `Error occurred while migrating eslint-disable comments: ${error}`,
    };
  }
};

const migrateEslintDisableCommentsContent = (
  content: string
): {
  content: string;
  modified: boolean;
} => {
  let modifiedContent = content;

  // Replace cdk/ with awscdk/ in eslint-disable comments
  modifiedContent = modifiedContent.replace(
    /\/\*\s*eslint-disable(-next-line|-line)?\s+cdk\//g,
    (match) => match.replace(/cdk\//, "awscdk/")
  );

  modifiedContent = modifiedContent.replace(
    /\/\/\s*eslint-disable(-next-line|-line)?\s+cdk\//g,
    (match) => match.replace(/cdk\//, "awscdk/")
  );

  return {
    content: modifiedContent,
    modified: content !== modifiedContent,
  };
};
