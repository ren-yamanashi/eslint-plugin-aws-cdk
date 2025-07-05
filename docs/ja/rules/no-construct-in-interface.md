---
title: eslint-cdk-plugin - no-construct-in-interface
titleTemplate: ":title"
---

<script setup>
import RecommendedItem from '../../components/RecommendedItem.vue'
import Playground from '../../components/Playground.vue'
</script>

# no-construct-in-interface

<RecommendedItem japanese />

このルールは、`interface` のプロパティに CDK Construct 型 (例: `Bucket`) を指定することを禁止します。

interface のプロパティに Construct 型を使用すると、interface と Construct の間に密接な結合が作成されます。  
さらに、Construct は本質的に変更可能であるため、interface のプロパティに Construct 型を指定すると、予期しない動作が発生する可能性があります。  
したがって、このようなコードは推奨されません。

代わりに、読み取り専用リソースのための interface (例: `IBucket`) を指定することが推奨されます

---

#### 🔧 使用方法

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

#### ✅ 正しい例

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ✅ 読み取り専用の interface (`IBucket` など) は使用できます
  readonly bucket: IBucket;
}
```

#### ❌ 不正な例

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  // ❌ Construct 型 (`Bucket` など) のプロパティは使用すべきではありません
  readonly bucket: Bucket;
}
```

<Playground link="https://eslint-online-playground.netlify.app/#eNqFU0tu2zAQvcpAq8SwpMLdOZuiTRddtA3SZRQgMjlyGdOkQFJpDMPL7nqE9nI9SYekRUlpnACGZet95kO+feYs06oR6+LeapUts32lAKqM6W0rJJqvrRNa2SpbQkA85mqzRudfVdnHb4s3i0WVzXtQipVHbo7Q2yq7TdhW805iL/yCj2TyBLxGq2Xna0baqlOc2hjxrDOCherOdJheG63dpSCiV1nDjooDfR8qlc39u1LpnKYlh465XCj6ODRNzbBwlmYX21YbB3v49L5jG3RziE84QGP0lozrHzZnfJPTlKX/bWm+i0pVCh+DNBnC592HvtKV0a2N6ytL+Pv7J1xjzXOt5G4QWDjDYl3A3bH23TmwWsEKobPIvdaQKGgeail4ZC37VkMT0f/PL0ilwe3awTo52++6kxyUdn0BaLSBlhpF4wTaST2hJhVTwQNtFa2kEYp0h4YtRqRf3Lv4t7ynq0TStGmOjVBI/ZJ8WPORHF3HAmentmE8ZkTr8giMyXRQV7JbCzW1DQfYBmB6eNRL3cnwTD2d3fhVTKa0hUGKxxYVRx4uWVHQ/XmFc0xPQ6GyIR6zWTkj2ZAPigPRPZgaf84t0v29vj2/oBNoa7ap1/gkv34xMQt96IKsyjg+XGLrnRTzBz0J9v/b9A6ydmjHUR14JwjPLPoF3glwlLUTjJTlMMZACAvy9/PwD5O8qME=" />
