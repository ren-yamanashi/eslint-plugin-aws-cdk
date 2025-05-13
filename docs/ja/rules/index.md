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
    <span class="legend-text"><a href="/rules/#recommended-rules">recommended</a> 設定を使用した場合に有効になるルールです</span>
  </div>
  <div class="legend-item">
    <div class="legend-icon">
      <span class="status-icon fixable">🔧</span>
    </div>
    <span class="legend-text">
      <a href="https://eslint.org/docs/latest/use/command-line-interface#--fix">--fix</a>
      オプションを使用して自動的に修正できるルールです
    </span>
  </div>
</div>

現在は、以下のルールをサポートしております。

<ul class="rule-list">
  <li class="rule-item">
    <div class="rule-info">
      <a href="/ja/rules/pascal-case-construct-id" class="rule-name">pascal-case-construct-id</a>
      <span class="rule-description">Construct ID に PascalCase を強制します</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable">🔧</span>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/ja/rules/require-passing-this" class="rule-name">require-passing-this</a>
      <span class="rule-description">Construct のコンストラクタに <code>this</code> を渡すように強制します</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable">🔧</span>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/ja/rules/no-variable-construct-id" class="rule-name">no-variable-construct-id</a>
      <span class="rule-description">Construct ID に変数を使用しないように強制します</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/ja/rules/no-parent-name-construct-id-match" class="rule-name">no-parent-name-construct-id-match</a>
      <span class="rule-description">Construct ID に親のクラス名を使用しないように強制します</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/ja/rules/no-construct-stack-suffix" class="rule-name">no-construct-stack-suffix</a>
      <span class="rule-description">Construct や Stack の名前に "Construct" や "Stack" サフィックスを使用しないように強制します</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/ja/rules/no-construct-in-interface" class="rule-name">no-construct-in-interface</a>
      <span class="rule-description">interface のプロパティに<code>Class</code> 型を使用しないように強制します</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/ja/rules/no-public-class-fields" class="rule-name">no-public-class-fields</a>
      <span class="rule-description">Construct または Stack の public 変数に <code>Class</code> 型を指定できないように強制します</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/ja/rules/no-mutable-public-fields" class="rule-name">no-mutable-public-fields</a>
      <span class="rule-description">Construct または Stack の public 変数に <code>readonly</code> を指定することを強制します</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable">🔧</span>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/ja/rules/no-mutable-props-interface" class="rule-name">no-mutable-props-interface</a>
      <span class="rule-description">Props(interface) のプロパティに <code>readonly</code> を指定することを強制します</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable">🔧</span>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/ja/rules/construct-constructor-property" class="rule-name">construct-constructor-property</a>
      <span class="rule-description">Constructを継承するクラスのコンストラクタが「scope, id」または「scope, id, props」というプロパティ名を持つことを強制します</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended">✅</span>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/ja/rules/require-jsdoc" class="rule-name">require-jsdoc</a>
      <span class="rule-description">Interface のプロパティと Constructで公開する変数に JSDoc を書くことを強制します</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended"/>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/ja/rules/require-props-default-doc" class="rule-name">require-props-default-doc</a>
      <span class="rule-description">Props(interface) のオプショナルなプロパティに <code>@default</code> JSDoc を書くことを強制します</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended"/>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/ja/rules/props-name-convention" class="rule-name">props-name-convention</a>
      <span class="rule-description">Props(interface) の名前を <code>${ConstructName}Props</code> の形式に従うように強制します</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended"/>
      <span class="status-icon fixable"/>
    </div>
  </li>
  <li class="rule-item">
    <div class="rule-info">
      <a href="/ja/rules/no-import-private" class="rule-name">no-import-private</a>
      <span class="rule-description">private なモジュールをインポートしないように強制します</span>
    </div>
    <div class="rule-status">
      <span class="status-icon recommended"/>
      <span class="status-icon fixable"/>
    </div>
  </li>
</ul>

## Recommended Rules

`recommended` ルールは、コードを正しく保つための推奨ルールです。  
このルールを使用する場合は、以下のように設定します。

```js
// eslint.config.mjs
import cdkPlugin from "eslint-cdk-plugin";
import tsEslint from "typescript-eslint";

export default [
  ...tsEslint.configs.recommended,
  // ✅ Add plugins
  cdkPlugin.configs.recommended,
  {
    files: ["lib/**/*.ts", "bin/*.ts"],
    // ... some configs
  },
];
```

## Strict Rules

`strict` ルールは、利用可能なすべてのルールを提供します。  
このルールを使用する場合は、以下のように設定します。

```js
// eslint.config.mjs
import cdkPlugin from "eslint-cdk-plugin";
import tsEslint from "typescript-eslint";

export default [
  ...tsEslint.configs.recommended,
  // ✅ Add plugins
  cdkPlugin.configs.strict,
  {
    files: ["lib/**/*.ts", "bin/*.ts"],
    // ... some configs
  },
];
```
