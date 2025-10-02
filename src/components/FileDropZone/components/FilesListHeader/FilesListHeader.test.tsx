import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { FilesListHeader } from './FilesListHeader'

const defaultProps = {
  fileCount: 2,
  onClearAll: vi.fn(),
}

describe('FilesListHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders correctly with default props', () => {
    const { container } = render(<FilesListHeader {...defaultProps} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('displays correct file count for multiple files', () => {
    render(<FilesListHeader {...defaultProps} />)
    expect(screen.getByText('2 files')).toBeInTheDocument()
  })

  test('displays singular file text for one file', () => {
    render(<FilesListHeader {...defaultProps} fileCount={1} />)
    expect(screen.getByText('1 file')).toBeInTheDocument()
  })

  test('shows clear all button by default when more than one file', () => {
    render(<FilesListHeader {...defaultProps} />)

    const clearButton = screen.getByText('Clear all')
    expect(clearButton).toBeInTheDocument()
    expect(clearButton).toHaveAttribute('aria-label', 'Clear all files')
  })

  test('hides clear all button when showClearAll is false', () => {
    render(<FilesListHeader {...defaultProps} showClearAll={false} />)
    expect(screen.queryByText('Clear all')).not.toBeInTheDocument()
  })

  test('hides clear all button when only one file', () => {
    render(<FilesListHeader {...defaultProps} fileCount={1} />)
    expect(screen.queryByText('Clear all')).not.toBeInTheDocument()
  })

  test('calls onClearAll when clear button is clicked', () => {
    render(<FilesListHeader {...defaultProps} />)

    const clearButton = screen.getByText('Clear all')
    clearButton.click()

    expect(defaultProps.onClearAll).toHaveBeenCalledTimes(1)
  })

  test('has correct semantic structure', () => {
    render(<FilesListHeader {...defaultProps} />)

    const heading = screen.getByRole('heading', { level: 3 })
    expect(heading).toHaveTextContent('2 files')

    const clearButton = screen.getByRole('button', { name: 'Clear all files' })
    expect(clearButton).toBeInTheDocument()
  })
})