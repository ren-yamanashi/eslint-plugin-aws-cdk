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
    {
      name: "property type is not class",
      code: `
      type TestType = {
        test: string;
      };
      interface TestInterface {
        testStr: string;
        testNum: number;
        testBool: boolean;
        testType: TestType;
        testArr: TestType[];
        testArr2: Array<TestType>;
        testGenerics: Promise<TestType>;
        testUndef: undefined;
        testNull: null;
        testAny: any;
        testUnknown: unknown;
        testNever: never;
        testVoid: void;
        testFn: () => void;
        testObj: { value: number };
      }
      `,
    },
    {
      name: "property type is class but not Resource type",
      code: `
      class TestClass {}
      interface TestInterface {
        test: TestClass;
      }
      `,
    },
    {
      name: `
      property type is class that extends Resource but does not implement matching interface
      (BaseLoadBalancer class extends Resource but does not implement matching interface)`,
      code: `
      class Resource {}
      export abstract class BaseLoadBalancer extends Resource {
        constructor() {
          super();
        }
      }
      interface MyConstructProps {
        lb: BaseLoadBalancer;
        lbArr: BaseLoadBalancer[];
        lbArr2: Array<BaseLoadBalancer>;
        lbGenerics: Readonly<BaseLoadBalancer>;
      }
      `,
    },
    {
      name: `
      property type is class that extends Resource but does not implement matching interface
      (EdgeFunction class extends Resource but does not implement matching interface)`,
      code: `
      interface IVersion {
        version: string;
      }
      export class EdgeFunction extends Resource implements IVersion {
        constructor() {
          super();
        }
      }
      interface MyConstructProps {
        edgeFn: EdgeFunction;
      }
      `,
    },
  ],
  invalid: [
    {
      name: `
      property type is class that extends Resource
      (Bucket class extends Resource and indirectly implements IBucket interface)`,
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
    {
      name: `
      property type is class that extends Resource
      (BucketBase class extends Resource and implements IBucket interface)`,
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
      interface MyConstructProps {
        bucket: BucketBase;
      }
      `,
      errors: [{ messageId: "invalidInterfaceProperty" }],
    },
    {
      name: `
      property type is class that extends Resource
      EmailIdentity class extends Resource and indirectly implements IEmailIdentity interface`,
      code: `
      class Resource {}
      interface IEmailIdentity {
        emailIdentityName: string;
      }
      export abstract class EmailIdentityBase extends Resource implements IEmailIdentity {
        abstract readonly emailIdentityName: string;
        constructor() {
          super();
        }
      }
      export class EmailIdentity extends EmailIdentityBase {
        constructor() {
          super();
        }
      }
      interface MyConstructProps {
        bucket: EmailIdentity;
      }
      `,
      errors: [{ messageId: "invalidInterfaceProperty" }],
    },
    {
      name: `
      property type is class that extends Resource
      FargateService class extends Resource and implements IFargateService interface`,
      code: `
      class Resource {}
      interface IService {
        serviceArn: string;
      }
      interface IFargateService extends IService {}
      export abstract class BaseService extends Resource implements IService {
        abstract readonly serviceArn: string;
        constructor() {
          super();
        }
      }
      export class FargateService extends BaseService implements IFargateService {
        readonly serviceArn: string;
        constructor() {
          super();
        }
      }
      interface MyConstructProps {
        bucket: FargateService;
      }
      `,
      errors: [{ messageId: "invalidInterfaceProperty" }],
    },
    {
      name: `
      property type is class that extends Resource
      (FargateService class extends Resource and implements ecs.IFargateService interface)`,
      code: `
      class Resource {}
      interface IService {
        serviceArn: string;
      }
      declare module ecs {
        export interface IFargateService extends IService {}
      }
      export abstract class BaseService extends Resource implements IService {
        abstract readonly serviceArn: string;
        constructor() {
          super();
        }
      }
      export class FargateService extends BaseService implements ecs.IFargateService {
        readonly serviceArn: string;
        constructor() {
          super();
        }
      }
      interface MyConstructProps {
        bucket: FargateService;
      }
      `,
      errors: [{ messageId: "invalidInterfaceProperty" }],
    },
    {
      name: `
      property type is class that extends a base class implementing a matching interface
      (S3OriginAccessControl extends OriginAccessControlBase which implements IOriginAccessControl)`,
      code: `
      class Resource {}
      interface IOriginAccessControl {
        originAccessControlId: string;
      }
      export abstract class OriginAccessControlBase extends Resource implements IOriginAccessControl {
        abstract readonly originAccessControlId: string;
        constructor() {
          super();
        }
      }
      export class S3OriginAccessControl extends OriginAccessControlBase {
        readonly originAccessControlId: string;
        constructor() {
          super();
          this.originAccessControlId = "test-id";
        }
      }
      interface MyConstructProps {
        originAccessControl: S3OriginAccessControl;
      }
      `,
      errors: [{ messageId: "invalidInterfaceProperty" }],
    },
    {
      name: `
      property type is class with BaseV{number} pattern
      (TableBaseV2 class extends Resource and implements ITableV2)
      `,
      code: `
      class Resource {}
      interface ITableV2 {
        tableName: string;
      }
      export class TableBaseV2 extends Resource implements ITableV2 {
        readonly tableName: string;
        constructor() {
          super();
          this.tableName = "test-table";
        }
      }
      interface MyConstructProps {
        table: TableBaseV2;
      }
      `,
      errors: [{ messageId: "invalidInterfaceProperty" }],
    },
    {
      name: "property type is array of class that extends Resource",
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
        bucket: Bucket[];
      }
      `,
      errors: [{ messageId: "invalidInterfaceProperty" }],
    },
    {
      name: "property type is Array generics type wrapping class that extends Resource",
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
        buckets: Array<Bucket>;
      }
      `,
      errors: [{ messageId: "invalidInterfaceProperty" }],
    },
    {
      name: "property type is Readonly generics type wrapping class that extends Resource",
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
        bucket: Readonly<Bucket>;
      }
      `,
      errors: [{ messageId: "invalidInterfaceProperty" }],
    },
    {
      name: "property type is Partial generics type wrapping class that extends Resource",
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
        bucket: Partial<Bucket>;
      }
      `,
      errors: [{ messageId: "invalidInterfaceProperty" }],
    },
    {
      name: "property type is custom generics type wrapping class that extends Resource",
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
      type MyWrapper<T> = T;
      interface MyConstructProps {
        bucket: MyWrapper<Bucket>;
      }
      `,
      errors: [{ messageId: "invalidInterfaceProperty" }],
    },
    {
      name: "property type is custom generics interface wrapping class that extends Resource",
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
      interface Wrapper<T> {
        value: T;
      }
      interface MyConstructProps {
        bucket: Wrapper<Bucket>;
      }
      `,
      errors: [{ messageId: "invalidInterfaceProperty" }],
    },
    {
      name: "property type is some generics type wrapping class that extends Resource",
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
        bucket: Promise<Array<Bucket>>;
      }
      `,
      errors: [{ messageId: "invalidInterfaceProperty" }],
    },
  ],
});
