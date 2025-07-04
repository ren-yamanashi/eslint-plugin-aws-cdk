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
export default defineConfig([
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
]);
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqNVc1uGjEQfpXRXhIiWKr0RlWpbZJjkyqkp26kdXYHcPDaW9sLQYhjb32E9uX6JB3b+xcCUTgAmvnmf+bzNrImU3LG5/GjUTKaRNtEAiRRpoqSC9Q3peVKmiSagNc4nWV6jtaJkuhqev7u/DyJho1S8Aen+VGr3ifRfasrVF4JbAyv8Ymc7Clv0ShRuZgB9lDJnNLo4YzVPPPRra6wFWul7CUnoLMyOqstdvS9S2Q0dLKxxp8V1zgqmTFczkd2wU1sDZXNi1JpC1u4oGrJcWZhBzOtCt+LWkRt+JDIFvqlypbYw7G1GWX5ckQtGLv/hoonfCLxyVtkgsLC100XgjqAMje9oL7JbUClT2k8JU46xBB4PgHXBDkfNDMxVYk11OkHPqpTjMfw788v+O6qhdSVmwIz4JHADTCxZhv3I9Qa8zgYSVzXtZ06iyGVNmVFKTAIk+i5/7+/YbpQlcjliYXKINgFQsk0SntiIPWxUlgxzdmDaAZGhvRx7l0aXK6Y4DngCiWsF/TlM7pW8o4Qn2V+yY2XTJvE3exfplt34FC+tAp+ExJJoe8ow5lyDl1f8MmjnduQhs8gfS2F1IFTl0QKp9RQLn3VGuluChop5mDQDihDP0swIcJHn2xvA/YaHFKth5YGIxdAUgBjmcwQ1AxYtw2DMEQ/vXawFLXfE+/FxbhYcJG7EHQNaASXNm5vvzsB2uBvoppTRfVaB6jf7NIr+ldgzZVXN2C7KdFkmpd2FOyen0COM1YJS/RAA4ljur1gXidi4l4H/aa02RxF1CcwI7YynnfOzsZn5LgjHsHkvGJzrLmsZTJwW2pQE5M0aQRBbdfoX9qRRqtHzOwU9YpndJ89LvKLXbPqbWClCYR2xQVaFudcS1Z0cMdR/V9NPNiPRvvw2i5OYMaEwUkPfiPFpjn3wwvSQone8uVBYgw03iEdy6LWqiPjWrx9S3ptdd6oGU0Q0lne05bQWpYsW9Kk9h4jt1SB2JsXxJslUY6rSyzdLsiM494r9XITnQfBLJr+u9PhjgAO7P9B3KcAHD/6PI46OqLsPR5HEP1nqA9ouC3a/QeLZJv6" />
