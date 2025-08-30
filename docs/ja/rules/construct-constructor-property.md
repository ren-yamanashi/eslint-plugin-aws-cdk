---
title: eslint-plugin-aws-cdk - construct-constructor-property
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# construct-constructor-property

<RecommendedItem japanese />

このルールは、CDK Construct の `constructor` が標準的なプロパティパターンを持つことを強制します。

すべての Construct の constructor は、コードベース全体で一貫性を維持するために統一されたプロパティパターンを持つべきです。

※最初の 3 つのプロパティがパターンに従っていれば、それ以降の追加プロパティは許可されます

(このルールは `Construct` から派生したクラスにのみ適用されます)

#### 強制されるプロパティパターン

- 命名: `scope, id` または `scope, id, props`
- 型:
  - `scope`: Construct 型
  - `id`: string 型

---

#### 🔧 使用方法

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

```ts
import { Construct } from "constructs";

// ❌ 最初のプロパティが "Construct" 型でない
export class MyConstruct extends Construct {
  constructor(scope: unknown, id: string) {
    super(scope, id);
  }
}
```

```ts
import { Construct } from "constructs";

// ❌ 2番目のプロパティが "string" 型でない
export class MyConstruct extends Construct {
  constructor(scope: Construct, id: number) {
    super(scope, id.toString());
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqVVM1u2zAMfhVBp7ZInCG7ZZcB6wbssK5YdquKwZEZV40sGZK81ghy3G2PsL3cnmSUZMvOX4chQGyLH8mPHyluqbNcq7Uos0erFV3QLVOEMMp1VQsJ5nPthFaW0QUJFm9zuSnB+SNG3y/nr+ZzRie9UYqVt9x1pteM3idbpYtGQu94A88Y5MD4BayWjc8ZYatGFUhjhLPOCB6yO9NAOjZau2uBQO9lDe88dvi/Y4pO/NkMS0X3hrtpetNmWhtdg3Ft5iwKIKpaG0e25F0PITuyNroKqnRHKMgbpvwPngNcKAdmnXMgn9rkeIuBbdTNQF5oJVuyavgG3E1ewYL4UlSJgZAhU7MZ+fPrx5BWG/Ik3IMvhyPBCREFo6QnSxSGsCk/l7m149wE1QVV2FEZgcio8IsQdzEgfIqe1WXfb9tgvgj19kuki7KOOP/+ST4IYx2pc4OcUAciLFHaBYpFz5/RBF8CsijO432hCfz1QZgXsF4P7MaBEN/+U4mqXR5pUbUfkxr+K3RzcdTfA6G6SNE9ihVTaQmZ1CUColsvI44mWInzk6WLOExhtPTj9zZ+zh7j+KVJLWAtFCAtdB+GtQPHqGMHZ/fDurYGy42o3TQaxmBebG5lUwq1H3aK59M6GLqr0OmPXPJGhmfidHHni92r0mYGh6CqsDFQhJuaZXj//oHplF7jZsJO4I65uppdoduwZLpeozERPxUtwv1yuPc9wh7UOd/kJRysQS9NXCn97gqOjBbw/RpqH0txgfdwbz8e6+kjyNyBHW+8AXcGcELqF3BnjPmTDRG6xXwCMd5qY0Ca0N1fU+okYg==" />
