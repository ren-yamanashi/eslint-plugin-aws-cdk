import { RuleTester } from "@typescript-eslint/rule-tester";

import { noClassInInterfaceProps } from "../no-class-in-interface.mjs";

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      },
    },
  },
});

ruleTester.run("no-class-in-interface", noClassInInterfaceProps, {
  valid: [
    // WHEN: property type is string
    {
      code: `
      interface TestInterface {
        test: string;
      }
      `,
    },
    // WHEN: property type is type
    {
      code: `
      type TestType = {
        test: string;
      };
      interface TestInterface {
        test: TestType;
      }
      `,
    },
    // WHEN: property type is undefined
    {
      code: `
      interface TestInterface {
        test: TestClass;
      }
      `,
    },
  ],
  invalid: [
    {
      code: `
      class TestClass {}
      interface TestInterface {
        test: TestClass;
      }
      `,
      errors: [{ messageId: "noClassInInterfaceProps" }],
    },
  ],
});
