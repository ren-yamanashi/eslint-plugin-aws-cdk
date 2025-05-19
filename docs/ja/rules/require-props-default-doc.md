---
title: eslint-cdk-plugin - require-props-default-doc
titleTemplate: ":title"
---

<script setup>
import NotRecommendedItem from '../../components/NotRecommendedItem.vue'
</script>

# require-props-default-doc

<NotRecommendedItem japanese />

このルールは、Construct の Props (interface) で定義されるオプショナルなプロパティに対して、そのデフォルトの挙動を示す `@default` JSDoc タグを含むドキュメントコメントを必須とします。  
対象となる Props interface の名前は、一般的に `XxxxProps`（例: `MyConstructProps`, `MyStackProps`）のような形式です。

※Class のプロパティや、Construct の Props として意図されていない一般的なインターフェース内のプロパティには、このルールは適用されません。

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/require-props-default-doc": "error",
    },
  },
];
```

#### ✅ 正しい例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ オプショナルなプロパティに `@default` タグを含むJSDocコメントが記載されている
  /**
   * @default - S3バケットを紐づけない
   */
  readonly bucket?: IBucket;
}

// ✅ Props ではない interface には、このルールは適用されません
interface Config {
  readonly bucket?: IBucket;
}
```

#### ❌ 不正な例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ オプショナルなプロパティにJSDocコメント自体がない
  readonly bucket?: IBucket;
}
```

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ JSDocコメントはあるが、`@default` タグが含まれていない
  /** デフォルト値の説明がないJSDocコメント */
  readonly bucket?: IBucket;
}
```
