import { consola } from "consola";
import { Result, RESULT_TYPE } from "../result";
import { checkPluginInstallation } from "./check-installation";
import { installPackage, uninstallPackage } from "./install";
import { readPackageJson } from "./package-json";
import { selectPackageManager } from "./package-manager";

const uninstallTarget = "eslint-cdk-plugin";
const installTarget = "eslint-plugin-awscdk";

export const migratePlugin = async (
  options: { packageManager?: string },
  projectRoot: string
): Promise<Result<void>> => {
  const packageManager = await selectPackageManager(options);
  if (packageManager.type === RESULT_TYPE.ERROR) return packageManager;
  packageManager.message && consola.info(packageManager.message);

  const packageJson = readPackageJson(projectRoot);
  if (packageJson.type === RESULT_TYPE.ERROR) return packageJson;

  const installTypes = checkPluginInstallation(packageJson.value);
  if (installTypes.type === RESULT_TYPE.ERROR) return installTypes;

  for (const installType of installTypes.value) {
    const isDev = installType === "devDependencies";

    const uninstallResult = uninstallPackage(
      packageManager.value,
      uninstallTarget,
      isDev
    );
    if (uninstallResult.type === RESULT_TYPE.ERROR) return uninstallResult;
    uninstallResult.message && consola.info(uninstallResult.message);

    const installResult = installPackage(
      packageManager.value,
      installTarget,
      isDev
    );
    if (installResult.type === RESULT_TYPE.ERROR) return installResult;
    installResult.message && consola.info(installResult.message);
  }

  return {
    type: RESULT_TYPE.SUCCESS,
    message: "Migration completed successfully",
  };
};
