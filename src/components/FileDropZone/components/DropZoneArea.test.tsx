import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { DropZoneArea } from './DropZoneArea'

const mockOnClick = vi.fn()

const defaultProps = {
  title: 'Upload Files',
  description: 'Drag and drop your files here',
  buttonText: 'Browse Files',
  isDragActive: false,
  disabled: false,
  maxFiles: 10,
  maxFileSize: 10,
  onDragEnter: vi.fn(),
  onDragLeave: vi.fn(),
  onDragOver: vi.fn(),
  onDrop: vi.fn(),
  onClick: mockOnClick,
  onButtonClick: vi.fn(),
  onKeyDown: vi.fn((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      mockOnClick()
    }
  }),
}

describe('DropZoneArea', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders correctly with default props', () => {
    const { container } = render(
      <DropZoneArea {...defaultProps}>
        <div className="test-content">Drop zone content</div>
      </DropZoneArea>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders children content', () => {
    render(
      <DropZoneArea {...defaultProps}>
        <div className="test-content">Test content</div>
      </DropZoneArea>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  test('has correct accessibility attributes', () => {
    render(
      <DropZoneArea {...defaultProps}>
        <div className="test-content">Content</div>
      </DropZoneArea>
    )

    const dropZone = screen.getByRole('button', { name: 'File upload area' })
    expect(dropZone).toHaveAttribute('tabIndex', '0')
    expect(dropZone).toHaveAttribute('aria-label', 'File upload area')
    expect(dropZone).toHaveAttribute('aria-disabled', 'false')
  })

  test('shows disabled state correctly', () => {
    render(
      <DropZoneArea {...defaultProps} disabled={true}>
        <div className="test-content">Content</div>
      </DropZoneArea>
    )

    const dropZone = screen.getByRole('button', { name: 'File upload area' })
    expect(dropZone).toHaveAttribute('aria-disabled', 'true')
    expect(dropZone.className).toMatch(/disabled/)
  })

  test('shows active drag state correctly', () => {
    render(
      <DropZoneArea {...defaultProps} isDragActive={true}>
        <div className="test-content">Content</div>
      </DropZoneArea>
    )

    const dropZone = screen.getByRole('button', { name: 'File upload area' })
    expect(dropZone.className).toMatch(/dragActive/)
  })

  test('calls onClick when clicked and not disabled', () => {
    render(
      <DropZoneArea {...defaultProps}>
        <div className="test-content">Content</div>
      </DropZoneArea>
    )

    const dropZone = screen.getByRole('button', { name: 'File upload area' })
    dropZone.click()

    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  test('does not call onClick when disabled', () => {
    render(
      <DropZoneArea {...defaultProps} disabled={true}>
        <div className="test-content">Content</div>
      </DropZoneArea>
    )

    const dropZone = screen.getByRole('button', { name: 'File upload area' })
    dropZone.click()

    expect(defaultProps.onClick).not.toHaveBeenCalled()
  })

  test('applies custom className', () => {
    render(
      <DropZoneArea {...defaultProps} className="custom-class">
        <div className="test-content">Content</div>
      </DropZoneArea>
    )

    const dropZone = screen.getByRole('button', { name: 'File upload area' })
    expect(dropZone).toHaveClass('custom-class')
  })

  test('handles keyboard events correctly', () => {
    render(
      <DropZoneArea {...defaultProps}>
        <div className="test-content">Content</div>
      </DropZoneArea>
    )

    const dropZone = screen.getByRole('button', { name: 'File upload area' })

    // Test Enter key
    dropZone.focus()
    fireEvent.keyDown(dropZone, { key: 'Enter' })
    expect(defaultProps.onClick).toHaveBeenCalled()

    vi.clearAllMocks()

    // Test Space key
    fireEvent.keyDown(dropZone, { key: ' ' })
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  test('prevents keyboard events when disabled', () => {
    const disabledOnKeyDown = vi.fn((e: React.KeyboardEvent) => {
      // Disabled handler should not call onClick
    })

    render(
      <DropZoneArea {...defaultProps} disabled={true} onKeyDown={disabledOnKeyDown}>
        <div className="test-content">Content</div>
      </DropZoneArea>
    )

    const dropZone = screen.getByRole('button', { name: 'File upload area' })

    fireEvent.keyDown(dropZone, { key: 'Enter' })
    expect(defaultProps.onClick).not.toHaveBeenCalled()
  })
})