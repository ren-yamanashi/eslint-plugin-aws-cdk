import * as fs from "node:fs";
import * as path from "node:path";
import { ESLINT_CONFIG_PATTERNS } from "./config-patterns";

export const findEslintConfigFiles = (projectRoot: string): string[] => {
  return ESLINT_CONFIG_PATTERNS.reduce<string[]>((acc, pattern) => {
    const filePath = path.join(projectRoot, pattern);
    return fs.existsSync(filePath) ? [...acc, filePath] : acc;
  }, []);
};