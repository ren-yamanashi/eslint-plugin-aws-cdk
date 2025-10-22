import { Result, RESULT_TYPE } from "../result";
import { PackageJson } from "./package-json";

/**
 * Check if eslint-cdk-plugin is installed in dependencies or devDependencies
 */
export const checkPluginInstallation = (
  packageJson: PackageJson
): Result<("devDependencies" | "dependencies")[]> => {
  const inDependencies = packageJson.dependencies?.["eslint-cdk-plugin"];
  const inDevDependencies = packageJson.devDependencies?.["eslint-cdk-plugin"];

  if (inDependencies && inDevDependencies) {
    return {
      type: RESULT_TYPE.SUCCESS,
      value: ["devDependencies", "dependencies"],
    };
  }

  if (inDevDependencies) {
    return {
      type: RESULT_TYPE.SUCCESS,
      value: ["devDependencies"],
    };
  }

  if (inDependencies) {
    return {
      type: RESULT_TYPE.SUCCESS,
      value: ["dependencies"],
    };
  }

  return {
    type: RESULT_TYPE.ERROR,
    message: "eslint-cdk-plugin is not installed",
  };
};
