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

    // ✅ Allowed if the "Construct" suffix is not added
    const bucket = new Bucket(this, "MyBucket");
  }
}
```

#### ❌ Incorrect Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ❌ Should not use the "Construct" suffix
    const bucket = new Bucket(this, "BucketConstruct");
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNrFVTty2zAQvQqGTWyPRGWcTmkyiV06yVhFitAFDawkWCDAwce2RqMyXY6QXC4nyeJDEpLFzKSyC9vaffvR7nuLXWENVXLJV+WDUbKYF7tKElIVVDUtF6C/tJYraapiToLH+2ytV2C9qSquF5dvLy+rYtI5Bb/3nu/J9a4q7npfo5gT0AV+hmdMcuS8BaOE8zUj7N5Jhm1kOGM1p6G61Q56s1bKXnEE+iijaYrY4+99JYuJt82kmuK3xQyO2qmxNd1MjVsu+XNpDX533rRKW7IjnzoQ2ZOlVk0YSDLhLN5Xsod+dHQDGa5+MlPKNlOcw8z/b3ACOX7hq56EB1wl4TkgqaiNITfboRUcF0hmsubCRvrGlD7DXbYwHxATwtmc+InJ1Xm3QONaSFDvPw9VvWM2I39+/SDf1iCJXQMC/WiwyT5fVRBuiFSW1IwBw3DrDZiv4dYCK2MiCU9pLmd2zc0EU9xso6EqDuv9/kkWa+UEk28scQZGC49mjh8z5P8UCNvIkwdD1nUC+JxIJuQSMgmM4NKWvW4G5uAmvwq34rJbb4SGDbfBkZPBmuvg7sB224Khmrd2GuMOGcFgWTthUVrYSlkiZWN4asSUGlC1DXIENxOY0XUzikiMWKLSTdDsxcXsAhMPohW1XLl6BekO9FeAkLbWBjSqsGsjGlJc538Zhx6tHoDaBehHTpGumY79T3eRbqOi5ySOq2zA1iXjWtbNAPf6zv9qvCF5NaTAFTe1EOqJKCm2R2yORMjAKHS2Gb8T8bQNcH95QGs1HKhk3hGWygJbhNA04az6Xd91CPIj/0fbiYmv0HKqfKLdYfIojTskK6qjRTAS5ug98dyOt7l7BEJYVTB4vILWU1JSDkcPzUtB+AyitmDyp2PAjQBOyPAk7kMEzh5CH6OJRpwHt/wkIn9EckB/XPZ/AcSVevM=" />
