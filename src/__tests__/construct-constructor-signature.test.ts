import { RuleTester } from "@typescript-eslint/rule-tester";
import { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

import { constructConstructorSignature } from "../rules/construct-constructor-signature";

// 型アサーションを使用して、型エラーを解決するのだ
const typedRule = constructConstructorSignature as ESLintUtils.RuleModule<
  "invalidConstructorSignature",
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

ruleTester.run("construct-constructor-signature", typedRule, {
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
  ],
  invalid: [
    // WHEN: constructor has more than 3 parameters
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
      errors: [{ messageId: "invalidConstructorSignature" }],
    },
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
      errors: [{ messageId: "invalidConstructorSignature" }],
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
      errors: [{ messageId: "invalidConstructorSignature" }],
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
      errors: [{ messageId: "invalidConstructorSignature" }],
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
      errors: [{ messageId: "invalidConstructorSignature" }],
    },
  ],
});
