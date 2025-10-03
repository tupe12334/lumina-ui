import { describe, it, expect, beforeEach } from 'vitest'
import { FileValidationRules } from './FileValidation'

describe('FileValidationRules', () => {
  let mockFile: File

  beforeEach(() => {
    mockFile = new File(['content'], 'test.txt', { type: 'text/plain' })
  })

  describe('create', () => {
    it('should create with default config when no config provided', () => {
      const rules = FileValidationRules.create()
      const config = rules.getConfig()

      expect(config.maxFileSize).toBe(10 * 1024 * 1024) // 10MB
      expect(config.maxFiles).toBe(5)
      expect(config.acceptedTypes).toEqual(['*/*'])
      expect(config.allowMultiple).toBe(true)
    })

    it('should merge provided config with defaults', () => {
      const rules = FileValidationRules.create({
        maxFileSize: 5 * 1024 * 1024,
        acceptedTypes: ['image/*', 'application/pdf']
      })
      const config = rules.getConfig()

      expect(config.maxFileSize).toBe(5 * 1024 * 1024)
      expect(config.maxFiles).toBe(5) // default
      expect(config.acceptedTypes).toEqual(['image/*', 'application/pdf'])
      expect(config.allowMultiple).toBe(true) // default
    })
  })

  describe('validateFile', () => {
    it('should return null for valid file', () => {
      const rules = FileValidationRules.create()
      const result = rules.validateFile(mockFile)

      expect(result).toBeNull()
    })

    it('should return error for file exceeding size limit', () => {
      const rules = FileValidationRules.create({ maxFileSize: 1024 }) // 1KB
      const largeFile = new File(['x'.repeat(2000)], 'large.txt', { type: 'text/plain' })

      const result = rules.validateFile(largeFile)

      expect(result).toBe('File size must be less than 0MB')
    })

    it('should validate file types when specific types are set', () => {
      const rules = FileValidationRules.create({
        acceptedTypes: ['image/jpeg', 'image/png']
      })
      const textFile = new File(['text'], 'file.txt', { type: 'text/plain' })

      const result = rules.validateFile(textFile)

      expect(result).toBe('File type "text/plain" is not allowed')
    })

    it('should accept any file type when acceptedTypes includes */*', () => {
      const rules = FileValidationRules.create({
        acceptedTypes: ['*/*']
      })
      const anyFile = new File(['content'], 'file.xyz', { type: 'application/unknown' })

      const result = rules.validateFile(anyFile)

      expect(result).toBeNull()
    })

    it('should validate wildcard MIME types', () => {
      const rules = FileValidationRules.create({
        acceptedTypes: ['image/*']
      })
      const imageFile = new File(['image'], 'photo.jpg', { type: 'image/jpeg' })
      const textFile = new File(['text'], 'doc.txt', { type: 'text/plain' })

      expect(rules.validateFile(imageFile)).toBeNull()
      expect(rules.validateFile(textFile)).toBe('File type "text/plain" is not allowed')
    })
  })

  describe('validateFileList', () => {
    it('should return null for valid file list', () => {
      const rules = FileValidationRules.create()
      const files = [mockFile]

      const result = rules.validateFileList(files)

      expect(result).toBeNull()
    })

    it('should return error when multiple files not allowed', () => {
      const rules = FileValidationRules.create({ allowMultiple: false })
      const files = [mockFile, mockFile]

      const result = rules.validateFileList(files)

      expect(result).toBe('Only one file is allowed')
    })

    it('should return error when exceeding max files limit', () => {
      const rules = FileValidationRules.create({ maxFiles: 2 })
      const files = [mockFile, mockFile, mockFile]

      const result = rules.validateFileList(files)

      expect(result).toBe('Cannot upload more than 2 files total')
    })

    it('should consider current file count', () => {
      const rules = FileValidationRules.create({ maxFiles: 3 })
      const files = [mockFile, mockFile]
      const currentCount = 2

      const result = rules.validateFileList(files, currentCount)

      expect(result).toBe('Cannot upload more than 3 files total')
    })
  })

  describe('getAcceptAttribute', () => {
    it('should return */* when accepting all types', () => {
      const rules = FileValidationRules.create({ acceptedTypes: ['*/*'] })

      expect(rules.getAcceptAttribute()).toBe('*/*')
    })

    it('should return comma-separated types when specific types set', () => {
      const rules = FileValidationRules.create({
        acceptedTypes: ['image/jpeg', 'image/png', 'application/pdf']
      })

      expect(rules.getAcceptAttribute()).toBe('image/jpeg,image/png,application/pdf')
    })
  })

  describe('getMaxFileSizeMB', () => {
    it('should return size in MB', () => {
      const rules = FileValidationRules.create({ maxFileSize: 5 * 1024 * 1024 })

      expect(rules.getMaxFileSizeMB()).toBe(5)
    })
  })

  describe('formatFileSize', () => {
    it('should format bytes correctly', () => {
      const rules = FileValidationRules.create()

      expect(rules.formatFileSize(0)).toBe('0 Bytes')
      expect(rules.formatFileSize(1024)).toBe('1 KB')
      expect(rules.formatFileSize(1024 * 1024)).toBe('1 MB')
      expect(rules.formatFileSize(1024 * 1024 * 1024)).toBe('1 GB')
    })

    it('should handle decimal values', () => {
      const rules = FileValidationRules.create()

      expect(rules.formatFileSize(1536)).toBe('1.5 KB') // 1.5KB
      expect(rules.formatFileSize(2.5 * 1024 * 1024)).toBe('2.5 MB')
    })

    it('should handle very large files', () => {
      const rules = FileValidationRules.create()
      const veryLargeSize = 1024 * 1024 * 1024 * 1024 * 1024 // 1PB

      expect(rules.formatFileSize(veryLargeSize)).toBe('File too large')
    })
  })
})