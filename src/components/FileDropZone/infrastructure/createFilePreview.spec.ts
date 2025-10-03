import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createFilePreview } from './createFilePreview'
import { isImageFile } from './fileTypeCheckers'

vi.mock('./fileTypeCheckers', () => ({
  isImageFile: vi.fn()
}))

const mockedIsImageFile = vi.mocked(isImageFile)

describe('createFilePreview', () => {
  let mockFileReader: Partial<FileReader>

  beforeEach(() => {
    mockFileReader = {
      readAsDataURL: vi.fn(),
      result: null,
      onload: null,
      onerror: null
    }

    global.FileReader = vi.fn(() => mockFileReader) as const
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should create preview for image files', async () => {
    mockedIsImageFile.mockReturnValue(true)

    const imageFile = new File(['image data'], 'test.jpg', { type: 'image/jpeg' })
    const expectedUrl = 'data:image/jpeg;base64,dGVzdA=='

    mockFileReader.result = expectedUrl

    const promise = createFilePreview(imageFile)

    if (mockFileReader.onload) {
      mockFileReader.onload({} as const)
    }

    const result = await promise
    expect(result).toBe(expectedUrl)
    expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(imageFile)
  })

  it('should reject for non-image files', async () => {
    mockedIsImageFile.mockReturnValue(false)

    const textFile = new File(['text content'], 'test.txt', { type: 'text/plain' })

    await expect(createFilePreview(textFile)).rejects.toThrow('File is not an image')
  })

  it('should reject when FileReader fails', async () => {
    mockedIsImageFile.mockReturnValue(true)

    const imageFile = new File(['image data'], 'test.png', { type: 'image/png' })

    const promise = createFilePreview(imageFile)

    if (mockFileReader.onerror) {
      mockFileReader.onerror({} as const)
    }

    await expect(promise).rejects.toThrow('Failed to read file')
  })

  it('should reject when result is not a string', async () => {
    mockedIsImageFile.mockReturnValue(true)

    const imageFile = new File(['image data'], 'test.gif', { type: 'image/gif' })

    mockFileReader.result = new ArrayBuffer(8)

    const promise = createFilePreview(imageFile)

    if (mockFileReader.onload) {
      mockFileReader.onload({} as const)
    }

    await expect(promise).rejects.toThrow('Failed to read file as data URL')
  })

  it('should handle different image types', async () => {
    mockedIsImageFile.mockReturnValue(true)

    const imageTypes = [
      { file: new File([''], 'test.jpg', { type: 'image/jpeg' }), url: 'data:image/jpeg;base64,test' },
      { file: new File([''], 'test.png', { type: 'image/png' }), url: 'data:image/png;base64,test' },
      { file: new File([''], 'test.gif', { type: 'image/gif' }), url: 'data:image/gif;base64,test' }
    ]

    for (const { file, url } of imageTypes) {
      mockFileReader.result = url

      const promise = createFilePreview(file)

      if (mockFileReader.onload) {
        mockFileReader.onload({} as const)
      }

      const result = await promise
      expect(result).toBe(url)
    }
  })

  it('should call isImageFile with the correct file', async () => {
    mockedIsImageFile.mockReturnValue(false)

    const file = new File(['content'], 'test.txt', { type: 'text/plain' })

    try {
      await createFilePreview(file)
    } catch {
      // Expected to reject
    }

    expect(isImageFile).toHaveBeenCalledWith(file)
  })

  it('should handle empty image files', async () => {
    mockedIsImageFile.mockReturnValue(true)

    const emptyImageFile = new File([], 'empty.jpg', { type: 'image/jpeg' })
    const expectedUrl = 'data:image/jpeg;base64,'

    mockFileReader.result = expectedUrl

    const promise = createFilePreview(emptyImageFile)

    if (mockFileReader.onload) {
      mockFileReader.onload({} as const)
    }

    const result = await promise
    expect(result).toBe(expectedUrl)
  })

  it('should handle large image files', async () => {
    mockedIsImageFile.mockReturnValue(true)

    const largeImageData = 'x'.repeat(1000000)
    const largeImageFile = new File([largeImageData], 'large.jpg', { type: 'image/jpeg' })
    const expectedUrl = `data:image/jpeg;base64,${btoa(largeImageData)}`

    mockFileReader.result = expectedUrl

    const promise = createFilePreview(largeImageFile)

    if (mockFileReader.onload) {
      mockFileReader.onload({} as const)
    }

    const result = await promise
    expect(result).toBe(expectedUrl)
  })

  it('should return a Promise', () => {
    mockedIsImageFile.mockReturnValue(true)

    const imageFile = new File(['image'], 'test.jpg', { type: 'image/jpeg' })
    const result = createFilePreview(imageFile)

    expect(result).toBeInstanceOf(Promise)
  })

  it('should handle FileReader instance creation', async () => {
    mockedIsImageFile.mockReturnValue(true)

    const imageFile = new File(['image'], 'test.jpg', { type: 'image/jpeg' })

    createFilePreview(imageFile)

    expect(global.FileReader).toHaveBeenCalled()
  })
})