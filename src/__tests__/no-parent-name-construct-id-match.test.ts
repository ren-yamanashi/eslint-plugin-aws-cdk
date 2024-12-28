import { RuleTester } from "@typescript-eslint/rule-tester";

import { noParentNameConstructIdMatch } from "../rules/no-parent-name-construct-id-match";

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
  "no-parent-name-construct-id-match",
  noParentNameConstructIdMatch,
  {
    valid: [
      // WHEN: child id not same parent construct name
      {
        code: `
      class TestClass {
        constructor() {
          const test = new TestClass("test", "validId");
        }
      }`,
      },
      // WHEN: child id not same parent construct name (typescript)
      {
        code: `
      class TestClass {
        constructor(props: any, id: string) {
          const test = new TestClass("test", "validId");
        }
      }`,
      },
      // WHEN: construct does not have child
      {
        code: `
      class TestClass {
        constructor() {}
      }`,
      },
    ],
    invalid: [
      // WHEN: child class inside constructor (expression statement)
      {
        code: `
      export class TestClass {
        constructor(public id: string) {
          new SampleConstruct({ name: "sample" }, "TestClass");
        }
      }`,
        errors: [{ messageId: "noParentNameConstructIdMatch" }],
      },
      // WHEN: child class inside constructor (variable declaration)
      {
        code: `
      export class TestClass {
        constructor(public id: string) {
          const test =new SampleConstruct({ name: "sample" }, "TestClass");
        }
      }`,
        errors: [{ messageId: "noParentNameConstructIdMatch" }],
      },
      // WHEN: child statement inside if statement inside constructor (expression statement)
      {
        code: `
      class TestClass {
        constructor() {
          if (true) new Sample("test", "TestClass");
        }
      }`,
        errors: [{ messageId: "noParentNameConstructIdMatch" }],
      },
      // WHEN: child statement inside if statement inside constructor (block statement)
      {
        code: `
      class TestClass {
        constructor() {
          if (true) {
            const test = new Sample("test", "TestClass");
          }
        }
      }`,
        errors: [{ messageId: "noParentNameConstructIdMatch" }],
      },
      // WHEN: child statement inside if statement inside inside constructor (block statement / nested)
      {
        code: `
      class TestClass {
        constructor() {
          if (true) {
            if (true) {
              const test = new Sample("test", "TestClass");
            }
          }
        }
      }`,
        errors: [{ messageId: "noParentNameConstructIdMatch" }],
      },
      // WHEN: child statement inside switch statement inside inside constructor (expression statement)
      {
        code: `
      class TestClass {
        constructor() {
          switch (item.type) {
            case "test":
              const test = new Sample("test", "TestClass");
              break;
          }
        }
      }`,
        errors: [{ messageId: "noParentNameConstructIdMatch" }],
      },
      // WHEN: child statement inside switch statement inside inside constructor (block statement)
      {
        code: `
      class TestClass {
        constructor() {
          switch (item.type) {
            case "test": {
              const test = new Sample("test", "TestClass");
              break;
            }
          }
        }
      }`,
        errors: [{ messageId: "noParentNameConstructIdMatch" }],
      },
      // WHEN: child statement inside switch statement inside inside constructor (block statement / nested)
      {
        code: `
      class TestClass {
        constructor() {
          switch (item.type) {
            case "test": {
              switch (item.type) {
                case "test":
                  const test = new Sample("test", "TestClass");
                  break;
              }
            }
          }
        }
      }`,
        errors: [{ messageId: "noParentNameConstructIdMatch" }],
      },
      // WHEN: in method
      {
        code: `
      export class TestClass {
        constructor(public id: string) {
          this.test();
        }
        test() {
          new SampleConstruct({ name: "sample" }, "TestClass");
        }
      }`,
        errors: [{ messageId: "noParentNameConstructIdMatch" }],
      },
    ],
  }
);
