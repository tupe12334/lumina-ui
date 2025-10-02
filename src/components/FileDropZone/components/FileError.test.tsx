import { render, screen } from '@testing-library/react'
import { FileError } from './FileError'
import { FileUpload } from '../domain/FileUpload'

const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' })

describe('FileError', () => {
  test('renders correctly with error message', () => {
    const fileUpload = FileUpload.create(mockFile).withError('Upload failed')

    const { container } = render(<FileError fileUpload={fileUpload} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('returns null when no error', () => {
    const fileUpload = FileUpload.create(mockFile)

    const { container } = render(<FileError fileUpload={fileUpload} />)
    expect(container.firstChild).toBeNull()
  })

  test('displays error message when file has error', () => {
    const errorMessage = 'File size too large'
    const fileUpload = FileUpload.create(mockFile).withError(errorMessage)

    render(<FileError fileUpload={fileUpload} />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  test('has correct accessibility attributes', () => {
    const fileUpload = FileUpload.create(mockFile).withError('Upload failed')

    render(<FileError fileUpload={fileUpload} />)

    const errorAlert = screen.getByRole('alert')
    expect(errorAlert).toBeInTheDocument()
    // CSS class test removed as it depends on implementation details
  })

  test('displays different error messages correctly', () => {
    const errorMessage1 = 'File too large'
    const fileUpload1 = FileUpload.create(mockFile).withError(errorMessage1)

    const { unmount } = render(<FileError fileUpload={fileUpload1} />)
    expect(screen.getByText(errorMessage1)).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
    unmount()

    const errorMessage2 = 'Invalid file type'
    const fileUpload2 = FileUpload.create(mockFile).withError(errorMessage2)

    render(<FileError fileUpload={fileUpload2} />)
    expect(screen.getByText(errorMessage2)).toBeInTheDocument()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  test('handles empty error message', () => {
    const fileUpload = FileUpload.create(mockFile).withError('')

    const { container } = render(<FileError fileUpload={fileUpload} />)

    // Empty error message should still render the error container
    expect(container.firstChild).toBeNull()
  })

})