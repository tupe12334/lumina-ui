# Lumina UI

A modern React component library for the Lumina project.

## Installation

```bash
pnpm add @lumina/ui
```

## Usage

```tsx
import { Button } from '@lumina/ui'

function App() {
  return <Button>Hello World</Button>
}
```

## Development

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build library
pnpm build

# Run tests
pnpm test

# Start Storybook
pnpm storybook
```

## Scripts

- `pnpm build` - Build the library
- `pnpm dev` - Start development mode with watch
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm test` - Run tests
- `pnpm storybook` - Start Storybook development server
- `pnpm build-storybook` - Build Storybook for production