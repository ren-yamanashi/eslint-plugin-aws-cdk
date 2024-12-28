import { RuleTester } from "@typescript-eslint/rule-tester";

import { noPublicClassFields } from "../src/no-public-class-fields";

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
      class Construct {}
      class TestClass extends Construct {
        public test: string;
      }
      `,
    },
    // WHEN: field type is interface
    {
      code: `
      class Construct {}
      interface ITest {
        value: string;
      }
      class TestClass extends Construct {
        public test: ITest;
      }
      `,
    },
    // WHEN: field type is type alias
    {
      code: `
      class Construct {}
      type TestType = {
        value: string;
      };
      class TestClass extends Construct {
        public test: TestType;
      }
      `,
    },
    // WHEN: field is private
    {
      code: `
      class Construct {}
      class DependencyClass {}
      class TestClass extends Construct {
        private test: DependencyClass;
      }
      `,
    },
    // WHEN: field has no type annotation
    {
      code: `
      class Construct {}
      class TestClass extends Construct {
        public test;
      }
      `,
    },
    // WHEN: field is protected
    {
      code: `
      class Construct {}
      class DependencyClass {}
      class TestClass extends Construct {
        protected test: DependencyClass;
      }
      `,
    },
    // WHEN: super class is not a construct
    {
      code: `
      class DependencyClass {}
      class TestClass {
        public test: DependencyClass;
      }
      `,
    },
  ],
  invalid: [
    // WHEN: public field uses class type
    {
      code: `
      class Construct {}
      class DependencyClass {}
      class TestClass extends Construct {
        public test: DependencyClass;
      }
      `,
      errors: [{ messageId: "noPublicClassFields" }],
    },
    // WHEN: implicitly public field uses class type
    {
      code: `
      class Construct {}
      class DependencyClass {}
      class TestClass extends Construct {
        test: DependencyClass;
      }
      `,
      errors: [{ messageId: "noPublicClassFields" }],
    },
    // WHEN: readonly public field uses class type
    {
      code: `
      class Construct {}
      class DependencyClass {}
      class TestClass extends Construct {
        public readonly test: DependencyClass;
      }
      `,
      errors: [{ messageId: "noPublicClassFields" }],
    },
    // WHEN: constructor parameter property uses class type
    {
      code: `
      class Construct {}
      class DependencyClass {}
      class TestClass extends Construct {
        constructor(public test: DependencyClass) {}
      }
      `,
      errors: [{ messageId: "noPublicClassFields" }],
    },
  ],
});
