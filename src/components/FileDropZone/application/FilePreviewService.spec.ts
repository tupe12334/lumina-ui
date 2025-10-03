import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { FilePreviewService } from './FilePreviewService'
import { FileUpload } from '../domain/FileUpload'

describe('FilePreviewService', () => {
  let mockFileReader: Partial<FileReader>

  beforeEach(() => {
    // Reset any previous mocks
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('generatePreviewUrl', () => {
    it('should generate preview URL for image files', async () => {
      const imageFile = new File(['image data'], 'test.jpg', { type: 'image/jpeg' })
      const expectedUrl = 'data:image/jpeg;base64,dGVzdA=='

      // Override the mock for this test to return custom result
      global.FileReader = vi.fn().mockImplementation(() => ({
        readAsDataURL: vi.fn(function(this: FileReader) {
          queueMicrotask(() => {
            if (this.onload) {
              this.onload({} as const)
            }
          })
        }),
        result: expectedUrl,
        onload: null,
        onerror: null
      }))

      const result = await FilePreviewService.generatePreviewUrl(imageFile)
      expect(result).toBe(expectedUrl)
      expect(global.FileReader).toHaveBeenCalled()
    })

    it('should reject for non-image files', async () => {
      const textFile = new File(['text content'], 'test.txt', { type: 'text/plain' })

      await expect(FilePreviewService.generatePreviewUrl(textFile))
        .rejects
        .toThrow('File is not an image')
    })

    it('should reject when FileReader fails', async () => {
      const imageFile = new File(['image data'], 'test.png', { type: 'image/png' })

      // Mock FileReader to trigger error
      global.FileReader = vi.fn().mockImplementation(() => {
        const instance = {
          readAsDataURL: vi.fn(function(this: FileReader) {
            queueMicrotask(() => {
              if (this.onerror) {
                this.onerror({} as const)
              }
            })
          }),
          result: null,
          onload: null,
          onerror: null
        }
        return instance
      })

      await expect(FilePreviewService.generatePreviewUrl(imageFile)).rejects.toThrow('Failed to read file')
    })

    it('should reject when result is not a string', async () => {
      const imageFile = new File(['image data'], 'test.gif', { type: 'image/gif' })

      // Mock FileReader to return ArrayBuffer instead of string
      global.FileReader = vi.fn().mockImplementation(() => {
        const instance = {
          readAsDataURL: vi.fn(function(this: FileReader) {
            queueMicrotask(() => {
              if (this.onload) {
                this.onload({} as const)
              }
            })
          }),
          result: new ArrayBuffer(8), // Non-string result
          onload: null,
          onerror: null
        }
        return instance
      })

      await expect(FilePreviewService.generatePreviewUrl(imageFile)).rejects.toThrow('Failed to read file as string')
    })

    it('should handle different image types', async () => {
      const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']

      for (const type of imageTypes) {
        const imageFile = new File(['image data'], `test.${type.split('/')[1]}`, { type })
        const expectedUrl = `data:${type};base64,dGVzdA==`

        // Mock FileReader to return the expected URL for this specific type
        global.FileReader = vi.fn().mockImplementation(() => {
          const instance = {
            readAsDataURL: vi.fn(function(this: FileReader) {
              queueMicrotask(() => {
                if (this.onload) {
                  this.onload({} as const)
                }
              })
            }),
            result: expectedUrl,
            onload: null,
            onerror: null
          }
          return instance
        })

        const result = await FilePreviewService.generatePreviewUrl(imageFile)
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

      // Mock FileReader for successful image processing
      global.FileReader = vi.fn().mockImplementation(() => {
        const instance = {
          readAsDataURL: vi.fn(function(this: FileReader) {
            queueMicrotask(() => {
              if (this.onload) {
                this.onload({} as const)
              }
            })
          }),
          result: expectedUrl,
          onload: null,
          onerror: null
        }
        return instance
      })

      const result = await FilePreviewService.addPreviewUrls(fileUploads)

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

      // Mock FileReader to trigger error
      global.FileReader = vi.fn().mockImplementation(() => {
        const instance = {
          readAsDataURL: vi.fn(function(this: FileReader) {
            queueMicrotask(() => {
              if (this.onerror) {
                this.onerror({} as const)
              }
            })
          }),
          result: null,
          onload: null,
          onerror: null
        }
        return instance
      })

      const result = await FilePreviewService.addPreviewUrls(fileUploads)

      expect(result).toHaveLength(1)
      expect(result[0].getPreviewUrl()).toBeUndefined()
    })

    it('should preserve original file upload properties', async () => {
      const imageFile = new File(['image data'], 'test.jpg', { type: 'image/jpeg' })
      const originalUpload = FileUpload.create(imageFile, 'test-id')
        .withProgress(50)
        .withStatus('uploading')

      const expectedUrl = 'data:image/jpeg;base64,dGVzdA=='

      // Mock FileReader for successful image processing
      global.FileReader = vi.fn().mockImplementation(() => {
        const instance = {
          readAsDataURL: vi.fn(function(this: FileReader) {
            queueMicrotask(() => {
              if (this.onload) {
                this.onload({} as const)
              }
            })
          }),
          result: expectedUrl,
          onload: null,
          onerror: null
        }
        return instance
      })

      const result = await FilePreviewService.addPreviewUrls([originalUpload])

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

      // Mock FileReader for successful image processing
      global.FileReader = vi.fn().mockImplementation(() => {
        const instance = {
          readAsDataURL: vi.fn(function(this: FileReader) {
            queueMicrotask(() => {
              if (this.onload) {
                this.onload({} as const)
              }
            })
          }),
          result: expectedUrl,
          onload: null,
          onerror: null
        }
        return instance
      })

      const result = await FilePreviewService.addPreviewUrls(fileUploads)

      expect(result).toHaveLength(2)
      expect(result[0].getPreviewUrl()).toBe(expectedUrl)
      expect(result[1].getPreviewUrl()).toBe(expectedUrl)
    })
  })
})