import eslintConfigAgent from "eslint-config-agent";
import customRules from "./eslint-rules/index.js";
import dddPlugin from "eslint-plugin-ddd";

export default [
  ...eslintConfigAgent,
  {
    plugins: {
      "lumina-custom": customRules,
      "ddd": dddPlugin,
    },
    rules: {
      "lumina-custom/require-component-tests-and-screenshots": "error",

      // DDD Plugin Rules - Ultra Strict Configuration
      // Enforces Domain-Driven Design principles by requiring spec files for all logic-containing files
      "ddd/require-spec-file": ["error", {
        "excludePatterns": [
          // Test files themselves don't need spec files
          "**/*.spec.js",
          "**/*.spec.ts",
          "**/*.spec.tsx",
          "**/*.test.js",
          "**/*.test.ts",
          "**/*.test.tsx",

          // TypeScript declaration files
          "**/*.d.ts",

          // Index/barrel files (typically re-exports only)
          "**/index.js",
          "**/index.ts",
          "**/index.tsx",

          // Configuration files (no business logic)
          "**/*.config.js",
          "**/*.config.ts",
          "**/eslint.config.js",
          "**/vite.config.ts",
          "**/vitest.config.ts",
          "**/playwright.config.ts",
          "**/tailwind.config.js",
          "**/tailwind.config.ts",

          // Storybook files (documentation, not logic)
          "**/*.stories.js",
          "**/*.stories.ts",
          "**/*.stories.tsx",

          // Build, tooling and deployment
          "**/scripts/**",
          "**/build/**",
          "**/dist/**",
          "**/public/**",
          "**/.storybook/**",

          // Dependencies and generated files
          "**/node_modules/**",
          "**/.next/**",
          "**/.nuxt/**",

          // Project-specific exclusions
          "**/eslint-rules/**",
          "**/release.config.js",
          "**/.release-it.json",

          // Environment and deployment files
          "**/*.env",
          "**/.env*",
          "**/Dockerfile",
          "**/docker-compose.yml",
          "**/*.md",
          "**/*.json",
          "**/*.yml",
          "**/*.yaml",
        ]
      }],
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
