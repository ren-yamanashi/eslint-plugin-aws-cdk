import * as fs from "node:fs";
import * as path from "node:path";
import { Result, RESULT_TYPE } from "../result";

export const migrateEslintConfigFileContent = (filePath: string): Result<void> => {
  const content = fs.readFileSync(filePath, "utf-8");
  const result = migrateEslintConfigContent(content);

  if (result.modified) {
    fs.writeFileSync(filePath, result.content, "utf-8");
    return {
      type: RESULT_TYPE.SUCCESS,
      message: `Successfully migrated ${path.basename(filePath)}`,
    }
  } else {
    return {
      type: RESULT_TYPE.SUCCESS,
      message: `No changes needed for ${path.basename(filePath)}`,
    }
  }
};

const migrateEslintConfigContent = (
  content: string
): {
  content: string;
  modified: boolean;
} => {
  let modifiedContent = content;
  let modified = false;

  // Replace import statements
  if (modifiedContent.includes('"eslint-cdk-plugin"')) {
    modifiedContent = modifiedContent.replace(
      /"eslint-cdk-plugin"/g,
      '"eslint-plugin-awscdk"'
    );
    modified = true;
  }
  if (modifiedContent.includes("'eslint-cdk-plugin'")) {
    modifiedContent = modifiedContent.replace(
      /'eslint-cdk-plugin'/g,
      "'eslint-plugin-awscdk'"
    );
    modified = true;
  }

  // NOTE: Replace plugins property: cdk: -> awscdk:
  // Match pattern like "cdk: cdkPlugin" within plugins object
  const pluginsPropertyRegex =
    /(\bplugins\s*:\s*\{[\s\S]*?\b)(cdk)(\s*:\s*[a-zA-Z_$])/g;
  if (modifiedContent.match(pluginsPropertyRegex)) {
    modifiedContent = modifiedContent.replace(
      pluginsPropertyRegex,
      "$1awscdk$3"
    );
    modified = true;
  }

  // Replace rules: "cdk/xxx" -> "awscdk/xxx"
  if (modifiedContent.includes('"cdk/')) {
    modifiedContent = modifiedContent.replace(/"cdk\//g, '"awscdk/');
    modified = true;
  }
  if (modifiedContent.includes("'cdk/")) {
    modifiedContent = modifiedContent.replace(/'cdk\//g, "'awscdk/");
    modified = true;
  }

  return {
    content: modifiedContent,
    modified,
  };
};
