import { describe, it, expect } from 'vitest'
import { FileDropZoneError } from './FileDropZoneBaseError'

describe('FileDropZoneError', () => {
  it('should create error with message and code', () => {
    const message = 'Test error message'
    const code = 'TEST_ERROR'
    const error = new FileDropZoneError(message, code)

    expect(error.message).toBe(message)
    expect(error.code).toBe(code)
    expect(error.name).toBe('FileDropZoneError')
    expect(error.fileId).toBeUndefined()
  })

  it('should create error with message, code, and file ID', () => {
    const message = 'File specific error'
    const code = 'FILE_ERROR'
    const fileId = 'file-123'
    const error = new FileDropZoneError(message, code, fileId)

    expect(error.message).toBe(message)
    expect(error.code).toBe(code)
    expect(error.fileId).toBe(fileId)
    expect(error.name).toBe('FileDropZoneError')
  })

  it('should be instance of Error', () => {
    const error = new FileDropZoneError('Test', 'CODE')

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(FileDropZoneError)
  })

  it('should maintain error stack trace', () => {
    const error = new FileDropZoneError('Test message', 'TEST_CODE')

    expect(error.stack).toBeDefined()
    expect(typeof error.stack).toBe('string')
  })

  it('should handle different code types', () => {
    const testCases = [
      { code: 'UPLOAD_FAILED', expected: 'UPLOAD_FAILED' },
      { code: 'INVALID_FILE_TYPE', expected: 'INVALID_FILE_TYPE' },
      { code: 'FILE_TOO_LARGE', expected: 'FILE_TOO_LARGE' },
      { code: '', expected: '' },
    ]

    testCases.forEach(({ code, expected }) => {
      const error = new FileDropZoneError('Test message', code)
      expect(error.code).toBe(expected)
    })
  })

  it('should handle different file ID types', () => {
    const testCases = [
      { fileId: 'simple-id', expected: 'simple-id' },
      { fileId: 'uuid-abc-123-def', expected: 'uuid-abc-123-def' },
      { fileId: '', expected: '' },
      { fileId: undefined, expected: undefined },
    ]

    testCases.forEach(({ fileId, expected }) => {
      const error = new FileDropZoneError('Test message', 'CODE', fileId)
      expect(error.fileId).toBe(expected)
    })
  })
})