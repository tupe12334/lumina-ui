import { describe, it, expect, vi } from 'vitest'
import { copyToClipboard } from './copyToClipboard'
import copy from 'copy-to-clipboard'

vi.mock('copy-to-clipboard', () => ({
  default: vi.fn()
}))

const mockedCopy = vi.mocked(copy)

describe('copyToClipboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should resolve when copy succeeds', async () => {
    mockedCopy.mockReturnValue(true)

    await expect(copyToClipboard('test text')).resolves.toBeUndefined()
    expect(mockedCopy).toHaveBeenCalledWith('test text')
  })

  it('should reject when copy fails', async () => {
    mockedCopy.mockReturnValue(false)

    await expect(copyToClipboard('test text')).rejects.toThrow('Failed to copy to clipboard')
    expect(mockedCopy).toHaveBeenCalledWith('test text')
  })

  it('should handle empty string', async () => {
    mockedCopy.mockReturnValue(true)

    await expect(copyToClipboard('')).resolves.toBeUndefined()
    expect(mockedCopy).toHaveBeenCalledWith('')
  })

  it('should handle multiline text', async () => {
    mockedCopy.mockReturnValue(true)

    const multilineText = 'Line 1\nLine 2\nLine 3'
    await expect(copyToClipboard(multilineText)).resolves.toBeUndefined()
    expect(mockedCopy).toHaveBeenCalledWith(multilineText)
  })

  it('should handle special characters', async () => {
    mockedCopy.mockReturnValue(true)

    const specialText = 'Special chars: !@#$%^&*()_+-={}[]|\\:";\'<>?,./'
    await expect(copyToClipboard(specialText)).resolves.toBeUndefined()
    expect(mockedCopy).toHaveBeenCalledWith(specialText)
  })

  it('should handle unicode characters', async () => {
    mockedCopy.mockReturnValue(true)

    const unicodeText = '🚀 Unicode test: αβγδε 中文 العربية'
    await expect(copyToClipboard(unicodeText)).resolves.toBeUndefined()
    expect(mockedCopy).toHaveBeenCalledWith(unicodeText)
  })

  it('should return a Promise', () => {
    mockedCopy.mockReturnValue(true)

    const result = copyToClipboard('test')
    expect(result).toBeInstanceOf(Promise)
  })

  it('should handle very long text', async () => {
    mockedCopy.mockReturnValue(true)

    const longText = 'x'.repeat(10000)
    await expect(copyToClipboard(longText)).resolves.toBeUndefined()
    expect(mockedCopy).toHaveBeenCalledWith(longText)
  })

  it('should propagate copy library behavior', async () => {
    // Test success case
    mockedCopy.mockReturnValue(true)
    await expect(copyToClipboard('success')).resolves.toBeUndefined()

    // Test failure case
    mockedCopy.mockReturnValue(false)
    await expect(copyToClipboard('failure')).rejects.toThrow()

    expect(mockedCopy).toHaveBeenCalledTimes(2)
  })

  it('should create proper error message on failure', async () => {
    mockedCopy.mockReturnValue(false)

    try {
      await copyToClipboard('test')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      if (error instanceof Error) {
        expect(error.message).toBe('Failed to copy to clipboard')
      }
    }
  })
})