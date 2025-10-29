#!/usr/bin/env node

import { Command } from "commander";
import { consola } from "consola";
import { colorize } from "consola/utils";
import { execEslintFixCommand } from "./exec-fix-command/index.ts";
import { migrateEslintConfig } from "./migrate-eslint-config/index.ts";
import { installPlugin } from "./migrate-plugin/install.ts";
import {
  PACKAGE_MANGER_VALUES,
  selectPackageManager,
} from "./migrate-plugin/select-package-manager.ts";
import { uninstallPlugin } from "./migrate-plugin/uninstall.ts";
import { RESULT_TYPE } from "./result";

const program = new Command();

program
  .name("migration")
  .description("Migrate from eslint-cdk-plugin to eslint-plugin-awscdk")
  .version("1.0.0")
  .option(
    "-p, --package-manager <manager>",
    `Specify package manager (${PACKAGE_MANGER_VALUES.join(", ")})`
  )
  .parse(process.argv);

const options = program.opts<{
  packageManager?: string;
}>();

const main = async () => {
  consola.box(
    `Starting migration from ${colorize(
      "black",
      "eslint-cdk-plugin"
    )} to ${colorize("green", "eslint-plugin-awscdk")}`
  );
  const projectRoot = process.cwd();

  // 1. Select package manager
  const packageManager = await selectPackageManager(options);
  if (packageManager.type === RESULT_TYPE.ERROR) {
    consola.error(packageManager.message);
    process.exit(1);
  }

  // 2. Install eslint-plugin-awscdk
  const installResult = installPlugin(packageManager.value);
  if (installResult.type === RESULT_TYPE.ERROR) {
    consola.error(installResult.message);
    process.exit(1);
  }

  // 3. Migrate ESLint config files
  const migrateConfigResult = migrateEslintConfig(projectRoot);
  if (migrateConfigResult.type === RESULT_TYPE.ERROR) {
    consola.error(migrateConfigResult.message);
    process.exit(1);
  }

  // 4. Uninstall eslint-cdk-plugin
  const uninstallResult = await uninstallPlugin(
    packageManager.value,
    projectRoot
  );
  if (uninstallResult.type === RESULT_TYPE.ERROR) {
    consola.error(uninstallResult.message);
    process.exit(1);
  }

  // 5. Migrate disable comments
  const migrateCommentsResult = execEslintFixCommand();
  if (migrateCommentsResult.type === RESULT_TYPE.ERROR) {
    consola.error(migrateCommentsResult.message);
    process.exit(1);
  }
  migrateCommentsResult.message && consola.warn(migrateCommentsResult.message);

  consola.success("All migration steps completed successfully!");
};

main();
