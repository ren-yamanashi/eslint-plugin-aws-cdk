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
    // WHEN: property type is not class
    {
      code: `
      interface TestInterface {
        test: string;
      }
      `,
    },
    {
      code: `
      type TestType = {
        test: string;
      };
      interface TestInterface {
        test: TestType;
      }
      `,
    },
    {
      code: `
      interface TestInterface {
        test: undefined;
      }
      `,
    },
    // WHEN: property type is class but not Resource type
    {
      code: `
      class TestClass {}
      interface TestInterface {
        test: TestClass;
      }
      `,
    },
    // WHEN: property type is class that extends Resource but does not implement matching interface
    //       (Bucket class extends Resource and indirectly implements IBucket interface)
    {
      code: `
      class Resource {}
      export abstract class BaseLoadBalancer extends Resource {
        constructor() {
          super();
        }
      }
      interface MyConstructProps {
        bucket: BaseLoadBalancer;
      }
      `,
    },
    {
      code: `
      class Resource {}
      interface IVersion {
        version: string;
      }
      export class EdgeFunction extends Resource implements IVersion {
        constructor() {
          super();
        }
      }
      interface MyConstructProps {
        bucket: EdgeFunction;
      }
      `,
    },
  ],
  invalid: [
    {
      // WHEN: property type is class that extends Resource
      //       (Bucket class extends Resource and indirectly implements IBucket interface)
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
    // WHEN: property type is class that extends Resource
    //       (BucketBase class extends Resource and implements IBucket interface)
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
      interface MyConstructProps {
        bucket: BucketBase;
      }
      `,
      errors: [{ messageId: "invalidInterfaceProperty" }],
    },
    // WHEN: property type is class that extends Resource
    //       (BucketBase class extends Resource and implements IBucket interface)
    {
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
    // WHEN: property type is class that extends Resource
    //       (FargateService class extends Resource and implements IFargateService interface)
    {
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
    // WHEN: property type is class that extends Resource
    //       (FargateService class extends Resource and implements ecs.IFargateService interface)
    {
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
    // WHEN: property type is class that extends a base class implementing a matching interface
    //       (S3OriginAccessControl extends OriginAccessControlBase which implements IOriginAccessControl)
    {
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
    // WHEN: property type is class with BaseV{number} pattern
    //       (TableBaseV2 class extends Resource and implements ITableV2)
    {
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
  ],
});
