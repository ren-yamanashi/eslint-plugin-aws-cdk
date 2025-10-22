import { consola } from "consola";
import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { migratePlugin } from "../../migrate-plugin/index";
import {
  PACKAGE_MANGER,
  PACKAGE_MANGER_VALUES,
} from "../../migrate-plugin/package-manager";
import { ErrorResult, RESULT_TYPE, SuccessResult } from "../../result";

vi.mock("node:child_process");
vi.mock("consola");

describe("migratePlugin", () => {
  const testDir = path.join(__dirname, "test-temp-migrate-plugin");
  const packageJsonPath = path.join(testDir, "package.json");

  beforeEach(() => {
    vi.clearAllMocks();
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe.each(PACKAGE_MANGER_VALUES)("when using %s", (packageManager) => {
    const createUninstallCommand = (isDev: boolean) =>
      packageManager === PACKAGE_MANGER.NPM
        ? `npm uninstall ${isDev ? "-D " : ""}eslint-cdk-plugin`
        : `${packageManager} remove ${isDev ? "-D " : ""}eslint-cdk-plugin`;

    const createInstallCommand = (isDev: boolean) =>
      packageManager === PACKAGE_MANGER.YARN
        ? `yarn add ${isDev ? "-D " : ""}eslint-plugin-awscdk`
        : `${packageManager} install ${isDev ? "-D " : ""}eslint-plugin-awscdk`;

    it("should successfully migrate plugin from devDependencies", async () => {
      vi.mocked(execSync).mockReturnValue("" as any);
      vi.mocked(consola.prompt).mockResolvedValue(packageManager);

      const uninstallCommand = createUninstallCommand(true);
      const installCommand = createInstallCommand(true);

      // GIVEN
      const packageContent = {
        name: "test-package",
        version: "1.0.0",
        devDependencies: {
          "eslint-cdk-plugin": "^1.0.0",
        },
      };
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageContent));

      // WHEN
      const result = (await migratePlugin(
        { packageManager: packageManager },
        testDir
      )) as SuccessResult<void>;

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(result.message).toEqual("Migration completed successfully");
      expect(execSync).toHaveBeenCalledWith(uninstallCommand, {
        stdio: "inherit",
      });
      expect(execSync).toHaveBeenCalledWith(installCommand, {
        stdio: "inherit",
      });
    });

    it("should successfully migrate plugin from dependencies", async () => {
      vi.mocked(execSync).mockReturnValue("" as any);

      const uninstallCommand = createUninstallCommand(false);
      const installCommand = createInstallCommand(false);

      // GIVEN
      const packageContent = {
        name: "test-package",
        version: "1.0.0",
        dependencies: {
          "eslint-cdk-plugin": "^1.0.0",
        },
      };
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageContent, null, 2)
      );

      // WHEN
      const result = await migratePlugin(
        { packageManager: packageManager },
        testDir
      );

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(result.message).toEqual("Migration completed successfully");
      expect(execSync).toHaveBeenCalledWith(uninstallCommand, {
        stdio: "inherit",
      });
      expect(execSync).toHaveBeenCalledWith(installCommand, {
        stdio: "inherit",
      });
    });
  });

  describe("error case", () => {
    const packageManager = PACKAGE_MANGER.NPM;
    it("when package.json not found", async () => {
      // WHEN
      const result = (await migratePlugin(
        { packageManager },
        testDir
      )) as ErrorResult;

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.ERROR);
      expect(result.message).toEqual("package.json not found");
    });

    it("when eslint-cdk-plugin is not installed", async () => {
      // GIVEN
      const packageContent = {
        name: "test-package",
        version: "1.0.0",
        devDependencies: {
          "other-plugin": "^1.0.0",
        },
      };
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageContent, null, 2)
      );

      // WHEN
      const result = (await migratePlugin(
        { packageManager },
        testDir
      )) as ErrorResult;

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.ERROR);
      expect(result.message).toEqual("eslint-cdk-plugin is not installed");
    });

    it("when invalid package manager is specified", async () => {
      // GIVEN
      const packageContent = {
        name: "test-package",
        version: "1.0.0",
        devDependencies: {
          "eslint-cdk-plugin": "^1.0.0",
        },
      };
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageContent, null, 2)
      );

      // WHEN
      const result = (await migratePlugin(
        { packageManager: "invalid" },
        testDir
      )) as ErrorResult;

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.ERROR);
      expect(result.message).toContain("Invalid package manager");
    });

    it("when uninstall fails", async () => {
      vi.mocked(execSync).mockImplementation(() => {
        throw new Error("Uninstall failed");
      });

      // GIVEN
      const packageContent = {
        name: "test-package",
        version: "1.0.0",
        devDependencies: {
          "eslint-cdk-plugin": "^1.0.0",
        },
      };
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageContent, null, 2)
      );

      // WHEN
      const result = (await migratePlugin(
        { packageManager },
        testDir
      )) as ErrorResult;

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.ERROR);
      expect(result.message).toContain("Failed to uninstall");
    });

    it("when install fails", async () => {
      vi.mocked(execSync).mockImplementationOnce(() => "" as any); // uninstall succeeds
      vi.mocked(execSync).mockImplementationOnce(() => {
        throw new Error("Install failed");
      });

      // GIVEN
      const packageContent = {
        name: "test-package",
        version: "1.0.0",
        devDependencies: {
          "eslint-cdk-plugin": "^1.0.0",
        },
      };
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(packageContent, null, 2)
      );

      // WHEN
      const result = (await migratePlugin(
        { packageManager },
        testDir
      )) as ErrorResult;

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.ERROR);
      expect(result.message).toContain("Failed to install");
    });
  });
});
