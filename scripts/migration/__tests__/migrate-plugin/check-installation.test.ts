import { describe, expect, it } from "vitest";
import { checkPluginInstallation } from "../../migrate-plugin/check-installation";
import type { PackageJson } from "../../migrate-plugin/package-json";
import { ErrorResult, RESULT_TYPE, SuccessResult } from "../../result";

describe("checkPluginInstallation", () => {
  it("when plugin is in devDependencies, return devDependencies", () => {
    // GIVEN
    const packageJson: PackageJson = {
      devDependencies: {
        "eslint-cdk-plugin": "^1.0.0",
      },
    };

    // WHEN
    const result = checkPluginInstallation(packageJson);

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
    expect(
      (result as SuccessResult<("devDependencies" | "dependencies")[]>).value
    ).toEqual(["devDependencies"]);
  });

  it("when plugin is in dependencies, return dependencies", () => {
    // GIVEN
    const packageJson: PackageJson = {
      dependencies: {
        "eslint-cdk-plugin": "^1.0.0",
      },
    };

    // WHEN
    const result = checkPluginInstallation(packageJson);

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
    expect(
      (result as SuccessResult<("devDependencies" | "dependencies")[]>).value
    ).toEqual(["dependencies"]);
  });

  it("when plugin is in both, return devDependencies and dependencies", () => {
    // GIVEN
    const packageJson: PackageJson = {
      dependencies: {
        "eslint-cdk-plugin": "^1.0.0",
      },
      devDependencies: {
        "eslint-cdk-plugin": "^1.0.0",
      },
    };

    // WHEN
    const result = checkPluginInstallation(packageJson);

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
    expect(
      (result as SuccessResult<("devDependencies" | "dependencies")[]>).value
    ).toEqual(["devDependencies", "dependencies"]);
  });

  it("when plugin is not installed, return error", () => {
    // GIVEN
    const packageJson: PackageJson = {
      dependencies: {
        "other-package": "^1.0.0",
      },
    };

    // WHEN
    const result = checkPluginInstallation(packageJson);

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.ERROR);
    expect((result as ErrorResult).message).toEqual(
      "eslint-cdk-plugin is not installed"
    );
  });

  it("when package.json has no dependencies, return error", () => {
    // GIVEN
    const packageJson: PackageJson = {};

    // WHEN
    const result = checkPluginInstallation(packageJson);

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.ERROR);
    expect((result as ErrorResult).message).toEqual(
      "eslint-cdk-plugin is not installed"
    );
  });
});
