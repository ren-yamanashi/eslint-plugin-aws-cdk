# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### 1.0.3 (2024-12-28)


### New features/Updates to existing features

* add rule 'no-variable-construct-id' ([#71](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/71)) ([b6bb694](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/b6bb6942afaea2ac7b4e7f0e0b1fb3c9d1e36f44))
* add rule 'require-passing-this' ([#70](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/70)) ([4dbf1ec](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/4dbf1eceefde8712458cbeb016844d42b94078ae))
* add rule construct id does not contain the word `construct` ([#10](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/10)) ([a0ff111](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/a0ff1112084974082efe9d9d0eacee61062b2db0))
* add rule construct props must readonly ([#34](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/34)) ([edf7b49](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/edf7b490bec5dad1104281c9a551a631ca017fc6))
* add rule does not specify a class for an interface property ([#12](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/12)) ([0486d69](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/0486d69f0735a855507cec07769a0520471b6c74))
* add rule ensure public variables of class do not have a class specified ([#15](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/15)) ([debbaa0](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/debbaa08033830b9cde0c5dd756c50af8b7d561c))
* add rule public property must readonly ([#33](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/33)) ([9475f3c](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/9475f3c7271dd057668fc4b073c27f0a61d19597))
* Apply rules only to classes that extends Construct ([#60](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/60)) ([6c64837](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/6c6483772779c50a5949234bdacecda62df2f0ee))
* enforce that child construct id does not match parent construct name ([#7](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/7)) ([c961f08](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/c961f08192f688aae33d8cbfed43a9d013eebcb6))
* support recommended rules ([#16](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/16)) ([5b8636d](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/5b8636db76d4cf56f39b4723ceb3a2521467f664))


### Code refactoring

* delete extends types ([#53](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/53)) ([2e54299](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/2e542992c2f91a4e216fd0153ef502d32213771d))
* organizing rule code ([#52](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/52)) ([7a8bb87](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/7a8bb87db3dcd2d5a4aee8008b47b4342a3f2db1))
* refactoring of rule codes ([#83](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/83)) ([041d59a](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/041d59aebeefda1828b73b1b180896872b080f27))


### Documentation changes

* add CONTRIBUTING.md ([#37](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/37)) ([2b53ac8](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/2b53ac8ef6f11ea11e323dbd1c155956489d289a))
* add document web site ([#20](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/20)) ([4caf926](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/4caf9264aeb90a3e9b3355d37ef5f9a3f59e7fec))
* add versioningPolicy ([#73](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/73)) ([e0fc81f](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/e0fc81f4a9d9ff74c7368dfa95678c2c4941ff4e))
* fix link ([#56](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/56)) ([2d158de](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/2d158de326624e9516b3ff43ac5d473e64f79fed))
* fix typo ([#40](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/40)) ([9439ab5](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/9439ab55b70a3fd8281b7e741520274753ee8445))
* Setting OGP ([#35](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/35)) ([3389d83](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/3389d83efddb4ea382f6ac055dc7c58c8293d7e7))
* update Documents ([#11](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/11)) ([debbf26](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/debbf26aa6e928f67803a8031cd7ac2fd76d40bd))
* update documents ([#65](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/65)) ([0546c09](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/0546c09477df9f04f4654ba4e9408c7c19a116a0))
* update documents(vitepress and README) ([#84](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/84)) ([3d1cac9](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/3d1cac9ec4e6aa0afa35e19722d64f934173aa7e))
* update example code ([#72](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/72)) ([ad0b86b](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/ad0b86b91002ba9621cfee6248bfd2fc479398c0))
* update getting-started ([#57](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/57)) ([7ec284e](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/7ec284edbb4f1ebabc51f0916038825b06039abd))
* update installation guid ([#58](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/58)) ([e376ad7](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/e376ad79d5064a8cc668034add8ccf91e025413d))
* update README.md ([#66](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/66)) ([d09b260](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/d09b2603c2fd47624ed0015279904dfbde46d3af))
* update README.md ([#67](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/67)) ([8589ccd](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/8589ccdf1d6441319a4d99ca99118f2b9ba02263))
* update rule documents ([#55](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/55)) ([01d85b7](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/01d85b7944fd9a344069762ee78fb07784934acc))


### Bug fixes

* `/pages/index.html` is not found ([#25](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/25)) ([3d09963](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/3d099632c560055b5ce93aa93e17614ac330a5eb))
* does not support code written in methods ([#31](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/31)) ([86c058a](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/86c058a88f678d47d9c3f078168aebd205b8a47b))
* eslint rules ([#4](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/4)) ([a50e3dd](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/a50e3dd02e7bc363b5365de6d46a7d7045aee287))
* feature-request and bug-report template is not working ([#50](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/50)) ([498eeb7](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/498eeb70312c939d5a14eb8fb3a3688a1979912c))
* page deployment is not successful ([#21](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/21)) ([85551e8](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/85551e8653caf8408f5aceab8bb8a42508742634))
* rules that should apply only to constructs also apply to stacks ([#79](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/79)) ([78603e5](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/78603e539dd2a870f562efc84bae9b8b63b2a0f6))
* update module name ([#85](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/85)) ([ad95cb2](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/ad95cb2467026555dcbcd34723691d2e8f0be6b3))


### Other changes

* add ISSUE_TEMPLATE ([#49](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/49)) ([d89dadb](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/d89dadba3eafcb8f356efbdc596720b48f09607e))
* add PULL_REQUEST_TEMPLATE ([#51](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/51)) ([87f543d](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/87f543d3826609905c6c7c26173b3a40b866b19b))
* configuration custom domain ([#42](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/42)) ([80fba90](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/80fba90f05125b73bdef78203be68e1d88ba2323))
* **deps:** bump nanoid from 3.3.7 to 3.3.8 ([#87](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/87)) ([e45fb78](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/e45fb788af35ae69f9d26a8b57097533d2d7093e))
* **deps:** bump nanoid from 3.3.7 to 3.3.8 in /docs ([#81](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/81)) ([4511900](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/45119005800e3715f2dd31d1b1963ea2fea41d95))
* Modifying files to be included in npm ([#75](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/75)) ([32e71e1](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/32e71e17dff1b75c105d5deeea777d8f9e026722))
* Modifying files to be included in npm ([#76](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/76)) ([c23505c](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/c23505c85f2e15cddb001abb6b090d0aef4d429c))
* publish npm ([#2](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/2)) ([51fe3bf](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/51fe3bf89cbd0584c50e39dfe998b23190b22a37))
* release v0.1.1 ([#5](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/5)) ([4ad7e08](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/4ad7e082bfda64f1dcefbf2b6b8967f5f31d32a2))
* release v0.2.0 ([#22](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/22)) ([3ff8f28](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/3ff8f28972a1a841e5c9eaf1b6c48a958b385608))
* release v0.2.1 ([#24](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/24)) ([34d968d](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/34d968de78864b62c2d02795b5fd0534c55361cb))
* release v0.3.0 ([#39](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/39)) ([930f474](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/930f474d76e4aee469b7d2db20de4e09c1834712))
* release v0.3.1 ([#44](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/44)) ([df74e2c](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/df74e2c22bee921b34c762b2e59cfeec31158060))
* release v0.3.2 ([#48](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/48)) ([d13e93f](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/d13e93fd1767e4ef1054981ed75175c1467816ff))
* release v0.4.0 ([#61](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/61)) ([aac2835](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/aac2835dc50aaf8e880091a27908c1a391156706))
* Release v1.0.0 ([#74](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/74)) ([abcde30](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/abcde30cce71ca2e9e79178d62ebace5b3af7e91))
* Release v1.0.1 ([#77](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/77)) ([516ae74](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/516ae7417ad6977a7894644d90f899d26d297889))
* release v1.0.2 ([#80](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/80)) ([d6b4c37](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/d6b4c379195b29e7b0b3b5f3671eba9fae3298c2))
* rename library ([#47](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/47)) ([46289c8](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/46289c8ca5b5358e7c0a744531f76e8853a5a406))
* setting custom domain ([#43](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/43)) ([1d97766](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/1d9776645022370cf9858b150d26ee27f46c9784))
* setting OGP image ([#46](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/46)) ([5c696ac](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/5c696ac781c8afcf44576d323820ee272fab1cea))
* support commonjs ([#88](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/88)) ([d608976](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/d60897603c3f9e98bccbe347f86c6324a1cea0e9))
* support declarationMap ([#89](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/89)) ([772e597](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/772e597b99022a09c77fbabd4f57f6c185b8068c))
* update dependencies ([#86](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/86)) ([27626f6](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/27626f6823df17fe6865b724a432a15923178e2a))
* update documents ([#45](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/45)) ([60cba2b](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/60cba2b3eed6058836b5378f62c91a817c12433c))
* update npm homepage ([#23](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/23)) ([cbc9894](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/cbc989490152a6ceccb6158a6d6fcf21e986ca6b))
* update package.json ([#38](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/38)) ([8aab5d9](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/8aab5d9db6554b76acc85a0da1173405908188e2))
* update to build method ([#68](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/68)) ([d1b3156](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/d1b3156ccd0fcbd0c6b73af95ed095a8027a5573))

### 1.0.2 (2024-12-17)

### Bug fixes

- rules that should apply only to constructs also apply to stacks ([#79](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/79)) ([78603e5](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/78603e539dd2a870f562efc84bae9b8b63b2a0f6))

### 1.0.1 (2024-12-07)

### Other changes

- Modifying files to be included in npm ([#75](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/75)) ([32e71e1](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/32e71e17dff1b75c105d5deeea777d8f9e026722))
- Modifying files to be included in npm ([#76](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/76)) ([c23505c](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/c23505c85f2e15cddb001abb6b090d0aef4d429c))

## 1.0.0 (2024-12-07)

### New features/Updates to existing features

- add rule 'no-variable-construct-id' ([#71](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/71)) ([b6bb694](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/b6bb6942afaea2ac7b4e7f0e0b1fb3c9d1e36f44))
- add rule 'require-passing-this' ([#70](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/70)) ([4dbf1ec](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/4dbf1eceefde8712458cbeb016844d42b94078ae))

### Documentation changes

- add versioningPolicy ([#73](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/73)) ([e0fc81f](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/e0fc81f4a9d9ff74c7368dfa95678c2c4941ff4e))
- fix link ([#56](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/56)) ([2d158de](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/2d158de326624e9516b3ff43ac5d473e64f79fed))
- fix typo ([#40](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/40)) ([9439ab5](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/9439ab55b70a3fd8281b7e741520274753ee8445))
- update documents ([#65](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/65)) ([0546c09](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/0546c09477df9f04f4654ba4e9408c7c19a116a0))
- update example code ([#72](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/72)) ([ad0b86b](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/ad0b86b91002ba9621cfee6248bfd2fc479398c0))
- update getting-started ([#57](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/57)) ([7ec284e](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/7ec284edbb4f1ebabc51f0916038825b06039abd))
- update installation guid ([#58](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/58)) ([e376ad7](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/e376ad79d5064a8cc668034add8ccf91e025413d))
- update README.md ([#66](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/66)) ([d09b260](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/d09b2603c2fd47624ed0015279904dfbde46d3af))
- update README.md ([#67](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/67)) ([8589ccd](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/8589ccdf1d6441319a4d99ca99118f2b9ba02263))
- update rule documents ([#55](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/55)) ([01d85b7](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/01d85b7944fd9a344069762ee78fb07784934acc))

## 0.4.0 (2024-11-30)

### New features/Updates to existing features

- Apply rules only to classes that extends Construct ([#60](https://github.com/ren-yamanashi/eslint-cdk-plugin/issues/60)) ([6c64837](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/6c6483772779c50a5949234bdacecda62df2f0ee))

### 0.3.2 (2024-11-20)

### Other changes

- rename library ([fbe753d](https://github.com/ren-yamanashi/eslint-cdk-plugin/commit/fbe753d33406d2ce443d453198e649a89ddc3227))

### 0.3.1 (2024-11-19)

### Other changes

- configuration custom domain ([#42](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/42)) ([80fba90](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/80fba90f05125b73bdef78203be68e1d88ba2323))
- setting custom domain ([#43](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/43)) ([1d97766](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/1d9776645022370cf9858b150d26ee27f46c9784))

## 0.3.0 (2024-11-18)

### Bug fixes

- `/pages/index.html` is not found ([#25](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/25)) ([3d09963](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/3d099632c560055b5ce93aa93e17614ac330a5eb))
- does not support code written in methods ([#31](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/31)) ([86c058a](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/86c058a88f678d47d9c3f078168aebd205b8a47b))
- eslint rules ([#4](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/4)) ([a50e3dd](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/a50e3dd02e7bc363b5365de6d46a7d7045aee287))
- page deployment is not successful ([#21](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/21)) ([85551e8](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/85551e8653caf8408f5aceab8bb8a42508742634))

### New features/Updates to existing features

- add rule construct props must readonly ([#34](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/34)) ([edf7b49](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/edf7b490bec5dad1104281c9a551a631ca017fc6))
- add rule public property must readonly ([#33](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/33)) ([9475f3c](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/9475f3c7271dd057668fc4b073c27f0a61d19597))

### Documentation changes

- add CONTRIBUTING.md ([#37](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/37)) ([2b53ac8](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/2b53ac8ef6f11ea11e323dbd1c155956489d289a))
- add document web site ([#20](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/20)) ([4caf926](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/4caf9264aeb90a3e9b3355d37ef5f9a3f59e7fec))
- Setting OGP ([#35](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/35)) ([3389d83](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/3389d83efddb4ea382f6ac055dc7c58c8293d7e7))
- update Documents ([#11](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/11)) ([debbf26](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/debbf26aa6e928f67803a8031cd7ac2fd76d40bd))

### 0.2.1 (2024-11-17)

- update npm homepage ([#23](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/23)) ([cbc9894](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/cbc989490152a6ceccb6158a6d6fcf21e986ca6b))

## 0.2.0 (2024-11-17)

### New features/Updates to existing features

- add rule construct id does not contain the word `construct` ([#10](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/10)) ([a0ff111](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/a0ff1112084974082efe9d9d0eacee61062b2db0))
- add rule does not specify a class for an interface property ([#12](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/12)) ([0486d69](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/0486d69f0735a855507cec07769a0520471b6c74))
- add rule ensure public variables of class do not have a class specified ([#15](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/15)) ([debbaa0](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/debbaa08033830b9cde0c5dd756c50af8b7d561c))
- enforce that child construct id does not match parent construct name ([#7](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/7)) ([c961f08](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/c961f08192f688aae33d8cbfed43a9d013eebcb6))
- support recommended rules ([#16](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/16)) ([5b8636d](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/5b8636db76d4cf56f39b4723ceb3a2521467f664))

### Documentation changes

- add document web site ([#20](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/20)) ([4caf926](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/4caf9264aeb90a3e9b3355d37ef5f9a3f59e7fec))
- update Documents ([#11](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/11)) ([debbf26](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/debbf26aa6e928f67803a8031cd7ac2fd76d40bd))

### Bug fixes

- eslint rules ([#4](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/4)) ([a50e3dd](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/a50e3dd02e7bc363b5365de6d46a7d7045aee287))
- page deployment is not successful ([#21](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/21)) ([85551e8](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/85551e8653caf8408f5aceab8bb8a42508742634))

### 0.1.1 (2024-11-16)

### Other changes

- publish npm ([#2](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/2)) ([51fe3bf](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/51fe3bf89cbd0584c50e39dfe998b23190b22a37))

### Bug fixes

- eslint rules ([#4](https://github.com/ren-yamanashi/eslint-plugin-cdk/issues/4)) ([a50e3dd](https://github.com/ren-yamanashi/eslint-plugin-cdk/commit/a50e3dd02e7bc363b5365de6d46a7d7045aee287))
