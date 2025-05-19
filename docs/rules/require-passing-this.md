---
title: eslint-cdk-plugin - require-passing-this
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

## Options

This rule has an option with the following properties:

### `allowNonThisAndDisallowScope`

Determines whether to allow constructs other than `this` as the scope (first argument) when instantiating a new Construct.

- `false`: Only `this` is allowed as the scope (first argument) when instantiating a new Construct.
- `true`: Allows passing Construct instances other than `this` as the scope (first argument).
  - However, directly passing the `scope` variable received by the parent's constructor is still disallowed.
  - This setting is useful for creating nested construct hierarchies.

Note 1: By default `false` is specified.  
Note 2: The `recommended` rule set specifies `true`.

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      // allowNonThisAndDisallowScope: false:
      // Only `this` is allowed as scope.
      "cdk/require-passing-this": "error",

      // allowNonThisAndDisallowScope: true:
      // Allows non-`this` as scope (but disallows parent's `scope` variable).
      "cdk/require-passing-this": [
        "error",
        { allowNonThisAndDisallowScope: true },
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

    // ✅ Using `this` as scope is always allowed.
    new Bucket(this, "SampleBucket");

    // The following example is valid when `allowNonThisAndDisallowScope` is `true` (as in the recommended set).
    const sample = new SampleConstruct(this, "Sample");
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
    //    this is invalid even when allowNonThisAndDisallowScope is true.
    new Bucket(scope, "SampleBucket");
  }
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNp1VMtuUzEQ/RXrbmir5AaVXRAS0LKkoAaJBbcLx57cuPW1jR99qMqSHZ8AP8eXMH7cR9MmiySac2bmeF6PlXdMq41o62unVbWsHhtFSFMx3RkhwX4xXmjlmmpJEhIxT20LPpqa6tPq9PXpaVPNelCKdUR+FOhNU10NWKd5kNA7XsA9BtkDL8FpGWLOTFsHxVHGhOe8FSxl9zbAYLZa+3OBxOjlLCseO/zeNaqaRdvCws8gLMwNdU6odu63wtXe4bNFZ7T15JGc4WsxMPNkRzZWd6kWxYRleNuogfoxsBuY8OidmzN+M8cSLOJ/h49HfqPgPnkwiWnJ54cxBVYAFHeTpKnIQ0Jtj7A9BpYjY0YEX5JYBNUe9z1xwUChRvw4ZY3AYkH+/flFzqgiwQGJ782Agrui/ygaZyh/RTsjIRub6mmMv7/JaquD5OqVT5FSrmehioKXYmErUicaVTR9F35LqJT67kKrb6jhg+LnwiXLKsYhwuUWE1bkK61Sy8gtlQEcOVoHj28qatBqBV3L5MhLJODHjUr1JC5pIu+S4EkX9gqQ5U4flcyRcLYVkkccxwmcFMrXw/KMM4Qj8FWGVqh+LjI1jYZJwHSMvPuU4J7sHww4ZoXx8+z3dIY4bGiQHvcLK1rXOLzZvQhxtQVc3Q6nCnhagEHNQUaZoQ2uu0uLe3KyOMHA4+ZKqtpAWyjHYDgFhBhqHVhcxV5GNhS/Hn/uh4jV18D8CuytYDjgk2WOn/4sXea1XpJcrroDT2surKLdSI9LPv7ikF1hybBHhrIblL132mKF85no71FyayoOt+dgYmEUE7B38563JUaQ1IObXrGRd4DwwjC8yHufiYvrpONgoAPg5BQdYEyP2pTQb2q1+w/X7w6s" />
