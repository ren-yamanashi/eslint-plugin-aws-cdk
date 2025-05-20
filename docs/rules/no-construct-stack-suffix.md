---
title: eslint-cdk-plugin - no-construct-stack-suffix
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import Playground from '../components/Playground.vue'
</script>

# no-construct-stack-suffix

<RecommendedItem />

This rule disallows including the strings "Construct" or "Stack" in Construct IDs and Stack IDs.

Including "Construct" in a Construct ID (and similarly for "Stack" in a Stack ID) is discouraged because it can cause issues that should ideally be contained within the CDK environment to leak into the CloudFormation template and the broader AWS environment.

(This rule applies only to classes that extends from `Construct` or `Stack`.)

## Options

This rule has an options object with the following properties:

- `disallowedSuffixes` - An array of suffixes to disallow. Can include "Construct", "Stack", or both.

Note 1: By default `["Construct", "Stack"]` is specified.  
Note 2: The `recommended` rule set specifies `["Construct", "Stack"]`.

---

#### 🔧 How to use

```ts
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      // Default: disallow both "Construct" and "Stack" suffixes
      "cdk/no-construct-stack-suffix": "error",

      // Disallow only "Construct" suffix
      "cdk/no-construct-stack-suffix": [
        "error",
        { disallowedSuffixes: ["Construct"] },
      ],

      // Disallow only "Stack" suffix
      "cdk/no-construct-stack-suffix": [
        "error",
        { disallowedSuffixes: ["Stack"] },
      ],
    },
  },
];
```

#### ✅ Correct Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ✅ Allowed if the "Construct" and "Stack" suffix are not appended
    const bucket = new Bucket(this, "MyBucket");
  }
}
```

#### ❌ Incorrect Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Stack } from "aws-cdk-lib";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ❌ Should not use the "Construct" suffix
    const bucket = new Bucket(this, "BucketConstruct");

    // ❌ Shouldn't use the suffix "Stack"
    new Stack(this, "MyStack");
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNq9VTty2zAQvQqGTWyPRGWcTmnysUsnGasMXcDEUoYFAhx8bGs0KtPlCMnlcpIsPiQhW3RpFZK4+3b3cbFvsSusqZVs+Lq8N0oWy2JXSUKqolZtxwXo753lSpqqWJLg8T5L9RqsN1XF5er8/fl5Vcx6p+C33vMzuT5Uxc3gaxVzAvrAb/CESZ45r8Eo4XzNCLt1kiGNDGes5nWobrWDwayVshccgT7K6DpF7PF7X8li5m0Lqeb4tpjB1XZuLK03c+Oahj+V1uC787ZT2pId+dqDyJ40WrWhIcmEvfhYyQH6xdUbyHD00cxrtpljHxb+v8EO5PiVr3oUHnCVhKeArAU1hlxtRyrYLpDMZOTCiQzElD7Bs+xgOSJmhLMl8R2T69P+AI3rIEG9/zRU9Y7Fgvz784t8FkI9AiO8IfYOkOOQrioIlQwt4SXwKTaPUA1EKkto1yFDYDGdhMfUnRN7x80M46620VAVh1X//iarO+UEC2mcgSOVY63J1PExC5ioIN+NBRL94X3G5MGQ0U4AnxNnCkcKBwqM4NKWg3zGAcID/SHcmsv+lCM0HHQXHPlMWHMZ3D3Ybjswteadnce4w8Fg0FAnLCoMqZQlTm4MT0RMqQHF24aDCBIY2Ewi0mA0KHgTpHt2tjjDxKN2BZVrR9eQ1sGwDAjpqDagUYw9jWhIcb3/ZRx6tLqH2q5AP/AapzaTs//0i+k6CntJYrvKFiwtGdeStiPcyzz/1bhK8mo4AhfcUD/ZREmxfWW2Ahj1zjbT6yJuuBHuFxBorcY9lcw7wlJZYKsQmjqcVb8ZWIcg3/JXaB9K7y0pp8pH6I6dR2nc4LCiOjoE48A8u1b8bMcV3d8FIawqGDxcQNgesubw7L55KQifQVALJr9BRtwE4IgMj+I+ReDiPvCYTDThPFjpRxH5XZIDhuWy/w+Ren1P" />
