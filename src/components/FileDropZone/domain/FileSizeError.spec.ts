import { describe, it, expect } from 'vitest'
import { FileSizeError } from './FileSizeError'
import { FileValidationError } from './FileValidationError'

describe('FileSizeError', () => {
  it('should create error with formatted message using MB units', () => {
    const actualSize = 10 * 1024 * 1024 // 10MB in bytes
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    const error = new FileSizeError(actualSize, maxSize)

    expect(error.message).toBe('File size 10MB exceeds maximum allowed size of 5MB')
    expect(error.name).toBe('FileSizeError')
    expect(error.code).toBe('VALIDATION_ERROR')
    expect(error.fileId).toBeUndefined()
  })

  it('should create error with file ID when provided', () => {
    const actualSize = 2 * 1024 * 1024 // 2MB
    const maxSize = 1 * 1024 * 1024 // 1MB
    const fileId = 'file-789'
    const error = new FileSizeError(actualSize, maxSize, fileId)

    expect(error.message).toBe('File size 2MB exceeds maximum allowed size of 1MB')
    expect(error.fileId).toBe(fileId)
    expect(error.name).toBe('FileSizeError')
  })

  it('should be instance of FileValidationError and Error', () => {
    const error = new FileSizeError(1024 * 1024, 512 * 1024)

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(FileValidationError)
    expect(error).toBeInstanceOf(FileSizeError)
  })

  it('should maintain error stack trace', () => {
    const error = new FileSizeError(1024 * 1024, 512 * 1024)

    expect(error.stack).toBeDefined()
    expect(typeof error.stack).toBe('string')
  })

  it('should round file sizes to nearest MB', () => {
    const testCases = [
      {
        actual: 1.3 * 1024 * 1024, // 1.3MB
        max: 0.7 * 1024 * 1024, // 0.7MB
        expected: 'File size 1MB exceeds maximum allowed size of 1MB'
      },
      {
        actual: 15.8 * 1024 * 1024, // 15.8MB
        max: 10.2 * 1024 * 1024, // 10.2MB
        expected: 'File size 16MB exceeds maximum allowed size of 10MB'
      },
      {
        actual: 0.4 * 1024 * 1024, // 0.4MB
        max: 0.3 * 1024 * 1024, // 0.3MB
        expected: 'File size 0MB exceeds maximum allowed size of 0MB'
      }
    ]

    testCases.forEach(({ actual, max, expected }) => {
      const error = new FileSizeError(actual, max)
      expect(error.message).toBe(expected)
    })
  })

  it('should handle edge cases with very small and large sizes', () => {
    const smallError = new FileSizeError(1, 0)
    expect(smallError.message).toBe('File size 0MB exceeds maximum allowed size of 0MB')

    const largeError = new FileSizeError(1000 * 1024 * 1024, 500 * 1024 * 1024)
    expect(largeError.message).toBe('File size 1000MB exceeds maximum allowed size of 500MB')
  })
})