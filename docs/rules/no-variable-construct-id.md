---
title: eslint-cdk-plugin - no-variable-construct-id
titleTemplate: ":title"
---

# no-variable-construct-id

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ✅ Using
  <a href="/rules/#recommended-rules">recommended</a>
  in an ESLint configuration enables this rule.
</div>

This rule enforces the use of no variables in construct IDs.  
(This rule applies only to classes that extends from `Construct`)

Using variables for construct ID (logical ID) is not appropriate because it may cause the following problems.  
(loop processing is not covered)

- Unnecessary duplication
- Resource recreation when the parameter is changed
- Users mix unnecessary strings because they pay too much attention to the uniqueness of the ID

#### ✅ Correct Example

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

export interface MyConstructProps {
  environments: Record<string, string>;
}

class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);

    // ✅ Can use a literal
    new Bucket(this, "Bucket");

    // ✅ Can use a loop variable
    for (const [key, value] of Object.entries(props.environments)) {
      new Bucket(this, `${key}Bucket`);
    }
  }
}
```

#### ❌ Incorrect Example

```ts
import { Bucket } from "aws-cdk-lib/aws-s3";

export interface MyConstructProps {
  stage: string;
}

class MyConstruct extends Construct {
  constructor(scope: Construct, id: string, props: MyConstructProps) {
    super(scope, id);

    // ❌ Shouldn't use a parameter as a construct ID
    new Bucket(this, id);

    // ❌ Shouldn't combine a parameter into a template string
    new Bucket(this, `${id}Bucket`);

    // ❌ Shouldn't combine a parameter into any expression
    new Bucket(this, id + "Bucket");

    // ❌ Shouldn't use a prop straight-up either
    new Bucket(this, `${props.stage}Bucket`);
  }
}
```
