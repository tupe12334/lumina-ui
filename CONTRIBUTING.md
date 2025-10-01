# Contributing to Lumina UI

Thank you for your interest in contributing to Lumina UI! This guide will help you understand the project structure and how to contribute effectively.

## Folder Structure

The project follows a **Domain-Driven Design (DDD)** architecture and is organized to maintain clarity and scalability:

```
lumina-ui/
├── .storybook/              # Storybook configuration
├── dist/                    # Built/compiled output
├── playwright-report/       # Playwright test reports
├── src/                     # Source code
│   ├── components/          # UI components
│   │   ├── ComponentName/   # Individual component folder
│   │   │   ├── application/ # Application layer (use cases, services)
│   │   │   ├── domain/      # Domain layer (entities, value objects)
│   │   │   ├── infrastructure/ # Infrastructure layer (adapters, external services)
│   │   │   ├── components/  # Sub-components (if any)
│   │   │   ├── tests/       # Component tests
│   │   │   │   └── visual/  # Visual regression tests
│   │   │   └── __snapshots__/ # Jest snapshots
│   │   └── ...
│   ├── test/                # Test utilities and helpers
│   └── types/               # TypeScript type definitions
├── test-results/            # Test execution results
├── tests/                   # End-to-end tests
│   └── e2e/                 # E2E test files
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite build configuration
├── vitest.config.ts         # Vitest test configuration
├── playwright.config.ts     # Playwright configuration
└── README.md                # Project documentation
```

This structure promotes separation of concerns, testability, and maintainability while making it easy for contributors to understand where different types of code should be placed.
