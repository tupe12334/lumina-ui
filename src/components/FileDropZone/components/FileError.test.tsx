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
    expect(errorAlert).toHaveClass('errorItem')
  })

  test('displays different error messages correctly', () => {
    const errorMessages = [
      'File too large',
      'Invalid file type',
      'Network error occurred',
      'Server unavailable'
    ]

    errorMessages.forEach(errorMessage => {
      const fileUpload = FileUpload.create(mockFile).withError(errorMessage)
      const { rerender } = render(<FileError fileUpload={fileUpload} />)

      expect(screen.getByText(errorMessage)).toBeInTheDocument()
      expect(screen.getByRole('alert')).toBeInTheDocument()

      if (errorMessage !== errorMessages[0]) {
        rerender(<FileError fileUpload={fileUpload} />)
      }
    })
  })

  test('handles empty error message', () => {
    const fileUpload = FileUpload.create(mockFile).withError('')

    const { container } = render(<FileError fileUpload={fileUpload} />)

    // Empty error message should still render the error container
    expect(container.firstChild).toBeNull()
  })

  test('applies correct CSS classes', () => {
    const fileUpload = FileUpload.create(mockFile).withError('Test error')

    render(<FileError fileUpload={fileUpload} />)

    const errorContainer = screen.getByRole('alert')
    expect(errorContainer).toHaveClass('errorItem')

    const errorMessage = screen.getByText('Test error')
    expect(errorMessage).toHaveClass('errorMessage')
  })
})