---
title: eslint-plugin-aws-cdk - no-construct-in-interface
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

<Playground link="https://eslint-online-playground.netlify.app/#eNqFU0tu2zAQvcpAq8SwpMLdOZuiTRddtA3SZRQgMjlyGdOkQFJpDMPL7nqE9nI9SYekRUlpnACGZet95kO+feYs06oR6+LeapUts32lAKqM6W0rJJqvrRNa2SpbQkA85mqzRudfVdnHb4s3i0WVzXtQipVHbo7Q2yq7TdhW805iL/yCj2TyBLxGq2Xna0baqlOc2hjxrDOCherOdJheG63dpSCiV1nDjooDfR8qlc39u1LpnKYlh465XCj6ODRNzbBwlmYX21YbB3v49L5jG3RziE84QGP0lozrHzZnfJPTlKX/bWm+i0pVCh+DNBnC592HvtKV0a2N6ytL+Pv7J1xjzXOt5G4QWDjDYl3A3bH23TmwWsEKobPIvdaQKGgeail4ZC37VkMT0f/PL0ilwe3awTo52++6kxyUdn0BaLSBlhpF4wTaST2hJhVTwQNtFa2kEYp0h4YtRqRf3Lv4t7ynq0TStGmOjVBI/ZJ8WPORHF3HAmentmE8ZkTr8giMyXRQV7JbCzW1DQfYBmB6eNRL3cnwTD2d3fhVTKa0hUGKxxYVRx4uWVHQ/XmFc0xPQ6GyIR6zWTkj2ZAPigPRPZgaf84t0v29vj2/oBNoa7ap1/gkv34xMQt96IKsyjg+XGLrnRTzBz0J9v/b9A6ydmjHUR14JwjPLPoF3glwlLUTjJTlMMZACAvy9/PwD5O8qME=" />
