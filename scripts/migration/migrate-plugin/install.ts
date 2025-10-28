import { consola } from "consola";
import { execSync } from "node:child_process";
import { Result, RESULT_TYPE } from "../result";
import { PACKAGE_MANGER, PackageManager } from "./select-package-manager";

export const installPlugin = (packageManager: PackageManager): Result<void> => {
  consola.start("Installing eslint-plugin-awscdk...");

  const command = (() => {
    switch (packageManager) {
      case PACKAGE_MANGER.NPM:
        return "npm install -D eslint-plugin-awscdk";
      case PACKAGE_MANGER.YARN:
        return "yarn add -D eslint-plugin-awscdk";
      case PACKAGE_MANGER.PNPM:
        return "pnpm install -D eslint-plugin-awscdk";
    }
  })();

  try {
    execSync(command, { stdio: "inherit" });
    return {
      type: RESULT_TYPE.SUCCESS,
      message: "Successfully installed eslint-plugin-awscdk",
    };
  } catch (error) {
    return {
      type: RESULT_TYPE.ERROR,
      message: `Failed to install eslint-plugin-awscdk: ${error}`,
    };
  }
};
