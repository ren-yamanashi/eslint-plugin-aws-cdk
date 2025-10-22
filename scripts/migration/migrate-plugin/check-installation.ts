import { Result, RESULT_TYPE } from "../result";
import { PackageJson } from "./package-json";

/**
 * Check if eslint-cdk-plugin is installed in dependencies or devDependencies
 */
export const checkPluginInstallation = (
  packageJson: PackageJson
): Result<"devDependencies" | "dependencies"> => {
  if (packageJson.devDependencies?.["eslint-cdk-plugin"]) {
    return {
      type: RESULT_TYPE.SUCCESS,
      value: "devDependencies",
    };
  }
  if (packageJson.dependencies?.["eslint-cdk-plugin"]) {
    return {
      type: RESULT_TYPE.SUCCESS,
      value: "dependencies",
    };
  }
  return {
    type: RESULT_TYPE.ERROR,
    message: "eslint-cdk-plugin is not installed",
  };
};
