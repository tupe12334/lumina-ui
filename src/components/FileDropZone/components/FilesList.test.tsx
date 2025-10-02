import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { FilesList } from './FilesList'
import { FileUpload } from '../domain/FileUpload'

const mockFile1 = new File(['test content 1'], 'test1.txt', { type: 'text/plain' })
const mockFile2 = new File(['test content 2'], 'test2.txt', { type: 'text/plain' })
const mockFiles = [
  FileUpload.create(mockFile1, 'test-id-1'),
  FileUpload.create(mockFile2, 'test-id-2'),
]

const defaultProps = {
  files: mockFiles,
  onRemoveFile: vi.fn(),
  onRetryFile: vi.fn(),
  onClearAll: vi.fn(),
}

describe('FilesList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders correctly with files', () => {
    const { container } = render(<FilesList {...defaultProps} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('returns null when no files provided', () => {
    const { container } = render(
      <FilesList
        {...defaultProps}
        files={[]}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  test('displays correct file count', () => {
    render(<FilesList {...defaultProps} />)

    expect(screen.getByText('2 files')).toBeInTheDocument()
  })

  test('displays singular file text for one file', () => {
    render(
      <FilesList
        {...defaultProps}
        files={[mockFiles[0]]}
      />
    )

    expect(screen.getByText('1 file')).toBeInTheDocument()
  })

  test('shows clear all button by default', () => {
    render(<FilesList {...defaultProps} />)

    const clearButton = screen.getByText('Clear all')
    expect(clearButton).toBeInTheDocument()
  })

  test('hides clear all button when showClearAll is false', () => {
    render(
      <FilesList
        {...defaultProps}
        showClearAll={false}
      />
    )

    expect(screen.queryByText('Clear all')).not.toBeInTheDocument()
  })

  test('calls onClearAll when clear button is clicked', () => {
    render(<FilesList {...defaultProps} />)

    const clearButton = screen.getByText('Clear all')
    clearButton.click()

    expect(defaultProps.onClearAll).toHaveBeenCalled()
  })

  test('renders file list with correct accessibility attributes', () => {
    render(<FilesList {...defaultProps} />)

    const fileList = screen.getByRole('list', { name: 'Uploaded files' })
    expect(fileList).toBeInTheDocument()

    const fileItems = screen.getAllByRole('listitem')
    expect(fileItems).toHaveLength(2)
  })

  test('passes correct props to FileListItem components', () => {
    render(<FilesList {...defaultProps} />)

    // Check that both files are rendered
    expect(screen.getByText('test1.txt')).toBeInTheDocument()
    expect(screen.getByText('test2.txt')).toBeInTheDocument()

    // Check that remove buttons are present for both files
    expect(screen.getByLabelText('Remove test1.txt')).toBeInTheDocument()
    expect(screen.getByLabelText('Remove test2.txt')).toBeInTheDocument()
  })

  test('has correct accessibility structure', () => {
    render(<FilesList {...defaultProps} />)

    const filesHeader = screen.getByText('2 files').closest('div')
    expect(filesHeader).toBeInTheDocument()

    const clearButton = screen.getByLabelText('Clear all files')
    expect(clearButton).toBeInTheDocument()
  })
})