import { RuleTester } from "@typescript-eslint/rule-tester";

import { noConstructInPublicPropertyOfConstruct } from "../rules/no-construct-in-public-property-of-construct";

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
  "no-construct-in-public-property-of-construct",
  noConstructInPublicPropertyOfConstruct,
  {
    valid: [
      // WHEN: field type is not class
      {
        code: `
          class Construct {}
          class TestClass extends Construct {
            public test: string;
          }
        `,
      },
      {
        code: `
          class Construct {}
          interface ITest {
            value: string;
          }
          class TestClass extends Construct {
            public test: ITest;
          }
        `,
      },
      {
        code: `
          class Construct {}
          type TestType = {
            value: string;
          };
          class TestClass extends Construct {
            public test: TestType;
          }
        `,
      },
      // WHEN: field is private
      {
        code: `
          class Construct {}
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
          class TestClass extends Construct {
            private test: Bucket;
          }
        `,
      },
      // WHEN: field is protected
      {
        code: `
          class Construct {}
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
          class TestClass extends Construct {
            protected test: Bucket;
          }
        `,
      },
      // WHEN: field has no type annotation
      {
        code: `
          class Construct {}
          class TestClass extends Construct {
            public test;
          }
        `,
      },
      // WHEN: class not extends construct
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
          class TestClass {
            public test: Bucket;
          }
        `,
      },
      // WHEN: when implements only IResource interface
      {
        code: `
          class Construct {}
          interface IResource {
            resourceId: string;
          }
          class Resource {
            resourceId: string;
            constructor() {
              this.resourceId = "resource-id";
            }
          }
          export class MetricFilter extends Resource {
            readonly metricName: string;
            constructor() {
              super();
            }
          }
          class TestClass extends Construct {
            public test: MetricFilter;
          }
        `,
      },
    ],
    invalid: [
      // WHEN: public field type is class that extends Resource
      //       (Bucket class extends Resource and indirectly implements IBucket interface)
      {
        code: `
          class Construct {}
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
          class TestClass extends Construct {
            public test: Bucket;
          }
        `,
        errors: [{ messageId: "invalidPublicPropertyOfConstruct" }],
      },
      // WHEN: public field type is class that extends Resource
      //       (BucketBase class extends Resource and implements IBucket interface)
      {
        code: `
          class Construct {}
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
          class TestClass extends Construct {
            public test: BucketBase;
          }
      `,
        errors: [{ messageId: "invalidPublicPropertyOfConstruct" }],
      },
      // WHEN: public field type is class that extends Resource
      //       (FargateService class extends Resource and implements IFargateService interface)
      {
        code: `
          class Construct {}
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
          class TestClass extends Construct {
            public test: FargateService;
          }
        `,
        errors: [{ messageId: "invalidPublicPropertyOfConstruct" }],
      },
      // WHEN: property type is class that extends Resource
      //       (FargateService class extends Resource and implements ecs.IFargateService interface)
      {
        code: `
          class Construct {}
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
          class TestClass extends Construct {
            public test: FargateService;
          }
        `,
        errors: [{ messageId: "invalidPublicPropertyOfConstruct" }],
      },
      // WHEN: property type is class that extends a base class implementing a matching interface
      //       (S3OriginAccessControl extends OriginAccessControlBase which implements IOriginAccessControl)
      {
        code: `
          class Construct {}
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
          class TestClass extends Construct {
            public test: S3OriginAccessControl;
          }
        `,
        errors: [{ messageId: "invalidPublicPropertyOfConstruct" }],
      },
      // WHEN: constructor public property type is class that extends Resource
      //       (BucketBase class extends Resource and implements IBucket interface)
      {
        code: `
          class Construct {}
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
          class TestClass extends Construct {
            constructor(public test: Bucket) {
              super();
            }
          }
        `,
        errors: [{ messageId: "invalidPublicPropertyOfConstruct" }],
      },
    ],
  }
);
