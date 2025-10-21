import { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

import { configs } from "./configs";
import { rules } from "./rules";

export { configs, rules };

export interface EslintCdkPlugin {
  rules: typeof rules;
  configs: Readonly<{
    recommended: FlatConfig.Config;
    strict: FlatConfig.Config;
    // NOTE: In the classic config, type information is not required, so `classicRecommended` and `classicStrict` is not set.
  }>;
}

const eslintCdkPlugin: EslintCdkPlugin = {
  rules,
  configs,
};

export default eslintCdkPlugin;
