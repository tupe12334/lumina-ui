# Contributing to Lumina UI

Thank you for your interest in contributing to Lumina UI! This guide will help you understand the project structure and how to contribute effectively.

## Table of Contents

- [Folder Structure](#folder-structure)
- [Development Guidelines](#development-guidelines)
- [Creating a New Component](#creating-a-new-component)
- [Testing Guidelines](#testing-guidelines)
- [Storybook](#storybook)
- [Code Style and Conventions](#code-style-and-conventions)
- [Automated Quality Checks](#automated-quality-checks)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

## Folder Structure

The project follows a **Domain-Driven Design (DDD)** architecture and is organized to maintain clarity and scalability:

```
lumina-ui/
├── .storybook/              # Storybook configuration
├── src/                     # Source code
│   ├── components/          # UI components
│   │   ├── ComponentName/   # Individual component folder
│   │   │   ├── ComponentName.tsx           # Main component
│   │   │   ├── ComponentName.test.tsx      # Unit tests
│   │   │   ├── ComponentName.stories.tsx   # Storybook stories
│   │   │   ├── ComponentName.module.css    # Component styles (if needed)
│   │   │   ├── index.ts                    # Barrel export
│   │   │   ├── components/                 # Sub-components (if any)
│   │   │   ├── tests/                      # Additional tests
│   │   │   │   └── visual/                 # Visual regression tests
│   │   │   │       ├── ComponentName.spec.ts
│   │   │   │       └── ComponentName.spec.ts-snapshots/
│   │   │   └── __snapshots__/              # Jest snapshots
│   │   └── ...
│   ├── test/                # Test utilities and helpers
│   └── types/               # Shared TypeScript types
```

This structure promotes separation of concerns, testability, and maintainability while making it easy for contributors to understand where different types of code should be placed.

## Development Guidelines

### Prefer Libraries Over Custom Logic

When implementing functionality, **always prefer using existing libraries over writing custom logic**:

1. **Research first** - Check if a well-maintained library already solves your problem
2. **Evaluate thoroughly** - Consider bundle size, maintenance status, and TypeScript support
3. **Use established solutions** - Prefer libraries that are widely adopted and actively maintained
4. **Avoid reinventing** - Don't write custom implementations for common patterns

**Examples:**

- Use `clsx` for conditional CSS classes instead of custom string concatenation
- Use `date-fns` or `dayjs` for date manipulation instead of custom date logic
- Use `zod` for schema validation instead of custom validation functions
- Use `react-hook-form` for form handling instead of custom form state management

This approach reduces bugs, improves maintainability, and leverages community-tested solutions.

## Automated Quality Checks

This project uses **Husky + lint-staged** to automatically enforce code quality. When you clone the repository and run `pnpm install`, git hooks are automatically set up for you.

### Pre-commit Checks (Fast)

On every commit, the following **fast checks** run automatically on staged files only:

- **ESLint with auto-fix** - Fixes code style issues automatically where possible
- **TypeScript type checking** - Ensures no type errors in changed files

These checks typically take **5-15 seconds** and will auto-fix issues when possible.

### Pre-push Checks (Comprehensive)

Before pushing to the remote repository, **comprehensive checks** run on the entire codebase:

- **Full type check** - `pnpm run typecheck`
- **Full test suite** - `pnpm run test`
- **Full build check** - `pnpm run build`

These checks ensure nothing is broken before sharing your changes.

### Manual Commands

You can also run these commands manually at any time:

```bash
# Lint and auto-fix
pnpm run lint:fix

# Type checking
pnpm run typecheck

# Run tests
pnpm run test

# Build project
pnpm run build
```

### Bypassing Hooks (When Needed)

If you need to bypass the hooks temporarily (not recommended):

```bash
# Skip pre-commit checks
git commit --no-verify

# Skip pre-push checks
git push --no-verify
```

**All quality checks must pass before submitting a pull request.** The automated hooks ensure code quality and prevent breaking changes from being introduced into the codebase.
