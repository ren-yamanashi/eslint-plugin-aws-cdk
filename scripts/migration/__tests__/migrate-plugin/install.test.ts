import { execSync } from "node:child_process";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { installPackage, uninstallPackage } from "../../migrate-plugin/install";
import {
  PACKAGE_MANGER,
  PACKAGE_MANGER_VALUES,
} from "../../migrate-plugin/package-manager";
import { ErrorResult, RESULT_TYPE, SuccessResult } from "../../result";

vi.mock("node:child_process");
vi.mock("consola");

describe("uninstallPackage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe.each(PACKAGE_MANGER_VALUES)("when using %s", (packageManager) => {
    const packageName = "eslint-cdk-plugin";
    const successMessage = "Successfully uninstalled eslint-cdk-plugin";

    const createUninstallCommand = (isDev: boolean) =>
      packageManager === PACKAGE_MANGER.NPM
        ? `npm uninstall ${isDev ? "-D " : ""}eslint-cdk-plugin`
        : `${packageManager} remove ${isDev ? "-D " : ""}eslint-cdk-plugin`;

    it("can uninstall devDependency", () => {
      vi.mocked(execSync).mockReturnValue("" as any);

      // GIVEN
      const uninstallCommand = createUninstallCommand(true);

      // WHEN
      const result = uninstallPackage(
        packageManager,
        packageName,
        true
      ) as SuccessResult<void>;

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(result.message).toEqual(successMessage);
      expect(execSync).toHaveBeenCalledWith(uninstallCommand, {
        stdio: "inherit",
      });
    });

    it("can uninstall dependency", () => {
      vi.mocked(execSync).mockReturnValue("" as any);

      // GIVEN
      const uninstallCommand = createUninstallCommand(false);

      // WHEN
      const result = uninstallPackage(
        packageManager,
        packageName,
        false
      ) as SuccessResult<void>;

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(result.message).toEqual(successMessage);
      expect(execSync).toHaveBeenCalledWith(uninstallCommand, {
        stdio: "inherit",
      });
    });

    it("when uninstall fails, return error", () => {
      vi.mocked(execSync).mockImplementation(() => {
        throw new Error("Command failed");
      });

      // WHEN
      const result = uninstallPackage(
        packageManager,
        "eslint-cdk-plugin",
        true
      ) as ErrorResult;

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.ERROR);
      expect(result.message).toContain("Failed to uninstall eslint-cdk-plugin");
    });
  });
});

describe("installPackage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe.each(PACKAGE_MANGER_VALUES)("when using %s", (packageManager) => {
    const packageName = "eslint-plugin-awscdk";
    const successMessage = "Successfully installed eslint-plugin-awscdk";

    const createInstallCommand = (isDev: boolean) =>
      packageManager === PACKAGE_MANGER.YARN
        ? `yarn add ${isDev ? "-D " : ""}eslint-plugin-awscdk`
        : `${packageManager} install ${isDev ? "-D " : ""}eslint-plugin-awscdk`;

    it("should install devDependency", () => {
      vi.mocked(execSync).mockReturnValue("" as any);

      // GIVEN
      const installCommand = createInstallCommand(true);

      // WHEN
      const result = installPackage(
        packageManager,
        packageName,
        true
      ) as SuccessResult<void>;

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(result.message).toBe(successMessage);
      expect(execSync).toHaveBeenCalledWith(installCommand, {
        stdio: "inherit",
      });
    });

    it("should install production dependency", () => {
      vi.mocked(execSync).mockReturnValue("" as any);

      // GIVEN
      const installCommand = createInstallCommand(false);

      // WHEN
      const result = installPackage(
        packageManager,
        packageName,
        false
      ) as SuccessResult<void>;

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(result.message).toBe(successMessage);
      expect(execSync).toHaveBeenCalledWith(installCommand, {
        stdio: "inherit",
      });
    });

    it("should return error when install fails", () => {
      vi.mocked(execSync).mockImplementation(() => {
        throw new Error("Command failed");
      });

      // GIVEN
      const failedMessage = "Failed to install eslint-plugin-awscdk";

      // WHEN
      const result = installPackage(
        packageManager,
        packageName,
        true
      ) as ErrorResult;

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.ERROR);
      expect(result.message).toContain(failedMessage);
    });
  });
});
