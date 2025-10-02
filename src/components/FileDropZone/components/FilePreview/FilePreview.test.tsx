import { render, screen } from '@testing-library/react'
import { FilePreview } from './FilePreview'
import { FileUpload } from '../../domain/FileUpload'

const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' })

describe('FilePreview', () => {
  test('renders correctly with file icon', () => {
    const fileUpload = FileUpload.create(mockFile, 'test-id')
    const { container } = render(<FilePreview fileUpload={fileUpload} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('shows file icon when no preview URL', () => {
    const fileUpload = FileUpload.create(mockFile, 'test-id')
    render(<FilePreview fileUpload={fileUpload} />)

    // Should show file icon (svg element)
    expect(document.querySelector('svg')).toBeInTheDocument()
    // Should not show image
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  test('shows preview image when preview URL is available', () => {
    const fileUpload = FileUpload.create(mockFile, 'test-id')
      .withPreviewUrl('data:image/png;base64,test')

    render(<FilePreview fileUpload={fileUpload} />)

    const previewImage = screen.getByRole('img')
    expect(previewImage).toBeInTheDocument()
    expect(previewImage).toHaveAttribute('src', 'data:image/png;base64,test')
    expect(previewImage).toHaveAttribute('alt', 'Preview of test.txt')
  })

  test('has correct structure and attributes', () => {
    const fileUpload = FileUpload.create(mockFile, 'test-id')
    const { container } = render(<FilePreview fileUpload={fileUpload} />)

    const previewContainer = container.firstChild
    expect(previewContainer).toBeInTheDocument()
    // Check for CSS module class that contains 'filePreview'
    if (previewContainer) {
      expect(previewContainer.className).toMatch(/filePreview/)
    }
  })

  test('preview image has correct attributes', () => {
    const fileUpload = FileUpload.create(mockFile, 'test-id')
      .withPreviewUrl('data:image/png;base64,test')

    render(<FilePreview fileUpload={fileUpload} />)

    const previewImage = screen.getByRole('img')
    // Check for CSS module class that contains 'previewImage'
    expect(previewImage.className).toMatch(/previewImage/)
  })
})