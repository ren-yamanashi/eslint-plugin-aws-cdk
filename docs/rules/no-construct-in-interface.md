---
title: eslint-cdk-plugin - no-construct-in-interface
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import Playground from '../components/Playground.vue'
</script>

# no-construct-in-interface

<RecommendedItem />

This rule disallows specifying CDK Construct types (e.g. `Bucket`) for properties in an `interface`.

Using Construct types in interface properties creates tight coupling between the interface and the Construct.
Furthermore, since Constructs are mutable by nature, specifying a Construct type for an interface property can lead to unexpected behavior.
Therefore, such code is not recommended.

Instead, it is recommended to specify an interface for read-only resources (e.g. `IBucket`).

---

#### 🔧 How to use

```ts
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/no-construct-in-interface": "error",
    },
  },
];
```

#### ✅ Correct Example

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ Read-only interfaces (e.g. `IBucket`) can be used
  readonly bucket: IBucket;
}
```

#### ❌ Incorrect Example

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ Construct types (e.g. `Bucket`) should not be used for properties
  readonly bucket: Bucket;
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNp1U8tuGjEU/RXLm0oIZiq6o5uqSRZdtI3CspOFY1+owWOP/KBBaJbd9RPan+uX5NqeB5AMQhj5nHvuw+eeqHfc6I3cFjtnNF3RU6UJqSg3dSMV2O+Nl0a7iq5IQiLmmd2Cj1cVvVsv3y+XFZ33oJJPEfnRQR8q+jhgtRFBQR/4DZ5R5Ap8AGdUiDkz7SlogWWc8Zy3kqfs3gYYrq0x/lYiMUY5y7uIFn/bStN5vCu1WWC3qBC4X0iNXw92wzgU3mHvsm6M9eREvnwOfA9+TvJJWrKxpkZh9sstuNgvsMsy/nfY38dKVxqeU+ggSL4eb/pM99Y0Lo+vLMn/v7/JDdMkOCB4DBERtsCE0epIDkxJkZOv+mpSnizx7w9Z/zRBCf3OZyHCFXPuQkPqC5VBpMVhgFOYuBiefmweu7tXYSt133Kmpq6bBKSOO7Z3dwnuyf7YgONWNn6R4y7HI2DDgvLoDiy0KHDqObwrxBUW0Hg1aAEiPd9QzSSjc+UGzeqS7WazcobCo+8U09vAttBZeTAyIQ2zDiwaqS8jX3RxPf46DhFrdsD9GuxBcriwYvz0S/WQTbkieVxFDZ4VQlrN6pEeLTqeaNZHHBm+UcP4Hsu+Wsw44WzyfptSWEUFHG6hiYPRXMLVxr5+lqigmAd3voMjb4Lwhhne5H3KxHKX6pgUmgDPtmyCMWzxlX43wZa2L4chnpI=" />
