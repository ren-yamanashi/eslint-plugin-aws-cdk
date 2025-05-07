---
title: eslint-cdk-plugin - pascal-case-construct-id
titleTemplate: ":title"
---

# pascal-case-construct-id

<div class="info-item">
  ✅ Using
  <a href="/rules/#recommended-rules">recommended</a>
  in an ESLint configuration enables this rule.
</div>

<div class="info-item">
  🔧 Some problems reported by this rule are automatically fixable by the
  <a href="https://eslint.org/docs/latest/use/command-line-interface#--fix">
    --fix ESLint command line option
  </a>
</div>

This rule enforces PascalCase for construct IDs.  
(This rule applies only to classes that extends from `Construct` or `Stack`.)

---

#### 🔧 How to use

```js
// eslint.config.mjs
export default [
  {
    // ... some configs
    rules: {
      "cdk/pascal-case-construct-id": "error",
    },
  },
];
```

#### ✅ Correct Example

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

// ✅ Can use PascalCase
const bucket = new Bucket(this, "MyBucket");
```

#### ❌ Incorrect Example

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

// ❌ Shouldn't use camelCase
const bucket = new Bucket(this, "myBucket");

// ❌ Shouldn't use snake_case
const bucket = new Bucket(this, "my_bucket");

// ❌ Shouldn't use kebab-case
const bucket = new Bucket(this, "my-bucket");
```
