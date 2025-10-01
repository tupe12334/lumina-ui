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
