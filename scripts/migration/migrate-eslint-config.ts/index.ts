import consola from "consola";
import { Result, RESULT_TYPE } from "../result";
import { findEslintConfigFiles } from "./find-file";
import { migrateEslintConfigFileContent } from "./migrate-content";

export const migrateEslintConfig = (projectRoot: string): Result<void> => {
  consola.start("Migrating ESLint config files...");
  
  const configFiles = findEslintConfigFiles(projectRoot);
  if (configFiles.length) {
    for (const configFile of configFiles) {
      migrateEslintConfigFileContent(configFile);
    }
    return {
      type: RESULT_TYPE.SUCCESS,
      message: "ESLint config migration completed",
    };
  } else {
    return {
      type: RESULT_TYPE.ERROR,
      message: "ESLint config files not found",
    };
  }
};
