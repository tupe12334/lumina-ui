import eslintConfigAgent from "eslint-config-agent";
import customRules from "./eslint-rules/index.js";

export default [
  ...eslintConfigAgent,
  {
    plugins: {
      "lumina-custom": customRules,
    },
    rules: {
      "lumina-custom/require-component-tests-and-screenshots": "error",
    },
  },
  {
    files: ["eslint-rules/**/*.js"],
    rules: {
      // Disable specific rules for custom ESLint rule files
      "node/no-restricted-import": "off",
    },
  },
];
