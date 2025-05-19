---
title: eslint-cdk-plugin - no-construct-stack-suffix
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# no-construct-stack-suffix

<RecommendedItem japanese />

このルールは、Construct ID および Stack ID に "Construct" または "Stack" 文字列を含めることを禁止します。

Construct ID に "Construct" という文字列が含まれていると、CDK の世界で止めるべき問題が CloudFormation テンプレートおよび AWS の世界に漏れてしまうため、好ましくありません。(Stack ID についても同様です)

(このルールは `Construct` または `Stack` から派生したクラスにのみ適用されます)

## オプション

このルールには以下のプロパティを持つオプションがあります：

- `disallowedSuffixes` - 禁止する suffix の配列。"Construct"、"Stack"、または両方を含めることができます。

※1. デフォルトでは `["Construct", "Stack"]` が指定されています  
※2. `recommended` ルールセットでは `["Construct", "Stack"]` が指定されています

---

#### 🔧 使用方法

```ts
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      // デフォルト: "Construct" と "Stack" の両方の suffix を禁止
      "cdk/no-construct-stack-suffix": "error",

      // "Construct" suffix のみを禁止
      "cdk/no-construct-stack-suffix": [
        "error",
        { disallowedSuffixes: ["Construct"] },
      ],

      // "Stack" suffix のみを禁止
      "cdk/no-construct-stack-suffix": [
        "error",
        { disallowedSuffixes: ["Stack"] },
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

    // ✅ "Construct" suffix が追加されていない場合は許可されます
    const bucket = new Bucket(this, "MyBucket");
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

    // ❌ "Construct" suffix を使用すべきではありません
    const bucket = new Bucket(this, "BucketConstruct");
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNrFVTty2zAQvQqGTWyPRGWcTmkyiV06yVhFitAFDawkWCDAwce2RqMyXY6QXC4nyeJDEpLFzKSyC9vaffvR7nuLXWENVXLJV+WDUbKYF7tKElIVVDUtF6C/tJYraapiToLH+2ytV2C9qSquF5dvLy+rYtI5Bb/3nu/J9a4q7npfo5gT0AV+hmdMcuS8BaOE8zUj7N5Jhm1kOGM1p6G61Q56s1bKXnEE+iijaYrY4+99JYuJt82kmuK3xQyO2qmxNd1MjVsu+XNpDX533rRKW7IjnzoQ2ZOlVk0YSDLhLN5Xsod+dHQDGa5+MlPKNlOcw8z/b3ACOX7hq56EB1wl4TkgqaiNITfboRUcF0hmsubCRvrGlD7DXbYwHxATwtmc+InJ1Xm3QONaSFDvPw9VvWM2I39+/SDf1iCJXQMC/WiwyT5fVRBuiFSW1IwBw3DrDZiv4dYCK2MiCU9pLmd2zc0EU9xso6EqDuv9/kkWa+UEk28scQZGC49mjh8z5P8UCNvIkwdD1nUC+JxIJuQSMgmM4NKWvW4G5uAmvwq34rJbb4SGDbfBkZPBmuvg7sB224Khmrd2GuMOGcFgWTthUVrYSlkiZWN4asSUGlC1DXIENxOY0XUzikiMWKLSTdDsxcXsAhMPohW1XLl6BekO9FeAkLbWBjSqsGsjGlJc538Zhx6tHoDaBehHTpGumY79T3eRbqOi5ySOq2zA1iXjWtbNAPf6zv9qvCF5NaTAFTe1EOqJKCm2R2yORMjAKHS2Gb8T8bQNcH95QGs1HKhk3hGWygJbhNA04az6Xd91CPIj/0fbiYmv0HKqfKLdYfIojTskK6qjRTAS5ug98dyOt7l7BEJYVTB4vILWU1JSDkcPzUtB+AyitmDyp2PAjQBOyPAk7kMEzh5CH6OJRpwHt/wkIn9EckB/XPZ/AcSVevM=" />
