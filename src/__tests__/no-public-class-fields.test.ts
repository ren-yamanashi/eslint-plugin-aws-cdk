import { RuleTester } from "@typescript-eslint/rule-tester";

import { noPublicClassFields } from "../no-public-class-fields.mjs";

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      },
    },
  },
});

ruleTester.run("no-public-class-fields", noPublicClassFields, {
  valid: [
    // WHEN: field type is primitive
    {
      code: `
      class TestClass {
        public test: string;
      }
      `,
    },
    // WHEN: field type is interface
    {
      code: `
      interface ITest {
        value: string;
      }
      class TestClass {
        public test: ITest;
      }
      `,
    },
    // WHEN: field type is type alias
    {
      code: `
      type TestType = {
        value: string;
      };
      class TestClass {
        public test: TestType;
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
    // WHEN: field has no type annotation
    {
      code: `
      class TestClass {
        public test;
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
  ],
  invalid: [
    // WHEN: public field uses class type
    {
      code: `
      class DependencyClass {}
      class TestClass {
        public test: DependencyClass;
      }
      `,
      errors: [{ messageId: "noPublicClassFields" }],
    },
    // WHEN: implicitly public field uses class type
    {
      code: `
      class DependencyClass {}
      class TestClass {
        test: DependencyClass;
      }
      `,
      errors: [{ messageId: "noPublicClassFields" }],
    },
    // WHEN: readonly public field uses class type
    {
      code: `
      class DependencyClass {}
      class TestClass {
        public readonly test: DependencyClass;
      }
      `,
      errors: [{ messageId: "noPublicClassFields" }],
    },
    // WHEN: constructor parameter property uses class type
    {
      code: `
      class DependencyClass {}
      class TestClass {
        constructor(public test: DependencyClass) {}
      }
      `,
      errors: [{ messageId: "noPublicClassFields" }],
    },
  ],
});
