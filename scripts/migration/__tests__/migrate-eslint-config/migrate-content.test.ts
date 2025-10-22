import * as fs from "node:fs";
import * as path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { migrateEslintConfigFileContent } from "../../migrate-eslint-config.ts/migrate-content";
import { RESULT_TYPE } from "../../result";

describe("migrateEslintConfigFileContent", () => {
  const testBaseDir = path.join(__dirname, "test-temp-file-content");

  afterEach(() => {
    if (fs.existsSync(testBaseDir)) {
      fs.rmSync(testBaseDir, { recursive: true, force: true });
    }
  });

  describe("replace import statements", () => {
    it("double-quoted", () => {
      // GIVEN
      const testDir = path.join(testBaseDir, "test1");
      const configPath = path.join(testDir, "eslint.config.mjs");

      fs.mkdirSync(testDir, { recursive: true });
      fs.writeFileSync(
        configPath,
        `import cdkPlugin from "eslint-cdk-plugin";`
      );

      // GIVEN
      const replacedContent = `import cdkPlugin from "eslint-plugin-awscdk";`;

      // WHEN
      const result = migrateEslintConfigFileContent(configPath);
      const newContent = fs.readFileSync(configPath, "utf-8");

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(result.message).toContain("Successfully migrated");
      expect(newContent).toEqual(replacedContent);
    });

    it("single-quoted", () => {
      // GIVEN
      const testDir = path.join(testBaseDir, "test2");
      const configPath = path.join(testDir, "eslint.config.mjs");

      fs.mkdirSync(testDir, { recursive: true });
      fs.writeFileSync(
        configPath,
        `import cdkPlugin from 'eslint-cdk-plugin';`
      );

      // GIVEN
      const replacedContent = `import cdkPlugin from 'eslint-plugin-awscdk';`;

      // WHEN
      const result = migrateEslintConfigFileContent(configPath);
      const newContent = fs.readFileSync(configPath, "utf-8");

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(result.message).toContain("Successfully migrated");
      expect(newContent).toEqual(replacedContent);
    });
  });

  describe("replace plugins property", () => {
    it("single-line", () => {
      // GIVEN
      const testDir = path.join(testBaseDir, "test3");
      const configPath = path.join(testDir, "eslint.config.mjs");

      fs.mkdirSync(testDir, { recursive: true });
      fs.writeFileSync(
        configPath,
        `export default [{ plugins: { cdk: cdkPlugin } }];`
      );

      // GIVEN
      const replacedContent = `export default [{ plugins: { awscdk: cdkPlugin } }];`;

      // WHEN
      const result = migrateEslintConfigFileContent(configPath);
      const newContent = fs.readFileSync(configPath, "utf-8");

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(result.message).toContain("Successfully migrated");
      expect(newContent).toEqual(replacedContent);
    });

    it("multi-line", () => {
      // GIVEN
      const testDir = path.join(testBaseDir, "test4");
      const configPath = path.join(testDir, "eslint.config.mjs");

      fs.mkdirSync(testDir, { recursive: true });
      fs.writeFileSync(
        configPath,
        `export default [{
  plugins: {
    cdk: cdkPlugin,
    other: otherPlugin
  }
}];`
      );

      // GIVEN
      const replacedContent = `export default [{
  plugins: {
    awscdk: cdkPlugin,
    other: otherPlugin
  }
}];`;

      // WHEN
      const result = migrateEslintConfigFileContent(configPath);
      const newContent = fs.readFileSync(configPath, "utf-8");

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(result.message).toContain("Successfully migrated");
      expect(newContent).toEqual(replacedContent);
    });
  });

  it("not replace cdk outside of plugins object", () => {
    // GIVEN
    const testDir = path.join(testBaseDir, "test5");
    const configPath = path.join(testDir, "eslint.config.mjs");
    const originalContent = `const cdk: something = {};`;

    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(configPath, originalContent);

    // WHEN
    const result = migrateEslintConfigFileContent(configPath);
    const newContent = fs.readFileSync(configPath, "utf-8");

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
    expect(result.message).toContain("No changes needed");
    expect(newContent).toEqual(originalContent);
  });

  describe("replace rule names", () => {
    it("double-quoted", () => {
      // GIVEN
      const testDir = path.join(testBaseDir, "test6");
      const configPath = path.join(testDir, "eslint.config.mjs");

      fs.mkdirSync(testDir, { recursive: true });
      fs.writeFileSync(configPath, `rules: { "cdk/no-construct": "error" }`);

      // GIVEN
      const replacedContent = `rules: { "awscdk/no-construct": "error" }`;

      // WHEN
      const result = migrateEslintConfigFileContent(configPath);
      const newContent = fs.readFileSync(configPath, "utf-8");

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(result.message).toContain("Successfully migrated");
      expect(newContent).toEqual(replacedContent);
    });

    it("single-quoted", () => {
      // GIVEN
      const testDir = path.join(testBaseDir, "test7");
      const configPath = path.join(testDir, "eslint.config.mjs");

      fs.mkdirSync(testDir, { recursive: true });
      fs.writeFileSync(configPath, `rules: { 'cdk/no-construct': 'error' }`);

      // GIVEN
      const replacedContent = `rules: { 'awscdk/no-construct': 'error' }`;

      // WHEN
      const result = migrateEslintConfigFileContent(configPath);
      const newContent = fs.readFileSync(configPath, "utf-8");

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(result.message).toContain("Successfully migrated");
      expect(newContent).toEqual(replacedContent);
    });

    it("multiple rule names", () => {
      // GIVEN
      const testDir = path.join(testBaseDir, "test8");
      const configPath = path.join(testDir, "eslint.config.mjs");

      fs.mkdirSync(testDir, { recursive: true });
      fs.writeFileSync(
        configPath,
        `rules: { "cdk/no-construct": "error", "cdk/no-bucket": "warn" }`
      );

      // GIVEN
      const replacedContent = `rules: { "awscdk/no-construct": "error", "awscdk/no-bucket": "warn" }`;

      // WHEN
      const result = migrateEslintConfigFileContent(configPath);
      const newContent = fs.readFileSync(configPath, "utf-8");

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(result.message).toContain("Successfully migrated");
      expect(newContent).toEqual(replacedContent);
    });
  });

  it("should handle complete config file", () => {
    // GIVEN
    const testDir = path.join(testBaseDir, "test9");
    const configPath = path.join(testDir, "eslint.config.mjs");

    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(
      configPath,
      `import cdkPlugin from "eslint-cdk-plugin";

export default [
  {
    plugins: {
      cdk: cdkPlugin
    },
    rules: {
      "cdk/no-construct": "error",
      "cdk/no-bucket": "warn"
    }
  }
];`
    );

    // GIVEN
    const replacedContent = `import cdkPlugin from "eslint-plugin-awscdk";

export default [
  {
    plugins: {
      awscdk: cdkPlugin
    },
    rules: {
      "awscdk/no-construct": "error",
      "awscdk/no-bucket": "warn"
    }
  }
];`;

    // WHEN
    const result = migrateEslintConfigFileContent(configPath);
    const newContent = fs.readFileSync(configPath, "utf-8");

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
    expect(result.message).toContain("Successfully migrated");
    expect(newContent).toEqual(replacedContent);
  });

  it("should handle mixed quotes", () => {
    // GIVEN
    const testDir = path.join(testBaseDir, "test11");
    const configPath = path.join(testDir, "eslint.config.mjs");

    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(
      configPath,
      `import cdkPlugin from "eslint-cdk-plugin";
const rules = { 'cdk/no-construct': 'error' };`
    );

    // WHEN
    const result = migrateEslintConfigFileContent(configPath);
    const newContent = fs.readFileSync(configPath, "utf-8");

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
    expect(result.message).toContain("Successfully migrated");
    expect(newContent).toContain("eslint-plugin-awscdk");
    expect(newContent).toContain("awscdk/no-construct");
  });

  it("when no migration needed, return success with no changes message ", () => {
    // GIVEN
    const testDir = path.join(testBaseDir, "test10");
    const configPath = path.join(testDir, "eslint.config.mjs");
    const originalContent = `export default [];`;

    fs.mkdirSync(testDir, { recursive: true });
    fs.writeFileSync(configPath, originalContent);

    // WHEN
    const result = migrateEslintConfigFileContent(configPath);
    const newContent = fs.readFileSync(configPath, "utf-8");

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
    expect(result.message).toContain("No changes needed");
    expect(newContent).toEqual(originalContent);
  });
});
