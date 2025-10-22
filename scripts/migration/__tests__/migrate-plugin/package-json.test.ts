import * as fs from "node:fs";
import * as path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  PackageJson,
  readPackageJson,
} from "../../migrate-plugin/package-json";
import { ErrorResult, RESULT_TYPE, SuccessResult } from "../../result";

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
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageContent));

    // WHEN
    const result = readPackageJson(testDir) as SuccessResult<PackageJson>;

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
    expect(result.value).toEqual(packageContent);
  });

  it("when package.json has invalid JSON, return error", () => {
    fs.writeFileSync(packageJsonPath, "{ invalid json }");

    // WHEN
    const result = readPackageJson(testDir) as ErrorResult;

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.ERROR);
    expect(result.message).toContain("Failed to read package.json");
  });

  it("when package.json has invalid format, return error", () => {
    fs.writeFileSync(packageJsonPath, JSON.stringify({ invalid: "data" }));

    // WHEN
    const result = readPackageJson(testDir) as ErrorResult;

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.ERROR);
    expect(result.message).toEqual("Invalid package.json format");
  });

  it("when package.json does not exist, return error", () => {
    // WHEN
    const result = readPackageJson(testDir) as ErrorResult;

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.ERROR);
    expect(result.message).toEqual("package.json not found");
  });
});
