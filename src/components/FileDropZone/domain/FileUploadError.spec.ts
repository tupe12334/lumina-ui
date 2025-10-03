import { describe, it, expect } from 'vitest'
import { FileUploadError } from './FileUploadError'
import { FileDropZoneError } from './FileDropZoneBaseError'

describe('FileUploadError', () => {
  it('should create error with message only', () => {
    const message = 'Upload failed'
    const error = new FileUploadError(message)

    expect(error.message).toBe(message)
    expect(error.code).toBe('UPLOAD_ERROR')
    expect(error.name).toBe('FileUploadError')
    expect(error.fileId).toBeUndefined()
  })

  it('should create error with message and file ID', () => {
    const message = 'File upload failed'
    const fileId = 'file-123'
    const error = new FileUploadError(message, fileId)

    expect(error.message).toBe(message)
    expect(error.code).toBe('UPLOAD_ERROR')
    expect(error.fileId).toBe(fileId)
    expect(error.name).toBe('FileUploadError')
  })

  it('should be instance of FileDropZoneError and Error', () => {
    const error = new FileUploadError('Test')

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(FileDropZoneError)
    expect(error).toBeInstanceOf(FileUploadError)
  })

  it('should maintain error stack trace', () => {
    const error = new FileUploadError('Test message')

    expect(error.stack).toBeDefined()
    expect(typeof error.stack).toBe('string')
  })

  it('should always use UPLOAD_ERROR code', () => {
    const error1 = new FileUploadError('Message 1')
    const error2 = new FileUploadError('Message 2', 'file-456')

    expect(error1.code).toBe('UPLOAD_ERROR')
    expect(error2.code).toBe('UPLOAD_ERROR')
  })
})