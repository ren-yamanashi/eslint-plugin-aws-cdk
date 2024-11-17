import { DefaultTheme, UserConfig } from "vitepress";

export default {
  themeConfig: {
    outline: "deep",
    search: {
      provider: "local",
    },
  },
  lastUpdated: true,
} satisfies UserConfig<DefaultTheme.Config>;
