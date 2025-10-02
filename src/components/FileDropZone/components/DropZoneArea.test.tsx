import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { DropZoneArea } from './DropZoneArea'

const defaultProps = {
  isDragActive: false,
  disabled: false,
  onDragEnter: vi.fn(),
  onDragLeave: vi.fn(),
  onDragOver: vi.fn(),
  onDrop: vi.fn(),
  onClick: vi.fn(),
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

    const dropZone = screen.getByRole('button')
    expect(dropZone).toHaveAttribute('aria-disabled', 'true')
    expect(dropZone).toHaveClass('disabled')
  })

  test('shows active drag state correctly', () => {
    render(
      <DropZoneArea {...defaultProps} isDragActive={true}>
        <div className="test-content">Content</div>
      </DropZoneArea>
    )

    const dropZone = screen.getByRole('button')
    expect(dropZone).toHaveClass('dragActive')
  })

  test('calls onClick when clicked and not disabled', () => {
    render(
      <DropZoneArea {...defaultProps}>
        <div className="test-content">Content</div>
      </DropZoneArea>
    )

    const dropZone = screen.getByRole('button')
    dropZone.click()

    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  test('does not call onClick when disabled', () => {
    render(
      <DropZoneArea {...defaultProps} disabled={true}>
        <div className="test-content">Content</div>
      </DropZoneArea>
    )

    const dropZone = screen.getByRole('button')
    dropZone.click()

    expect(defaultProps.onClick).not.toHaveBeenCalled()
  })

  test('applies custom className', () => {
    render(
      <DropZoneArea {...defaultProps} className="custom-class">
        <div className="test-content">Content</div>
      </DropZoneArea>
    )

    const dropZone = screen.getByRole('button')
    expect(dropZone).toHaveClass('custom-class')
  })

  test('handles keyboard events correctly', () => {
    render(
      <DropZoneArea {...defaultProps}>
        <div className="test-content">Content</div>
      </DropZoneArea>
    )

    const dropZone = screen.getByRole('button')

    // Test Enter key
    dropZone.focus()
    dropZone.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    expect(defaultProps.onClick).toHaveBeenCalled()

    vi.clearAllMocks()

    // Test Space key
    dropZone.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }))
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  test('prevents keyboard events when disabled', () => {
    render(
      <DropZoneArea {...defaultProps} disabled={true}>
        <div className="test-content">Content</div>
      </DropZoneArea>
    )

    const dropZone = screen.getByRole('button')

    dropZone.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
    expect(defaultProps.onClick).not.toHaveBeenCalled()
  })
})