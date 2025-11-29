import { RuleTester } from "@typescript-eslint/rule-tester";

import { noUnusedProps } from "../rules/no-unused-props";

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ["*.ts*"],
      },
    },
  },
});

ruleTester.run("no-unused-props", noUnusedProps, {
  valid: [
    {
      // WHEN: Props is assigned to private variable and that private variable is used
      code: `
      class Construct {}

      interface BucketProps {
        bucketName: string;
      }

      class Bucket extends Construct {
        private myProps: BucketProps;
        constructor(scope: Construct, id: string, props: BucketProps) {
          super(scope, id);
          this.myProps = props;
          console.log(this.myProps);
        }
      }
      `,
    },
    {
      // WHEN: Props is assigned to private variable and that private variable's property is used
      code: `
      class Construct {}

      interface BucketProps {
        bucketName: string;
      }

      class Bucket extends Construct {
        private myProps: BucketProps;
        constructor(scope: Construct, id: string, props: BucketProps) {
          super(scope, id);
          this.myProps = props;
          console.log(this.myProps.bucketName);
        }
      }
      `,
    },
    {
      // WHEN: All properties are used directly
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
      }
      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          new Bucket(this, "MyBucket", {
            bucketName: props.bucketName,
            versioned: props.enableVersioning
          });
        }
      }
      `,
    },
    // WHEN: Properties are used via destructuring
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          const { bucketName, enableVersioning } = props;
          new Bucket(this, "MyBucket", {
            bucketName,
            versioned: enableVersioning
          });
        }
      }
      `,
    },
    // WHEN: Props is assigned to private variable and all properties are used
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
      }

      export class MyConstruct extends Construct {
        private props: MyConstructProps;

        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          this.props = props;

          new Bucket(this, "MyBucket", {
            bucketName: this.props.bucketName,
            versioned: this.props.enableVersioning
          });
        }
      }
      `,
    },
    // WHEN: Individual properties are assigned to instance variables
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
      }

      export class MyConstruct extends Construct {
        private bucketName: string;
        private enableVersioning: boolean;

        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          this.bucketName = props.bucketName;
          this.enableVersioning = props.enableVersioning;

          new Bucket(this, "MyBucket", {
            bucketName: this.bucketName,
            versioned: this.enableVersioning
          });
        }
      }
      `,
    },
    // WHEN: Optional properties are used conditionally
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning?: boolean;
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          new Bucket(this, "MyBucket", {
            bucketName: props.bucketName,
            versioned: props.enableVersioning || false
          });
        }
      }
      `,
    },
    // WHEN: Constructor has no props parameter
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
        }
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string) {
          super(scope, id);
          new Bucket(this, "MyBucket");
        }
      }
      `,
    },
    // WHEN: Class does not extend Construct
    {
      code: `
      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
      }

      export class MyClass {
        constructor(props: MyConstructProps) {
          // This should not be checked as it's not a Construct
        }
      }
      `,
    },
    // WHEN: Props is used in nested object access
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        config: {
          bucketName: string;
          enableVersioning: boolean;
        };
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          new Bucket(this, "MyBucket", {
            bucketName: props.config.bucketName,
            versioned: props.config.enableVersioning
          });
        }
      }
      `,
    },
    // WHEN: Properties are used via optional chaining
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName?: string;
        enableVersioning?: boolean;
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          new Bucket(this, "MyBucket", {
            bucketName: props?.bucketName || "default",
            versioned: props?.enableVersioning || false
          });
        }
      }
      `,
    },
    // WHEN: Some properties are unused but, class is abstract
    {
      code: `
      class Construct {}
      export interface BaseConstructProps {
        readonly bucketName: string;
      }
      abstract class BaseConstruct extends Construct {
        constructor(scope: Construct, id: string, props: BaseConstructProps) {
          super(scope, id);
        }
      }
  `,
    },
    // WHEN: Props are used in super call
    {
      code: `
      class Construct {}

      interface BaseConstructProps {
        bucketName: string;
      }
      class BaseConstruct extends Construct {
        constructor(scope: Construct, id: string, props: BaseConstructProps) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps extends BaseConstructProps {
        version: string;
      }
      class MyConstruct extends BaseConstruct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id, props);
        }
      }
  `,
    },
    // WHEN: Props is assigned to instance variable and used in other methods
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
      }

      export class MyConstruct extends Construct {
        private props: MyConstructProps;

        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          this.props = props;
        }

        private createBucket() {
          new Bucket(this, "MyBucket", {
            bucketName: this.props.bucketName,
            versioned: this.props.enableVersioning
          });
        }
      }
      `,
    },
    // WHEN: Props is assigned to instance variable and used in public method
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
      }

      export class MyConstruct extends Construct {
        private readonly props: MyConstructProps;

        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          this.props = props;
        }

        public getBucketName(): string {
          return this.props.bucketName;
        }

        protected isVersioningEnabled(): boolean {
          return this.props.enableVersioning;
        }
      }
      `,
    },
    // WHEN: Props is assigned to instance variable with different name and used in methods
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
      }

      export class MyConstruct extends Construct {
        private readonly config: MyConstructProps;

        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          this.config = props;
        }

        private initialize() {
          new Bucket(this, "MyBucket", {
            bucketName: this.config.bucketName,
            versioned: this.config.enableVersioning
          });
        }
      }
      `,
    },
    // WHEN: Props is passed to private method in constructor
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          this.initialize(props);
        }

        private initialize(props: MyConstructProps) {
          new Bucket(this, "MyBucket", {
            bucketName: props.bucketName,
            versioned: props.enableVersioning
          });
        }
      }
      `,
    },
    // WHEN: Props properties are passed to private method in constructor
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          this.createBucket(props.bucketName, props.enableVersioning);
        }

        private createBucket(name: string, versioned: boolean) {
          new Bucket(this, "MyBucket", {
            bucketName: name,
            versioned: versioned
          });
        }
      }
      `,
    },
    // WHEN: Props is passed to multiple private methods
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          this.setupBucket(props);
          this.configureVersioning(props.enableVersioning);
        }

        private setupBucket(props: MyConstructProps) {
          new Bucket(this, "MyBucket", {
            bucketName: props.bucketName,
            versioned: false
          });
        }

        private configureVersioning(enabled: boolean) {
          console.log("Versioning:", enabled);
        }
      }
      `,
    },
    // WHEN: Props is used as a whole in external function (e.g., console.log(props))
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
        extraProp: string;
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          console.log(props); // props is used as a whole
          new Bucket(this, "MyBucket");
        }
      }
      `,
    },
    // WHEN: Props is assigned to a variable and all properties are used via the alias
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          const a = props;
          new Bucket(this, "MyBucket", {
            bucketName: a.bucketName,
            versioned: a.enableVersioning
          });
        }
      }
      `,
    },
  ],
  // invalid: [
  //   // // WHEN: Props is assigned to instance variable but some properties are not used in any method
  //   // {
  //   //   code: `
  //   //   class Construct {}
  //   //   class Bucket extends Construct {
  //   //     constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
  //   //       super(scope, id);
  //   //       console.log(props);
  //   //     }
  //   //   }
  //   //   interface MyConstructProps {
  //   //     bucketName: string;
  //   //     enableVersioning: boolean;
  //   //     unusedProp: string;
  //   //   }
  //   //   export class MyConstruct extends Construct {
  //   //     private myProps: MyConstructProps;
  //   //     constructor(scope: Construct, id: string, props: MyConstructProps) {
  //   //       super(scope, id);
  //   //       this.myProps = props;
  //   //     }
  //   //     private createBucket() {
  //   //       new Bucket(this, "MyBucket", {
  //   //         bucketName: this.myProps.bucketName,
  //   //         versioned: this.myProps.enableVersioning
  //   //       });
  //   //     }
  //   //   }
  //   //   `,
  //   //   errors: [{ messageId: "unusedProp" }],
  //   // },
  // ],
  invalid: [
    // WHEN: Some properties are unused
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
        unusedProp: string;
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          new Bucket(this, "MyBucket", {
            bucketName: props.bucketName,
            versioned: props.enableVersioning
          });
        }
      }
      `,
      errors: [{ messageId: "unusedProp" }],
    },
    // WHEN: All properties are unused but props parameter exists
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          new Bucket(this, "MyBucket", {
            bucketName: "hardcoded-name",
            versioned: true
          });
        }
      }
      `,
      errors: [{ messageId: "unusedProp" }, { messageId: "unusedProp" }],
    },
    // WHEN: Props parameter is not referenced at all
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          new Bucket(this, "MyBucket");
        }
      }
      `,
      errors: [{ messageId: "unusedProp" }, { messageId: "unusedProp" }],
    },
    // WHEN: Only some properties are used via destructuring
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
        unusedProp: string;
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          const { bucketName, enableVersioning } = props;
          new Bucket(this, "MyBucket", {
            bucketName,
            versioned: enableVersioning
          });
        }
      }
      `,
      errors: [{ messageId: "unusedProp" }],
    },
    // WHEN: Props is assigned to private variable but some properties are unused
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
        unusedProp: string;
      }

      export class MyConstruct extends Construct {
        private props: MyConstructProps;

        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          this.props = props;

          new Bucket(this, "MyBucket", {
            bucketName: this.props.bucketName,
            versioned: this.props.enableVersioning
          });
        }
      }
      `,
      errors: [{ messageId: "unusedProp" }],
    },
    // WHEN: Alias destructuring with some properties unused
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
        unusedProp: string;
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          const { bucketName: bn, enableVersioning: ev } = props;
          new Bucket(this, "MyBucket", {
            bucketName: bn,
            versioned: ev
          });
        }
      }
      `,
      errors: [{ messageId: "unusedProp" }],
    },
    // WHEN: Props is assigned to instance variable but some properties are not used in any method
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
        unusedProp: string;
      }

      export class MyConstruct extends Construct {
        private props: MyConstructProps;

        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          this.props = props;
        }

        private createBucket() {
          new Bucket(this, "MyBucket", {
            bucketName: this.props.bucketName,
            versioned: this.props.enableVersioning
          });
        }
      }
      `,
      errors: [{ messageId: "unusedProp" }],
    },
    // WHEN: Props is assigned to instance variable but not used in any method
    {
      code: `
      class Construct {}

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
      }

      export class MyConstruct extends Construct {
        private props: MyConstructProps;

        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          this.props = props;
        }

        private doSomething() {
          console.log("doing something");
        }
      }
      `,
      errors: [{ messageId: "unusedProp" }, { messageId: "unusedProp" }],
    },
    // WHEN: Props is assigned to instance variable with different name but some properties unused
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
        unusedProp: string;
      }

      export class MyConstruct extends Construct {
        private readonly config: MyConstructProps;

        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          this.config = props;
        }

        private initialize() {
          new Bucket(this, "MyBucket", {
            bucketName: this.config.bucketName,
            versioned: this.config.enableVersioning
          });
        }
      }
      `,
      errors: [{ messageId: "unusedProp" }],
    },
    // WHEN: Props is passed to private method but some properties are not used
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
        unusedProp: string;
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          this.initialize(props);
        }

        private initialize(props: MyConstructProps) {
          new Bucket(this, "MyBucket", {
            bucketName: props.bucketName,
            versioned: props.enableVersioning
          });
        }
      }
      `,
      errors: [{ messageId: "unusedProp" }],
    },
    // WHEN: Only some props properties are passed to private method
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
        unusedProp: string;
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          this.createBucket(props.bucketName, props.enableVersioning);
        }

        private createBucket(name: string, versioned: boolean) {
          new Bucket(this, "MyBucket", {
            bucketName: name,
            versioned: versioned
          });
        }
      }
      `,
      errors: [{ messageId: "unusedProp" }],
    },
    // WHEN: Props is assigned to a variable but only some properties are used via the alias
    {
      code: `
      class Construct {}
      class Bucket extends Construct {
        constructor(scope: Construct, id: string, props: { bucketName: string; versioned: boolean }) {
          super(scope, id);
          console.log(props);
        }
      }

      interface MyConstructProps {
        bucketName: string;
        enableVersioning: boolean;
        unusedProp: string;
      }

      export class MyConstruct extends Construct {
        constructor(scope: Construct, id: string, props: MyConstructProps) {
          super(scope, id);
          const a = props;
          new Bucket(this, "MyBucket", {
            bucketName: a.bucketName,
            versioned: a.enableVersioning
          });
        }
      }
      `,
      errors: [{ messageId: "unusedProp" }],
    },
  ],
});
