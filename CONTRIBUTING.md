# Contributing to Lumina UI

Thank you for your interest in contributing to Lumina UI! This guide will help you understand the project structure and how to contribute effectively.

## Folder Structure

The project follows a **Domain-Driven Design (DDD)** architecture and is organized to maintain clarity and scalability:

```
lumina-ui/
├── .storybook/              # Storybook configuration
├── src/                     # Source code
│   ├── components/          # UI components
│   │   ├── ComponentName/   # Individual component folder
│   │   │   ├── components/  # Sub-components (if any)
│   │   │   ├── tests/       # Component tests
│   │   │   │   └── visual/  # Visual regression tests
│   │   │   └── __snapshots__/ # Jest snapshots
│   │   └── ...
│   ├── test/                # Test utilities and helpers
```

This structure promotes separation of concerns, testability, and maintainability while making it easy for contributors to understand where different types of code should be placed.

## Before Submitting Changes

Before submitting any changes, please ensure that your code passes all quality checks:

### 1. Lint Check

Run the linter to check for code style and potential issues:

```bash
npm run lint
```

### 2. Type Check

Ensure there are no TypeScript errors:

```bash
npm run typecheck
```

### 3. Build Check

Verify that the project builds successfully:

```bash
npm run build
```

### 4. Test Suite

Run the test suite to ensure all tests pass:

```bash
npm run test
```

**All of these checks must pass before submitting a pull request.** This ensures code quality and prevents breaking changes from being introduced into the codebase.
