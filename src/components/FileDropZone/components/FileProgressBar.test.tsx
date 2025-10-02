import { render, screen } from '@testing-library/react'
import { FileProgressBar } from './FileProgressBar'
import { FileUpload } from '../domain/FileUpload'

const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' })

describe('FileProgressBar', () => {
  test('renders correctly with uploading file', () => {
    const fileUpload = FileUpload.create(mockFile)
      .withStatus('uploading')
      .withProgress(50)

    const { container } = render(<FileProgressBar fileUpload={fileUpload} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('returns null for non-uploading files', () => {
    const fileUpload = FileUpload.create(mockFile).withStatus('pending')

    const { container } = render(<FileProgressBar fileUpload={fileUpload} />)
    expect(container.firstChild).toBeNull()
  })

  test('shows progress bar for uploading files', () => {
    const fileUpload = FileUpload.create(mockFile)
      .withStatus('uploading')
      .withProgress(75)

    render(<FileProgressBar fileUpload={fileUpload} />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '75')
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')
  })

  test('shows progress bar for processing files', () => {
    const fileUpload = FileUpload.create(mockFile)
      .withStatus('processing')
      .withProgress(30)

    render(<FileProgressBar fileUpload={fileUpload} />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '30')
  })

  test('applies correct CSS classes based on status', () => {
    const completedFileUpload = FileUpload.create(mockFile)
      .withStatus('completed')
      .withProgress(100)

    render(<FileProgressBar fileUpload={completedFileUpload} />)

    const progressFill = document.querySelector('.progressFill')
    expect(progressFill).toHaveClass('completed')
  })

  test('applies failed styling for failed files', () => {
    const failedFileUpload = FileUpload.create(mockFile)
      .withStatus('failed')
      .withProgress(50)

    render(<FileProgressBar fileUpload={failedFileUpload} />)

    const progressFill = document.querySelector('.progressFill')
    expect(progressFill).toHaveClass('failed')
  })

  test('sets correct width style based on progress', () => {
    const fileUpload = FileUpload.create(mockFile)
      .withStatus('uploading')
      .withProgress(60)

    render(<FileProgressBar fileUpload={fileUpload} />)

    const progressFill = document.querySelector('.progressFill')
    expect(progressFill).toHaveStyle('width: 60%')
  })

  test('handles 0% progress', () => {
    const fileUpload = FileUpload.create(mockFile)
      .withStatus('uploading')
      .withProgress(0)

    render(<FileProgressBar fileUpload={fileUpload} />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '0')

    const progressFill = document.querySelector('.progressFill')
    expect(progressFill).toHaveStyle('width: 0%')
  })

  test('handles 100% progress', () => {
    const fileUpload = FileUpload.create(mockFile)
      .withStatus('uploading')
      .withProgress(100)

    render(<FileProgressBar fileUpload={fileUpload} />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '100')

    const progressFill = document.querySelector('.progressFill')
    expect(progressFill).toHaveStyle('width: 100%')
  })
})