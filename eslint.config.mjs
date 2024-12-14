// @ts-check
import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import typescript from "typescript-eslint";
import vitest from "@vitest/eslint-plugin";
import globals from "globals";

export default typescript.config(
  { ignores: ["server/*"] },
  { ignores: ["*.d.ts", "**/coverage", "**/dist"] },
  {
    extends: [
      js.configs.recommended,
      typescript.configs.recommended,
      vue.configs["flat/recommended"],
    ],
    files: ["**/*.{ts,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        parser: typescript.parser,
      },
    },
  },
  vitest.configs.recommended,
);
