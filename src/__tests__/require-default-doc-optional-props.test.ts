import { RuleTester } from "@typescript-eslint/rule-tester";

import { requireDefaultDocOptionalProps } from "../rules/require-default-doc-optional-props";

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      },
    },
  },
});

ruleTester.run(
  "require-default-doc-optional-props",
  requireDefaultDocOptionalProps,
  {
    valid: [
      {
        // WHEN: Optional property has @default JSDoc
        code: `
        interface Props {
          /**
           * @default undefined
           */
          optional?: number;
        }
      `,
      },
      {
        // WHEN: Optional property is in a class
        code: `
        class Example {
          optional?: string;
        }
      `,
      },
      {
        // WHEN: Optional property is in a class with JSDoc
        code: `
        class Example {
          /** Some description */
          optional?: string;
        }
      `,
      },
    ],
    invalid: [
      {
        // WHEN: Optional property has no JSDoc
        code: `
        interface Props {
          optional?: number;
        }
      `,
        errors: [
          {
            messageId: "missingDefaultDoc",
            data: { propertyName: "optional" },
          },
        ],
      },
      {
        // WHEN: Optional property has no @default JSDoc
        code: `
        interface Props {
          /** Some description */
          optional?: string;
        }
      `,
        errors: [
          {
            messageId: "missingDefaultDoc",
            data: { propertyName: "optional" },
          },
        ],
      },
    ],
  }
);
