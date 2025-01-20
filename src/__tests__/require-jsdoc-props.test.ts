import { RuleTester } from "@typescript-eslint/rule-tester";

import { requireJSDocProps } from "../rules/require-jsdoc-props";

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2018,
    sourceType: "module",
  },
});

ruleTester.run("require-jsdoc-props", requireJSDocProps, {
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
          private prop1: string;
          /** Description for prop2 */
          public prop2: number;
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
          private prop1: string;
          /** Description for prop2 */
          public prop2: number;
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
