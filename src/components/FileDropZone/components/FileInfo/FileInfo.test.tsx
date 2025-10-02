import { render, screen } from '@testing-library/react'
import { FileInfo } from './FileInfo'
import { FileUpload } from '../../domain/FileUpload'

const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' })

describe('FileInfo', () => {
  test('renders correctly with default file', () => {
    const fileUpload = FileUpload.create(mockFile, 'test-id')
    const { container } = render(<FileInfo fileUpload={fileUpload} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('displays file name and size', () => {
    const fileUpload = FileUpload.create(mockFile, 'test-id')
    render(<FileInfo fileUpload={fileUpload} />)

    expect(screen.getByText('test.txt')).toBeInTheDocument()
    expect(screen.getByText(/B$/)).toBeInTheDocument()
  })

  test('shows file status with proper accessibility', () => {
    const fileUpload = FileUpload.create(mockFile, 'test-id')
    render(<FileInfo fileUpload={fileUpload} />)

    const statusElement = screen.getByRole('status')
    expect(statusElement).toHaveAttribute('aria-label', 'File status: pending')
    expect(statusElement).toHaveTextContent('pending')
  })

  test('shows spinner for active status', () => {
    const fileUpload = FileUpload.create(mockFile, 'test-id').withStatus('uploading')
    render(<FileInfo fileUpload={fileUpload} />)

    const statusElement = screen.getByRole('status')
    expect(statusElement).toHaveTextContent('uploading')
    // Check for spinner presence
    expect(statusElement.querySelector('svg')).toBeInTheDocument()
  })

  test('displays progress bar for uploading files', () => {
    const fileUpload = FileUpload.create(mockFile, 'test-id')
      .withStatus('uploading')
      .withProgress(50)

    render(<FileInfo fileUpload={fileUpload} />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '50')
  })

  test('shows error message when file has error', () => {
    const fileUpload = FileUpload.create(mockFile, 'test-id')
      .withError('Upload failed')

    render(<FileInfo fileUpload={fileUpload} />)

    expect(screen.getByText('Upload failed')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  test('shows completed status without spinner', () => {
    const fileUpload = FileUpload.create(mockFile, 'test-id')
      .withStatus('completed')

    render(<FileInfo fileUpload={fileUpload} />)

    const statusElement = screen.getByRole('status')
    expect(statusElement).toHaveTextContent('completed')
    // Should not have spinner for completed status
    expect(statusElement.querySelector('svg')).not.toBeInTheDocument()
  })
})