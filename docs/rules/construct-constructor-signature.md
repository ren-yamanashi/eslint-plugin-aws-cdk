---
title: eslint-cdk-plugin - construct-constructor-signature
titleTemplate: ":title"
---

# construct-constructor-signature

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ✅ Using
  <a href="/rules/#recommended-rules">recommended</a>
  in an ESLint configuration enables this rule.
</div>

This rule enforces that constructors of classes extending `Construct` have the signature `scope, id` or `scope, id, props`.

Following the AWS CDK best practices, all Construct constructors should have a consistent signature pattern to maintain uniformity across the codebase.

## Options

This rule has no options.

---

#### 🔧 How to use

```ts
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/construct-constructor-signature": "error",
    },
  },
];
```

#### ✅ Correct Examples

```ts
import { Construct } from "constructs";

// ✅ Constructor with "scope, id" signature
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }
}
```

```ts
import { Construct } from "constructs";

interface MyConstructProps {
  bucketName: string;
}

// ✅ Constructor with "scope, id, props" signature
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);
  }
}
```

```ts
import { Construct } from "constructs";

interface MyConstructProps {
  bucketName?: string;
}

// ✅ Constructor with "scope, id, props?" signature (optional props)
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props?: MyConstructProps) {
    super(scope, id);
  }
}
```

#### ❌ Incorrect Examples

```ts
import { Construct } from "constructs";

interface MyConstructProps {
  bucketName: string;
}

// ❌ Constructor with more than 3 parameters
export class MyConstruct extends Construct {
  constructor(
    scope: Construct,
    id: string,
    props: MyConstructProps,
    resourceName: string
  ) {
    super(scope, id);
  }
}
```

```ts
import { Construct } from "constructs";

interface MyConstructProps {
  bucketName: string;
}

// ❌ Third parameter is not named "props"
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, myProps: MyConstructProps) {
    super(scope, id);
  }
}
```

```ts
import { Construct } from "constructs";

// ❌ First parameter is not named "scope"
export class MyConstruct extends Construct {
  constructor(myScope: Construct, id: string) {
    super(myScope, id);
  }
}
```

```ts
import { Construct } from "constructs";

// ❌ Second parameter is not named "id"
export class MyConstruct extends Construct {
  constructor(scope: Construct, myId: string) {
    super(scope, myId);
  }
}
```
