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

```js
// eslint.config.mjs
import eslintPluginCdk from "@nigg/eslint-plugin-cdk";
export default [
  {
    plugins: {
      cdk: eslintPluginCdk,
    },
    rules: {
      "cdk/no-import-private": "error",
      "cdk/pascal-case-construct-id": "error",
      "cdk/no-parent-name-construct-id-match": "error",
      "cdk/no-construct-stack-suffix": "error",
    },
  },
];
```

## Rules

- [pascal-case-construct-id](#pascal-case-construct-id)
- [no-parent-name-construct-id-match](#no-parent-name-construct-id-match)
- [no-construct-stack-suffix](#no-construct-stack-suffix)
- [no-import-private](#no-import-private)

---

### pascal-case-construct-id

This rule enforces PascalCase for construct IDs.

AWS CDK recommends using PascalCase for construct IDs.

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

<br />

---

### no-parent-name-construct-id-match

This rule disallows using the parent class name as the construct IDs.

It is not good to specify a string that matches the parent class name for construct ID, as it makes the CloudFormation resource hierarchy unclear.

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

<br />

---

### no-construct-stack-suffix

This rule is to disallow using the `Construct` or `Stack` suffix in construct IDs and stack IDs.

If the Construct ID includes "Construct," the issues that should be stopped in the CDK world will leak into the CloudFormation template and the AWS world, so not good.(the same for Stack ID )

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

<br />

---

### no-import-private

This rule disallows importing modules from `private` directories at different hierarchical levels.

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
