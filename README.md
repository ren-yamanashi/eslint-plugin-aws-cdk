# eslint-plugin-cdk

ESLint plugin for [AWS CDK](https://github.com/aws/aws-cdk).

## Installation

```bash
# npm
npm i -D @nigg/eslint-plugin-cdk

# yarn
yarn add -D @nigg/eslint-plugin-cdk

# pnpm
pnpm install -D @nigg/eslint-plugin-cdk
```

## Usage

```js
// eslint.config.mjs
import eslintPluginCdk from "@nigg/eslint-plugin-cdk";
export default [
  {
    plugins: {
      "eslint-plugin-cdk": eslintPluginCdk,
    },
    rules: {
      "eslint-plugin-cdk/no-import-private": "error",
      "eslint-plugin-cdk/pascal-case-construct-id": "error",
    },
  },
];
```

## Rules

### no-import-private

Disallows importing modules from `private` directories at different hierarchical levels.

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

### pascal-case-construct-id

Enforces PascalCase for construct IDs.

AWS CDK recommends using PascalCase for Construct IDs.

#### ✅ Correct Example

```ts
// src/constructs/my-construct.ts
const myConstruct = new MyConstruct(this, "MyConstruct");
```

#### ❌ Incorrect Example

```ts
// src/constructs/my-construct.ts
const myConstruct = new MyConstruct(this, "myConstruct");
```

### no-parent-name-child-id-match

Disallows using the parent class name as the child construct ID.

It is not recommended to specify a string that matches the parent class name for Construct Id, as it makes the CloudFormation resource hierarchy unclear.

#### ✅ Correct Example

```ts
// src/constructs/my-construct.ts
export class MyConstruct {
  constructor() {
    const a = new SampleConstruct(this, "Sample");
  }
}
```

#### ❌ Incorrect Example

```ts
// src/constructs/my-construct.ts
export class MyConstruct {
  constructor() {
    const a = new SampleConstruct(this, "MyConstruct");
  }
}
```

### no-construct-stack-suffix

This rule is to disallow using the `Construct` or `Stack` suffix in construct IDs and stack IDs.

If the Construct ID includes "Construct," the issues that should be stopped in the CDK world will leak into the CloudFormation template and the AWS world.(the same for Stack ID )

#### ✅ Correct Example

```ts
// src/constructs/my-construct.ts
export class MyConstruct {
  constructor() {
    const a = new SampleConstruct(this, "Sample");
  }
}
```

#### ❌ Incorrect Example

```ts
// src/constructs/my-construct.ts
export class MyConstruct {
  constructor() {
    const a = new SampleConstruct(this, "SampleConstruct");
  }
}
```

## License

[MIT](./LICENSE)

## Request

If you have any requests or suggestions, please open an issue.
