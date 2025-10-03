import { describe, it, expect, beforeEach } from 'vitest'
import { FileUploadMethods } from './FileUploadMethods'
import { FileStatusValue } from './FileStatus'

describe('FileUploadMethods', () => {
  let mockFile: File
  let mockStatus: FileStatusValue

  beforeEach(() => {
    mockFile = new File(['test'], 'test.txt', { type: 'text/plain' })
    mockStatus = FileStatusValue.create('pending')
  })

  describe('withStatus', () => {
    it('should return object with new status', () => {
      const result = FileUploadMethods.withStatus(
        'test-id',
        mockFile,
        50,
        'error',
        'preview-url',
        'uploading'
      )

      expect(result.id).toBe('test-id')
      expect(result.file).toBe(mockFile)
      expect(result.status.getStatus()).toBe('uploading')
      expect(result.progress).toBe(50)
      expect(result.error).toBe('error')
      expect(result.previewUrl).toBe('preview-url')
    })

    it('should work with all status types', () => {
      const statuses = ['pending', 'uploading', 'completed', 'failed', 'error'] as const

      statuses.forEach(status => {
        const result = FileUploadMethods.withStatus('id', mockFile, 0, undefined, undefined, status)
        expect(result.status.getStatus()).toBe(status)
      })
    })
  })

  describe('withProgress', () => {
    it('should return object with new progress', () => {
      const result = FileUploadMethods.withProgress(
        'test-id',
        mockFile,
        mockStatus,
        'error',
        'preview-url',
        75
      )

      expect(result.id).toBe('test-id')
      expect(result.file).toBe(mockFile)
      expect(result.status).toBe(mockStatus)
      expect(result.progress).toBe(75)
      expect(result.error).toBe('error')
      expect(result.previewUrl).toBe('preview-url')
    })

    it('should clamp progress to 0-100 range', () => {
      const testCases = [
        { input: -10, expected: 0 },
        { input: 0, expected: 0 },
        { input: 50, expected: 50 },
        { input: 100, expected: 100 },
        { input: 150, expected: 100 },
        { input: 999, expected: 100 }
      ]

      testCases.forEach(({ input, expected }) => {
        const result = FileUploadMethods.withProgress('id', mockFile, mockStatus, undefined, undefined, input)
        expect(result.progress).toBe(expected)
      })
    })
  })

  describe('withError', () => {
    it('should return object with error and failed status', () => {
      const errorMessage = 'Upload failed'
      const result = FileUploadMethods.withError(
        'test-id',
        mockFile,
        50,
        'preview-url',
        errorMessage
      )

      expect(result.id).toBe('test-id')
      expect(result.file).toBe(mockFile)
      expect(result.status.getStatus()).toBe('failed')
      expect(result.progress).toBe(50)
      expect(result.error).toBe(errorMessage)
      expect(result.previewUrl).toBe('preview-url')
    })

    it('should always set status to failed when error is provided', () => {
      const result = FileUploadMethods.withError('id', mockFile, 100, undefined, 'Any error')

      expect(result.status.getStatus()).toBe('failed')
      expect(result.error).toBe('Any error')
    })
  })

  describe('withPreviewUrl', () => {
    it('should return object with new preview URL', () => {
      const previewUrl = 'http://example.com/preview.jpg'
      const result = FileUploadMethods.withPreviewUrl(
        'test-id',
        mockFile,
        mockStatus,
        75,
        'error',
        previewUrl
      )

      expect(result.id).toBe('test-id')
      expect(result.file).toBe(mockFile)
      expect(result.status).toBe(mockStatus)
      expect(result.progress).toBe(75)
      expect(result.error).toBe('error')
      expect(result.previewUrl).toBe(previewUrl)
    })
  })

  describe('clearError', () => {
    it('should return object with undefined error', () => {
      const result = FileUploadMethods.clearError(
        'test-id',
        mockFile,
        mockStatus,
        50,
        'preview-url'
      )

      expect(result.id).toBe('test-id')
      expect(result.file).toBe(mockFile)
      expect(result.status).toBe(mockStatus)
      expect(result.progress).toBe(50)
      expect(result.error).toBeUndefined()
      expect(result.previewUrl).toBe('preview-url')
    })

    it('should preserve all other properties when clearing error', () => {
      const uploadingStatus = FileStatusValue.create('uploading')
      const result = FileUploadMethods.clearError('id', mockFile, uploadingStatus, 85, 'url')

      expect(result.status.getStatus()).toBe('uploading')
      expect(result.progress).toBe(85)
      expect(result.previewUrl).toBe('url')
      expect(result.error).toBeUndefined()
    })
  })

  describe('immutability', () => {
    it('should not modify input parameters', () => {
      const originalStatus = FileStatusValue.create('pending')
      const originalProgress = 25
      const originalError = 'original error'
      const originalPreview = 'original preview'

      FileUploadMethods.withStatus('id', mockFile, originalProgress, originalError, originalPreview, 'completed')
      FileUploadMethods.withProgress('id', mockFile, originalStatus, originalError, originalPreview, 75)
      FileUploadMethods.withError('id', mockFile, originalProgress, originalPreview, 'new error')
      FileUploadMethods.withPreviewUrl('id', mockFile, originalStatus, originalProgress, originalError, 'new preview')
      FileUploadMethods.clearError('id', mockFile, originalStatus, originalProgress, originalPreview)

      expect(originalStatus.getStatus()).toBe('pending')
    })
  })
})