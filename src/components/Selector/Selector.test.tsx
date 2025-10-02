import { render, screen, fireEvent } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import { Selector } from './Selector'

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
]

test('Selector renders correctly with default props', () => {
  const { container } = render(<Selector options={mockOptions} />)
  expect(container.firstChild).toMatchSnapshot()
})

test('Selector renders correctly with selected value', () => {
  const { container } = render(<Selector options={mockOptions} value="option1" />)
  expect(container.firstChild).toMatchSnapshot()
})

test('Selector renders correctly with placeholder', () => {
  const { container } = render(
    <Selector options={mockOptions} placeholder="Choose an option" />
  )
  expect(container.firstChild).toMatchSnapshot()
})

test('Selector renders correctly with small size', () => {
  const { container } = render(<Selector options={mockOptions} size="sm" />)
  expect(container.firstChild).toMatchSnapshot()
})

test('Selector renders correctly with large size', () => {
  const { container } = render(<Selector options={mockOptions} size="lg" />)
  expect(container.firstChild).toMatchSnapshot()
})

test('Selector renders correctly with error variant', () => {
  const { container } = render(<Selector options={mockOptions} variant="error" />)
  expect(container.firstChild).toMatchSnapshot()
})

test('Selector renders correctly with success variant', () => {
  const { container } = render(<Selector options={mockOptions} variant="success" />)
  expect(container.firstChild).toMatchSnapshot()
})

test('Selector renders correctly when disabled', () => {
  const { container } = render(<Selector options={mockOptions} disabled />)
  expect(container.firstChild).toMatchSnapshot()
})

test('Selector calls onChange when option is selected', () => {
  const handleChange = vi.fn()
  render(<Selector options={mockOptions} onChange={handleChange} />)

  const trigger = screen.getByRole('button')
  fireEvent.click(trigger)

  const option = screen.getByText('Option 1')
  fireEvent.click(option)

  expect(handleChange).toHaveBeenCalledWith('option1')
})

test('Selector opens dropdown when trigger is clicked', () => {
  render(<Selector options={mockOptions} />)

  const trigger = screen.getByRole('button')
  fireEvent.click(trigger)

  expect(screen.getByRole('listbox')).toBeInTheDocument()
})

test('Selector shows placeholder when no value selected', () => {
  render(<Selector options={mockOptions} placeholder="Select option" />)

  expect(screen.getByText('Select option')).toBeInTheDocument()
})

test('Selector shows selected option label', () => {
  render(<Selector options={mockOptions} value="option1" />)

  expect(screen.getByText('Option 1')).toBeInTheDocument()
})

test('Selector renders correctly with custom className', () => {
  const { container } = render(
    <Selector options={mockOptions} className="custom-class" />
  )
  expect(container.firstChild).toMatchSnapshot()
})