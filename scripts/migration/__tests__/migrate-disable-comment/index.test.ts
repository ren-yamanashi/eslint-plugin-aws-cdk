import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { migrateEslintDisableComments } from "../../migrate-disable-comment/index";
import { ErrorResult, RESULT_TYPE, SuccessResult } from "../../result";

vi.mock("node:child_process");
vi.mock("consola");

describe("migrateEslintDisableComments", () => {
  const testDir = path.join(__dirname, "test-temp");

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

  it("successfully migrate files with eslint-disable comments", () => {
    // GIVEN
    const file1 = path.join(testDir, "file1.ts");
    const file2 = path.join(testDir, "file2.ts");

    fs.writeFileSync(
      file1,
      `/* eslint-disable cdk/no-construct */\nconst x = 1;`
    );
    fs.writeFileSync(
      file2,
      `// eslint-disable-next-line cdk/no-bucket\nconst y = 2;`
    );

    vi.mocked(execSync).mockReturnValue(`${file1}\n${file2}\n` as any);

    // WHEN
    const result = migrateEslintDisableComments(testDir) as SuccessResult<void>;
    const content1 = fs.readFileSync(file1, "utf-8");
    const content2 = fs.readFileSync(file2, "utf-8");

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
    expect(result.message).toEqual(
      "Successfully migrated eslint-disable comments"
    );
    expect(content1).toContain("awscdk/no-construct");
    expect(content2).toContain("awscdk/no-bucket");
  });

  it("return success when no files to migrate", () => {
    // GIVEN
    vi.mocked(execSync).mockReturnValue("");

    // WHEN
    const result = migrateEslintDisableComments(testDir) as SuccessResult<void>;

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
    expect(result.message).toEqual("No eslint-disable comments to migrate");
  });

  it("return success when grep returns single empty string", () => {
    // GIVEN
    vi.mocked(execSync).mockReturnValue("\n");

    // WHEN
    const result = migrateEslintDisableComments(testDir) as SuccessResult<void>;

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
    expect(result.message).toEqual("No eslint-disable comments to migrate");
  });

  it("return error when migration fails", () => {
    // GIVEN
    vi.mocked(execSync).mockImplementation(() => {
      throw new Error("Command failed");
    });

    // WHEN
    const result = migrateEslintDisableComments(testDir) as ErrorResult;

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.ERROR);
    expect(result.message).toContain(
      "Error occurred while migrating eslint-disable comments"
    );
  });

  it("skip empty file paths", () => {
    // GIVEN
    const file1 = path.join(testDir, "file1.ts");

    fs.writeFileSync(file1, `/* eslint-disable cdk/no-construct */`);

    vi.mocked(execSync).mockReturnValue(`\n${file1}\n\n`);

    // WHEN
    const result = migrateEslintDisableComments(testDir) as SuccessResult<void>;
    const content1 = fs.readFileSync(file1, "utf-8");

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
    expect(content1).toContain("awscdk/no-construct");
  });

  it("only write files that were modified", () => {
    // GIVEN
    const file1 = path.join(testDir, "file1.ts");
    const file2 = path.join(testDir, "file2.ts");

    fs.writeFileSync(
      file1,
      `/* eslint-disable cdk/no-construct */\nconst x = 1;`
    );
    fs.writeFileSync(file2, `const y = 2;`);

    vi.mocked(execSync).mockReturnValue(`${file1}\n${file2}\n`);

    // WHEN
    const result = migrateEslintDisableComments(testDir);
    const content1 = fs.readFileSync(file1, "utf-8");
    const content2 = fs.readFileSync(file2, "utf-8");

    // THEN
    expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
    expect(content1).toContain("awscdk/no-construct");
    expect(content2).toEqual(`const y = 2;`);
  });

  describe("various comment patterns", () => {
    it("migrate all directive types with block comments", () => {
      // GIVEN
      const file = path.join(testDir, "block-comments.ts");
      fs.writeFileSync(
        file,
        `/* eslint-disable cdk/no-construct */
const x = 1;
/* eslint-disable-next-line cdk/no-bucket */
const y = 2;
/* eslint-disable-line cdk/no-table */`
      );

      vi.mocked(execSync).mockReturnValue(file);

      // WHEN
      const result = migrateEslintDisableComments(testDir);
      const content = fs.readFileSync(file, "utf-8");

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(content).toContain("awscdk/no-construct");
      expect(content).toContain("awscdk/no-bucket");
      expect(content).toContain("awscdk/no-table");
    });

    it("migrate all directive types with line comments", () => {
      // GIVEN
      const file = path.join(testDir, "line-comments.ts");
      fs.writeFileSync(
        file,
        `// eslint-disable cdk/no-construct
const x = 1;
// eslint-disable-next-line cdk/no-bucket
const y = 2;
const z = 3; // eslint-disable-line cdk/no-table`
      );

      vi.mocked(execSync).mockReturnValue(file);

      // WHEN
      const result = migrateEslintDisableComments(testDir);
      const content = fs.readFileSync(file, "utf-8");

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(content).toContain("awscdk/no-construct");
      expect(content).toContain("awscdk/no-bucket");
      expect(content).toContain("awscdk/no-table");
    });

    it("handle whitespace variations in comments", () => {
      // GIVEN
      const file = path.join(testDir, "whitespace.ts");
      fs.writeFileSync(
        file,
        `/*  eslint-disable  cdk/no-construct  */
//  eslint-disable-next-line  cdk/no-bucket`
      );

      vi.mocked(execSync).mockReturnValue(file);

      // WHEN
      const result = migrateEslintDisableComments(testDir);
      const content = fs.readFileSync(file, "utf-8");

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(content).toContain("awscdk/no-construct");
      expect(content).toContain("awscdk/no-bucket");
    });

    it("not modify comments without cdk/ prefix", () => {
      // GIVEN
      const file = path.join(testDir, "no-cdk-prefix.ts");
      const originalContent = `// eslint-disable no-console
/* eslint-disable-next-line no-unused-vars */
const x = 1;`;

      fs.writeFileSync(file, originalContent);

      vi.mocked(execSync).mockReturnValue(file);

      // WHEN
      const result = migrateEslintDisableComments(testDir);
      const content = fs.readFileSync(file, "utf-8");

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(content).toEqual(originalContent);
    });

    it("not modify cdk/ in non-eslint comments", () => {
      // GIVEN
      const file = path.join(testDir, "non-eslint-comments.ts");
      const originalContent = `// This is about cdk/something
/* regular comment cdk/test */
const x = 1;`;

      fs.writeFileSync(file, originalContent);

      vi.mocked(execSync).mockReturnValue(file);

      // WHEN
      const result = migrateEslintDisableComments(testDir);
      const content = fs.readFileSync(file, "utf-8");

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(content).toEqual(originalContent);
    });

    it("handle mixed comment types and patterns", () => {
      // GIVEN
      const file = path.join(testDir, "mixed.ts");
      fs.writeFileSync(
        file,
        `/* eslint-disable cdk/no-construct */
// This is about cdk/something (not an eslint comment)
// eslint-disable-next-line cdk/no-bucket
const x = 1; // eslint-disable-line cdk/no-table
/* regular comment cdk/test */
// eslint-disable no-console`
      );

      vi.mocked(execSync).mockReturnValue(file);

      // WHEN
      const result = migrateEslintDisableComments(testDir);
      const content = fs.readFileSync(file, "utf-8");

      // THEN
      expect(result.type).toEqual(RESULT_TYPE.SUCCESS);
      expect(content).toContain("awscdk/no-construct");
      expect(content).toContain("awscdk/no-bucket");
      expect(content).toContain("awscdk/no-table");
      expect(content).toContain("// This is about cdk/something");
      expect(content).toContain("/* regular comment cdk/test */");
      expect(content).toContain("// eslint-disable no-console");
    });
  });
});
