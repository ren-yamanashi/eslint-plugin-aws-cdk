---
title: eslint-cdk-plugin - construct-constructor-property
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import Playground from '../components/Playground.vue'
</script>

# construct-constructor-property

<RecommendedItem />

This rule enforces that constructors of CDK Construct classes have specific parameter names: `scope, id` or `scope, id, props`.

All Construct constructors should follow a consistent parameter naming pattern to maintain uniformity and predictability across the codebase.

Note: Additional parameters are allowed after the first three, as long as the initial parameters follow the prescribed pattern.

(This rule applies only to classes that extends from `Construct`.)

---

#### 🔧 How to use

```ts
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/construct-constructor-property": "error",
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqVVM1uEzEQfhVrTzRKNijcwgWJFokDpWq4sRVyvJOtE6+9sr1tV1GO3HgEeDmehLG99i75QaKV2sTzzcznb8bfPrOGKbnhVb41SmbLbF9IQoqMqbrhAvTnxnIlTZEtiY+4mKW6AuuOiuxmtXi9WBTZNAYFX7vI1z70psgeUqxWZSsgJt7CCxY5Ct6DUaJ1PQNs3coSaYxwxmrOfHerW0jHWil7zRHosoxmfcYB/x4KmU3d2Ryviukts7P0SelZo1UD2na5NSgArxulLdmT9xFCDmSjVe1V6Y9QkLeFdL/w4uFcWtAbyoB86lLiHRY2QTcNtFRSdGTdsh3YW1rDkriryAoLIcNCzufk98/vQ1ulyTO3j+46DAlOCS+LjESyRGIJk/ozQY0Z9yaoLsjSjK7hiYwu/srXXQ4I1yKyuorzNi32C1AXv0K6KOuI868f5APXxpKGauSEOhBuiFTWUywj/yJL8BUgi/Iy3l00gb88cv0PrNMDp3EkxLf/VKLuVida1N3HpIb75qe5PJnvkVB9pZAexAqtlIBcqAoBIS3KiKsJRuD+5OkhDlvIyt2daCsu4wYG6AzPZ40P+EXs0dbc+HAE264BwzRv7Czk9VvbS1XChrbC4ltFKnmO6x/SeyIm1zinukbtoPSPKbG5iOil2KB1oFRoApPJfIKFBxcQVFYtraA3lmQrxI3YgMZnHWmEgz4vxk/zMKLVFphdgX7iDIc4Mgb3Ey3uPljEkgS5ctwnmpdcu1VKcGcYw38c0ANKhjNqKNsh7SObdAoHy4ne5tOKrISna2icMJJxfKd/+efpWFwFQS2YsSMOuAuAM8twFvcuAOdbz+NioQtB+mx8i97ZzyDGtjgGpBU//AFJWjME" />
