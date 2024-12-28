import { RuleTester } from "@typescript-eslint/rule-tester";

import { noMutablePublicFields } from "../src/no-mutable-public-fields";

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
    // WHEN: superClass is not Construct or Stack
    {
      code: `
      class DependencyClass {}
      class TestClass extends DependencyClass {
        public test: DependencyClass;
      }
      `,
    },
  ],
  invalid: [
    // WHEN: public field is mutable, nested superClass is Construct
    {
      code: `
      class DependencyClass {}
      class SampleConstruct extends Construct {}
      class TestClass extends SampleConstruct {
        public test: DependencyClass;
      }
      `,
      errors: [{ messageId: "noMutablePublicFields" }],
      output: `
      class DependencyClass {}
      class SampleConstruct extends Construct {}
      class TestClass extends SampleConstruct {
        public readonly test: DependencyClass;
      }
      `,
    },
    // WHEN: public field is mutable, superClass is Construct
    {
      code: `
      class Construct {}
      class DependencyClass {}
      class TestClass extends Construct {
        public test: DependencyClass;
      }
      `,
      errors: [{ messageId: "noMutablePublicFields" }],
      output: `
      class Construct {}
      class DependencyClass {}
      class TestClass extends Construct {
        public readonly test: DependencyClass;
      }
      `,
    },
    // WHEN: public field is mutable, superClass is Stack
    {
      code: `
      class Stack {}
      class DependencyClass {}
      class TestClass extends Stack {
        public test: DependencyClass;
      }
      `,
      errors: [{ messageId: "noMutablePublicFields" }],
      output: `
      class Stack {}
      class DependencyClass {}
      class TestClass extends Stack {
        public readonly test: DependencyClass;
      }
      `,
    },
    // WHEN: public field is mutable, `public` is omitted, superClass is Construct
    {
      code: `
      class Construct {}
      class DependencyClass {}
      class TestClass extends Construct {
        test: DependencyClass;
      }
      `,
      errors: [{ messageId: "noMutablePublicFields" }],
      output: `
      class Construct {}
      class DependencyClass {}
      class TestClass extends Construct {
        readonly test: DependencyClass;
      }
      `,
    },
  ],
});
