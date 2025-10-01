import { render, screen } from '@testing-library/react'
import { FileDropZone } from './FileDropZone'

describe('FileDropZone', () => {
  test('renders correctly with default props', () => {
    const { container } = render(<FileDropZone />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders with custom title and description', () => {
    render(
      <FileDropZone
        title="Custom Upload"
        description="Upload your custom files here"
      />
    )

    expect(screen.getByText('Custom Upload')).toBeInTheDocument()
    expect(screen.getByText('Upload your custom files here')).toBeInTheDocument()
  })

  test('renders with custom button text', () => {
    render(<FileDropZone buttonText="Select Files" />)
    expect(screen.getByText('Select Files')).toBeInTheDocument()
  })

  test('shows file limits in description', () => {
    render(
      <FileDropZone
        maxFiles={3}
        maxFileSize={5 * 1024 * 1024} // 5MB
      />
    )

    expect(screen.getByText(/Max 3 files/)).toBeInTheDocument()
    expect(screen.getByText(/Max 5MB per file/)).toBeInTheDocument()
  })

  test('renders in disabled state', () => {
    render(<FileDropZone disabled={true} />)

    const dropzone = screen.getByRole('button', { name: /file upload area/i })
    expect(dropzone).toHaveAttribute('aria-disabled', 'true')

    const button = screen.getByText('Browse Files')
    expect(button).toBeDisabled()
  })

  test('hides files list when hideFilesList is true', () => {
    const { container } = render(<FileDropZone hideFilesList={true} />)

    // FilesList should not be rendered
    expect(container.querySelector('[role="list"]')).not.toBeInTheDocument()
  })

  test('applies custom className', () => {
    const { container } = render(<FileDropZone className="custom-class" />)

    const dropzone = container.firstChild
    expect(dropzone).toHaveClass('custom-class')
  })

  test('renders with accessibility attributes', () => {
    render(<FileDropZone />)

    const dropzone = screen.getByRole('button', { name: /file upload area/i })
    expect(dropzone).toHaveAttribute('tabIndex', '0')
    expect(dropzone).toHaveAttribute('aria-label', 'File upload area')
    expect(dropzone).toHaveAttribute('aria-disabled', 'false')

    const fileInput = screen.getByLabelText(/browse files/i)
    expect(fileInput).toHaveAttribute('type', 'file')
    expect(fileInput).toHaveAttribute('aria-hidden', 'true')
  })

  test('configures file input based on props', () => {
    render(
      <FileDropZone
        allowMultiple={false}
        acceptedTypes={['image/*', 'application/pdf']}
      />
    )

    const fileInput = screen.getByLabelText(/browse files/i)
    expect(fileInput).not.toHaveAttribute('multiple')
    expect(fileInput).toHaveAttribute('accept', 'image/*,application/pdf')
  })

  test('allows multiple files by default', () => {
    render(<FileDropZone />)

    const fileInput = screen.getByLabelText(/browse files/i)
    expect(fileInput).toHaveAttribute('multiple')
  })
})