import { describe, it, expect, vi } from 'vitest'
import { downloadFile } from './downloadFile'
import { saveAs } from 'file-saver'

vi.mock('file-saver', () => ({
  saveAs: vi.fn()
}))

const mockedSaveAs = vi.mocked(saveAs)

describe('downloadFile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call saveAs with file and its original name when no fileName provided', () => {
    const file = new File(['content'], 'original.txt', { type: 'text/plain' })

    downloadFile(file)

    expect(mockedSaveAs).toHaveBeenCalledWith(file, 'original.txt')
  })

  it('should call saveAs with file and custom fileName when provided', () => {
    const file = new File(['content'], 'original.txt', { type: 'text/plain' })
    const customName = 'custom-name.txt'

    downloadFile(file, customName)

    expect(mockedSaveAs).toHaveBeenCalledWith(file, customName)
  })

  it('should handle file with no extension', () => {
    const file = new File(['content'], 'filename-without-extension')

    downloadFile(file)

    expect(mockedSaveAs).toHaveBeenCalledWith(file, 'filename-without-extension')
  })

  it('should handle custom fileName with different extension', () => {
    const file = new File(['content'], 'original.txt', { type: 'text/plain' })
    const customName = 'renamed.doc'

    downloadFile(file, customName)

    expect(mockedSaveAs).toHaveBeenCalledWith(file, 'renamed.doc')
  })

  it('should handle empty fileName parameter', () => {
    const file = new File(['content'], 'fallback.txt', { type: 'text/plain' })

    downloadFile(file, '')

    expect(mockedSaveAs).toHaveBeenCalledWith(file, 'fallback.txt')
  })

  it('should handle files with special characters in name', () => {
    const specialName = 'file with spaces & symbols!.txt'
    const file = new File(['content'], specialName, { type: 'text/plain' })

    downloadFile(file)

    expect(mockedSaveAs).toHaveBeenCalledWith(file, specialName)
  })

  it('should handle Unicode file names', () => {
    const unicodeName = '文档.txt'
    const file = new File(['content'], unicodeName, { type: 'text/plain' })

    downloadFile(file)

    expect(mockedSaveAs).toHaveBeenCalledWith(file, unicodeName)
  })

  it('should handle different file types', () => {

    const testFiles = [
      new File(['text'], 'document.txt', { type: 'text/plain' }),
      new File(['image'], 'photo.jpg', { type: 'image/jpeg' }),
      new File(['video'], 'movie.mp4', { type: 'video/mp4' }),
      new File(['data'], 'data.json', { type: 'application/json' })
    ]

    testFiles.forEach(file => {
      downloadFile(file)
      expect(mockedSaveAs).toHaveBeenCalledWith(file, file.name)
    })

    expect(saveAs).toHaveBeenCalledTimes(4)
  })

  it('should handle large files', () => {
    const largeContent = 'x'.repeat(1000000) // 1MB
    const file = new File([largeContent], 'large-file.txt', { type: 'text/plain' })

    downloadFile(file)

    expect(mockedSaveAs).toHaveBeenCalledWith(file, 'large-file.txt')
  })

  it('should handle zero-size files', () => {
    const emptyFile = new File([], 'empty.txt', { type: 'text/plain' })

    downloadFile(emptyFile)

    expect(mockedSaveAs).toHaveBeenCalledWith(emptyFile, 'empty.txt')
  })

  it('should override original name with custom name regardless of original', () => {
    const file = new File(['content'], 'very-long-original-filename.txt', { type: 'text/plain' })
    const shortName = 'short.txt'

    downloadFile(file, shortName)

    expect(mockedSaveAs).toHaveBeenCalledWith(file, shortName)
  })

  it('should handle files with dots in the middle of name', () => {
    const file = new File(['content'], 'file.name.with.dots.txt', { type: 'text/plain' })

    downloadFile(file)

    expect(mockedSaveAs).toHaveBeenCalledWith(file, 'file.name.with.dots.txt')
  })

  it('should not return any value', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' })
    const result = downloadFile(file)

    expect(result).toBeUndefined()
  })

  it('should pass through the exact File object to saveAs', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' })

    downloadFile(file, 'custom.txt')

    // Verify the exact file object is passed
    expect(mockedSaveAs).toHaveBeenCalledWith(file, 'custom.txt')
    const passedFile = saveAs.mock.calls[0][0]
    expect(passedFile).toBe(file)
  })
})