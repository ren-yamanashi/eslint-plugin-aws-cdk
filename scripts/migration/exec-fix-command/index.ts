import { execSync } from "child_process";
import { Result, RESULT_TYPE } from "../result";

export const execEslintFixCommand = (): Result<void> => {
  try {
    execSync("npx eslint --fix", { stdio: "inherit" });
    return {
      type: RESULT_TYPE.SUCCESS,
    };
  } catch (error) {
    return {
      type: RESULT_TYPE.ERROR,
      message: `Failed to run ESLint fix command: ${error}
Please manually run 'npx eslint --fix'
      `,
    };
  }
};
