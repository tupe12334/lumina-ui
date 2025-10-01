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
