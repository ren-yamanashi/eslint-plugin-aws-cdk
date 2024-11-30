import { RuleTester } from "@typescript-eslint/rule-tester";

import { noConstructStackSuffix } from "../no-construct-stack-suffix.mjs";

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      },
    },
  },
});

ruleTester.run("no-construct-stack-suffix", noConstructStackSuffix, {
  valid: [
    // WHEN: construct id has no suffix, and extends Construct
    {
      code: `
      class TestConstruct extends Construct {
        constructor(props: any, id: string) {
          super(props, id);
        }
      }
      new TestConstruct("test", "ValidId");
      `,
    },
    // WHEN: construct id has no suffix, and extends Stack
    {
      code: `
      class Stack {}
      class TestStack extends Stack {
        constructor(props: any, id: string) {
          super(props, id);
        }
      }
      const test = new TestStack("test", "ValidId");
      `,
    },
    // WHEN: construct id has suffix, and not extends Construct or Stack
    {
      code: `
      class TestClass {
        constructor(public id: string) {}
      }
      const test = new TestClass("test", "SampleConstruct");
      `,
    },
    {
      code: `
      class TestClass {
        constructor(public id: string) {}
      }
      class Sample {
        constructor() {
          const test = new TestClass("test", "SampleConstruct");
        }
      }`,
    },
  ],
  invalid: [
    // WHEN: construct id has "Construct" suffix, and extends Construct
    {
      code: `
      class Construct {}
      class SampleConstruct extends Construct {
        constructor(props: any, id: string) {
          super(props, id);
        }
      }
      new SampleConstruct({ name: "sample" }, "SampleConstruct");`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
    // WHEN: stack id has "Stack" suffix, and extends Stack
    {
      code: `
      class Stack {}
      class SampleStack extends Stack {
        constructor(props: any, id: string) {
          super(props, id);
        }
      }
      new SampleStack({ name: "sample" }, "SampleStack");`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
  ],
});
