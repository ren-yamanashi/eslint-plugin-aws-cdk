---
title: eslint-cdk-plugin - Rules
titleTemplate: ":title"
---

<script setup>
import { useData } from 'vitepress'
const { theme } = useData()
</script>

<style>
.rule-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rule-item {
  margin: 8px 0;
  padding: 16px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.rule-info {
  flex-grow: 1;
}

.rule-name {
  color: var(--vp-c-brand);
  font-weight: 600;
  text-decoration: none;
  display: block;
  margin-bottom: 4px;
}

.rule-description {
  color: var(--vp-c-text-2);
  font-size: 0.9em;
}

.rule-status {
  display: flex;
  gap: 8px;
  padding-top: 4px;
}

.status-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}

.status-icon.recommended {
  color: var(--vp-c-green);
}

.status-icon.fixable {
  color: var(--vp-c-yellow);
}

.status-icon.deprecated {
  color: var(--vp-c-red);
}

.legend {
  margin-bottom: 16px;
  padding: 16px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  display: flex;
  gap: 16px;
}

.legend-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1;
  padding: 12px;
  background-color: var(--vp-c-bg);
  border-radius: 4px;
}

.legend-icon {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-text {
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
</style>

# Rules

## Rules Reference

<div class="legend">
  <div class="legend-item">
    <div class="legend-icon">
      <span class="status-icon recommended">✅</span>
    </div>
    <span class="legend-text">Using the <a href="/rules/#recommended-rules">recommended</a> settings will enables this rule</span>
  </div>
  <div class="legend-item">
    <div class="legend-icon">
      <span class="status-icon fixable">🔧</span>
    </div>
    <span class="legend-text">Problems reported by this rule can be fixed automatically with the
    <a href="https://eslint.org/docs/latest/use/command-line-interface#--fix">--fix command line</a>
    option</span>
  </div>
</div>

Currently we support the following rules:

<ul class="rule-list">
  <li class="rule-item">
    <div class="rule-info">
      <a href="/rules/pascal-case-construct-id" class="rule-name">pascal-case-construct-id</a>
      <span class="rule-description">Enforce PascalCase for Construct IDs</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable">🔧</span>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/rules/require-passing-this" class="rule-name">require-passing-this</a>
      <span class="rule-description">Require passing <code>this</code> in Construct constructors</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable">🔧</span>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/rules/no-variable-construct-id" class="rule-name">no-variable-construct-id</a>
      <span class="rule-description">Disallow variables in Construct IDs</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/rules/no-parent-name-construct-id-match" class="rule-name">no-parent-name-construct-id-match</a>
      <span class="rule-description">Disallow matching parent name in Construct IDs</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/rules/no-construct-stack-suffix" class="rule-name">no-construct-stack-suffix</a>
      <span class="rule-description">Disallow Construct and Stack names not to use the "Construct" or "Stack" suffix</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/rules/no-class-in-interface" class="rule-name">no-class-in-interface</a>
      <span class="rule-description">Disallow <code>Class</code> type in interface properties</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/rules/no-public-class-fields" class="rule-name">no-public-class-fields</a>
      <span class="rule-description">Disallow specifying the <code>Class</code> type in the public variable of the Construct or Stack</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/rules/no-mutable-public-fields" class="rule-name">no-mutable-public-fields</a>
      <span class="rule-description">Enforces specifying <code>readonly</code> in the public variables of the Construct or Stack</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable">🔧</span>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/rules/no-mutable-props-interface" class="rule-name">no-mutable-props-interface</a>
      <span class="rule-description">Enforces specifying <code>readonly</code> in the properties of the Props(interface)</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable">🔧</span>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/rules/construct-constructor-property" class="rule-name">construct-constructor-property</a>
      <span class="rule-description">Enforces that constructors of classes extending Construct have the property names 'scope, id' or 'scope, id, props'</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/rules/require-jsdoc" class="rule-name">require-jsdoc</a>
      <span class="rule-description">Require JSDoc comments for interface properties and Construct's public properties</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended"/>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/rules/require-props-default-doc" class="rule-name">require-props-default-doc</a>
      <span class="rule-description">Require <code>@default</code> JSDoc for optional properties of Props(interface)</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended"/>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/rules/props-name-convention" class="rule-name">props-name-convention</a>
      <span class="rule-description">Enforce Props(interface) name to follow <code>${ConstructName}Props</code> format</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended"/>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/rules/no-import-private" class="rule-name">no-import-private</a>
      <span class="rule-description">Disallow importing private modules</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended"/>
      <span class="status-icon fixable"/>
    </div>
  </li>
</ul>

## Recommended Rules

Recommended rules for code correctness that you can drop in without additional configuration.  
when use recommended rules, configure as follows.

```js
// eslint.config.mjs
import tsEslint from "typescript-eslint";
import eslintCdkPlugin from "eslint-cdk-plugin";

export default tsEslint.config({
  files: ["lib/**/*.ts", "bin/*.ts"],
  languageOptions: {
    parser: tsEslint.parser,
    parserOptions: {
      projectService: true,
      project: "./tsconfig.json",
    },
  },
  extends: [...tsEslint.configs.recommended],
  // ✅ Add plugins
  plugins: {
    cdk: eslintCdkPlugin,
  },
  // ✅ Add rules (use recommended rules)
  rules: {
    ...eslintCdkPlugin.configs.recommended.rules,
  },
});
```

## Strict Rules

Strict Rules provides all available rules to improve code quality and consistency.  
When using strict rules, configure as follows.

```js
// eslint.config.mjs
import tsEslint from "typescript-eslint";
import eslintCdkPlugin from "eslint-cdk-plugin";

export default tsEslint.config({
  files: ["lib/**/*.ts", "bin/*.ts"],
  languageOptions: {
    parser: tsEslint.parser,
    parserOptions: {
      projectService: true,
      project: "./tsconfig.json",
    },
  },
  extends: [...tsEslint.configs.recommended],
  // ✅ Add plugins
  plugins: {
    cdk: eslintCdkPlugin,
  },
  // ✅ Add rules (use strict rules)
  rules: {
    ...eslintCdkPlugin.configs.strict.rules,
  },
});
```
