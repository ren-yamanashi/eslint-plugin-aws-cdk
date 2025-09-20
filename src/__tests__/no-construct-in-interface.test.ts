import { RuleTester } from "@typescript-eslint/rule-tester";

import { noConstructInInterface } from "../rules/no-construct-in-interface";

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      },
    },
  },
});

ruleTester.run("no-construct-in-interface", noConstructInInterface, {
  valid: [
    // // WHEN: property type is string
    // {
    //   code: `
    //   interface TestInterface {
    //     test: string;
    //   }
    //   `,
    // },
    // // WHEN: property type is custom type
    // {
    //   code: `
    //   type TestType = {
    //     test: string;
    //   };
    //   interface TestInterface {
    //     test: TestType;
    //   }
    //   `,
    // },
    // // WHEN: property type is undefined
    // {
    //   code: `
    //   interface TestInterface {
    //     test: undefined;
    //   }
    //   `,
    // },
    // // WHEN: property type is class but not CDK Construct
    // {
    //   code: `
    //   class TestClass {}
    //   interface TestInterface {
    //     test: TestClass;
    //   }
    //   `,
    // },
    // // WHEN: property type is interface that extends Construct
    // {
    //   code: `
    //   interface Construct {}
    //   interface SampleInterface extends Construct {}
    //   interface TestInterface {
    //     test: SampleInterface;
    //   }
    //   `,
    // },
    // // WHEN: property type is class but not extends Construct
    // {
    //   code: `
    //   class SampleConstruct {}
    //   interface TestInterface {
    //     test: SampleConstruct;
    //   }
    //   `,
    // },
  ],
  invalid: [
    // {
    //   code: `
    //   class Construct {}
    //   class TestClass extends Construct {}
    //   interface TestInterface {
    //     test: TestClass;
    //   }
    //   `,
    //   errors: [{ messageId: "invalidInterfaceProperty" }],
    // },
    // {
    //   code: `
    //   class Stack {}
    //   class TestClass extends Stack {}
    //   interface TestInterface {
    //     test: TestClass;
    //   }
    //   `,
    //   errors: [{ messageId: "invalidInterfaceProperty" }],
    // },
    {
      code: `
      class Resource {}
      interface IBucket {
        bucketName: string;
      }
      export abstract class BucketBase extends Resource implements IBucket {
        abstract readonly bucketName: string;
        constructor() {
          super();
        }
      }
      export class Bucket extends BucketBase {
        readonly bucketName: string;
        constructor() {
          super();
          this.bucketName = "test-bucket";
        }
      }
      interface MyConstructProps {
        bucket: Bucket;
      }
      `,
      errors: [{ messageId: "invalidInterfaceProperty" }],
    },
  ],
});
