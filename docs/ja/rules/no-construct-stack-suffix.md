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
export default defineConfig([
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
]);
```

#### ✅ 正しい例

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ✅ "Construct" および "Stack" suffix が追加されていない場合は許可されます
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

    // ❌ "Stack" suffix を使用すべきではありません
    new Stack(this, "MyStack");
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNq9VTty2zAQvQqGTWyPRGWcTmnysUsnGasMXcDEUoYFAhx8bGs0KtPlCMnlcpIsPiQhW3RpFZK4+3b3cbFvsSusqZVs+Lq8N0oWy2JXSUKqolZtxwXo753lSpqqWJLg8T5L9RqsN1XF5er8/fl5Vcx6p+C33vMzuT5Uxc3gaxVzAvrAb/CESZ45r8Eo4XzNCLt1kiGNDGes5nWobrWDwayVshccgT7K6DpF7PF7X8li5m0Lqeb4tpjB1XZuLK03c+Oahj+V1uC787ZT2pId+dqDyJ40WrWhIcmEvfhYyQH6xdUbyHD00cxrtpljHxb+v8EO5PiVr3oUHnCVhKeArAU1hlxtRyrYLpDMZOTCiQzElD7Bs+xgOSJmhLMl8R2T69P+AI3rIEG9/zRU9Y7Fgvz784t8FkI9AiO8IfYOkOOQrioIlQwt4SXwKTaPUA1EKkto1yFDYDGdhMfUnRN7x80M46620VAVh1X//iarO+UEC2mcgSOVY63J1PExC5ioIN+NBRL94X3G5MGQ0U4AnxNnCkcKBwqM4NKWg3zGAcID/SHcmsv+lCM0HHQXHPlMWHMZ3D3Ybjswteadnce4w8Fg0FAnLCoMqZQlTm4MT0RMqQHF24aDCBIY2Ewi0mA0KHgTpHt2tjjDxKN2BZVrR9eQ1sGwDAjpqDagUYw9jWhIcb3/ZRx6tLqH2q5AP/AapzaTs//0i+k6CntJYrvKFiwtGdeStiPcyzz/1bhK8mo4AhfcUD/ZREmxfWW2Ahj1zjbT6yJuuBHuFxBorcY9lcw7wlJZYKsQmjqcVb8ZWIcg3/JXaB9K7y0pp8pH6I6dR2nc4LCiOjoE48A8u1b8bMcV3d8FIawqGDxcQNgesubw7L55KQifQVALJr9BRtwE4IgMj+I+ReDiPvCYTDThPFjpRxH5XZIDhuWy/w+Ren1P" />
