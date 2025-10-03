import { describe, it, expect, beforeEach } from 'vitest'
import { FileUploadDataConverter } from './FileUploadDataConverter'
import { FileStatusValue } from './FileStatus'

describe('FileUploadDataConverter', () => {
  let mockFile: File

  beforeEach(() => {
    mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' })
  })

  describe('toData', () => {
    it('should convert all parameters to FileUploadData object', () => {
      const id = 'test-id'
      const status = FileStatusValue.create('uploading')
      const progress = 75
      const error = 'Upload error'
      const previewUrl = 'http://example.com/preview.jpg'

      const result = FileUploadDataConverter.toData(id, mockFile, status, progress, error, previewUrl)

      expect(result.id).toBe(id)
      expect(result.file).toBe(mockFile)
      expect(result.status).toBe('uploading')
      expect(result.progress).toBe(progress)
      expect(result.error).toBe(error)
      expect(result.previewUrl).toBe(previewUrl)
    })

    it('should handle undefined error and previewUrl', () => {
      const id = 'test-id'
      const status = FileStatusValue.create('pending')
      const progress = 0

      const result = FileUploadDataConverter.toData(id, mockFile, status, progress, undefined, undefined)

      expect(result.id).toBe(id)
      expect(result.file).toBe(mockFile)
      expect(result.status).toBe('pending')
      expect(result.progress).toBe(progress)
      expect(result.error).toBeUndefined()
      expect(result.previewUrl).toBeUndefined()
    })

    it('should convert status value object to string', () => {
      const testCases = [
        { statusValue: FileStatusValue.create('pending'), expected: 'pending' },
        { statusValue: FileStatusValue.create('uploading'), expected: 'uploading' },
        { statusValue: FileStatusValue.create('completed'), expected: 'completed' },
        { statusValue: FileStatusValue.create('failed'), expected: 'failed' },
        { statusValue: FileStatusValue.create('error'), expected: 'error' }
      ]

      testCases.forEach(({ statusValue, expected }) => {
        const result = FileUploadDataConverter.toData('id', mockFile, statusValue, 0, undefined, undefined)
        expect(result.status).toBe(expected)
      })
    })

    it('should preserve file reference exactly', () => {
      const status = FileStatusValue.create('completed')
      const result = FileUploadDataConverter.toData('id', mockFile, status, 100, undefined, undefined)

      expect(result.file).toBe(mockFile)
      expect(result.file.name).toBe('test.txt')
      expect(result.file.type).toBe('text/plain')
    })

    it('should handle different progress values', () => {
      const status = FileStatusValue.create('uploading')
      const progressValues = [0, 25, 50, 75, 100]

      progressValues.forEach(progress => {
        const result = FileUploadDataConverter.toData('id', mockFile, status, progress, undefined, undefined)
        expect(result.progress).toBe(progress)
      })
    })

    it('should handle empty strings for error and previewUrl', () => {
      const status = FileStatusValue.create('failed')
      const result = FileUploadDataConverter.toData('id', mockFile, status, 0, '', '')

      expect(result.error).toBe('')
      expect(result.previewUrl).toBe('')
    })

    it('should create data object with all required properties', () => {
      const status = FileStatusValue.create('pending')
      const result = FileUploadDataConverter.toData('test', mockFile, status, 0, undefined, undefined)

      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('file')
      expect(result).toHaveProperty('status')
      expect(result).toHaveProperty('progress')
      expect(result).toHaveProperty('error')
      expect(result).toHaveProperty('previewUrl')
    })
  })
})