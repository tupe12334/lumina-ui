import { describe, it, expect, beforeEach } from 'vitest'
import { FileUpload } from './FileUpload'
import { FileStatusValue } from './FileStatus'

describe('FileUpload', () => {
  let mockFile: File

  beforeEach(() => {
    mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' })
  })

  describe('create', () => {
    it('should create FileUpload with default values', () => {
      const fileUpload = FileUpload.create(mockFile)

      expect(fileUpload.getFile()).toBe(mockFile)
      expect(fileUpload.getStatus().getStatus()).toBe('pending')
      expect(fileUpload.getProgress()).toBe(0)
      expect(fileUpload.getError()).toBeUndefined()
      expect(fileUpload.getPreviewUrl()).toBeUndefined()
      expect(fileUpload.getId()).toMatch(/test\.txt-\d+-\d+/)
    })

    it('should create FileUpload with custom ID', () => {
      const customId = 'custom-file-id'
      const fileUpload = FileUpload.create(mockFile, customId)

      expect(fileUpload.getId()).toBe(customId)
      expect(fileUpload.getFile()).toBe(mockFile)
    })
  })

  describe('fromData', () => {
    it('should create FileUpload from data object', () => {
      const data = {
        id: 'data-id',
        file: mockFile,
        status: 'uploading' as const,
        progress: 50,
        error: 'Upload error',
        previewUrl: 'http://preview.url'
      }

      const fileUpload = FileUpload.fromData(data)

      expect(fileUpload.getId()).toBe('data-id')
      expect(fileUpload.getFile()).toBe(mockFile)
      expect(fileUpload.getStatus().getStatus()).toBe('uploading')
      expect(fileUpload.getProgress()).toBe(50)
      expect(fileUpload.getError()).toBe('Upload error')
      expect(fileUpload.getPreviewUrl()).toBe('http://preview.url')
    })
  })

  describe('getters', () => {
    it('should return file properties correctly', () => {
      const fileUpload = FileUpload.create(mockFile)

      expect(fileUpload.getName()).toBe('test.txt')
      expect(fileUpload.getSize()).toBe(mockFile.size)
      expect(fileUpload.getType()).toBe('text/plain')
    })
  })

  describe('withStatus', () => {
    it('should create new instance with updated status', () => {
      const original = FileUpload.create(mockFile)
      const updated = original.withStatus('uploading')

      expect(original.getStatus().getStatus()).toBe('pending')
      expect(updated.getStatus().getStatus()).toBe('uploading')
      expect(updated).not.toBe(original)
      expect(updated.getId()).toBe(original.getId())
      expect(updated.getFile()).toBe(original.getFile())
    })
  })

  describe('withProgress', () => {
    it('should create new instance with updated progress', () => {
      const original = FileUpload.create(mockFile)
      const updated = original.withProgress(75)

      expect(original.getProgress()).toBe(0)
      expect(updated.getProgress()).toBe(75)
      expect(updated).not.toBe(original)
    })
  })

  describe('withError', () => {
    it('should create new instance with error', () => {
      const original = FileUpload.create(mockFile)
      const errorMessage = 'Upload failed'
      const updated = original.withError(errorMessage)

      expect(original.getError()).toBeUndefined()
      expect(updated.getError()).toBe(errorMessage)
      expect(updated.getStatus().getStatus()).toBe('failed')
      expect(updated).not.toBe(original)
    })
  })

  describe('withPreviewUrl', () => {
    it('should create new instance with preview URL', () => {
      const original = FileUpload.create(mockFile)
      const previewUrl = 'http://example.com/preview.jpg'
      const updated = original.withPreviewUrl(previewUrl)

      expect(original.getPreviewUrl()).toBeUndefined()
      expect(updated.getPreviewUrl()).toBe(previewUrl)
      expect(updated).not.toBe(original)
    })
  })

  describe('clearError', () => {
    it('should create new instance with cleared error', () => {
      const original = FileUpload.create(mockFile).withError('Some error')
      const cleared = original.clearError()

      expect(original.getError()).toBe('Some error')
      expect(cleared.getError()).toBeUndefined()
      expect(cleared).not.toBe(original)
    })
  })

  describe('toData', () => {
    it('should convert to data object', () => {
      const fileUpload = FileUpload.create(mockFile, 'test-id')
        .withStatus('completed')
        .withProgress(100)
        .withPreviewUrl('http://preview.url')

      const data = fileUpload.toData()

      expect(data.id).toBe('test-id')
      expect(data.file).toBe(mockFile)
      expect(data.status).toBe('completed')
      expect(data.progress).toBe(100)
      expect(data.previewUrl).toBe('http://preview.url')
      expect(data.error).toBeUndefined()
    })
  })

  describe('immutability', () => {
    it('should not mutate original instance when creating new ones', () => {
      const original = FileUpload.create(mockFile, 'immutable-test')

      const withStatus = original.withStatus('uploading')
      const withProgress = original.withProgress(50)
      const withError = original.withError('Error')
      const withPreview = original.withPreviewUrl('preview')

      expect(original.getStatus().getStatus()).toBe('pending')
      expect(original.getProgress()).toBe(0)
      expect(original.getError()).toBeUndefined()
      expect(original.getPreviewUrl()).toBeUndefined()

      expect(withStatus).not.toBe(original)
      expect(withProgress).not.toBe(original)
      expect(withError).not.toBe(original)
      expect(withPreview).not.toBe(original)
    })
  })
})