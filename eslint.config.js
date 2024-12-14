// @ts-check
import vue from "eslint-plugin-vue";
import typescript from "typescript-eslint";
import vitest from "@vitest/eslint-plugin";

export default typescript.config(
  { ignores: ["server/*"] },
  vue.configs["flat/recommended"],
  vitest.configs.recommended,
);
