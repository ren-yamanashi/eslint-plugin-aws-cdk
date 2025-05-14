import { RuleTester } from "@typescript-eslint/rule-tester";

import { noVariableConstructId } from "../rules/no-variable-construct-id";

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
    // WHEN: id is variable in a forEach method
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
          items.forEach(item => {
            new TargetConstruct(this, item);
          });
        }
      }
    `,
    },
    // WHEN: id is variable in other array methods (map, filter, etc.)
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
          items.map(item => {
            new TargetConstruct(this, item);
            return item;
          });
        }
      }
    `,
    },
    // WHEN: property name is not `id`
    {
      code: `
      class Construct {}
      class TargetConstruct extends Construct {
        constructor(scope: Construct, validId: string) {
          super(scope, validId);
        }
      }
      class SampleConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          new TargetConstruct(this, id);
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
      errors: [{ messageId: "invalidConstructId" }],
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
      errors: [{ messageId: "invalidConstructId" }],
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
      errors: [{ messageId: "invalidConstructId" }],
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
      errors: [{ messageId: "invalidConstructId" }],
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
      errors: [{ messageId: "invalidConstructId" }],
    },
  ],
});
