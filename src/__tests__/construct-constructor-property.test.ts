import { RuleTester } from "@typescript-eslint/rule-tester";
import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

import { constructConstructorProperty } from "../rules/construct-constructor-property";

// 型アサーションを使用して、型エラーを解決するのだ
const typedRule = constructConstructorProperty as ESLintUtils.RuleModule<
  "invalidConstructorProperty",
  [],
  {
    ClassDeclaration(node: TSESTree.ClassDeclaration): void;
  }
>;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      },
    },
  },
});

ruleTester.run("construct-constructor-property", typedRule, {
  valid: [
    // WHEN: constructor has "scope, id" signature
    {
      code: `
      class Construct {}
      interface MyConstructProps {}
      
      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string) { 
          super(scope, id);
        }
      }
      `,
    },
    // WHEN: constructor has "scope, id, props" signature
    {
      code: `
      class Construct {}
      interface MyConstructProps {}
      
      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) { 
          super(scope, id);
        }
      }
      `,
    },
    // WHEN: constructor has "scope, id, props" signature with optional props
    {
      code: `
      class Construct {}
      interface MyConstructProps {}
      
      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props?: MyConstructProps) { 
          super(scope, id);
        }
      }
      `,
    },
    // WHEN: class does not extend Construct
    {
      code: `
      interface MyClassProps {}
      
      export class MyClass {
        constructor(scope: any, id: string, props: MyClassProps, resourceName: string) { }
      }
      `,
    },
    // WHEN: constructor has more than 3 parameters but first three are "scope, id, props"
    {
      code: `
      class Construct {}
      interface MyConstructProps {}
      
      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps, resourceName: string) { 
          super(scope, id);
        }
      }
      `,
    },
  ],
  invalid: [
    // WHEN: constructor has 3 parameters but third parameter is not named "props"
    {
      code: `
      class Construct {}
      interface MyConstructProps {}
      
      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, myProps: MyConstructProps) { 
          super(scope, id);
        }
      }
      `,
      errors: [{ messageId: "invalidConstructorProperty" }],
    },
    // WHEN: constructor has less than 2 parameters
    {
      code: `
      class Construct {}
      
      export class MyConstruct extends Construct {
        constructor(scope: Construct) { 
          super(scope, "id");
        }
      }
      `,
      errors: [{ messageId: "invalidConstructorProperty" }],
    },
    // WHEN: constructor has 2 parameters but first is not named "scope"
    {
      code: `
      class Construct {}
      
      export class MyConstruct extends Construct {
        constructor(myScope: Construct, id: string) { 
          super(myScope, id);
        }
      }
      `,
      errors: [{ messageId: "invalidConstructorProperty" }],
    },
    // WHEN: constructor has 2 parameters but second is not named "id"
    {
      code: `
      class Construct {}
      
      export class MyConstruct extends Construct {
        constructor(scope: Construct, myId: string) { 
          super(scope, myId);
        }
      }
      `,
      errors: [{ messageId: "invalidConstructorProperty" }],
    },
    // WHEN: constructor has 4 parameters but third is not named "props"
    {
      code: `
      class Construct {}
      interface MyConstructProps {}
      
      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, myProps: MyConstructProps, resourceName: string) { 
          super(scope, id);
        }
      }
      `,
      errors: [{ messageId: "invalidConstructorProperty" }],
    },
  ],
});
