# Contributing to eslint-cdk-plugin

Thank you for your interest in contributing to eslint-cdk-plugin!  
This document provides guidelines and steps for contributing.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct.  
Please report unacceptable behavior to `@ren-yamanashi`.

## How to Contribute

### Create Bugs Issue

Before creating issue, please check the existing issues to avoid duplicates.  
When you create a bug issue, include as following content:

- A clear and descriptive title
- Steps to reproduce the behavior
- Expected behavior
- Actual behavior
- Code samples if applicable
- Version information (Node.js, ESLint)

### Create Feature Request Issue

We welcome suggestions for new rules!
When proposing a new rule:

1. First, check existing rules and issues to avoid duplicates
2. Create an issue with the following information:
   - Rule name
   - Description of the problem the rule solves
   - Examples of code that should pass/fail
   - References to AWS CDK best practices if applicable

### Pull Requests

1. Fork the repo and create your branch from `main`
2. Implement the rules
3. Implement the test for the rule and make sure it passes. (Tests are run in CI)
4. Update the documentation
5. Create a pull request

#### Development Setup

```bash
# Clone your fork
https://github.com/ren-yamanashi/eslint-cdk-plugin.git

# Install dependencies
pnpm install

# Run tests
pnpm test

# Run linter
pnpm lint
```

#### Creating a New Rule

1. Create a new file in `src`(file name should same rule name)
2. Create corresponding test file in `src/__tests__`
3. Add rule to `src/index.ts`
4. Add documentation in `docs`

Note: Writing the document is optional (because it is written using Vitepress and is not yet ready to accept contributions)

Example rule structure:

```typescript
import { ESLintUtils } from "@typescript-eslint/utils";

export const newRule = ESLintUtils.RuleCreator.withoutDocs({
  meta: {
    type: "problem",
    docs: {
      description: "Rule description",
    },
    messages: {
      ruleError: "Error message with {{ placeholder }}",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    // Rule implementation
  },
});
```

## Merge Process

1. Changes are merged to `main`
2. Maintainers will review and merge
3. Publish to npm according to Milestone

## Questions?

Feel free to create an issue for any questions about contributing!

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
