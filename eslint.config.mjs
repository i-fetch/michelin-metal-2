// eslint.config.mjs

import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      "@next/next/no-img-element": "off",
    },
  },

  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "dist/**",
      "build/**",
    ],
  },
];