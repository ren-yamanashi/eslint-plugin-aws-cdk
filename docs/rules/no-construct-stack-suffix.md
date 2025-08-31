---
title: eslint-plugin-aws-cdk - no-construct-stack-suffix
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

---

#### 🔧 How to use

```ts
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/no-construct-stack-suffix": "error",
    },
  },
]);
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

    // ❌ Should not use the suffix "Stack"
    new Stack(this, "MyStack");
  }
}
```

## Options

```ts
type Options = {
  disallowedSuffixes: Array<"Construct" | "Stack">;
};

const defaultOptions: Options = {
  disallowedSuffixes: ["Construct", "Stack"],
};
```

### disallowedSuffixes

An array of suffixes to disallow. Can include "Construct", "Stack", or both.

With: `{ disallowedSuffixes: ["Construct"] }`

#### ✅ Correct Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ✅ Allowed if the "Construct" suffix are not appended
    new Stack(this, "MyStack");
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
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNq9VbuS2jAU/RWNm+wy2M6QjjR5kHKTTCjXFF7rGrQIySPJAYahTJdPSH4uX5Krh1/EkG4bsO8996mj41NkdCFFydbJs5YimkenTBCSRYXcVYyD+lIZJoXOojlxHuszuVqDsaYs+rScvZ7NsmjaODl7sp7H4HqTRavWt5O05tAEfoYDJrlwfgMteW1rethTLSi20cNpo1jhqhtVQ2tWUpoFQ6CN0qoIEWf8PWcimlpbKmSM02KGujCxNnmxjXVdluyQGI2zs10llSEn8rEBkTMpldy5hQQT7uJtJlroh7rYQg+X73Vc0G2Me0jts8YN9PFLW3UU7nCZgINDFjzXmjwcu1ZwXSCo7jXnTqRtTKo7PMsK5h1iShidE7sxsb5vDlDXFQSo9d+7qtaRpuTPrx/kPedyD5SwkpgNYI9tuiwiuaBocUPgm18eyRUQIQ3Jqwo7BOrTCdiH7dyZDdNTjHs4ekMWDav+/kmWG1lz6tLUGkYq+1pXU/vXXsCVCuJVVyC0387TJXeGXtsBYHMip5BSSCjQnAmTtNenI5D3NEf8zr+mzxfMoVAyAdgxhneECGCftR9g9DCtOVagC8UqE3tHH4yU+srrNRPDtI5qlXMM2Ya95DV3/21Pd4922MGUOlGAyrBzp+zuV5Lg1fkPJvCuRD3RThkmk3SCYZ00BGqjs218LFsDVygUCA553QEvmM4tb4kU/HiDOQ6Mt5lur4uB168ObuUFlJKdCgUznmEoC3TpQsOAveorJ0FtkB3hRtvDi/WSLYfKI+3aR2+0vyt7B5D9FcLzNVx8NiwpvQQ3Wu8Cs4jC9wU4dRAFg4vvyb9Mthl4bkD3vxAd7gpghOQ3cFecA0UeRfQ/BX1Aqw3nv7smbq0=" />
