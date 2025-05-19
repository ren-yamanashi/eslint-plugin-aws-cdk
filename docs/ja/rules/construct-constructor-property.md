---
title: eslint-cdk-plugin - construct-constructor-property
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# construct-constructor-property

<RecommendedItem japanese />

このルールは、CDK Construct の `constructor` が `scope, id` または `scope, id, props` というプロパティ名を持つことを強制します。

すべての Construct の constructor は、コードベース全体で一貫性を維持するために統一されたプロパティ命名パターンを持つべきです。

※最初の 3 つのプロパティがパターンに従っていれば、それ以降の追加プロパティは許可されます

(このルールは `Construct` から派生したクラスにのみ適用されます)

---

#### 🔧 使用方法

```ts
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/construct-constructor-property": "error",
    },
  },
];
```

#### ✅ 正しい例

```ts
import { Construct } from "constructs";

// ✅ "scope, id" プロパティ名を持つ constructor
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

// ✅ "scope, id, props" プロパティ名を持つ constructor
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

// ✅ "scope, id, props" プロパティ名を持つ constructor (props プロパティがオプショナル)
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

// ✅ "scope, id, props" の後に追加プロパティを持つ constructor
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

#### ❌ 誤った例

```ts
import { Construct } from "constructs";

// ❌ 最初のプロパティ名が "scope" でない
export class MyConstruct extends Construct {
  constructor(myScope: Construct, id: string) {
    super(myScope, id);
  }
}
```

```ts
import { Construct } from "constructs";

// ❌ 2番目のプロパティ名が "id" でない
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

// ❌ 3番目のプロパティ名が "props" でない
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, myProps: MyConstructProps) {
    super(scope, id);
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqVVM1uEzEQfhVrTzRKNijcwgWJFokDpWq4sRVyvJOtE6+9sr1tV1GO3HgEeDmehLG99i75QaKV2sTzzcznb8bfPrOGKbnhVb41SmbLbF9IQoqMqbrhAvTnxnIlTZEtiY+4mKW6AuuOiuxmtXi9WBTZNAYFX7vI1z70psgeUqxWZSsgJt7CCxY5Ct6DUaJ1PQNs3coSaYxwxmrOfHerW0jHWil7zRHosoxmfcYB/x4KmU3d2Ryviukts7P0SelZo1UD2na5NSgArxulLdmT9xFCDmSjVe1V6Y9QkLeFdL/w4uFcWtAbyoB86lLiHRY2QTcNtFRSdGTdsh3YW1rDkriryAoLIcNCzufk98/vQ1ulyTO3j+46DAlOCS+LjESyRGIJk/ozQY0Z9yaoLsjSjK7hiYwu/srXXQ4I1yKyuorzNi32C1AXv0K6KOuI868f5APXxpKGauSEOhBuiFTWUywj/yJL8BUgi/Iy3l00gb88cv0PrNMDp3EkxLf/VKLuVida1N3HpIb75qe5PJnvkVB9pZAexAqtlIBcqAoBIS3KiKsJRuD+5OkhDlvIyt2daCsu4wYG6AzPZ40P+EXs0dbc+HAE264BwzRv7Czk9VvbS1XChrbC4ltFKnmO6x/SeyIm1zinukbtoPSPKbG5iOil2KB1oFRoApPJfIKFBxcQVFYtraA3lmQrxI3YgMZnHWmEgz4vxk/zMKLVFphdgX7iDIc4Mgb3Ey3uPljEkgS5ctwnmpdcu1VKcGcYw38c0ANKhjNqKNsh7SObdAoHy4ne5tOKrISna2icMJJxfKd/+efpWFwFQS2YsSMOuAuAM8twFvcuAOdbz+NioQtB+mx8i97ZzyDGtjgGpBU//AFJWjME" />
