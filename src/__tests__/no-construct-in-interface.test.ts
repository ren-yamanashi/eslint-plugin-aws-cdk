import { RuleTester } from "@typescript-eslint/rule-tester";

import { noConstructInInterface } from "../rules/no-construct-in-interface";

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      },
    },
  },
});

ruleTester.run("no-construct-in-interface", noConstructInInterface, {
  valid: [
    // WHEN: property type is string
    {
      code: `
      interface TestInterface {
        test: string;
      }
      `,
    },
    // WHEN: property type is custom type
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
    // WHEN: property type is class but not CDK Construct
    {
      code: `
      class TestClass {}
      interface TestInterface {
        test: TestClass;
      }
      `,
    },
  ],
  invalid: [
    {
      code: `
      class Construct {}
      class TestClass extends Construct {}
      interface TestInterface {
        test: TestClass;
      }
      `,
      errors: [{ messageId: "noConstructInInterfaceProps" }],
    },
  ],
});
