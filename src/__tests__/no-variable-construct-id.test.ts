import { RuleTester } from "@typescript-eslint/rule-tester";

import { noVariableConstructId } from "../no-variable-construct-id.mjs";

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      },
    },
  },
});

ruleTester.run("no-variable-construct-id", noVariableConstructId, {
  valid: [
    // WHEN: id is string literal
    {
      code: `
      class Construct {}
      class TargetConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
        }
      }
      class SampleConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          new TargetConstruct(this, "SampleId");
        }
      }
      `,
    },
    // WHEN: id is template literal, without expressions
    {
      code: `
      class Construct {}
      class TargetConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
        }
      }
      class SampleConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          new TargetConstruct(this, \`SampleId\`);
        }
      }
      `,
    },
    // WHEN: id is variable in a for...of loop
    {
      code: `
      class Construct {}
      class TargetConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
        }
      }
      class SampleConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          const items = ['a', 'b', 'c'];
          for (const item of items) {
            new TargetConstruct(this, item);
          }
        }
      }
    `,
    },
    // WHEN: id is variable in a while loop
    {
      code: `
      class Construct {}
      class TargetConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
        }
      }
      class SampleConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          const items = ['a', 'b', 'c'];
          while (items.length > 0) {
            new TargetConstruct(this, items.pop()!);
          }
        }
      }
    `,
    },
  ],
  invalid: [
    // WHEN: id is variable
    {
      code: `
      class Construct {}
      class TargetConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
        }
      }
      class SampleConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          new TargetConstruct(this, id);
        }
      }
      `,
      errors: [{ messageId: "noVariableConstructId" }],
    },
    {
      code: `
      class Construct {}
      class TargetConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
        }
      }
      class SampleConstruct extends Construct {
        constructor(scope: Construct, id: string, props: { name: string}) {
          super(scope, id);
          new TargetConstruct(this, props.name);
        }
      }
      `,
      errors: [{ messageId: "noVariableConstructId" }],
    },
    // WHEN: id is template literal, with expressions
    {
      code: [
        "class Construct {}",
        "class TargetConstruct extends Construct {",
        "  constructor(scope: Construct, id: string) {",
        "    super(scope, id);",
        "  }",
        "}",
        "class SampleConstruct extends Construct {",
        "  constructor(scope: Construct, id: string) {",
        "    super(scope, id);",
        "    new TargetConstruct(this, `${id}Bucket`);",
        "  }",
        "}",
      ].join("\n"),
      errors: [{ messageId: "noVariableConstructId" }],
    },
    // WHEN: using the function
    {
      code: `
      class Construct {}
      class TargetConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
        }
      }
      class SampleConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          new TargetConstruct(this, id + "Bucket");
        }
      }
      `,
      errors: [{ messageId: "noVariableConstructId" }],
    },
    {
      code: `
      const getId = () => "SampleId";
      class Construct {}
      class TargetConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
        }
      }
      class SampleConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          new TargetConstruct(this, getId());
        }
      }
      `,
      errors: [{ messageId: "noVariableConstructId" }],
    },
  ],
});
