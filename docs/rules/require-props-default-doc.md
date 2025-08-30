---
title: eslint-plugin-aws-cdk - require-props-default-doc
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
      "cdk/require-props-default-doc": "error",
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqFVEtS3DAQvUqXV4kL2ynYwSJUQhZJVQiVyQ5TIKQeI8aWHEkGpqhZZpcjJJfLSdKSbM+HmWEzH/d77de/95w4y7Wayiq/t1olx8lzqQDKhOumlTWab62TWtkyOYYQ8THHTIXOPyqTT5PDd4eHZXIwBGt56yOXfeioTK7GWKNFV+NAPMcnSrIR/I5W151/Z4TddkqQjBWcdUby8HZnOhwfG63dmSSgZ1nDe8aCPhelSg78s8Lgz04azFqjW5sJnLKudpnQPHeWapdNq42DZ/j8oeMzdLCAqdENJWSPNuNillF1hf9tqa6TUpUKnwJFKodmyjjC1/lH6hdJ4+7CvyW2rSjg359f8GVypjlQbxtUnsTrTkhVAYOb017NDThWwVQbcHcIOrSf1eAVo3HzPGRL01B2CgMLMjjXMDmC2yhcWmDWai6ZQxE4kBb+yyATWtXzHvj+eKg1VBOF/v3tk61r3S9ozHq9P+16TnyS1tkDkuJC7o0eUA2NtJb6MxQNE90gCLTcyKADHqW700Qf2vDA6g7zzVqvt8mirShVP5cfd/QyQ+sHQqMFpR2wtiWm01ChQkMFjyO2JJYRwGAAjuOGMG/S+mInCEIXFjdh3wAWtKZoayLm41Eu1zJGho08jX+Le7pNoo6rS52QCvs3jvvbg2PWVYKz62ndvO3bm8XAKpgu4KLuKqnW04bLaENg/SqGqaxqenPpu7BWpc0Nxp0QKMLV5jkd5CuY3o6m5FI2+E2aFinRloZD/kJwHxyFb8s2wP38CdznDSYoZrstIzoNGqOX7uTdJn5evT2hYbaMz1iFG97qexzZgyEGWpkIfDjD1otSXOKG6b4cjM9Q04HbVRtd4nYAtsxsD25HcMUPdyCo0fEsQhlLQGiQX/XFf0HtNxM=" />
