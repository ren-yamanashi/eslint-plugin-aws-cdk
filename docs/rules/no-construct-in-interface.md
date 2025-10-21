---
title: eslint-plugin-awscdk - no-construct-in-interface
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../components/RecommendedItem.vue'
import Playground from '../components/Playground.vue'
</script>

# no-construct-in-interface

<RecommendedItem />

This rule enforces specifying interfaces for read-only resources (e.g. `IBucket`) for properties in an `interface`.

When AWS resource Constructs (e.g. `Bucket`) implements interfaces for read-only resources (e.g. `IBucket`), it is recommended to specify the read-only resource interface (e.g. `IBucket`) for interface properties.
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
import { DockerImageAsset } from "aws-cdk-lib/aws-ecr-assets";
import { MetricFilter } from "aws-cdk-lib/aws-logs";

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

<Playground link="https://eslint-online-playground.netlify.app/#eNqFVMFOGzEQ/RVrT4Cym4rewqW0tBIHWgQHDiwSjncSDF575fFSUJRjb/2E9uf6JR3biXc3JEGKssnOezNvxuO3yBwKo2dyXjyi0dkkW5SasTITpm6kAvujcdJoLLMJCxEfc9zOwflXZfb1+vjD8XGZjdZBJac+crsKfSyzuxSrTdUqWBO/wwsl2QheARrV+poRNm11RTJ6OHRWilDd2RbSa2uMO5ME9Cy0YsVY0vey1NnIvxtrk1O3lKEVLpeaPg7sjAsoHFLvsm6MdWzBzj+34gnciMUnW7KZNTUl5j8xF9VTTl2O/W+k/k5KnYhnhvD2vOZzOEXcxwRhc+4hNNt+hgvw/X2TipTtZiszj7xSw0tgplbYxeuXdY+X1jQYD248Zv/+/GJXwKvcaPXaEZAdQDEv2P2q6/tDJrhmU2AtQuW5lkiBMw2AyXo+oX5Knaoicw/cMW6BaePY6c01ZUDTWhKXxp+qbo5sT/kwr8mbIQ9l3DyAJgFA1SWSgECPLScVqfdRp5q516abRf8Y9iiqe7DJ4Ox6ov7+jqL4XikMXiQ63KkoHQ4+mFZVYbTbJEn9zJWsInyy2mBSs6Q7AKioXpFufLfzMbJet0/x7/hxYzkrmEkNJJDo3XKuwDFrn+BwmDb0I6xsXB4DfTCt96Vq51IP04a1b0JguPCkhbcqPJOmg1s/ikGXWFggM6tBV1AFSygKuu3vYFZeNyMLxGBmR0fjI6J1bkbmRXAfTMK3ZYtw70J3hyd0Ag0XT7S3G27rBxOda22RgVZmFTyfQeMzaSFhw4bfTtNnUNwB9o21w+0AbBn0HtyOYM+hdiC6qz8EhAH5/Vz+B9LVQ2U=" />
