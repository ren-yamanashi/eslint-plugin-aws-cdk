import { execSync } from "child_process";
import { Result, RESULT_TYPE } from "../result";

export const execEslintFixCommand = (): Result<void> => {
  try {
    execSync("npx eslint --fix", { stdio: "inherit" });
    return {
      type: RESULT_TYPE.SUCCESS,
      message: "ESLint fix completed successfully",
    };
  } catch (error) {
    if (!error) {
      return {
        type: RESULT_TYPE.ERROR,
        message: `An unknown error occurred while running ESLint fix command
        
Please manually run 'npx eslint --fix' and check the configuration`,
      };
    }
    if (typeof error !== "object" || !("status" in error)) {
      return {
        type: RESULT_TYPE.ERROR,
        message: `Failed to run ESLint fix command
${error}

Please manually run 'npx eslint --fix' and check the configuration`,
      };
    }
    // Check if the error is from ESLint rule violations (exit code 1)
    // Exit code 1 means there are linting errors (some may not be auto-fixable)
    // Exit code 2 means configuration errors
    // see: https://eslint.org/docs/latest/use/command-line-interface#exit-codes
    const exitCode = (error as { status: number }).status;
    if (exitCode === 1) {
      // ESLint rule violations - this is expected and should be treated as success
      // because --fix has already applied auto-fixes
      return {
        type: RESULT_TYPE.SUCCESS,
        message: "ESLint fix found issues, some may require manual fixing",
      };
    }
    return {
      type: RESULT_TYPE.ERROR,
      message: `Failed to run ESLint fix command
${error}

Please manually run 'npx eslint --fix' and check the configuration`,
    };
  }
};
