#!/usr/bin/env node

import { Command } from "commander";
import { consola } from "consola";

import {
  checkPluginInstallation,
  findEslintConfigFiles,
  installNewPlugin,
  migrateEslintConfigFile,
  migrateEslintDisableComments,
  PACKAGE_MANGER_VALUES,
  readPackageJson,
  selectPackageManager,
  uninstallOldPlugin
} from "./migration-lib";


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
    "Starting migration from eslint-cdk-plugin to eslint-plugin-awscdk"
  );

  const projectRoot = process.cwd();

  // 1. Determine package manager
  const selectedResult = await selectPackageManager(options);
  if (selectedResult.type === "error") {
    consola.error(selectedResult.message);
    process.exit(1);
  }
  const packageManager = selectedResult.value;
  consola.info(`Package manager: ${packageManager}`);

  // 2. Read package.json
  const packageJson = readPackageJson(projectRoot);
  if (!packageJson) {
    console.error("Failed to read package.json");
    process.exit(1);
  }

  // 3. Check eslint-cdk-plugin installation
  const installType = checkPluginInstallation(packageJson);
  if (!installType) {
    consola.info("eslint-cdk-plugin is not installed");
    return;
  }

  // 4. Uninstall eslint-cdk-plugin
  uninstallOldPlugin(packageManager, installType === "devDependencies");

  // 5. Install eslint-plugin-awscdk
  installNewPlugin(packageManager, installType === "devDependencies");

  // 6. Find ESLint config files
  const configFiles = findEslintConfigFiles(projectRoot);
  if (!configFiles.length) {
    consola.warn("No ESLint config files found");
    return;
  }

  // 7. Migrate ESLint config files
  for (const configFile of configFiles) {
    migrateEslintConfigFile(configFile);
  }

  // 8. Migrate eslint-disable comments
  migrateEslintDisableComments(projectRoot);
}

main()
  .then(() => consola.success("Migration completed successfully!"))
  .catch((error) => {
    consola.error("Migration failed:", error);
    process.exit(1);
  });
