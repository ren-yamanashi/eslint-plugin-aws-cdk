import * as fs from "node:fs";
import * as path from "node:path";
import { Result, RESULT_TYPE } from "../result";

export interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export const readPackageJson = (projectRoot: string): Result<PackageJson>=> {
  const packageJsonPath = path.join(projectRoot, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    return {
      type: RESULT_TYPE.ERROR,
      message: "package.json not found",
    }
  }

  try {
    const content = fs.readFileSync(packageJsonPath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    return {
      type: RESULT_TYPE.ERROR,
      message: `Failed to read package.json: ${error}`,
    }
  }
};
