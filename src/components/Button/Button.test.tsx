import { render } from '@testing-library/react'
import { test } from 'vitest'
import { Button } from './Button'

test('Button renders correctly with default props', () => {
  const { container } = render(<Button>Click me</Button>)
  expect(container.firstChild).toMatchSnapshot()
})

test('Button renders correctly with primary variant', () => {
  const { container } = render(<Button variant="primary">Primary Button</Button>)
  expect(container.firstChild).toMatchSnapshot()
})

test('Button renders correctly with secondary variant', () => {
  const { container } = render(<Button variant="secondary">Secondary Button</Button>)
  expect(container.firstChild).toMatchSnapshot()
})

test('Button renders correctly with outline variant', () => {
  const { container } = render(<Button variant="outline">Outline Button</Button>)
  expect(container.firstChild).toMatchSnapshot()
})

test('Button renders correctly with small size', () => {
  const { container } = render(<Button size="sm">Small Button</Button>)
  expect(container.firstChild).toMatchSnapshot()
})

test('Button renders correctly with medium size', () => {
  const { container } = render(<Button size="md">Medium Button</Button>)
  expect(container.firstChild).toMatchSnapshot()
})

test('Button renders correctly with large size', () => {
  const { container } = render(<Button size="lg">Large Button</Button>)
  expect(container.firstChild).toMatchSnapshot()
})

test('Button renders correctly when disabled', () => {
  const { container } = render(<Button disabled>Disabled Button</Button>)
  expect(container.firstChild).toMatchSnapshot()
})

test('Button renders correctly with custom className', () => {
  const { container } = render(<Button className="custom-class">Custom Button</Button>)
  expect(container.firstChild).toMatchSnapshot()
})

test('Button renders correctly with all props combined', () => {
  const { container } = render(
    <Button
      variant="outline"
      size="lg"
      disabled
      className="custom-class"
      data-testid="complex-button"
    >
      Complex Button
    </Button>
  )
  expect(container.firstChild).toMatchSnapshot()
})