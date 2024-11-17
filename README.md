# eslint-plugin-cdk

ESLint plugin for [AWS CDK](https://github.com/aws/aws-cdk).

## Installation

```bash
# npm
npm install -D @nigg/eslint-plugin-cdk

# yarn
yarn add -D @nigg/eslint-plugin-cdk

# pnpm
pnpm install -D @nigg/eslint-plugin-cdk
```

## Usage

### Use recommended config

```js
// eslint.config.mjs
import eslintPluginCdk from "@nigg/eslint-plugin-cdk";
export default [
  {
    plugins: {
      cdk: eslintPluginCdk,
    },
    rules: {
      ...eslintPluginCdk.configs.recommended.rules,
    },
  },
];
```

#### If you want to customize the rules

```js
// eslint.config.mjs
import eslintPluginCdk from "@nigg/eslint-plugin-cdk";
export default [
  {
    plugins: {
      cdk: eslintPluginCdk,
    },
    rules: {
      ...eslintPluginCdk.configs.recommended.rules,
      "cdk/no-public-class-fields": "warn",
    },
  },
];
```

## Rules

- [pascal-case-construct-id](#pascal-case-construct-id)
- [no-parent-name-construct-id-match](#no-parent-name-construct-id-match)
- [no-construct-stack-suffix](#no-construct-stack-suffix)
- [no-class-in-interface](#no-class-in-interface)
- [no-public-class-fields](#no-public-class-fields)
- [no-import-private](#no-import-private)

---

### pascal-case-construct-id

This rule enforces PascalCase for construct IDs.

#### ✅ Correct Example

```ts
const bucket = new Bucket(this, "MyBucket");
```

#### ❌ Incorrect Example

```ts
const bucket = new Bucket(this, "myBucket");
```

<br />

---

### no-parent-name-construct-id-match

This rule disallows using the parent class name as the construct IDs.

It is not good to specify a string that matches the parent class name for construct ID, as it makes the CloudFormation resource hierarchy unclear.

#### ✅ Correct Example

```ts
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const bucket = new Bucket(this, "MyBucket");
  }
}
```

#### ❌ Incorrect Example

```ts
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const bucket = new Bucket(this, "MyConstruct");
  }
}
```

<br />

---

### no-construct-stack-suffix

This rule is to disallow using the `Construct` or `Stack` suffix in construct IDs and stack IDs.

If the Construct ID includes "Construct," the issues that should be stopped in the CDK world will leak into the CloudFormation template and the AWS world, so not good.(the same for Stack ID )

#### ✅ Correct Example

```ts
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const bucket = new Bucket(this, "MyBucket");
  }
}
```

#### ❌ Incorrect Example

```ts
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const bucket = new Bucket(this, "BucketConstruct");
  }
}
```

<br />

---

### no-class-in-interface

This rule disallows using class types in interface properties.

When class types are used in interface properties, it creates tight coupling between the interface and the class implementation.  
Additionally, classes are mutable by nature, which can lead to unexpected behavior when used as interface property types.  
So not good.

#### ✅ Correct Example

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  bucket: IBucket;
}
```

#### ❌ Incorrect Example

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  bucket: Bucket;
}
```

<br />

---

### no-public-class-fields

This rule disallows using class types for public class fields.

When class types are used in public fields, it creates tight coupling and exposes mutable state, so not good.

#### ✅ Correct Examples

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  public readonly bucket: IBucket;
  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.bucket = new Bucket(this, "MyBucket");
  }
}
```

#### ❌ Incorrect Examples

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  public readonly bucket: Bucket;
  constructor(scope: Construct, id: string) {
    super(scope, id);
    this.bucket = new Bucket(this, "MyBucket");
  }
}
```

<br />

---

### no-import-private

This rule disallows importing modules from `private` directories at different hierarchical levels.

Note: This rule is not included in the `recommended` rules.  
When setting it, you need to write the following:

```js
// eslint.config.mjs
import eslintPluginCdk from "@nigg/eslint-plugin-cdk";
export default [
  {
    plugins: {
      cdk: eslintPluginCdk,
    },
    rules: {
      ...cdkPlugin.configs.recommended.rules,
      "cdk/no-import-private": "error",
    },
  },
];
```

The private directory is intended to contain internal implementation that should only be used within its parent directory.  
By disallowing imports from a different hierarchy, it promotes proper modularization and encapsulation.

#### ✅ Correct Example

```ts
// src/constructs/my-construct.ts
import { MyConstruct } from "./private/my-construct";
```

#### ❌ Incorrect Example

```ts
// src/constructs/my-construct.ts
import { MyConstruct } from "../private/my-construct";
import { MyConstruct } from "../my-app/private/my-construct";
```

## License

[MIT](./LICENSE)

## Request

If you have any requests or suggestions, please open an issue.
