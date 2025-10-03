import { describe, it, expect } from 'vitest'
import { FileTypeError } from './FileTypeError'
import { FileValidationError } from './FileValidationError'

describe('FileTypeError', () => {
  it('should create error with formatted message listing allowed types', () => {
    const actualType = 'exe'
    const allowedTypes = ['jpg', 'png', 'pdf']
    const error = new FileTypeError(actualType, allowedTypes)

    expect(error.message).toBe('File type "exe" is not allowed. Allowed types: jpg, png, pdf')
    expect(error.name).toBe('FileTypeError')
    expect(error.code).toBe('VALIDATION_ERROR')
    expect(error.fileId).toBeUndefined()
  })

  it('should create error with file ID when provided', () => {
    const actualType = 'txt'
    const allowedTypes = ['doc', 'docx']
    const fileId = 'file-456'
    const error = new FileTypeError(actualType, allowedTypes, fileId)

    expect(error.message).toBe('File type "txt" is not allowed. Allowed types: doc, docx')
    expect(error.fileId).toBe(fileId)
    expect(error.name).toBe('FileTypeError')
  })

  it('should be instance of FileValidationError and Error', () => {
    const error = new FileTypeError('mp3', ['wav', 'flac'])

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(FileValidationError)
    expect(error).toBeInstanceOf(FileTypeError)
  })

  it('should maintain error stack trace', () => {
    const error = new FileTypeError('gif', ['jpg', 'png'])

    expect(error.stack).toBeDefined()
    expect(typeof error.stack).toBe('string')
  })

  it('should handle single allowed type', () => {
    const error = new FileTypeError('txt', ['pdf'])

    expect(error.message).toBe('File type "txt" is not allowed. Allowed types: pdf')
  })

  it('should handle multiple allowed types', () => {
    const allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
    const error = new FileTypeError('bmp', allowedTypes)

    expect(error.message).toBe('File type "bmp" is not allowed. Allowed types: jpg, jpeg, png, gif, webp, svg')
  })

  it('should handle empty allowed types array', () => {
    const error = new FileTypeError('any', [])

    expect(error.message).toBe('File type "any" is not allowed. Allowed types: ')
  })

  it('should handle various file type formats', () => {
    const testCases = [
      {
        actual: 'PDF',
        allowed: ['pdf'],
        expected: 'File type "PDF" is not allowed. Allowed types: pdf'
      },
      {
        actual: '.jpg',
        allowed: ['jpg', 'png'],
        expected: 'File type ".jpg" is not allowed. Allowed types: jpg, png'
      },
      {
        actual: 'application/json',
        allowed: ['json'],
        expected: 'File type "application/json" is not allowed. Allowed types: json'
      }
    ]

    testCases.forEach(({ actual, allowed, expected }) => {
      const error = new FileTypeError(actual, allowed)
      expect(error.message).toBe(expected)
    })
  })
})