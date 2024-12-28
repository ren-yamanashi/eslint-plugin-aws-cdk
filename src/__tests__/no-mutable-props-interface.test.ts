import { RuleTester } from "@typescript-eslint/rule-tester";

import { noMutablePropsInterface } from "../rules/no-mutable-props-interface";

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      },
    },
  },
});

ruleTester.run("no-mutable-props-interface", noMutablePropsInterface, {
  valid: [
    // WHEN: All properties are readonly
    {
      code: `
        interface TestProps {
          readonly name: string;
          readonly age: number;
        }
      `,
    },
    // WHEN: Interface name does not end with "Props"
    {
      code: `
        interface Test {
          name: string;
          age: number;
        }
      `,
    },
    // WHEN: Optional properties are readonly
    {
      code: `
        interface UserProps {
          readonly name: string;
          readonly age?: number;
        }
      `,
    },
  ],
  invalid: [
    // WHEN: readonly is not set
    {
      code: `
        interface TestProps {
          name: string;
          age: number;
        }
      `,
      output: `
        interface TestProps {
          readonly name: string;
          readonly age: number;
        }
      `,
      errors: [
        { messageId: "noMutablePropsInterface" },
        { messageId: "noMutablePropsInterface" },
      ],
    },
    // WHEN: Some properties do not have readonly
    {
      code: `
        interface UserProps {
          readonly name: string;
          age: number;
        }
      `,
      output: `
        interface UserProps {
          readonly name: string;
          readonly age: number;
        }
      `,
      errors: [{ messageId: "noMutablePropsInterface" }],
    },
    // WHEN: Optional properties do not have readonly
    {
      code: `
        interface ConfigProps {
          name: string;
          age?: number;
        }
      `,
      output: `
        interface ConfigProps {
          readonly name: string;
          readonly age?: number;
        }
      `,
      errors: [
        { messageId: "noMutablePropsInterface" },
        { messageId: "noMutablePropsInterface" },
      ],
    },
  ],
});
