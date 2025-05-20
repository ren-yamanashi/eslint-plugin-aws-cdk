---
title: eslint-cdk-plugin - require-jsdoc
titleTemplate: ":title"
---

<script setup>
import NotRecommendedItem from '../../components/NotRecommendedItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# require-jsdoc

<NotRecommendedItem japanese />

このルールは、`interface` のプロパティと Construct の public プロパティに JSDoc の記載を必須とします。

プロパティに JSDoc コメントを追加することで、各プロパティが何を表しているのかが明確になり、コードの保守性と理解のしやすさが向上します。

---

#### 🔧 使用方法

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/require-jsdoc": "error",
    },
  },
];
```

#### ✅ 正しい例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ JSDocコメントが記載されている
  /** リソースに指定するS3バケット */
  readonly bucket: IBucket;
}
```

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ✅ JSDocコメントが記載されている
  /** Constructで作成されたS3バケット */
  public readonly bucket: IBucket;

  // ✅ publicでないプロパティには、このルールは適用されません
  private readonly bucketName: string;
}
```

#### ❌ 不正な例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ JSDocコメントを記載する必要があります
  readonly bucket: IBucket;
}
```

```ts
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";

class MyConstruct extends Construct {
  // ❌ JSDocコメントを記載する必要があります
  public readonly bucket: IBucket;
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqlVEFu2zAQ/AqhoxFLRXpzL0WbHFogaRAX6KEKCplaObQpkl1SSYzAx976hPZzfUmXpCTTdtxLfbAN7sxqZ7ia58xZrlUjlvnKapXNsudSMVZmXLdGSMBPxgmtbJnNWKj4mqtwCc4fldnl/PzV+XmZnQ1FKRa+8rUvvS6zu7HW6rqTMBCv4YmaHBRvwWrZ+WdG2KJTNY2R4KxDwcPTHXYwHqPW7kIQ0LMs8p6xpe9tqbIzf1YgfO8EwnRla81zZ0mvaI1Gx57Zh3cdX4NjW9agbqlJ9WinvF5PSVHh/1vS8qZUI+E9+UIj8IRCVsYjMoygpYKnABbKATYVB3a1GWk3qI2NrhYF+/PrB/s4v9CckfUtKMcajQnREBrQbQJ8MmHz12wRB3aaLYBZA1w0AurAc/fAkKzskKiTwpMQqloruelps0FwmDOO8Psnu+qsY48oHOxPs9fh23EL8nhUy2VlbaqU0U2Dqm1i2b9lm24hBT/S/JlU7XRzmseR3sWG5ApLDYbmUXDf5P91HzZ6QX6i5ss9qOD/MD2j2ZR2fZuzOCzSrg+FyhhJFxceheKBRB0OfV21MGN+89Uymk0LDVbSeuTj67tbZtraG9kthRr2MkLDNptQSDfZ2ctQHsBuY8ByFMZNI29/l2toqk46esNp3jyntyjS+0FsjhC9q6EOr+A4zUlEnywNBY4N0TGZFBNqvMsOWallVy2hj6MxjMixCi0ghcEwRjzoeUP9mOe91ivgbg74IDjZm8SJ/wzBeBuDZcaiXXkLrsprgYruZIT7mEl//fWmT6NoqNf78ROTChD1Lt0ina73jhynKzYVX5Pqg2z2FxTZQ6AGWpnV8HABxvuquICD0D6+Vd9B0rbZNIZ3uBOAF3bpRdzbCCxWYY6TjU4Uk/A9gUizNgX0Dm6z7V+7UVQ5" />
