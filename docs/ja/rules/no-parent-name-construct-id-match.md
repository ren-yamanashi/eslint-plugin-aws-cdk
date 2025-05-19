---
title: eslint-cdk-plugin - no-parent-name-construct-id-match
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
</script>

# no-parent-name-construct-id-match

<RecommendedItem japanese />

このルールでは、Construct ID に 親クラスの名前を指定することを禁止します。

Construct ID に、親クラス名と一致する(または含む)文字列を指定すると、CloudFormation リソースの階層が不明瞭になるため、推奨されません。

(このルールは `Construct` または `Stack` から派生したクラスにのみ適用されます)

## オプション

このルールには以下のプロパティを持つオプションがあります：

### `disallowContainingParentName`

`true` の場合、親クラス名を含むコンストラクト ID を使用することを禁止します。  
`false` の場合、親クラス名を含むコンストラクト ID の使用は許可されますが、親クラス名と完全に一致するコンストラクト ID の使用は禁止します。

※1. デフォルトでは `false` が指定されています
※2. `recommended` ルールセットでは `false` が指定されています

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      // デフォルト: 親クラス名を含むコンストラクト ID を許可する (ただし、親クラス名と一致するコンストラクト ID は許可しない)
      "cdk/no-parent-name-construct-id-match": "error",

      // 親クラス名を含むコンストラクト ID を禁止
      "cdk/no-parent-name-construct-id-match": [
        "error",
        { disallowContainingParentName: true },
      ],
    },
  },
];
```

#### ✅ 正しい例

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ✅ 親コンストラクトと異なる名前は使用できます
    const bucket = new Bucket(this, "MyBucket");

    // ✅ disallowContainingParentName が false (デフォルト設定) の場合、親クラス名を含むコンストラクト ID を使用できます
    const bucket = new Bucket(this, "MyConstructBucket");
  }
}
```

#### ❌ 不正な例

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ❌ 親コンストラクトと同じ名前は使用すべきではありません
    const bucket = new Bucket(this, "MyConstruct");

    // ❌ disallowContainingParentName が true の場合、親コンストラクト名を含む名前は使用すべきではありません
    const bucket = new Bucket(this, "MyConstructBucket");
  }
}
```
