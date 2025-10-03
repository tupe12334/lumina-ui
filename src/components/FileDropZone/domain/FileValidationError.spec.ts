import { describe, it, expect } from 'vitest'
import { FileValidationError } from './FileValidationError'
import { FileDropZoneError } from './FileDropZoneBaseError'

describe('FileValidationError', () => {
  it('should create error with message only', () => {
    const message = 'Validation failed'
    const error = new FileValidationError(message)

    expect(error.message).toBe(message)
    expect(error.code).toBe('VALIDATION_ERROR')
    expect(error.name).toBe('FileValidationError')
    expect(error.fileId).toBeUndefined()
  })

  it('should create error with message and file ID', () => {
    const message = 'File validation failed'
    const fileId = 'file-456'
    const error = new FileValidationError(message, fileId)

    expect(error.message).toBe(message)
    expect(error.code).toBe('VALIDATION_ERROR')
    expect(error.fileId).toBe(fileId)
    expect(error.name).toBe('FileValidationError')
  })

  it('should be instance of FileDropZoneError and Error', () => {
    const error = new FileValidationError('Test')

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(FileDropZoneError)
    expect(error).toBeInstanceOf(FileValidationError)
  })

  it('should maintain error stack trace', () => {
    const error = new FileValidationError('Test message')

    expect(error.stack).toBeDefined()
    expect(typeof error.stack).toBe('string')
  })

  it('should always use VALIDATION_ERROR code', () => {
    const error1 = new FileValidationError('Message 1')
    const error2 = new FileValidationError('Message 2', 'file-123')

    expect(error1.code).toBe('VALIDATION_ERROR')
    expect(error2.code).toBe('VALIDATION_ERROR')
  })
})