#!/usr/bin/env node

import { Command } from "commander";
import { consola } from "consola";

import { migrateEslintDisableComments } from "./migrate-disable-comment/index.ts";
import { migrateEslintConfig } from "./migrate-eslint-config.ts";
import { migratePlugin } from "./migrate-plugin";
import { PACKAGE_MANGER_VALUES } from "./migrate-plugin/package-manager";
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
    "Starting migration from eslint-cdk-plugin to eslint-plugin-awscdk"
  );
  const projectRoot = process.cwd();

  // 1. Migrate plugin (eslint-cdk-plugin -> eslint-plugin-awscdk)
  const migratePluginResult = await migratePlugin(options, projectRoot);
  if (migratePluginResult.type === RESULT_TYPE.ERROR) {
    consola.error(migratePluginResult.message);
    process.exit(1);
  }
  migratePluginResult.message && consola.info(migratePluginResult.message);

  // 2. Migrate ESLint config files
  const migrateConfigResult = migrateEslintConfig(projectRoot);
  if (migrateConfigResult.type === RESULT_TYPE.ERROR) {
    consola.error(migrateConfigResult.message);
    process.exit(1);
  }
  migrateConfigResult.message && consola.info(migrateConfigResult.message);

  // 3. Migrate eslint-disable comments
  const migrateCommentResult = migrateEslintDisableComments(projectRoot);
  if (migrateCommentResult.type === RESULT_TYPE.ERROR) {
    consola.warn(migrateCommentResult.message);
    process.exit();
  }
  migrateCommentResult.message && consola.info(migrateCommentResult.message);

  consola.success("All migration steps completed successfully!");
};

main();
