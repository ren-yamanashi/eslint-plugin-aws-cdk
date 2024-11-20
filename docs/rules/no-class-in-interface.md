---
title: eslint-cdk-plugin - no-class-in-interface
titleTemplate: ":title"
---

# no-class-in-interface

This rule disallows using class types in interface properties.

When class types are used in interface properties, it creates tight coupling between the interface and the class implementation.  
Additionally, classes are mutable by nature, which can lead to unexpected behavior when used as interface property types.  
So not good.

#### ✅ Correct Example

```ts
import { IBucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  bucket: IBucket;
}
```

#### ❌ Incorrect Example

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

interface MyConstructProps {
  bucket: Bucket;
}
```
