---
title: eslint-plugin-aws-cdk - no-parent-name-construct-id-match
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import Playground from '../components/Playground.vue'
</script>

# no-parent-name-construct-id-match

<RecommendedItem />

This rule disallows using the parent class name as the Construct ID.

It is not recommended to specify a string that matches (or includes) the parent class name for the Construct ID, as it can make the CloudFormation resource hierarchy unclear.
(This rule applies only to classes derived from `Construct` or `Stack`.)

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/no-parent-name-construct-id-match": "error",
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

    // ✅ Can use a different name from the parent construct
    const bucket = new Bucket(this, "MyBucket");

    // ✅ Construct ID containing the parent class name can be used
    const bucket = new Bucket(this, "MyConstructBucket");
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

    // ❌ Construct ID should not exactly match the parent class name
    const bucket = new Bucket(this, "MyConstruct");
  }
}
```

## Options

```ts
type Options = {
  disallowContainingParentName: boolean;
};

const defaultOptions: Options = {
  disallowContainingParentName: false,
};
```

### `disallowContainingParentName`

When `true`, disallows using construct IDs that contain the parent class name.
When `false`, using construct IDs that contain the parent class name is allowed, but using construct IDs that **exactly match** the parent class name is disallowed.

With: `{ disallowContainingParentName: true }`

#### ✅ Correct Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ✅ Can use a different name from the parent construct
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

    // ❌ Construct ID should not exactly match the parent class name
    const bucket = new Bucket(this, "MyConstruct");

    // ❌ Construct ID should not include the parent class name
    const bucket = new Bucket(this, "MyConstructBucket");
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqFVLtyEzEU/RXNVibjtZnQmYYhpkiRkIGCIptCke7airXSjnSXxJNxSccnwM/xJVxJ+7LjOI0fuue+jo7Oc4ZeWFOq1ezBW5MtsufCMFZkwla10uC+1qis8UW2YDESYsjdCjAcFdmX7+fvz8+LbNoFtboPkds29KHI7vpYZWWjoUu8hicqchD8Bt7qJvRMsPvGSBpjhPPolIjd0TXQHztrcakIGLK8E23Gjj53hcmm4WxubF5zBwZzwyvIaXOq1gjMlcwrjmI9Q08cqKq2Dtkzu+gAbMdKZ6tITHtEnHwsTA/93IgNjHD80edCbnLiYx5+e2KC8IWBp5ghNPeeXW0v4jdRAUb6UcPIdt/MugndUw2LATFlSi5YYMOs3nWX45saWmiIv4sdQ2A+Z//+/GIX3LDGA+NMqrKEQAULVKSpcQ0s8TN0TukGHtsNJ7hWfkoLXm3TQZG96PJjDYYaeK61faSBkStDU97E0tehnfKs5JoGmUgoeaOReUAMm0yH1uxy6cO/Nn1vvMhanFzQSvcQtpInZu1pOz70398j6i+XzK9toyUzFulquEC9ZVEfx2c41TeAUjcSI2mRlAheK4Oz/t0NikuRTkKf0t/5w4HUiDJlgOal9EFwLThVHSeg3y+L2xq8cKrGPAXGYJLsjW5WyuyXjVKuY2Bfxt31jWea3IZl97b0MwdkKRWJHGR8mLMZvbU3MK2oSzIiHy3l7Gx+RmmDp7TvhoL94MeqdXBHDkPgtm68+mUr0wPZ4ZrHRxC0d+rSYw1yBbl521ySLw5pwbbAOTu4W3tMV3zi8STji87W53QLpsPweRckR2KrudjwFRzYe9BAssrOk2NikUn4uYQ6kGaEggPffymcUEFzBD928gH3CuCIpk7gXgmODPYVxNiqx4D+Ke7+A+coXSs=" />
