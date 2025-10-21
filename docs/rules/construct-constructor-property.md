---
title: eslint-plugin-awscdk - construct-constructor-property
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import Playground from '../components/Playground.vue'
</script>

# construct-constructor-property

<RecommendedItem />

This rule enforces that CDK Construct `constructor` follows standard property patterns.

All Construct constructors should follow a consistent property pattern to maintain uniformity across the codebase.

Note: Additional parameters are allowed after the first three, as long as the initial parameters follow the prescribed pattern.

(This rule applies only to classes that extends from `Construct`.)

#### Enforced Property Patterns

- Naming: `scope, id` or `scope, id, props`
- Types:
  - `scope`: Construct type
  - `id`: string type

---

#### 🔧 How to use

```ts
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "awscdk/construct-constructor-property": "error",
    },
  },
]);
```

#### ✅ Correct Example

```ts
import { Construct } from "constructs";

// ✅ Constructor with "scope, id" parameter names
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }
}
```

```ts
import { Construct } from "constructs";

export interface MyConstructProps {
  bucketName: string;
}

// ✅ Constructor with "scope, id, props" parameter names
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);
  }
}
```

```ts
import { Construct } from "constructs";

export interface MyConstructProps {
  bucketName?: string;
}

// ✅ Constructor with "scope, id, props?" parameter names (optional props)
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props?: MyConstructProps) {
    super(scope, id);
  }
}
```

```ts
import { Construct } from "constructs";

export interface MyConstructProps {
  bucketName: string;
}

// ✅ Constructor with additional parameters after "scope, id, props"
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

#### ❌ Incorrect Example

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

```ts
import { Construct } from "constructs";

export interface MyConstructProps {
  bucketName: string;
}

// ❌ Third parameter is not named "props"
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, myProps: MyConstructProps) {
    super(scope, id);
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqVVM1u2zAMfhVBp7ZInCG7ZZcB6wbssK5YdquKwZEZV40sGZK81ghy3G2PsL3cnmSUZMvOX4chQGyLH8mPHyluqbNcq7Uos0erFV3QLVOEMMp1VQsJ5nPthFaW0QUJFm9zuSnB+SNG3y/nr+ZzRie9UYqVt9x1pteM3idbpYtGQu94A88Y5MD4BayWjc8ZYatGFUhjhLPOCB6yO9NAOjZau2uBQO9lDe88dvi/Y4pO/NkMS0X3hrtpetNmWhtdg3Ft5iwKIKpaG0e25F0PITuyNroKqnRHKMgbpvwPngNcKAdmnXMgn9rkeIuBbdTNQF5oJVuyavgG3E1ewYL4UlSJgZAhU7MZ+fPrx5BWG/Ik3IMvhyPBCREFo6QnSxSGsCk/l7m149wE1QVV2FEZgcio8IsQdzEgfIqe1WXfb9tgvgj19kuki7KOOP/+ST4IYx2pc4OcUAciLFHaBYpFz5/RBF8CsijO432hCfz1QZgXsF4P7MaBEN/+U4mqXR5pUbUfkxr+K3RzcdTfA6G6SNE9ihVTaQmZ1CUColsvI44mWInzk6WLOExhtPTj9zZ+zh7j+KVJLWAtFCAtdB+GtQPHqGMHZ/fDurYGy42o3TQaxmBebG5lUwq1H3aK59M6GLqr0OmPXPJGhmfidHHni92r0mYGh6CqsDFQhJuaZXj//oHplF7jZsJO4I65uppdoduwZLpeozERPxUtwv1yuPc9wh7UOd/kJRysQS9NXCn97gqOjBbw/RpqH0txgfdwbz8e6+kjyNyBHW+8AXcGcELqF3BnjPmTDRG6xXwCMd5qY0Ca0N1fU+okYg==" />
