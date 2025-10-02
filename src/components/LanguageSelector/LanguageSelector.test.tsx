import { render, screen, fireEvent } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import { LanguageSelector } from './LanguageSelector'

const mockLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
]

test('LanguageSelector renders correctly with default props', () => {
  const { container } = render(<LanguageSelector languages={mockLanguages} />)
  expect(container.firstChild).toMatchSnapshot()
})

test('LanguageSelector renders correctly with selected language', () => {
  const { container } = render(<LanguageSelector languages={mockLanguages} value="en" />)
  expect(container.firstChild).toMatchSnapshot()
})

test('LanguageSelector renders correctly without flags', () => {
  const { container } = render(
    <LanguageSelector
      languages={mockLanguages}
      showFlags={false}
    />
  )
  expect(container.firstChild).toMatchSnapshot()
})


test('LanguageSelector renders correctly when disabled', () => {
  const { container } = render(<LanguageSelector languages={mockLanguages} disabled />)
  expect(container.firstChild).toMatchSnapshot()
})

test('LanguageSelector calls onChange with language code', () => {
  const handleChange = vi.fn()
  render(<LanguageSelector languages={mockLanguages} onChange={handleChange} />)

  const trigger = screen.getByRole('button')
  fireEvent.click(trigger)

  const option = screen.getByText(/English/)
  fireEvent.click(option)

  expect(handleChange).toHaveBeenCalledWith('en')
})


test('LanguageSelector renders correctly with custom languages', () => {
  const customLanguages = [
    { code: 'js', name: 'JavaScript', nativeName: 'JavaScript' },
    { code: 'py', name: 'Python', nativeName: 'Python' },
  ]

  const { container } = render(
    <LanguageSelector
      languages={customLanguages}
      showFlags={false}
    />
  )
  expect(container.firstChild).toMatchSnapshot()
})


test('LanguageSelector renders correctly with custom className', () => {
  const { container } = render(
    <LanguageSelector languages={mockLanguages} className="custom-class" />
  )
  expect(container.firstChild).toMatchSnapshot()
})

test('LanguageSelector renders correctly in compact mode with flags', () => {
  const { container } = render(
    <LanguageSelector
      languages={mockLanguages}
      displayMode="compact"
      showFlags={true}
    />
  )
  expect(container.firstChild).toMatchSnapshot()
})

test('LanguageSelector renders correctly in compact mode without flags', () => {
  const { container } = render(
    <LanguageSelector
      languages={mockLanguages}
      displayMode="compact"
      showFlags={false}
    />
  )
  expect(container.firstChild).toMatchSnapshot()
})

test('LanguageSelector shows compact format options when displayMode is compact', () => {
  render(
    <LanguageSelector
      languages={mockLanguages}
      displayMode="compact"
      showFlags={true}
    />
  )

  const trigger = screen.getByRole('button')
  fireEvent.click(trigger)

  // Should show compact format: ISO code + emoji (e.g., "EN🇺🇸")
  expect(screen.getByText(/EN/)).toBeInTheDocument()
  expect(screen.getByText(/ES/)).toBeInTheDocument()
  expect(screen.getByText(/FR/)).toBeInTheDocument()
})

test('LanguageSelector compact mode calls onChange with correct language code', () => {
  const handleChange = vi.fn()
  render(
    <LanguageSelector
      languages={mockLanguages}
      displayMode="compact"
      showFlags={false}
      onChange={handleChange}
    />
  )

  const trigger = screen.getByRole('button')
  fireEvent.click(trigger)

  const option = screen.getByText('EN')
  fireEvent.click(option)

  expect(handleChange).toHaveBeenCalledWith('en')
})