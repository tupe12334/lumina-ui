import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { FileListItem } from './FileListItem'
import { FileUpload } from '../domain/FileUpload'

const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' })
const mockFileUpload = FileUpload.create(mockFile, 'test-id')

const defaultProps = {
  fileUpload: mockFileUpload,
  onRemoveFile: vi.fn(),
  onRetryFile: vi.fn(),
}

describe('FileListItem', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders correctly with default props', () => {
    const { container } = render(<FileListItem {...defaultProps} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('displays file name and size', () => {
    render(<FileListItem {...defaultProps} />)

    expect(screen.getByText('test.txt')).toBeInTheDocument()
    expect(screen.getByText(/B$/)).toBeInTheDocument()
  })

  test('shows file status', () => {
    render(<FileListItem {...defaultProps} />)

    expect(screen.getByText('pending')).toBeInTheDocument()
  })

  test('shows remove button', () => {
    render(<FileListItem {...defaultProps} />)

    const removeButton = screen.getByLabelText('Remove test.txt')
    expect(removeButton).toBeInTheDocument()
  })

  test('calls onRemoveFile when remove button is clicked', () => {
    render(<FileListItem {...defaultProps} />)

    const removeButton = screen.getByLabelText('Remove test.txt')
    removeButton.click()

    expect(defaultProps.onRemoveFile).toHaveBeenCalledWith('test-id')
  })

  test('shows retry button when file can be retried', () => {
    const failedFileUpload = mockFileUpload.withStatus('failed')
    render(
      <FileListItem
        {...defaultProps}
        fileUpload={failedFileUpload}
      />
    )

    const retryButton = screen.getByLabelText('Retry upload for test.txt')
    expect(retryButton).toBeInTheDocument()
  })

  test('calls onRetryFile when retry button is clicked', () => {
    const failedFileUpload = mockFileUpload.withStatus('failed')
    render(
      <FileListItem
        {...defaultProps}
        fileUpload={failedFileUpload}
      />
    )

    const retryButton = screen.getByLabelText('Retry upload for test.txt')
    retryButton.click()

    expect(defaultProps.onRetryFile).toHaveBeenCalledWith('test-id')
  })

  test('shows progress bar for uploading files', () => {
    const uploadingFileUpload = mockFileUpload.withStatus('uploading').withProgress(50)
    render(
      <FileListItem
        {...defaultProps}
        fileUpload={uploadingFileUpload}
      />
    )

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '50')
  })

  test('shows error message when file has error', () => {
    const errorFileUpload = mockFileUpload.withError('Upload failed')
    render(
      <FileListItem
        {...defaultProps}
        fileUpload={errorFileUpload}
      />
    )

    expect(screen.getByText('Upload failed')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  test('shows preview image when preview URL is available', () => {
    const fileWithPreview = mockFileUpload.withPreviewUrl('data:image/png;base64,test')
    render(
      <FileListItem
        {...defaultProps}
        fileUpload={fileWithPreview}
      />
    )

    const previewImage = screen.getByAltText('Preview of test.txt')
    expect(previewImage).toBeInTheDocument()
    expect(previewImage).toHaveAttribute('src', 'data:image/png;base64,test')
  })
})