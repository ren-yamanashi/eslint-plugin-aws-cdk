import { RuleTester } from "@typescript-eslint/rule-tester";

import { requireJSDoc } from "../rules/require-jsdoc";

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      },
    },
  },
});

ruleTester.run("require-jsdoc", requireJSDoc, {
  valid: [
    {
      code: `
        interface TestProps {
          /** Description for prop1 */
          prop1: string;
          /** Description for prop2 */
          prop2: number;
        }
      `,
    },
    {
      code: `
        import { Construct } from 'constructs';
        class TestConstruct extends Construct {
          /** Description for prop1 */
          public prop1: string;
          /** Description for prop2 */
          public prop2: number;
          private prop3: string; // private property should not require JSDoc
          protected prop4: number; // protected property should not require JSDoc
        }
      `,
    },
    {
      code: `
        class NormalClass {
          public prop1: string; // non-Construct class should not require JSDoc
          private prop2: number;
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        interface TestProps {
          prop1: string;
          /** Description for prop2 */
          prop2: number;
        }
      `,
      errors: [
        {
          messageId: "missingJSDoc",
          data: { propertyName: "prop1" },
        },
      ],
    },
    {
      code: `
        import { Construct } from 'constructs';
        class TestConstruct extends Construct {
          public prop1: string;
          /** Description for prop2 */
          public prop2: number;
          private prop3: string;
        }
      `,
      errors: [
        {
          messageId: "missingJSDoc",
          data: { propertyName: "prop1" },
        },
      ],
    },
  ],
});
