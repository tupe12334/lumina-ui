import { describe, it, expect, vi } from 'vitest'
import { formatFileSize } from './formatFileSize'
import { filesize } from 'filesize'

vi.mock('filesize', () => ({
  filesize: vi.fn((bytes, options) => {
    if (bytes === 0) return '0 B'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
    if (bytes < 1024 * 1024 * 1024) return `${Math.round(bytes / (1024 * 1024))} MB`
    return `${Math.round(bytes / (1024 * 1024 * 1024))} GB`
  })
}))

const mockedFilesize = vi.mocked(filesize)

describe('formatFileSize', () => {
  it('should format bytes correctly', () => {
    expect(formatFileSize(0)).toBe('0 B')
    expect(formatFileSize(100)).toBe('100 B')
    expect(formatFileSize(500)).toBe('500 B')
    expect(formatFileSize(1023)).toBe('1023 B')
  })

  it('should format kilobytes correctly', () => {
    expect(formatFileSize(1024)).toBe('1 KB')
    expect(formatFileSize(1536)).toBe('2 KB') // 1.5 KB rounded
    expect(formatFileSize(5120)).toBe('5 KB')
    expect(formatFileSize(1024 * 1023)).toBe('1023 KB')
  })

  it('should format megabytes correctly', () => {
    expect(formatFileSize(1024 * 1024)).toBe('1 MB')
    expect(formatFileSize(1024 * 1024 * 2.5)).toBe('3 MB') // 2.5 MB rounded
    expect(formatFileSize(1024 * 1024 * 10)).toBe('10 MB')
    expect(formatFileSize(1024 * 1024 * 512)).toBe('512 MB')
  })

  it('should format gigabytes correctly', () => {
    expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB')
    expect(formatFileSize(1024 * 1024 * 1024 * 2.3)).toBe('2 GB') // 2.3 GB rounded
    expect(formatFileSize(1024 * 1024 * 1024 * 5)).toBe('5 GB')
  })

  it('should use jedec standard for formatting', () => {

    formatFileSize(1024)

    expect(mockedFilesize).toHaveBeenCalledWith(1024, { standard: 'jedec' })
  })

  it('should handle edge cases', () => {
    expect(formatFileSize(1)).toBe('1 B')
    expect(formatFileSize(1025)).toBe('1 KB')
    expect(formatFileSize(1048576)).toBe('1 MB') // 1024^2
    expect(formatFileSize(1073741824)).toBe('1 GB') // 1024^3
  })

  it('should handle various file sizes', () => {
    const testCases = [
      { bytes: 512, expectedContains: 'B' },
      { bytes: 2048, expectedContains: 'KB' },
      { bytes: 5242880, expectedContains: 'MB' }, // 5 MB
      { bytes: 2147483648, expectedContains: 'GB' } // 2 GB
    ]

    testCases.forEach(({ bytes, expectedContains }) => {
      const result = formatFileSize(bytes)
      expect(result).toContain(expectedContains)
      expect(typeof result).toBe('string')
    })
  })

  it('should call filesize library with correct parameters', () => {

    const testBytes = 1048576
    formatFileSize(testBytes)

    expect(mockedFilesize).toHaveBeenCalledWith(testBytes, { standard: 'jedec' })
  })

  it('should return string for all inputs', () => {
    const testValues = [0, 1, 100, 1024, 1048576, 1073741824]

    testValues.forEach(bytes => {
      const result = formatFileSize(bytes)
      expect(typeof result).toBe('string')
      expect(result.length).toBeGreaterThan(0)
    })
  })
})