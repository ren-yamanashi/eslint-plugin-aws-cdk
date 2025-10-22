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

    it("can uninstall devDependency", () => {
      vi.mocked(execSync).mockReturnValue("" as any);

      // GIVEN
      const uninstallCommand =
        packageManager === PACKAGE_MANGER.NPM
          ? `npm uninstall -D ${packageName}`
          : `${packageManager} remove -D ${packageName}`;

      // WHEN
      const result = uninstallPackage(packageManager, packageName, true);

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect((result as SuccessResult<void>).message).toEqual(successMessage);
      expect(execSync).toHaveBeenCalledWith(uninstallCommand, {
        stdio: "inherit",
      });
    });

    it("can uninstall dependency", () => {
      vi.mocked(execSync).mockReturnValue("" as any);

      // GIVEN
      const uninstallCommand =
        packageManager === PACKAGE_MANGER.NPM
          ? `npm uninstall ${packageName}`
          : `${packageManager} remove ${packageName}`;

      // WHEN
      const result = uninstallPackage(packageManager, packageName, false);

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect((result as SuccessResult<void>).message).toEqual(successMessage);
      expect(execSync).toHaveBeenCalledWith(uninstallCommand, {
        stdio: "inherit",
      });
    });

    it("when uninstall fails, return error", () => {
      vi.mocked(execSync).mockImplementation(() => {
        throw new Error("Command failed");
      });

      // GIVEN
      const failedMessage = "Failed to uninstall eslint-cdk-plugin";

      // WHEN
      const result = uninstallPackage(
        packageManager,
        "eslint-cdk-plugin",
        true
      );

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.ERROR);
      expect((result as ErrorResult).message).toContain(failedMessage);
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

    it("should install devDependency", () => {
      vi.mocked(execSync).mockReturnValue("" as any);

      // GIVEN
      const installCommand =
        packageManager === PACKAGE_MANGER.YARN
          ? `yarn add -D ${packageName}`
          : `${packageManager} install -D ${packageName}`;

      // WHEN
      const result = installPackage(packageManager, packageName, true);

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect((result as SuccessResult<void>).message).toBe(successMessage);
      expect(execSync).toHaveBeenCalledWith(installCommand, {
        stdio: "inherit",
      });
    });

    it("should install production dependency", () => {
      vi.mocked(execSync).mockReturnValue("" as any);

      // GIVEN
      const installCommand =
        packageManager === PACKAGE_MANGER.YARN
          ? `yarn add ${packageName}`
          : `${packageManager} install ${packageName}`;

      // WHEN
      const result = installPackage(packageManager, packageName, false);

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
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
      const result = installPackage(packageManager, packageName, true);

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.ERROR);
      expect((result as ErrorResult).message).toContain(failedMessage);
    });
  });
});
