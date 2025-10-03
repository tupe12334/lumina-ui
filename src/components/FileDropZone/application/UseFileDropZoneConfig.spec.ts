import { describe, it, expect, vi } from 'vitest'
import { type UseFileDropZoneConfig } from './UseFileDropZoneConfig'
import { FileUpload } from '../domain/FileUpload'

describe('UseFileDropZoneConfig', () => {
  describe('interface structure', () => {
    it('should accept valid config with all properties', () => {
      const mockFiles = [FileUpload.create(new File(['test'], 'test.txt'))]
      const config: UseFileDropZoneConfig = {
        maxFileSize: 5 * 1024 * 1024,
        maxFiles: 10,
        acceptedTypes: ['image/*', 'application/pdf'],
        allowMultiple: true,
        onFilesAdded: (files: FileUpload[]) => {
          expect(files).toBe(mockFiles)
        },
        onFileRemoved: (fileId: string) => {
          expect(typeof fileId).toBe('string')
        },
        onFileRetried: (fileId: string) => {
          expect(typeof fileId).toBe('string')
        },
        onError: (errors: string[]) => {
          expect(Array.isArray(errors)).toBe(true)
        },
        autoUpload: true
      }

      expect(config.maxFileSize).toBe(5 * 1024 * 1024)
      expect(config.maxFiles).toBe(10)
      expect(config.acceptedTypes).toEqual(['image/*', 'application/pdf'])
      expect(config.allowMultiple).toBe(true)
      expect(config.autoUpload).toBe(true)
      expect(typeof config.onFilesAdded).toBe('function')
      expect(typeof config.onFileRemoved).toBe('function')
      expect(typeof config.onFileRetried).toBe('function')
      expect(typeof config.onError).toBe('function')

      if (config.onFilesAdded) config.onFilesAdded(mockFiles)
      if (config.onFileRemoved) config.onFileRemoved('file-123')
      if (config.onFileRetried) config.onFileRetried('file-456')
      if (config.onError) config.onError(['Error 1', 'Error 2'])
    })

    it('should accept config with only FileValidationConfig properties', () => {
      const config: UseFileDropZoneConfig = {
        maxFileSize: 1024 * 1024,
        maxFiles: 5,
        acceptedTypes: ['text/plain'],
        allowMultiple: false
      }

      expect(config.maxFileSize).toBe(1024 * 1024)
      expect(config.maxFiles).toBe(5)
      expect(config.acceptedTypes).toEqual(['text/plain'])
      expect(config.allowMultiple).toBe(false)
      expect(config.onFilesAdded).toBeUndefined()
      expect(config.onFileRemoved).toBeUndefined()
      expect(config.onFileRetried).toBeUndefined()
      expect(config.onError).toBeUndefined()
      expect(config.autoUpload).toBeUndefined()
    })

    it('should accept config with only callback properties', () => {
      const onFilesAdded = vi.fn()
      const onFileRemoved = vi.fn()
      const onFileRetried = vi.fn()
      const onError = vi.fn()

      const config: UseFileDropZoneConfig = {
        onFilesAdded,
        onFileRemoved,
        onFileRetried,
        onError,
        autoUpload: false
      }

      expect(config.onFilesAdded).toBe(onFilesAdded)
      expect(config.onFileRemoved).toBe(onFileRemoved)
      expect(config.onFileRetried).toBe(onFileRetried)
      expect(config.onError).toBe(onError)
      expect(config.autoUpload).toBe(false)
    })

    it('should accept empty config object', () => {
      const config: UseFileDropZoneConfig = {}

      expect(config.maxFileSize).toBeUndefined()
      expect(config.maxFiles).toBeUndefined()
      expect(config.acceptedTypes).toBeUndefined()
      expect(config.allowMultiple).toBeUndefined()
      expect(config.onFilesAdded).toBeUndefined()
      expect(config.onFileRemoved).toBeUndefined()
      expect(config.onFileRetried).toBeUndefined()
      expect(config.onError).toBeUndefined()
      expect(config.autoUpload).toBeUndefined()
    })

    it('should accept partial FileValidationConfig properties', () => {
      const config: UseFileDropZoneConfig = {
        maxFileSize: 2 * 1024 * 1024,
        acceptedTypes: ['image/jpeg', 'image/png']
      }

      expect(config.maxFileSize).toBe(2 * 1024 * 1024)
      expect(config.acceptedTypes).toEqual(['image/jpeg', 'image/png'])
      expect(config.maxFiles).toBeUndefined()
      expect(config.allowMultiple).toBeUndefined()
    })

    it('should work with callback functions', () => {
      const files = [FileUpload.create(new File(['test'], 'test.txt'))]
      const errors = ['Error 1', 'Error 2']
      const fileId = 'file-123'

      const config: UseFileDropZoneConfig = {
        onFilesAdded: (addedFiles) => {
          expect(addedFiles).toEqual(files)
        },
        onFileRemoved: (removedFileId) => {
          expect(removedFileId).toBe(fileId)
        },
        onFileRetried: (retriedFileId) => {
          expect(retriedFileId).toBe(fileId)
        },
        onError: (errorMessages) => {
          expect(errorMessages).toEqual(errors)
        }
      }

      if (config.onFilesAdded) config.onFilesAdded(files)
      if (config.onFileRemoved) config.onFileRemoved(fileId)
      if (config.onFileRetried) config.onFileRetried(fileId)
      if (config.onError) config.onError(errors)
    })

    it('should accept different autoUpload values', () => {
      const configTrue: UseFileDropZoneConfig = { autoUpload: true }
      const configFalse: UseFileDropZoneConfig = { autoUpload: false }

      expect(configTrue.autoUpload).toBe(true)
      expect(configFalse.autoUpload).toBe(false)
    })

    it('should extend FileValidationConfig correctly', () => {
      const config: UseFileDropZoneConfig = {
        maxFileSize: 10 * 1024 * 1024,
        maxFiles: 3,
        acceptedTypes: ['*/*'],
        allowMultiple: true,
        onFilesAdded: vi.fn(),
        autoUpload: true
      }

      const fileValidationProps = {
        maxFileSize: config.maxFileSize,
        maxFiles: config.maxFiles,
        acceptedTypes: config.acceptedTypes,
        allowMultiple: config.allowMultiple
      }

      expect(fileValidationProps.maxFileSize).toBe(10 * 1024 * 1024)
      expect(fileValidationProps.maxFiles).toBe(3)
      expect(fileValidationProps.acceptedTypes).toEqual(['*/*'])
      expect(fileValidationProps.allowMultiple).toBe(true)
    })
  })
})