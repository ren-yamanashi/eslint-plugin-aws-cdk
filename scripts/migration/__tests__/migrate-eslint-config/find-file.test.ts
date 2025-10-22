import * as fs from "node:fs";
import * as path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { findEslintConfigFiles } from "../../migrate-eslint-config.ts/find-file";

describe("findEslintConfigFiles", () => {
  const testDir = path.join(__dirname, "test-temp");

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

  it("when no config files exist, return empty array", () => {
    // WHEN
    const result = findEslintConfigFiles(testDir);

    // THEN
    expect(result).toEqual([]);
  });

  it("can find single eslint.config.mjs file", () => {
    // GIVEN
    const configFile = path.join(testDir, "eslint.config.mjs");
    fs.writeFileSync(configFile, "export default []");

    // WHEN
    const result = findEslintConfigFiles(testDir);

    // THEN
    expect(result).toEqual([configFile]);
  });

  it("can find single eslint.config.cjs file", () => {
    // GIVEN
    const configFile = path.join(testDir, "eslint.config.cjs");
    fs.writeFileSync(configFile, "module.exports = []");

    // WHEN
    const result = findEslintConfigFiles(testDir);

    // THEN
    expect(result).toEqual([configFile]);
  });

  it("can find single eslint.config.js file", () => {
    // GIVEN
    const configFile = path.join(testDir, "eslint.config.js");
    fs.writeFileSync(configFile, "export default []");

    // WHEN
    const result = findEslintConfigFiles(testDir);

    // THEN
    expect(result).toEqual([configFile]);
  });

  it("can find single eslint.config.ts file", () => {
    // GIVEN
    const configFile = path.join(testDir, "eslint.config.ts");
    fs.writeFileSync(configFile, "export default []");

    // WHEN
    const result = findEslintConfigFiles(testDir);

    // THEN
    expect(result).toEqual([configFile]);
  });

  it("can find single eslint.config.mts file", () => {
    // GIVEN
    const configFile = path.join(testDir, "eslint.config.mts");
    fs.writeFileSync(configFile, "export default []");

    // WHEN
    const result = findEslintConfigFiles(testDir);

    // THEN
    expect(result).toEqual([configFile]);
  });

  it("can find single eslint.config.cts file", () => {
    // GIVEN
    const configFile = path.join(testDir, "eslint.config.cts");
    fs.writeFileSync(configFile, "export default []");

    // WHEN
    const result = findEslintConfigFiles(testDir);

    // THEN
    expect(result).toEqual([configFile]);
  });

  it("can find multiple config files", () => {
    // GIVEN
    const mjsFile = path.join(testDir, "eslint.config.mjs");
    const cjsFile = path.join(testDir, "eslint.config.cjs");
    const tsFile = path.join(testDir, "eslint.config.ts");

    fs.writeFileSync(mjsFile, "export default []");
    fs.writeFileSync(cjsFile, "module.exports = []");
    fs.writeFileSync(tsFile, "export default []");

    // WHEN
    const result = findEslintConfigFiles(testDir);

    // THEN
    expect(result).toHaveLength(3);
    expect(result).toContain(mjsFile);
    expect(result).toContain(cjsFile);
    expect(result).toContain(tsFile);
  });

  it("can not find non-config files", () => {
    // GIVEN
    fs.writeFileSync(path.join(testDir, "package.json"), "{}");
    fs.writeFileSync(path.join(testDir, "random.js"), "console.log('hello')");

    // WHEN
    const result = findEslintConfigFiles(testDir);

    // THEN
    expect(result).toEqual([]);
  });
});
