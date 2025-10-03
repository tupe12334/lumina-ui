import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { FilePreviewService } from './FilePreviewService'
import { FileUpload } from '../domain/FileUpload'

describe('FilePreviewService', () => {
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

  describe('generatePreviewUrl', () => {
    it('should generate preview URL for image files', async () => {
      const imageFile = new File(['image data'], 'test.jpg', { type: 'image/jpeg' })
      const expectedUrl = 'data:image/jpeg;base64,dGVzdA=='

      mockFileReader.result = expectedUrl

      const promise = FilePreviewService.generatePreviewUrl(imageFile)

      if (mockFileReader.onload) {
        mockFileReader.onload({} as const)
      }

      const result = await promise
      expect(result).toBe(expectedUrl)
      expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(imageFile)
    })

    it('should reject for non-image files', async () => {
      const textFile = new File(['text content'], 'test.txt', { type: 'text/plain' })

      await expect(FilePreviewService.generatePreviewUrl(textFile))
        .rejects
        .toThrow('File is not an image')
    })

    it('should reject when FileReader fails', async () => {
      const imageFile = new File(['image data'], 'test.png', { type: 'image/png' })

      const promise = FilePreviewService.generatePreviewUrl(imageFile)

      if (mockFileReader.onerror) {
        mockFileReader.onerror({} as const)
      }

      await expect(promise).rejects.toThrow('Failed to read file')
    })

    it('should reject when result is not a string', async () => {
      const imageFile = new File(['image data'], 'test.gif', { type: 'image/gif' })

      mockFileReader.result = new ArrayBuffer(8)

      const promise = FilePreviewService.generatePreviewUrl(imageFile)

      if (mockFileReader.onload) {
        mockFileReader.onload({} as const)
      }

      await expect(promise).rejects.toThrow('Failed to read file as string')
    })

    it('should handle different image types', async () => {
      const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']

      for (const type of imageTypes) {
        const imageFile = new File(['image data'], `test.${type.split('/')[1]}`, { type })
        const expectedUrl = `data:${type};base64,dGVzdA==`

        mockFileReader.result = expectedUrl

        const promise = FilePreviewService.generatePreviewUrl(imageFile)

        if (mockFileReader.onload) {
          mockFileReader.onload({} as const)
        }

        const result = await promise
        expect(result).toBe(expectedUrl)
      }
    })
  })

  describe('addPreviewUrls', () => {
    it('should add preview URLs to image files', async () => {
      const imageFile = new File(['image data'], 'test.jpg', { type: 'image/jpeg' })
      const textFile = new File(['text content'], 'test.txt', { type: 'text/plain' })

      const fileUploads = [
        FileUpload.create(imageFile),
        FileUpload.create(textFile)
      ]

      const expectedUrl = 'data:image/jpeg;base64,dGVzdA=='
      mockFileReader.result = expectedUrl

      const promise = FilePreviewService.addPreviewUrls(fileUploads)

      if (mockFileReader.onload) {
        mockFileReader.onload({} as const)
      }

      const result = await promise

      expect(result).toHaveLength(2)
      expect(result[0].getPreviewUrl()).toBe(expectedUrl)
      expect(result[1].getPreviewUrl()).toBeUndefined()
    })

    it('should handle empty file array', async () => {
      const result = await FilePreviewService.addPreviewUrls([])
      expect(result).toEqual([])
    })

    it('should handle files with no images', async () => {
      const textFile = new File(['text content'], 'test.txt', { type: 'text/plain' })
      const fileUploads = [FileUpload.create(textFile)]

      const result = await FilePreviewService.addPreviewUrls(fileUploads)

      expect(result).toHaveLength(1)
      expect(result[0].getPreviewUrl()).toBeUndefined()
    })

    it('should handle preview generation errors gracefully', async () => {
      const imageFile = new File(['image data'], 'test.jpg', { type: 'image/jpeg' })
      const fileUploads = [FileUpload.create(imageFile)]

      const promise = FilePreviewService.addPreviewUrls(fileUploads)

      if (mockFileReader.onerror) {
        mockFileReader.onerror({} as const)
      }

      const result = await promise

      expect(result).toHaveLength(1)
      expect(result[0].getPreviewUrl()).toBeUndefined()
    })

    it('should preserve original file upload properties', async () => {
      const imageFile = new File(['image data'], 'test.jpg', { type: 'image/jpeg' })
      const originalUpload = FileUpload.create(imageFile, 'test-id')
        .withProgress(50)
        .withStatus('uploading')

      const expectedUrl = 'data:image/jpeg;base64,dGVzdA=='
      mockFileReader.result = expectedUrl

      const promise = FilePreviewService.addPreviewUrls([originalUpload])

      if (mockFileReader.onload) {
        mockFileReader.onload({} as const)
      }

      const result = await promise

      expect(result[0].getId()).toBe('test-id')
      expect(result[0].getProgress()).toBe(50)
      expect(result[0].getStatus().getStatus()).toBe('uploading')
      expect(result[0].getPreviewUrl()).toBe(expectedUrl)
    })

    it('should handle multiple image files', async () => {
      const imageFile1 = new File(['image 1'], 'test1.jpg', { type: 'image/jpeg' })
      const imageFile2 = new File(['image 2'], 'test2.png', { type: 'image/png' })

      const fileUploads = [
        FileUpload.create(imageFile1),
        FileUpload.create(imageFile2)
      ]

      const expectedUrl = 'data:image/jpeg;base64,dGVzdA=='
      mockFileReader.result = expectedUrl

      const promise = FilePreviewService.addPreviewUrls(fileUploads)

      if (mockFileReader.onload) {
        mockFileReader.onload({} as const)
      }

      const result = await promise

      expect(result).toHaveLength(2)
      expect(result[0].getPreviewUrl()).toBe(expectedUrl)
      expect(result[1].getPreviewUrl()).toBe(expectedUrl)
    })
  })
})