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
    {
      code: `
      class TestClass {
        constructor() {
          const test = new TestClass("test", "ValidId");
        }
      }`,
    },
  ],
  invalid: [
    /**
     *
     * WHEN: construct id has "Construct" suffix
     *
     */
    {
      code: `
      export class TestClass {
        constructor(public id: string) {
          new SampleConstruct({ name: "sample" }, "SampleConstruct");
        }
      }`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
    // variable declaration
    {
      code: `
      export class TestClass {
        constructor(public id: string) {
          const test = new SampleConstruct({ name: "sample" }, "SampleConstruct");
        }
      }`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
    // expression statement
    {
      code: `
      class TestClass {
        constructor() {
          if (true) new SampleConstruct("test", "SampleConstruct");
        }
      }`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
    // block statement
    {
      code: `
      class TestClass {
        constructor() {
          if (true) {
            const test = new SampleConstruct("test", "SampleConstruct");
          }
        }
      }`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
    // block statement / nested
    {
      code: `
      class TestClass {
        constructor() {
          if (true) {
            if (true) {
              const test = new SampleConstruct("test", "SampleConstruct");
            }
          }
        }
      }`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
    // switch statement
    {
      code: `
      class TestClass {
        constructor() {
          switch (item.type) {
            case "test":
              const test = new SampleConstruct("test", "SampleConstruct");
              break;
          }
        }
      }`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
    // switch statement
    {
      code: `
      class TestClass {
        constructor() {
          switch (item.type) {
            case "test": {
              const test = new SampleConstruct("test", "SampleConstruct");
              break;
            }
          }
        }
      }`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
    // switch statement / nested
    {
      code: `
      class TestClass {
        constructor() {
          switch (item.type) {
            case "test": {
              switch (item.type) {
                case "test":
                  const test = new SampleConstruct("test", "SampleConstruct");
                  break;
              }
            }
          }
        }
      }`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
    /**
     *
     * WHEN: stack id has "Stack" suffix
     *
     */
    {
      code: `
      export class TestClass {
        constructor(public id: string) {
          new SampleStack({ name: "sample" }, "SampleStack");
        }
      }`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
    // variable declaration
    {
      code: `
      export class TestClass {
        constructor(public id: string) {
          const test = new SampleStack({ name: "sample" }, "SampleStack");
        }
      }`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
    // expression statement
    {
      code: `
      class TestClass {
        constructor() {
          if (true) new SampleStack("test", "SampleStack");
        }
      }`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
    // block statement
    {
      code: `
      class TestClass {
        constructor() {
          if (true) {
            const test = new SampleStack("test", "SampleStack");
          }
        }
      }`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
    // block statement / nested
    {
      code: `
      class TestClass {
        constructor() {
          if (true) {
            if (true) {
              const test = new SampleStack("test", "SampleStack");
            }
          }
        }
      }`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
    // switch statement
    {
      code: `
      class TestClass {
        constructor() {
          switch (item.type) {
            case "test":
              const test = new SampleStack("test", "SampleStack");
              break;
          }
        }
      }`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
    // switch statement
    {
      code: `
      class TestClass {
        constructor() {
          switch (item.type) {
            case "test": {
              const test = new SampleStack("test", "SampleStack");
              break;
            }
          }
        }
      }`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
    // switch statement / nested
    {
      code: `
      class TestClass {
        constructor() {
          switch (item.type) {
            case "test": {
              switch (item.type) {
                case "test":
                  const test = new SampleStack("test", "SampleStack");
                  break;
              }
            }
          }
        }
      }`,
      errors: [{ messageId: "noConstructStackSuffix" }],
    },
  ],
});
