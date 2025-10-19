import { RuleTester } from "@typescript-eslint/rule-tester";

import { requirePassingThis } from "../rules/require-passing-this";

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      },
    },
  },
});

ruleTester.run("require-passing-this", requirePassingThis, {
  valid: [
    // WHEN: passing `this` to a constructor
    {
      code: `
      class Construct {}
      class SampleConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
        }
      }
      class TestConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          new SampleConstruct(this, "ValidId");
        }
      }
      `,
    },
    // WHEN: instantiated class does not extend Construct
    {
      code: `
      class Construct {}
      class SampleConstruct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
        }
      }
      class TestConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          new SampleConstruct(scope, "ValidId");
        }
      }
      `,
    },
    // WHEN: property name is not `scope`
    {
      code: `
      class Construct {}
      class SampleConstruct extends Construct {
        constructor(validProperty: Construct, id: string) {
          super(validProperty, id);
        }
      }
      class TestConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          new SampleConstruct(scope, "ValidId");
        }
      }
      `,
    },
    // WHEN: allowNonThisAndDisallowScope is true and passing a non-scope variable
    {
      code: `
      class Construct {}
      class SampleConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
        }
      }
      class TestConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          const sample = new SampleConstruct(this, "Sample");
          new SampleConstruct(sample, "ValidId");
        }
      }
      `,
      options: [{ allowNonThisAndDisallowScope: true }],
    },
  ],
  invalid: [
    // WHEN: passing 'scope' variable
    {
      code: `
      class Construct {}
      class SampleConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
        }
      }
      class TestConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          new SampleConstruct(scope, "ValidId");
        }
      }
      `,
      errors: [{ messageId: "missingPassingThis" }],
      output: `
      class Construct {}
      class SampleConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
        }
      }
      class TestConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          new SampleConstruct(this, "ValidId");
        }
      }
      `,
    },
    // WHEN: allowNonThisAndDisallowScope is false and not passing `this`
    {
      options: [{ allowNonThisAndDisallowScope: false }],
      code: `
      class Construct {}
      class SampleConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
        }
      }
      class TestConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          const otherVar = "test";
          new SampleConstruct(otherVar, "ValidId");
        }
      }
      `,
      errors: [{ messageId: "missingPassingThis" }],
      output: `
      class Construct {}
      class SampleConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
        }
      }
      class TestConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          const otherVar = "test";
          new SampleConstruct(this, "ValidId");
        }
      }
      `,
    },
  ],
});
