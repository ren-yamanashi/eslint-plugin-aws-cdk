import { consola } from "consola";
import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";

export const PACKAGE_MANGER = {
  NPM: "npm",
  YARN: "yarn",
  PNPM: "pnpm",
} as const;

export const PACKAGE_MANGER_VALUES = Object.values(PACKAGE_MANGER);

export type PackageManager =
  (typeof PACKAGE_MANGER)[keyof typeof PACKAGE_MANGER];

export interface PackageJson {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export const ESLINT_CONFIG_PATTERNS = [
  "eslint.config.mjs",
  "eslint.config.cjs",
  "eslint.config.js",
  "eslint.config.ts",
  "eslint.config.mts",
  "eslint.config.cts",
] as const;

/**
 * Select the package manager to use
 * - If options.packageManager is provided, validate it and return
 * - If not provided, prompt the user to select one
 */
export const selectPackageManager = async (options: {
  packageManager?: string;
}): Promise<
  | {
      type: "success";
      value: PackageManager;
    }
  | {
      type: "error";
      message: string;
    }
> => {
  // NOTE: When options.packageManager is not provided, prompt the user
  if (!options.packageManager) {
    const res = await consola.prompt("Which package manager are you using?", {
      type: "select",
      options: [
        { label: PACKAGE_MANGER.NPM, value: PACKAGE_MANGER.NPM },
        { label: PACKAGE_MANGER.YARN, value: PACKAGE_MANGER.YARN },
        { label: PACKAGE_MANGER.PNPM, value: PACKAGE_MANGER.PNPM },
      ],
    });
    return {
      type: "success",
      value: res,
    };
  }

  // NOTE: When options.packageManager is provided, validate it
  if (
    !PACKAGE_MANGER_VALUES.includes(options.packageManager as PackageManager)
  ) {
    return {
      type: "error",
      message: `Invalid package manager: ${
        options.packageManager
      }. Must be one of: ${PACKAGE_MANGER_VALUES.join(", ")}`,
    };
  }
  return {
    type: "success",
    value: options.packageManager as PackageManager,
  };
};

export const readPackageJson = (projectRoot: string): PackageJson | null => {
  const packageJsonPath = path.join(projectRoot, "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    consola.error("package.json not found");
    return null;
  }

  try {
    const content = fs.readFileSync(packageJsonPath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    consola.error("Failed to read package.json:", error);
    return null;
  }
};

/**
 * Check if eslint-cdk-plugin is installed in dependencies or devDependencies
 */
export const checkPluginInstallation = (
  packageJson: PackageJson
): "devDependencies" | "dependencies" | null => {
  if (packageJson.devDependencies?.["eslint-cdk-plugin"]) {
    return "devDependencies";
  }
  if (packageJson.dependencies?.["eslint-cdk-plugin"]) {
    return "dependencies";
  }
  return null;
};

export const findEslintConfigFiles = (projectRoot: string): string[] => {
  return ESLINT_CONFIG_PATTERNS.reduce<string[]>((acc, pattern) => {
    const filePath = path.join(projectRoot, pattern);
    return fs.existsSync(filePath) ? [...acc, filePath] : acc;
  }, []);
};

/**
 * Migrate ESLint config file content
 */
export const migrateEslintConfigContent = (
  content: string
): {
  content: string;
  modified: boolean;
} => {
  let modifiedContent = content;
  let modified = false;

  // Replace import statements
  if (modifiedContent.includes('"eslint-cdk-plugin"')) {
    modifiedContent = modifiedContent.replace(
      /"eslint-cdk-plugin"/g,
      '"eslint-plugin-awscdk"'
    );
    modified = true;
  }
  if (modifiedContent.includes("'eslint-cdk-plugin'")) {
    modifiedContent = modifiedContent.replace(
      /'eslint-cdk-plugin'/g,
      "'eslint-plugin-awscdk'"
    );
    modified = true;
  }

  // Replace plugins property: cdk: -> awscdk:
  // Match pattern like "cdk: cdkPlugin" within plugins object
  // Supports both single-line and multi-line plugins objects
  // [\s\S] matches any character including newlines
  const pluginPropertyRegex =
    /(\bplugins\s*:\s*\{[\s\S]*?\b)(cdk)(\s*:\s*[a-zA-Z_$])/g;
  if (modifiedContent.match(pluginPropertyRegex)) {
    modifiedContent = modifiedContent.replace(
      pluginPropertyRegex,
      "$1awscdk$3"
    );
    modified = true;
  }

  // Replace rules: "cdk/xxx" -> "awscdk/xxx"
  if (modifiedContent.includes('"cdk/')) {
    modifiedContent = modifiedContent.replace(/"cdk\//g, '"awscdk/');
    modified = true;
  }
  if (modifiedContent.includes("'cdk/")) {
    modifiedContent = modifiedContent.replace(/'cdk\//g, "'awscdk/");
    modified = true;
  }

  return {
    content: modifiedContent,
    modified,
  };
};

export const migrateEslintDisableCommentsContent = (
  content: string
): {
  content: string;
  modified: boolean;
} => {
  let modifiedContent = content;

  // Replace cdk/ with awscdk/ in eslint-disable comments
  modifiedContent = modifiedContent.replace(
    /\/\*\s*eslint-disable(-next-line|-line)?\s+cdk\//g,
    (match) => match.replace(/cdk\//, "awscdk/")
  );

  modifiedContent = modifiedContent.replace(
    /\/\/\s*eslint-disable(-next-line|-line)?\s+cdk\//g,
    (match) => match.replace(/cdk\//, "awscdk/")
  );

  return {
    content: modifiedContent,
    modified: content !== modifiedContent,
  };
};

export const uninstallOldPlugin = (
  packageManager: PackageManager,
  isDev: boolean
): void => {
  consola.start("Uninstalling eslint-cdk-plugin...");

  const command = (() => {
    const devFlag = isDev ? "-D" : "";
    switch (packageManager) {
      case PACKAGE_MANGER.NPM:
        return `npm uninstall ${devFlag} eslint-cdk-plugin`.trim();
      case PACKAGE_MANGER.YARN:
        return `yarn remove ${devFlag} eslint-cdk-plugin`.trim();
      case PACKAGE_MANGER.PNPM:
        return `pnpm remove ${devFlag} eslint-cdk-plugin`.trim();
    }
  })();

  try {
    execSync(command, { stdio: "inherit" });
    consola.success("Successfully uninstalled eslint-cdk-plugin");
  } catch (error) {
    consola.error("Failed to uninstall:", error);
    throw error;
  }
};

export const installNewPlugin = (
  packageManager: PackageManager,
  isDev: boolean
): void => {
  consola.start("Installing eslint-plugin-awscdk...");

  const command = (() => {
    const devFlag = isDev ? "-D" : "";
    switch (packageManager) {
      case PACKAGE_MANGER.NPM:
        return `npm install ${devFlag} eslint-plugin-awscdk`.trim();
      case PACKAGE_MANGER.YARN:
        return `yarn add ${devFlag} eslint-plugin-awscdk`.trim();
      case PACKAGE_MANGER.PNPM:
        return `pnpm add ${devFlag} eslint-plugin-awscdk`.trim();
    }
  })();

  try {
    execSync(command, { stdio: "inherit" });
    consola.success("Successfully installed eslint-plugin-awscdk");
  } catch (error) {
    consola.error("Failed to install:", error);
    throw error;
  }
};

export const migrateEslintConfigFile = (filePath: string): void => {
  consola.start(`Migrating ${path.basename(filePath)}...`);

  const content = fs.readFileSync(filePath, "utf-8");
  const result = migrateEslintConfigContent(content);

  if (result.modified) {
    fs.writeFileSync(filePath, result.content, "utf-8");
    consola.success(`Successfully migrated ${path.basename(filePath)}`);
  } else {
    consola.info(`No changes needed for ${path.basename(filePath)}`);
  }
};

export const migrateEslintDisableComments = (projectRoot: string): void => {
  consola.start("Migrating eslint-disable comments...");

  try {
    // Find all files with cdk/ in eslint-disable comments
    const grepCommand = `grep -rl "eslint-disable.*cdk/" ${projectRoot} --exclude-dir=node_modules --exclude-dir=dist || true`;
    const files = execSync(grepCommand, { encoding: "utf-8" })
      .trim()
      .split("\n")
      .filter((f) => f);

    if (!files.length || (files.length === 1 && files[0] === "")) return;

    for (const file of files) {
      if (!file) continue;
      const content = fs.readFileSync(file, "utf-8");
      const result = migrateEslintDisableCommentsContent(content);
      if (result.modified) fs.writeFileSync(file, result.content, "utf-8");
    }

    consola.success("Successfully migrated eslint-disable comments");
  } catch (error) {
    consola.warn(
      "Error occurred while migrating eslint-disable comments:",
      error
    );
  }
};
