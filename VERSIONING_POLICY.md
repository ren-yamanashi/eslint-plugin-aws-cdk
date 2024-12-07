## Semantic Versioning Policy

eslint-cdk-plugin follows semantic versioning. To clarify when a minor or major version bump occurs, we've defined the following semantic versioning policy:

### Patch Release (intended to not break your lint build)

- A bug fix in a rule that results in fewer linting errors
- A bug fix to the core functionality
- Improvements to documentation
- Non-user-facing changes such as refactoring code, adding/modifying tests, and increasing test coverage
- Re-releasing after a failed release

### Minor Release (might break your lint build)

- A bug fix in a rule that results in more linting errors
- A new rule is added (disabled by default)
- A new option to an existing rule that does not result in more linting errors by default
- An existing rule is deprecated

### Major Release (likely to break your lint build)

- `recommended` config is updated and may result in new linting errors
- A new rule is added (enabled by default)
- Removing deprecated rules or functionality
- Changes that require a new minimum version of Node.js or ESLint

### Version Pinning Recommendations

We recommend using one of the following approaches in your `package.json`:

- Use tilde (`~`) to allow only patch releases: `"eslint-cdk-plugin": "~1.1.0"`
- Use caret (`^`) if you're comfortable with minor updates: `"eslint-cdk-plugin": "^1.1.0"`

Note that minor updates may report more linting errors than the previous release, so using tilde is recommended for more stable builds.
