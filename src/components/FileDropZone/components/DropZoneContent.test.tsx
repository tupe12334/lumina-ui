import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { DropZoneContent } from './DropZoneContent'

const defaultProps = {
  title: 'Upload Files',
  description: 'Drag and drop your files here, or click to browse',
  buttonText: 'Browse Files',
  icon: undefined,
  maxFiles: 5,
  maxFileSize: 10,
  onButtonClick: vi.fn(),
  disabled: false,
}

describe('DropZoneContent', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders correctly with default props', () => {
    const { container } = render(<DropZoneContent {...defaultProps} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('displays title and description', () => {
    render(<DropZoneContent {...defaultProps} />)

    expect(screen.getByText('Upload Files')).toBeInTheDocument()
    expect(screen.getByText('Drag and drop your files here, or click to browse')).toBeInTheDocument()
  })

  test('displays button text', () => {
    render(<DropZoneContent {...defaultProps} />)

    expect(screen.getByText('Browse Files')).toBeInTheDocument()
  })

  test('shows file limits', () => {
    render(<DropZoneContent {...defaultProps} />)

    expect(screen.getByText(/Max 5 files/)).toBeInTheDocument()
    expect(screen.getByText(/Max 10MB per file/)).toBeInTheDocument()
  })

  test('renders icon component', () => {
    render(<DropZoneContent {...defaultProps} />)

    // Should render the default upload icon
    const svgIcon = document.querySelector('svg')
    expect(svgIcon).toBeInTheDocument()
  })

  test('renders emoji icon when provided', () => {
    render(<DropZoneContent {...defaultProps} icon="📁" />)

    expect(screen.getByText('📁')).toBeInTheDocument()
  })

  test('calls onButtonClick when button is clicked', () => {
    render(<DropZoneContent {...defaultProps} />)

    const button = screen.getByText('Browse Files')
    button.click()

    expect(defaultProps.onButtonClick).toHaveBeenCalled()
  })

  test('disables button when disabled prop is true', () => {
    render(<DropZoneContent {...defaultProps} disabled={true} />)

    const button = screen.getByText('Browse Files')
    expect(button).toBeDisabled()
  })


  test('shows different validation rules correctly', () => {
    render(
      <DropZoneContent
        {...defaultProps}
        maxFiles={10}
        maxFileSize={25}
      />
    )

    expect(screen.getByText(/Max 10 files/)).toBeInTheDocument()
    expect(screen.getByText(/Max 25MB per file/)).toBeInTheDocument()
  })

  test('handles custom title and description', () => {
    render(
      <DropZoneContent
        {...defaultProps}
        title="Custom Title"
        description="Custom description text"
        buttonText="Custom Button"
      />
    )

    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.getByText('Custom description text')).toBeInTheDocument()
    expect(screen.getByText('Custom Button')).toBeInTheDocument()
  })

  test('has correct accessibility structure', () => {
    render(<DropZoneContent {...defaultProps} />)

    const button = screen.getByText('Browse Files')
    expect(button).toHaveAttribute('type', 'button')

    // Check that elements have proper heading structure
    const title = screen.getByText('Upload Files')
    expect(title.tagName).toBe('H3')
  })
})