import { describe, it, expect } from 'vitest'
import { validateMimeType } from './validateMimeType'

describe('validateMimeType', () => {
  it('should return true for any file when acceptedTypes includes */*', () => {
    const files = [
      new File(['content'], 'test.txt', { type: 'text/plain' }),
      new File(['content'], 'test.jpg', { type: 'image/jpeg' }),
      new File(['content'], 'test.mp4', { type: 'video/mp4' }),
      new File(['content'], 'test.unknown', { type: 'application/unknown' })
    ]

    files.forEach(file => {
      expect(validateMimeType(file, ['*/*'])).toBe(true)
      expect(validateMimeType(file, ['text/plain', '*/*'])).toBe(true)
    })
  })

  it('should return true for exact MIME type matches', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' })
    const acceptedTypes = ['text/plain', 'image/jpeg', 'application/pdf']

    expect(validateMimeType(file, acceptedTypes)).toBe(true)
  })

  it('should return false for non-matching MIME types', () => {
    const file = new File(['content'], 'test.mp4', { type: 'video/mp4' })
    const acceptedTypes = ['text/plain', 'image/jpeg', 'application/pdf']

    expect(validateMimeType(file, acceptedTypes)).toBe(false)
  })

  it('should handle wildcard MIME types correctly', () => {
    const imageFile = new File(['image'], 'test.jpg', { type: 'image/jpeg' })
    const videoFile = new File(['video'], 'test.mp4', { type: 'video/mp4' })
    const textFile = new File(['text'], 'test.txt', { type: 'text/plain' })

    const acceptedTypes = ['image/*', 'video/*']

    expect(validateMimeType(imageFile, acceptedTypes)).toBe(true)
    expect(validateMimeType(videoFile, acceptedTypes)).toBe(true)
    expect(validateMimeType(textFile, acceptedTypes)).toBe(false)
  })

  it('should handle mixed exact and wildcard types', () => {
    const files = [
      { file: new File(['image'], 'test.jpg', { type: 'image/jpeg' }), expected: true },
      { file: new File(['image'], 'test.png', { type: 'image/png' }), expected: true },
      { file: new File(['pdf'], 'test.pdf', { type: 'application/pdf' }), expected: true },
      { file: new File(['video'], 'test.mp4', { type: 'video/mp4' }), expected: false },
      { file: new File(['text'], 'test.txt', { type: 'text/plain' }), expected: false }
    ]

    const acceptedTypes = ['image/*', 'application/pdf']

    files.forEach(({ file, expected }) => {
      expect(validateMimeType(file, acceptedTypes)).toBe(expected)
    })
  })

  it('should handle empty acceptedTypes array', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' })

    expect(validateMimeType(file, [])).toBe(false)
  })

  it('should handle files with empty MIME type', () => {
    const file = new File(['content'], 'unknown', { type: '' })

    expect(validateMimeType(file, ['text/plain'])).toBe(false)
    expect(validateMimeType(file, ['*/*'])).toBe(true)
    expect(validateMimeType(file, [''])).toBe(true)
  })

  it('should handle case sensitivity correctly', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' })

    expect(validateMimeType(file, ['TEXT/PLAIN'])).toBe(false)
    expect(validateMimeType(file, ['text/plain'])).toBe(true)
  })

  it('should handle complex MIME types', () => {
    const files = [
      {
        file: new File(['content'], 'test.docx', {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }),
        acceptedTypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        expected: true
      },
      {
        file: new File(['content'], 'test.json', { type: 'application/json' }),
        acceptedTypes: ['application/*'],
        expected: true
      },
      {
        file: new File(['content'], 'test.svg', { type: 'image/svg+xml' }),
        acceptedTypes: ['image/*'],
        expected: true
      }
    ]

    files.forEach(({ file, acceptedTypes, expected }) => {
      expect(validateMimeType(file, acceptedTypes)).toBe(expected)
    })
  })

  it('should handle wildcard at different positions', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' })

    // Only trailing /* should work as wildcard
    expect(validateMimeType(file, ['text/*'])).toBe(true)
    expect(validateMimeType(file, ['*/plain'])).toBe(false) // This is treated as exact match
    expect(validateMimeType(file, ['*'])).toBe(false) // This is treated as exact match
  })

  it('should handle multiple wildcard types', () => {
    const acceptedTypes = ['image/*', 'video/*', 'audio/*']

    const testCases = [
      { file: new File([''], 'test.jpg', { type: 'image/jpeg' }), expected: true },
      { file: new File([''], 'test.mp4', { type: 'video/mp4' }), expected: true },
      { file: new File([''], 'test.mp3', { type: 'audio/mpeg' }), expected: true },
      { file: new File([''], 'test.txt', { type: 'text/plain' }), expected: false },
      { file: new File([''], 'test.pdf', { type: 'application/pdf' }), expected: false }
    ]

    testCases.forEach(({ file, expected }) => {
      expect(validateMimeType(file, acceptedTypes)).toBe(expected)
    })
  })

  it('should prioritize exact matches over wildcard matches', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' })

    // Both should return true, but for different reasons
    expect(validateMimeType(file, ['text/plain', 'text/*'])).toBe(true)
    expect(validateMimeType(file, ['text/*', 'text/plain'])).toBe(true)
  })

  it('should handle edge case MIME types', () => {
    const testCases = [
      {
        file: new File([''], 'test', { type: 'application/octet-stream' }),
        acceptedTypes: ['application/*'],
        expected: true
      },
      {
        file: new File([''], 'test', { type: 'text/html; charset=utf-8' }),
        acceptedTypes: ['text/html; charset=utf-8'],
        expected: true
      },
      {
        file: new File([''], 'test', { type: 'text/html; charset=utf-8' }),
        acceptedTypes: ['text/*'],
        expected: true
      }
    ]

    testCases.forEach(({ file, acceptedTypes, expected }) => {
      expect(validateMimeType(file, acceptedTypes)).toBe(expected)
    })
  })
})