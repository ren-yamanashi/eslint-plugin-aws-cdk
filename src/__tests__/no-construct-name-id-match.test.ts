import { RuleTester } from "eslint";

import { noConstructNameIdMatch } from "../no-construct-name-id-match.mjs";

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: "latest", sourceType: "module" },
});

ruleTester.run("no-construct-name-id-match", noConstructNameIdMatch, {
  valid: [
    // WHEN: id not same construct name
    {
      code: "const test = new TestClass('test', 'ValidId');",
    },
    // WHEN: id is empty
    {
      code: "new TestClass('test');",
    },
  ],
  invalid: [
    // WHEN: id same construct name (PascalCase)
    {
      code: 'new TestClass("test", "TestClass");',
      errors: [{ messageId: "constructNameIdMatch" }],
    },
    // WHEN: id same construct name (camelCase)
    {
      code: 'new TestClass("test", "testClass");',
      errors: [{ messageId: "constructNameIdMatch" }],
    },
    // WHEN id same construct name (snake_case)
    {
      code: "new TestClass('test', 'test_class');",
      errors: [{ messageId: "constructNameIdMatch" }],
    },
    // WHEN: id same construct name (kebab-case)
    {
      code: "new TestClass('test', 'test-class');",
      errors: [{ messageId: "constructNameIdMatch" }],
    },
  ],
});
