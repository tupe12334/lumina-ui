import { describe, it, expect } from 'vitest'
import { FileCountError } from './FileCountError'
import { FileValidationError } from './FileValidationError'

describe('FileCountError', () => {
  it('should create error with correct message format', () => {
    const actualCount = 5
    const maxCount = 3
    const error = new FileCountError(actualCount, maxCount)

    expect(error.message).toBe('Cannot upload 5 files. Maximum allowed: 3')
    expect(error.name).toBe('FileCountError')
  })

  it('should be instance of FileValidationError and Error', () => {
    const error = new FileCountError(2, 1)

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(FileValidationError)
    expect(error).toBeInstanceOf(FileCountError)
  })

  it('should maintain error stack trace', () => {
    const error = new FileCountError(10, 5)

    expect(error.stack).toBeDefined()
    expect(typeof error.stack).toBe('string')
  })

  it('should handle different count values correctly', () => {
    const testCases = [
      { actual: 1, max: 0, expected: 'Cannot upload 1 files. Maximum allowed: 0' },
      { actual: 100, max: 50, expected: 'Cannot upload 100 files. Maximum allowed: 50' },
      { actual: 2, max: 1, expected: 'Cannot upload 2 files. Maximum allowed: 1' },
    ]

    testCases.forEach(({ actual, max, expected }) => {
      const error = new FileCountError(actual, max)
      expect(error.message).toBe(expected)
      expect(error.name).toBe('FileCountError')
    })
  })

  it('should work with edge cases', () => {
    const error1 = new FileCountError(0, 0)
    expect(error1.message).toBe('Cannot upload 0 files. Maximum allowed: 0')

    const error2 = new FileCountError(1000000, 1)
    expect(error2.message).toBe('Cannot upload 1000000 files. Maximum allowed: 1')
  })
})