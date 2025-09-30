import { render } from '@testing-library/react'
import { test } from 'vitest'
import { BooleanAnswer } from './BooleanAnswer'

test('BooleanAnswer renders correctly with default props', () => {
  const { container } = render(<BooleanAnswer />)
  expect(container.firstChild).toMatchSnapshot()
})

test('BooleanAnswer renders correctly with custom labels', () => {
  const { container } = render(
    <BooleanAnswer trueLabel="Yes" falseLabel="No" />
  )
  expect(container.firstChild).toMatchSnapshot()
})

test('BooleanAnswer renders correctly with initial value true', () => {
  const { container } = render(<BooleanAnswer initialValue={true} />)
  expect(container.firstChild).toMatchSnapshot()
})

test('BooleanAnswer renders correctly with initial value false', () => {
  const { container } = render(<BooleanAnswer initialValue={false} />)
  expect(container.firstChild).toMatchSnapshot()
})

test('BooleanAnswer renders correctly with initial value null', () => {
  const { container } = render(<BooleanAnswer initialValue={null} />)
  expect(container.firstChild).toMatchSnapshot()
})

test('BooleanAnswer renders correctly when disabled', () => {
  const { container } = render(<BooleanAnswer disabled />)
  expect(container.firstChild).toMatchSnapshot()
})

test('BooleanAnswer renders correctly with small size', () => {
  const { container } = render(<BooleanAnswer size="sm" />)
  expect(container.firstChild).toMatchSnapshot()
})

test('BooleanAnswer renders correctly with medium size', () => {
  const { container } = render(<BooleanAnswer size="md" />)
  expect(container.firstChild).toMatchSnapshot()
})

test('BooleanAnswer renders correctly with large size', () => {
  const { container } = render(<BooleanAnswer size="lg" />)
  expect(container.firstChild).toMatchSnapshot()
})

test('BooleanAnswer renders correctly with custom className', () => {
  const { container } = render(<BooleanAnswer className="custom-class" />)
  expect(container.firstChild).toMatchSnapshot()
})

test('BooleanAnswer renders correctly with Hebrew labels', () => {
  const { container } = render(
    <BooleanAnswer trueLabel="כן" falseLabel="לא" />
  )
  expect(container.firstChild).toMatchSnapshot()
})

test('BooleanAnswer renders correctly with Agree/Disagree labels', () => {
  const { container } = render(
    <BooleanAnswer trueLabel="Agree" falseLabel="Disagree" />
  )
  expect(container.firstChild).toMatchSnapshot()
})

test('BooleanAnswer renders correctly with all props combined', () => {
  const { container } = render(
    <BooleanAnswer
      trueLabel="Accept"
      falseLabel="Decline"
      initialValue={true}
      disabled
      size="lg"
      className="custom-class"
      data-testid="complex-boolean-answer"
    />
  )
  expect(container.firstChild).toMatchSnapshot()
})

test('BooleanAnswer renders correctly with onSelect callback', () => {
  const handleSelect = () => {}
  const { container } = render(
    <BooleanAnswer onSelect={handleSelect} />
  )
  expect(container.firstChild).toMatchSnapshot()
})