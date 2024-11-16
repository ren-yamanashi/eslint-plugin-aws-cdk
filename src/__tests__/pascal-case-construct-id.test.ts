import { RuleTester } from "eslint";

import { pascalCaseConstructId } from "../pascal-case-construct-id.mjs";

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: "latest", sourceType: "module" },
});

ruleTester.run("pascal-case-construct-id", pascalCaseConstructId, {
  valid: [
    // WHEN: id is empty
    {
      code: "const test = new TestClass('test');",
    },
    {
      code: "new TestClass('test');",
    },
    // WHEN: id is object
    {
      code: "const test = new TestClass('test', {sample: 'sample'});",
    },
    {
      code: "new TestClass('test', {sample: 'sample'});",
    },
    // WHEN: id is array
    {
      code: "const test = new TestClass('test', ['sample']);",
    },
    {
      code: "new TestClass('test', ['sample']);",
    },
    // WHEN: id is number
    {
      code: "const test = new TestClass('test', 1);",
    },
    {
      code: "new TestClass('test', 1);",
    },
    // WHEN: id is PascalCase
    {
      code: "const test = new TestClass('test', 'ValidId');",
    },
    {
      code: "new TestClass('test', 'ValidId');",
    },
  ],
  invalid: [
    // WHEN: id is snake_case(double quote)
    {
      code: 'new TestClass("test", "invalid_id");',
      errors: [{ messageId: "pascalCaseConstructId" }],
      output: 'new TestClass("test", "InvalidId");',
    },
    {
      code: 'const test = new TestClass("test", "invalid_id");',
      errors: [{ messageId: "pascalCaseConstructId" }],
      output: 'const test = new TestClass("test", "InvalidId");',
    },
    // WHEN: id is camelCase(single quote)
    {
      code: "new TestClass('test', 'invalidId');",
      errors: [{ messageId: "pascalCaseConstructId" }],
      output: "new TestClass('test', 'InvalidId');",
    },
    {
      code: "const test = new TestClass('test', 'invalidId');",
      errors: [{ messageId: "pascalCaseConstructId" }],
      output: "const test = new TestClass('test', 'InvalidId');",
    },
  ],
});
