import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createDataTransferFromFiles } from './createDataTransferFromFiles'

// Mock DataTransfer since it may not be available in test environment
const mockDataTransfer = {
  items: {
    add: vi.fn(),
    length: 0
  },
  files: []
}

beforeEach(() => {
  vi.clearAllMocks()
  mockDataTransfer.items.add.mockClear()

  // Mock DataTransfer constructor
  global.DataTransfer = vi.fn(() => mockDataTransfer) as const
})

describe('createDataTransferFromFiles', () => {
  it('should create a DataTransfer object', () => {
    const files = [new File(['content'], 'test.txt')]

    const result = createDataTransferFromFiles(files)

    expect(global.DataTransfer).toHaveBeenCalled()
    expect(result).toBe(mockDataTransfer)
  })

  it('should add all files to DataTransfer items', () => {
    const files = [
      new File(['content1'], 'file1.txt'),
      new File(['content2'], 'file2.txt'),
      new File(['content3'], 'file3.txt')
    ]

    createDataTransferFromFiles(files)

    expect(mockDataTransfer.items.add).toHaveBeenCalledTimes(3)
    expect(mockDataTransfer.items.add).toHaveBeenNthCalledWith(1, files[0])
    expect(mockDataTransfer.items.add).toHaveBeenNthCalledWith(2, files[1])
    expect(mockDataTransfer.items.add).toHaveBeenNthCalledWith(3, files[2])
  })

  it('should handle empty files array', () => {
    const result = createDataTransferFromFiles([])

    expect(global.DataTransfer).toHaveBeenCalled()
    expect(mockDataTransfer.items.add).not.toHaveBeenCalled()
    expect(result).toBe(mockDataTransfer)
  })

  it('should handle single file', () => {
    const file = new File(['single file content'], 'single.txt')

    createDataTransferFromFiles([file])

    expect(mockDataTransfer.items.add).toHaveBeenCalledTimes(1)
    expect(mockDataTransfer.items.add).toHaveBeenCalledWith(file)
  })

  it('should handle files with different types', () => {
    const files = [
      new File(['text'], 'document.txt', { type: 'text/plain' }),
      new File(['image'], 'photo.jpg', { type: 'image/jpeg' }),
      new File(['video'], 'movie.mp4', { type: 'video/mp4' })
    ]

    createDataTransferFromFiles(files)

    expect(mockDataTransfer.items.add).toHaveBeenCalledTimes(3)
    files.forEach((file, index) => {
      expect(mockDataTransfer.items.add).toHaveBeenNthCalledWith(index + 1, file)
    })
  })

  it('should handle files with special characters in names', () => {
    const files = [
      new File(['content'], 'file with spaces.txt'),
      new File(['content'], 'file-with-dashes.txt'),
      new File(['content'], 'file_with_underscores.txt'),
      new File(['content'], 'файл.txt'),
      new File(['content'], '文件.txt')
    ]

    createDataTransferFromFiles(files)

    expect(mockDataTransfer.items.add).toHaveBeenCalledTimes(5)
    files.forEach((file, index) => {
      expect(mockDataTransfer.items.add).toHaveBeenNthCalledWith(index + 1, file)
    })
  })

  it('should handle large files', () => {
    const largeContent = 'x'.repeat(1000000) // 1MB of content
    const file = new File([largeContent], 'large-file.txt')

    createDataTransferFromFiles([file])

    expect(mockDataTransfer.items.add).toHaveBeenCalledWith(file)
  })

  it('should handle files with zero size', () => {
    const emptyFile = new File([], 'empty.txt')

    createDataTransferFromFiles([emptyFile])

    expect(mockDataTransfer.items.add).toHaveBeenCalledWith(emptyFile)
  })

  it('should preserve file properties', () => {
    const file = new File(['content'], 'test.pdf', {
      type: 'application/pdf',
      lastModified: Date.now()
    })

    createDataTransferFromFiles([file])

    expect(mockDataTransfer.items.add).toHaveBeenCalledWith(file)
    // Verify the original file object is passed unchanged
    const addedFile = mockDataTransfer.items.add.mock.calls[0][0]
    expect(addedFile.name).toBe('test.pdf')
    expect(addedFile.type).toBe('application/pdf')
  })

  it('should maintain file order', () => {
    const files = [
      new File(['first'], 'first.txt'),
      new File(['second'], 'second.txt'),
      new File(['third'], 'third.txt')
    ]

    createDataTransferFromFiles(files)

    // Verify files are added in the correct order
    expect(mockDataTransfer.items.add).toHaveBeenNthCalledWith(1, files[0])
    expect(mockDataTransfer.items.add).toHaveBeenNthCalledWith(2, files[1])
    expect(mockDataTransfer.items.add).toHaveBeenNthCalledWith(3, files[2])
  })

  it('should handle duplicate files', () => {
    const file = new File(['content'], 'duplicate.txt')
    const files = [file, file, file]

    createDataTransferFromFiles(files)

    expect(mockDataTransfer.items.add).toHaveBeenCalledTimes(3)
    expect(mockDataTransfer.items.add).toHaveBeenCalledWith(file)
  })
})