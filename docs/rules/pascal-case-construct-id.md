---
title: eslint-cdk-plugin - pascal-case-construct-id
titleTemplate: ":title"
---

# pascal-case-construct-id

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ✅ Using
  <a href="/rules/#recommended-rules">recommended</a>
  in an ESLint configuration enables this rule.
</div>

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  🔧 Some problems reported by this rule are automatically fixable by the
  <a href="https://eslint.org/docs/latest/use/command-line-interface#--fix">
    --fix ESLint command line option
  </a>
</div>

This rule enforces PascalCase for construct IDs.  
(This rule applies only to classes that extends from `Construct` or `Stack`.)

#### ✅ Correct Example

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

const bucket = new Bucket(this, "MyBucket");
```

#### ❌ Incorrect Example

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

const bucket = new Bucket(this, "myBucket");
```
