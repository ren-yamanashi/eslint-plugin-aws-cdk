import { RuleTester } from "@typescript-eslint/rule-tester";

import { noMutablePublicFields } from "../no-mutable-public-fields.mjs";

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      },
    },
  },
});

ruleTester.run("no-mutable-public-fields", noMutablePublicFields, {
  valid: [
    // WHEN: readonly field type is primitive
    {
      code: `
      class TestClass {
        public readonly test: string;
      }
      `,
    },
    {
      code: `
      class TestClass {
        readonly test: string;
      }
      `,
    },
    // WHEN: field is private
    {
      code: `
      class DependencyClass {}
      class TestClass {
        private test: DependencyClass;
      }
      `,
    },
    // WHEN: field is protected
    {
      code: `
      class DependencyClass {}
      class TestClass {
        protected test: DependencyClass;
      }
      `,
    },
    // WHEN: constructor parameter property is mutable
    {
      code: `
      class DependencyClass {}
      class TestClass {
        constructor(test: DependencyClass) {}
      }
      `,
    },
  ],
  invalid: [
    // WHEN: public field is mutable
    {
      code: `
      class DependencyClass {}
      class TestClass {
        public test: DependencyClass;
      }
      `,
      errors: [{ messageId: "noMutablePublicFields" }],
      output: `
      class DependencyClass {}
      class TestClass {
        public readonly test: DependencyClass;
      }
      `,
    },
    {
      code: `
      class DependencyClass {}
      class TestClass {
        test: DependencyClass;
      }
      `,
      errors: [{ messageId: "noMutablePublicFields" }],
      output: `
      class DependencyClass {}
      class TestClass {
        readonly test: DependencyClass;
      }
      `,
    },
  ],
});
