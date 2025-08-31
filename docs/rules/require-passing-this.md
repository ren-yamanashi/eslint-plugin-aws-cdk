---
title: eslint-plugin-aws-cdk - require-passing-this
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import FixableItem from '../components/FixableItem.vue'
import Playground from '../components/Playground.vue'
</script>

# require-passing-this

<RecommendedItem />
<FixableItem />

This rule enforces passing `this` as the scope when creating new Construct instances within a Construct.

When creating AWS CDK resources, passing `this` as the scope to child Constructs is crucial for maintaining the correct resource hierarchy.  
Passing other values as the scope (especially the `scope` variable received by the parent's constructor) can lead to:

- Incorrect resource hierarchy in the generated CloudFormation template
- Unexpected resource naming

(This rule applies only to classes that extend `Construct`.)

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/require-passing-this": "error",
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

    const sample = new SampleConstruct(this, "Sample");

    // ✅ Using `this` as scope is always allowed.
    new Bucket(this, "SampleBucket");

    // ✅ `sample` (an instance of a Construct) is allowed as scope.
    new OtherConstruct(sample, "Child");
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

    // ❌ Shouldn't use the parent's `scope` variable,
    new Bucket(scope, "SampleBucket");
  }
}
```

## Options

```ts
type Options = {
  allowNonThisAndDisallowScope: boolean;
};

const defaultOptions: Options = {
  allowNonThisAndDisallowScope: true,
};
```

### `allowNonThisAndDisallowScope`

Determines whether to allow constructs other than `this` as the scope (first argument) when instantiating a new Construct.

- `false`: Only `this` is allowed as the scope (first argument) when instantiating a new Construct.
- `true`: Allows passing Construct instances other than `this` as the scope (first argument).
  - However, directly passing the `scope` variable received by the parent's constructor is still disallowed.
  - This setting is useful for creating nested construct hierarchies.

With: `{ allowNonThisAndDisallowScope: false }`

#### ✅ Correct Example

```ts
import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class MyConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // ✅ Using `this` as scope is always allowed.
    new Bucket(this, "SampleBucket");
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

    const sample = new SampleConstruct(this, "Sample");

    // ❌ Shouldn't use the parent's `scope` variable,
    new Bucket(scope, "SampleBucket");

    // ❌ Shouldn't use other Construct instances as scope.
    new OtherConstruct(sample, "Child");
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqNVc1y0zAQfpUdX0g6+WHKLQwzQMuRliHlVHfGqr1J1CiSkeSkmUyO3HgEeDmehF35N2layMGOtd/ufvurXeRdavRMzkcPzuhoEu1iDRBHqVnlUqG9zr002sXRBIKEZV7YOXo+iqNP0/PX5+dxNKiFSt6z5LYSvYmju0a2MlmhsFa8wkcyciT8is6ogn2WsPtCZ0Sjg3PeyjR497bA5tga4y8lAVnL2bTS2NNzH+towGdji98LaXGYC+ekng/9QrqRdxS2XOXGetjBBUVLhlMPe5hZswq5qI4oDW9j3UA/FukSOzixccM0Ww4pBWP+7yh4wscaH4NGqsgtfN62LigDqDPXcRqS3Dg0tkflyXHSIgYgswlwEvS8X9fEFTlWUJb3g1cWjMfw59cP+MbRQsLhJiAcBCRIB0JtxJZfymwwG5VKGjdVbD3WGFBoU7HKFZaHcXRo//dPmC5MoTL9ykPhEPwCIRcWtX/lIAm+ElgLK8W9qgtGivRj80xD6rVQMgNco4bNgh6B0ZXRN4T4oLNL6cLJtCbOtX9Kt8rAKb7UCqETYk2ub4jhzLBBzgs+BjSbLWkEBslLFBIGJ0wigR4lVOoQtUWamxWVFDNw6PvEMNQSXOnhXSDb6YCjBJdUq6IlpRI70OTAeaFTBDMD0XZDvyxiqF5TWPLazUmwwj4uFlJl7IKmAZ2S2o+a2W9HoJTUPf2+/Bw/HPV+hjOpkXiQejsBFbi02lXw7tCs3+boUitzPywFXTDN0BdVzCmnB2bDbOVBcDhXxEUUKrwbTr1bLvlBlG7UKU9ow9GIhv8fmGrCZrQMXVhrZ2fjM1Jr91o1xCRsiJ+yVsMtbTkCV3bDJLzUaROYCeVw0oFfa7Wth/l0+RsoLa9seXLtlUu6RfIORWtNu2qr493/0At7tlGqQy0P+XkXmi4X6VLM8eiq4V4o13Z9PwS1OMpwfYk5J0+nEo/uoKcNxBaU8Oi6t0qLewZwordewD0j7Gz+ZxDdO6QLqBdTtP8L/eKMjg==" />
