import * as fs from "node:fs";
import * as path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  PackageJson,
  readPackageJson,
} from "../../migrate-plugin/package-json";
import { ErrorResult, Result, RESULT_TYPE, SuccessResult } from "../../result";

describe("readPackageJson", () => {
  const testDir = path.join(__dirname, "test-temp");
  const packageJsonPath = path.join(testDir, "package.json");

  beforeEach(() => {
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it("when package.json exists, return packageJson content", () => {
    // GIVEN
    const packageContent = {
      name: "test-package",
      version: "1.0.0",
      dependencies: {
        "eslint-cdk-plugin": "^1.0.0",
      },
    };
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageContent, null, 2));

    // WHEN
    const result = readPackageJson(testDir);

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
    expect((result as SuccessResult<PackageJson>).value).toEqual(
      packageContent
    );
  });

  it("when package.json has invalid JSON, return error", () => {
    fs.writeFileSync(packageJsonPath, "{ invalid json }");

    // GIVEN
    const failedMessage = "Failed to read package.json";

    // WHEN
    const result = readPackageJson(testDir);

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.ERROR);
    expect((result as ErrorResult).message).toContain(failedMessage);
  });

  it("when package.json has invalid format, return error", () => {
    fs.writeFileSync(packageJsonPath, JSON.stringify({ invalid: "data" }));

    // GIVEN
    const failedMessage = "Invalid package.json format";

    // WHEN
    const result = readPackageJson(testDir);

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.ERROR);
    expect((result as ErrorResult).message).toEqual(failedMessage);
  })


  it("when package.json does not exist, return error", () => {
    // GIVEN
    const failedMessage = "package.json not found";

    // WHEN
    const result = readPackageJson(testDir);

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.ERROR);
    expect((result as Result<Error>).message).toEqual(failedMessage);
  });
});
