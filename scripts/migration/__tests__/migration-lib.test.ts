import { describe, expect, it } from "vitest";

import {
  checkPluginInstallation,
  migrateEslintConfigContent,
  migrateEslintDisableCommentsContent,
  type PackageJson,
} from "../migration-lib";

describe("checkPluginInstallation", () => {
  it("should return 'devDependencies' when eslint-cdk-plugin is in devDependencies", () => {
    const packageJson: PackageJson = {
      devDependencies: {
        "eslint-cdk-plugin": "^1.0.0",
      },
    };

    expect(checkPluginInstallation(packageJson)).toBe("devDependencies");
  });

  it("should return 'dependencies' when eslint-cdk-plugin is in dependencies", () => {
    const packageJson: PackageJson = {
      dependencies: {
        "eslint-cdk-plugin": "^1.0.0",
      },
    };

    expect(checkPluginInstallation(packageJson)).toBe("dependencies");
  });

  it("should return null when eslint-cdk-plugin is not installed", () => {
    const packageJson: PackageJson = {
      dependencies: {},
      devDependencies: {},
    };

    expect(checkPluginInstallation(packageJson)).toBeNull();
  });

  it("should prioritize devDependencies when plugin is in both", () => {
    const packageJson: PackageJson = {
      dependencies: {
        "eslint-cdk-plugin": "^1.0.0",
      },
      devDependencies: {
        "eslint-cdk-plugin": "^2.0.0",
      },
    };

    expect(checkPluginInstallation(packageJson)).toBe("devDependencies");
  });
});

describe("migrateEslintConfigContent", () => {
  it("should replace double-quoted import statements", () => {
    const input = `import cdkPlugin from "eslint-cdk-plugin";`;
    const expected = `import cdkPlugin from "eslint-plugin-awscdk";`;

    const result = migrateEslintConfigContent(input);

    expect(result.content).toBe(expected);
    expect(result.modified).toBe(true);
  });

  it("should replace single-quoted import statements", () => {
    const input = `import cdkPlugin from 'eslint-cdk-plugin';`;
    const expected = `import cdkPlugin from 'eslint-plugin-awscdk';`;

    const result = migrateEslintConfigContent(input);

    expect(result.content).toBe(expected);
    expect(result.modified).toBe(true);
  });

  it("should replace plugins property", () => {
    const input = `plugins: { cdk: cdkPlugin }`;
    const expected = `plugins: { awscdk: cdkPlugin }`;

    const result = migrateEslintConfigContent(input);

    expect(result.content).toBe(expected);
    expect(result.modified).toBe(true);
  });

  it("should preserve spacing in plugins property", () => {
    const input = `plugins: { cdk  : cdkPlugin }`;
    const expected = `plugins: { awscdk  : cdkPlugin }`;

    const result = migrateEslintConfigContent(input);

    expect(result.content).toBe(expected);
    expect(result.modified).toBe(true);
  });

  it("should handle multi-line plugins object", () => {
    const input = `plugins: {
  cdk: cdkPlugin,
  other: otherPlugin
}`;
    const expected = `plugins: {
  awscdk: cdkPlugin,
  other: otherPlugin
}`;

    const result = migrateEslintConfigContent(input);

    expect(result.content).toBe(expected);
    expect(result.modified).toBe(true);
  });

  it("should not replace cdk: outside of plugins object", () => {
    const input = `const config = { cdk: "value" };
plugins: { awscdk: cdkPlugin };`;

    const result = migrateEslintConfigContent(input);

    expect(result.content).toBe(input);
    expect(result.modified).toBe(false);
  });

  it("should replace double-quoted rule names", () => {
    const input = `"cdk/require-passing-this": "error"`;
    const expected = `"awscdk/require-passing-this": "error"`;

    const result = migrateEslintConfigContent(input);

    expect(result.content).toBe(expected);
    expect(result.modified).toBe(true);
  });

  it("should replace single-quoted rule names", () => {
    const input = `'cdk/require-passing-this': 'error'`;
    const expected = `'awscdk/require-passing-this': 'error'`;

    const result = migrateEslintConfigContent(input);

    expect(result.content).toBe(expected);
    expect(result.modified).toBe(true);
  });

  it("should handle complete config file", () => {
    const input = `import cdkPlugin from "eslint-cdk-plugin";

export default [
  {
    plugins: {
      cdk: cdkPlugin,
    },
    rules: {
      "cdk/require-passing-this": "error",
      "cdk/no-parent-name-construct-id-match": ["error", { disallowContainingParentName: true }],
    },
  },
];`;

    const expected = `import cdkPlugin from "eslint-plugin-awscdk";

export default [
  {
    plugins: {
      awscdk: cdkPlugin,
    },
    rules: {
      "awscdk/require-passing-this": "error",
      "awscdk/no-parent-name-construct-id-match": ["error", { disallowContainingParentName: true }],
    },
  },
];`;

    const result = migrateEslintConfigContent(input);

    expect(result.content).toBe(expected);
    expect(result.modified).toBe(true);
  });

  it("should return modified=false when no changes needed", () => {
    const input = `import cdkPlugin from "eslint-plugin-awscdk";

export default [
  {
    plugins: {
      awscdk: cdkPlugin,
    },
    rules: {
      "awscdk/require-passing-this": "error",
    },
  },
];`;

    const result = migrateEslintConfigContent(input);

    expect(result.content).toBe(input);
    expect(result.modified).toBe(false);
  });
});

describe("migrateEslintDisableCommentsContent", () => {
  it("should replace block comment eslint-disable", () => {
    const input = `/* eslint-disable cdk/require-jsdoc */`;
    const expected = `/* eslint-disable awscdk/require-jsdoc */`;

    const result = migrateEslintDisableCommentsContent(input);

    expect(result.content).toBe(expected);
    expect(result.modified).toBe(true);
  });

  it("should replace line comment eslint-disable-next-line", () => {
    const input = `// eslint-disable-next-line cdk/require-jsdoc`;
    const expected = `// eslint-disable-next-line awscdk/require-jsdoc`;

    const result = migrateEslintDisableCommentsContent(input);

    expect(result.content).toBe(expected);
    expect(result.modified).toBe(true);
  });

  it("should handle multiple eslint-disable comments", () => {
    const input = `/* eslint-disable cdk/require-props-default-doc */
/* eslint-disable cdk/require-jsdoc */
import { Construct } from "constructs";

// eslint-disable-next-line cdk/no-mutable-public-property-of-construct
export class MyConstruct extends Construct {}`;

    const expected = `/* eslint-disable awscdk/require-props-default-doc */
/* eslint-disable awscdk/require-jsdoc */
import { Construct } from "constructs";

// eslint-disable-next-line awscdk/no-mutable-public-property-of-construct
export class MyConstruct extends Construct {}`;

    const result = migrateEslintDisableCommentsContent(input);

    expect(result.content).toBe(expected);
    expect(result.modified).toBe(true);
  });

  it("should handle eslint-disable-line comments", () => {
    const input = `const x = 1; // eslint-disable-line cdk/some-rule`;
    const expected = `const x = 1; // eslint-disable-line awscdk/some-rule`;

    const result = migrateEslintDisableCommentsContent(input);

    expect(result.content).toBe(expected);
    expect(result.modified).toBe(true);
  });

  it("should return modified=false when no changes needed", () => {
    const input = `/* eslint-disable awscdk/require-jsdoc */
import { Construct } from "constructs";

// eslint-disable-next-line awscdk/no-mutable-public-property-of-construct
export class MyConstruct extends Construct {}`;

    const result = migrateEslintDisableCommentsContent(input);

    expect(result.content).toBe(input);
    expect(result.modified).toBe(false);
  });

  it("should not replace non-eslint comments containing cdk/", () => {
    const input = `// This is about cdk/some-feature
/* Regular comment about cdk/construct */`;

    const result = migrateEslintDisableCommentsContent(input);

    expect(result.content).toBe(input);
    expect(result.modified).toBe(false);
  });
});
