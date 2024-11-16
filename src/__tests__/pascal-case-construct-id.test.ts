import { RuleTester } from "eslint";

import { pascalCaseConstructId } from "../pascal-case-construct-id.mjs";

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: "latest", sourceType: "module" },
});

ruleTester.run("pascal-case-construct-id", pascalCaseConstructId, {
  valid: [
    {
      // WHEN: id is empty
      code: "new TestClass('test');",
    },
    {
      // WHEN: id is object
      code: "new TestClass('test', {sample: 'sample'});",
    },
    {
      // WHEN: id is array
      code: "new TestClass('test', ['sample']);",
    },
    {
      // WHEN: id is number
      code: "new TestClass('test', 1);",
    },
    {
      // WHEN: id is PascalCase
      code: "new TestClass('test', 'ValidId');",
    },
  ],
  invalid: [
    {
      // WHEN: id is snake_case(double quote)
      code: 'new TestClass("test", "invalid_id");',
      errors: [{ messageId: "pascalCaseConstructId" }],
      output: 'new TestClass("test", "InvalidId");',
    },
    {
      // WHEN: id is camelCase(single quote)
      code: "new TestClass('test', 'invalidId');",
      errors: [{ messageId: "pascalCaseConstructId" }],
      output: "new TestClass('test', 'InvalidId');",
    },
  ],
});
