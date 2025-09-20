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

This rule enforces specifying interfaces for read-only resources (e.g., `IBucket`) for properties in an `interface`.

When AWS resource Constructs (e.g. `Bucket`) implements interfaces for read-only resources (e.g., `IBucket`), it is recommended to specify the read-only resource interface (e.g. `IBucket`) for interface properties.
This helps prevent unintended resource modifications.

---

#### 🔧 How to use

```ts
// eslint.config.mjs
export default defineConfig([
  {
    // ... some configs
    rules: {
      "cdk/no-construct-in-interface": "error",
    },
  },
]);
```

#### ✅ Correct Example

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ Read-only interfaces (e.g. `IBucket`) can be used
  readonly bucket: IBucket;

  // ✅ Constructs that are not AWS resource constructs (e.g. `DockerImageAsset`) can be used
  readonly asset: DockerImageAsset;

  // ✅ When there is no read-only resource interface, Construct types (e.g. `MetricFilter`) can be used
  readonly metricFilter: MetricFilter;
}
```

#### ❌ Incorrect Example

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ When a read-only resource interface exists, Construct types (e.g. `Bucket`) should not be used
  readonly bucket: Bucket;
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqFVMFu2kAQ/ZWVTwkCu6I359K0tFIOaaPkkEMcKYs9wAZ719pZpyDEsbd+Qvtz/ZLOru21TYFKCIPnvZk3s7NvFxhMlVyIZfiKSgZxsEskY0mQqqIUOehvpRFKYhLEzEVszHC9BGNfJcHnh+m76TQJxm0wF3MbeWpC75Pg2ccKlVU5tMSvsKEkB8F7QJVXtmYNm1cyIxk9HBotUlfd6Ar8a62UmQkCWhbqtGHs6XufyGBs30VSTahbylClZiIkfQzoBU8hNEi9i6JU2rAdu/lYpWswY1Y/2Z4ttCooMf+OkzRbT6jLyP5G6u8qkYmEjaP6hOx2+6mtdKdVifX4ooj9+fWD3QPPJkrm246A7ALCZchemtovlyzlks2BVQiZ5WoiOc7cAeJWpavvU/uqyMyKG8Y1MKkMu358oAyoKk3i/BB81ZmiVPqm4Eu4Rjxbntt4zA4ZQxmPK5AkAKi6QBLg6HXLXoXvfdypZmZbdrO4BXvYX0ROwDOKih4sZn1ST9Tvn7UoflYKg41AgycV+cPBlaryzI32mCQh33gushoeN3tEava0iYA51Qv9ves2r460y/ah/hu90vUjqt/ODBZCAgkkereaDbjO2icYHKZ1/aRalGZSB/pgWu67vFoKOUzrlr50geHCkxZe5e7pNV082VEMusRQA1lKATKDzF3MMKQ79x9M4zgLMiJ0ljIaRSOidZ5CFkJwG/TCj2Wr4dYLni+v6ARKnq5pbw88zw6m9o/WqBwtCTJ4m0FpM8lUwIEZ/jtNmyHnBrBvbx3uBODIoM/gTgR7/nQC0V39IcANyO7n/i9xiBd3" />
