import { render, screen, fireEvent } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import { LanguageSelector } from './LanguageSelector'

const mockLanguages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
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
      config={{ showFlags: false }}
    />
  )
  expect(container.firstChild).toMatchSnapshot()
})

test('LanguageSelector renders correctly with regions', () => {
  const { container } = render(
    <LanguageSelector
      languages={mockLanguages}
      config={{ showRegions: true }}
    />
  )
  expect(container.firstChild).toMatchSnapshot()
})

test('LanguageSelector renders correctly with region in label', () => {
  const { container } = render(
    <LanguageSelector
      languages={mockLanguages}
      config={{ includeRegionInLabel: true }}
    />
  )
  expect(container.firstChild).toMatchSnapshot()
})

test('LanguageSelector renders correctly when disabled', () => {
  const { container } = render(<LanguageSelector languages={mockLanguages} disabled />)
  expect(container.firstChild).toMatchSnapshot()
})

test('LanguageSelector calls onChange with language code and object', () => {
  const handleChange = vi.fn()
  render(<LanguageSelector languages={mockLanguages} onChange={handleChange} />)

  const trigger = screen.getByRole('button')
  fireEvent.click(trigger)

  const option = screen.getByText(/English/)
  fireEvent.click(option)

  expect(handleChange).toHaveBeenCalledWith('en', mockLanguages[0])
})

test('LanguageSelector uses default languages when none provided', () => {
  render(<LanguageSelector />)

  const trigger = screen.getByRole('button')
  fireEvent.click(trigger)

  // Should show default languages like English, Spanish, etc.
  expect(screen.getByText(/English/)).toBeInTheDocument()
  expect(screen.getByText(/Español/)).toBeInTheDocument()
})

test('LanguageSelector renders correctly with custom languages', () => {
  const customLanguages = [
    { code: 'js', name: 'JavaScript', nativeName: 'JavaScript' },
    { code: 'py', name: 'Python', nativeName: 'Python' },
  ]

  const { container } = render(
    <LanguageSelector
      config={{ customLanguages, showFlags: false }}
    />
  )
  expect(container.firstChild).toMatchSnapshot()
})

test('LanguageSelector renders correctly with small size', () => {
  const { container } = render(<LanguageSelector languages={mockLanguages} size="sm" />)
  expect(container.firstChild).toMatchSnapshot()
})

test('LanguageSelector renders correctly with large size', () => {
  const { container } = render(<LanguageSelector languages={mockLanguages} size="lg" />)
  expect(container.firstChild).toMatchSnapshot()
})

test('LanguageSelector renders correctly with custom className', () => {
  const { container } = render(
    <LanguageSelector languages={mockLanguages} className="custom-class" />
  )
  expect(container.firstChild).toMatchSnapshot()
})