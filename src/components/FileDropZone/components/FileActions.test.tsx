import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { FileActions } from './FileActions'
import { FileUpload } from '../domain/FileUpload'

const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' })

const defaultProps = {
  fileUpload: FileUpload.create(mockFile, 'test-id'),
  onRemoveFile: vi.fn(),
  onRetryFile: vi.fn(),
}

describe('FileActions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders correctly with default props', () => {
    const { container } = render(<FileActions {...defaultProps} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('always shows remove button', () => {
    render(<FileActions {...defaultProps} />)

    const removeButton = screen.getByLabelText('Remove test.txt')
    expect(removeButton).toBeInTheDocument()
  })

  test('shows retry button for failed files', () => {
    const failedFileUpload = defaultProps.fileUpload.withStatus('failed')

    render(
      <FileActions
        {...defaultProps}
        fileUpload={failedFileUpload}
      />
    )

    const retryButton = screen.getByLabelText('Retry upload for test.txt')
    expect(retryButton).toBeInTheDocument()
  })

  test('does not show retry button for successful files', () => {
    const completedFileUpload = defaultProps.fileUpload.withStatus('completed')

    render(
      <FileActions
        {...defaultProps}
        fileUpload={completedFileUpload}
      />
    )

    expect(screen.queryByLabelText('Retry upload for test.txt')).not.toBeInTheDocument()
  })

  test('calls onRemoveFile when remove button is clicked', () => {
    render(<FileActions {...defaultProps} />)

    const removeButton = screen.getByLabelText('Remove test.txt')
    removeButton.click()

    expect(defaultProps.onRemoveFile).toHaveBeenCalledWith('test-id')
  })

  test('calls onRetryFile when retry button is clicked', () => {
    const failedFileUpload = defaultProps.fileUpload.withStatus('failed')

    render(
      <FileActions
        {...defaultProps}
        fileUpload={failedFileUpload}
      />
    )

    const retryButton = screen.getByLabelText('Retry upload for test.txt')
    retryButton.click()

    expect(defaultProps.onRetryFile).toHaveBeenCalledWith('test-id')
  })

  test('has correct accessibility attributes for buttons', () => {
    const failedFileUpload = defaultProps.fileUpload.withStatus('failed')

    render(
      <FileActions
        {...defaultProps}
        fileUpload={failedFileUpload}
      />
    )

    const removeButton = screen.getByLabelText('Remove test.txt')
    expect(removeButton).toHaveAttribute('type', 'button')
    expect(removeButton).toHaveAttribute('title', 'Remove file')

    const retryButton = screen.getByLabelText('Retry upload for test.txt')
    expect(retryButton).toHaveAttribute('type', 'button')
    expect(retryButton).toHaveAttribute('title', 'Retry upload')
  })


  test('renders icons inside buttons', () => {
    const failedFileUpload = defaultProps.fileUpload.withStatus('failed')

    render(
      <FileActions
        {...defaultProps}
        fileUpload={failedFileUpload}
      />
    )

    // Check that SVG icons are present
    const svgIcons = document.querySelectorAll('svg')
    expect(svgIcons).toHaveLength(2) // One for remove, one for retry
  })
})