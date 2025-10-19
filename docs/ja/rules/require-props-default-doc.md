---
title: eslint-cdk-plugin - require-props-default-doc
titleTemplate: ":title"
---

<script setup>
import NotRecommendedItem from '../../components/NotRecommendedItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# require-props-default-doc

<NotRecommendedItem japanese />

このルールは、Construct の Props(interface) で定義されるオプショナルなプロパティに対して、そのデフォルトの挙動を示す `@default` JSDoc タグを含むドキュメントコメントを必須とします。  
対象となる Props interface の名前は、一般的に `XxxxProps`（例: `MyConstructProps`, `MyStackProps`）のような形式です。

※Class のプロパティや、Construct の Props として意図されていない一般的なインターフェース内のプロパティには、このルールは適用されません。

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/require-props-default-doc": "error",
    },
  },
]);
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqFVEtS3DAQvUqXV4kL2ynYwSJUQhZJVQiVyQ5TIKQeI8aWHEkGpqhZZpcjJJfLSdKSbM+HmWEzH/d77de/95w4y7Wayiq/t1olx8lzqQDKhOumlTWab62TWtkyOYYQ8THHTIXOPyqTT5PDd4eHZXIwBGt56yOXfeioTK7GWKNFV+NAPMcnSrIR/I5W151/Z4TddkqQjBWcdUby8HZnOhwfG63dmSSgZ1nDe8aCPhelSg78s8Lgz04azFqjW5sJnLKudpnQPHeWapdNq42DZ/j8oeMzdLCAqdENJWSPNuNillF1hf9tqa6TUpUKnwJFKodmyjjC1/lH6hdJ4+7CvyW2rSjg359f8GVypjlQbxtUnsTrTkhVAYOb017NDThWwVQbcHcIOrSf1eAVo3HzPGRL01B2CgMLMjjXMDmC2yhcWmDWai6ZQxE4kBb+yyATWtXzHvj+eKg1VBOF/v3tk61r3S9ozHq9P+16TnyS1tkDkuJC7o0eUA2NtJb6MxQNE90gCLTcyKADHqW700Qf2vDA6g7zzVqvt8mirShVP5cfd/QyQ+sHQqMFpR2wtiWm01ChQkMFjyO2JJYRwGAAjuOGMG/S+mInCEIXFjdh3wAWtKZoayLm41Eu1zJGho08jX+Le7pNoo6rS52QCvs3jvvbg2PWVYKz62ndvO3bm8XAKpgu4KLuKqnW04bLaENg/SqGqaxqenPpu7BWpc0Nxp0QKMLV5jkd5CuY3o6m5FI2+E2aFinRloZD/kJwHxyFb8s2wP38CdznDSYoZrstIzoNGqOX7uTdJn5evT2hYbaMz1iFG97qexzZgyEGWpkIfDjD1otSXOKG6b4cjM9Q04HbVRtd4nYAtsxsD25HcMUPdyCo0fEsQhlLQGiQX/XFf0HtNxM=" />
