import { execSync } from "child_process";
import { Result, RESULT_TYPE } from "../result";

export const migrateDisableComments = (): Result<void> => {
  try {
    execSync(
      "npx eslint --rule 'awscdk/migrate-disable-comments: error' --fix",
      { stdio: "inherit" }
    );
    return {
      type: RESULT_TYPE.SUCCESS,
    };
  } catch (error) {
    return {
      type: RESULT_TYPE.ERROR,
      message: `Failed to migrate disable comments: ${error}`,
    };
  }
};
