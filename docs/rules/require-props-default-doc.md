---
title: eslint-plugin-awscdk - require-props-default-doc
titleTemplate: ":title"
---

<script setup>
import NotRecommendedItem from '../components/NotRecommendedItem.vue'
import Playground from '../components/Playground.vue'
</script>

# require-props-default-doc

<NotRecommendedItem />

This rule requires a documentation comment including a `@default` JSDoc tag for optional properties defined in a Construct's Props interface, to indicate their default behavior.  
The names of such Props interfaces typically follow a format like `XxxxProps` (e.g., `MyConstructProps`, `MyStackProps`).

Note: This rule does not apply to regular class properties or properties within general interfaces not intended as Construct Props.

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "awscdk/require-props-default-doc": "error",
    },
  },
]);
```

#### ✅ Correct Example

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ JSDoc comment including a `@default` tag for the optional property.
  /**
   * @default - No S3 bucket is associated.
   */
  readonly bucket?: IBucket;
}

// ✅ This rule does not apply to general interfaces that are not Construct Props.
interface Config {
  readonly bucket?: IBucket;
}
```

#### ❌ Incorrect Example

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ No JSDoc comment for the optional property.
  readonly bucket?: IBucket;
}
```

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ JSDoc comment exists, but the `@default` tag is missing.
  /** Some description without default value. */
  readonly bucket?: IBucket;
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqFVEtS3DAQvUqXV4kL2ynYwSJUQhZJVQiVyQ5TIKQeI7AlR5KBqalZZpcjJJfLSdKSbM+HmWEzH/V7rdet7jdPnOVaTWWV31utkuNkXiqAMuG6aWWN5lvrpFa2TI4hRHzMMVOh80dl8mly+O7wsEwOhmAtb33ksg8dlcnVGGu06GociOf4TEk2gt/R6rrzd0bYbacEyVjBWWckD7c70+F4bLR2Z5KAnmUN7xkL+lyUKjnwZ4XBn500mLVGtzYTOGVd7TKhee4s1S6bVhsHc/j8oeMP6GABU6MbSsiebMbFQ0bVFf63pbpOSlUqfA4UqRyaKeMIX2cfqV8kjbsLf0tsW1HAvz+/4MvkTHOg3jaoPInXnZCqAgY3p72aG3Csgqk24O4QdGg/q8ErRuNmeciWpqHsFAYWZHCuYXIEt1G4tMCs1VwyhyJwIC38l0EmtKpnPfD98VBrqCYK/fvbJ1vXul/QmPV6f9r1nPgsrbMHJMWF3Bs9oBoaaS31ZygaJrpBEGi5kUEHPEl3p4k+tOGR1R3mm7Veb5NFU1Gq/l1+3NFlhsYPhEYLSjtgbUtMp6FChYYKHp/YklhGAIMBOD43hPcmrS9mgiC0YXES9j3AgsYUbU3EfFzK5VjGyDCRp/FvcU+7SdRxdKkTUmF/4zi/PThmXSU4u57Wzdq+vVkMrIJpAy7qrpJqPW3WhsOMFoMQ64sxPMyqrDeXvhFrhdrcYBwLgSIsbp7TTr6C6R1pSkZlg+WkaZESbek5ZDEE98FR+7ZsA9yPAIH7vN5WYk27jSP6DRqjlx7lPSd+Xr09oSdtGX9gFW44rO90ZA+2GGhlIvDxDFuvS3GJG9b78nl8hprW3K6a6RK3A7D95fZAdwRXjHEHgtod9yNUsgSEHvmZX/wHia069A==" />
