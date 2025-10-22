import { consola } from "consola";
import { execSync } from "node:child_process";
import { Result, RESULT_TYPE } from "../result";
import { PACKAGE_MANGER, PackageManager } from "./package-manager";

export const uninstallPackage = (
  packageManager: PackageManager,
  packageName: string,
  isDev: boolean
): Result<void> => {
  consola.start(`Uninstalling ${packageName}...`);

  const command = (() => {
    const devFlag = isDev ? " -D" : "";
    switch (packageManager) {
      case PACKAGE_MANGER.NPM:
        return `npm uninstall${devFlag} ${packageName}`;
      case PACKAGE_MANGER.YARN:
        return `yarn remove${devFlag} ${packageName}`;
      case PACKAGE_MANGER.PNPM:
        return `pnpm remove${devFlag} ${packageName}`;
    }
  })();

  try {
    execSync(command, { stdio: "inherit" });
    return {
      type: RESULT_TYPE.SUCCESS,
      message: `Successfully uninstalled ${packageName}`,
    };
  } catch (error) {
    return {
      type: RESULT_TYPE.ERROR,
      message: `Failed to uninstall ${packageName}: ${error}`,
    };
  }
};

export const installPackage = (
  packageManager: PackageManager,
  packageName: string,
  isDev: boolean
): Result<void> => {
  consola.start(`Installing ${packageName}...`);

  const command = (() => {
    const devFlag = isDev ? " -D" : "";
    switch (packageManager) {
      case PACKAGE_MANGER.NPM:
        return `npm install${devFlag} ${packageName}`.trim();
      case PACKAGE_MANGER.YARN:
        return `yarn add${devFlag} ${packageName}`.trim();
      case PACKAGE_MANGER.PNPM:
        return `pnpm install${devFlag} ${packageName}`.trim();
    }
  })();

  try {
    execSync(command, { stdio: "inherit" });
    return {
      type: RESULT_TYPE.SUCCESS,
      message: `Successfully installed ${packageName}`,
    };
  } catch (error) {
    return {
      type: RESULT_TYPE.ERROR,
      message: `Failed to install ${packageName}: ${error}`,
    };
  }
};
