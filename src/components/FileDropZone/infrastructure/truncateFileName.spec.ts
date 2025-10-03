import { describe, it, expect } from 'vitest'
import { truncateFileName } from './truncateFileName'
import { getFileExtension } from './getFileExtension'

describe('truncateFileName', () => {
  it('should return original filename if shorter than max length', () => {
    const shortName = 'short.txt'
    expect(truncateFileName(shortName)).toBe('short.txt')
    expect(truncateFileName(shortName, 20)).toBe('short.txt')
  })

  it('should use default max length of 30 characters', () => {
    const longName = 'this-is-a-very-long-filename-that-exceeds-default-limit.txt'
    const result = truncateFileName(longName)

    expect(result.length).toBe(30)
    expect(result).toMatch(/\.\.\.\.txt$/)
  })

  it('should truncate long filenames with extension preserved', () => {
    const longName = 'very-long-filename-that-needs-truncation.pdf'
    const result = truncateFileName(longName, 20)

    expect(result.length).toBe(20)
    expect(result.endsWith('....pdf')).toBe(true)
    expect(result.includes('...')).toBe(true)
  })

  it('should handle custom max length', () => {
    const fileName = 'document-with-medium-length-name.docx'
    const result = truncateFileName(fileName, 15)

    expect(result.length).toBe(15)
    expect(result.endsWith('....docx')).toBe(true)
  })

  it('should handle files without extensions', () => {
    const fileName = 'very-long-filename-without-extension-at-all'
    const result = truncateFileName(fileName, 20)

    expect(result.length).toBe(20)
    expect(result.endsWith('...')).toBe(true)
    expect(result.startsWith('very-long-filename')).toBe(true)
  })

  it('should handle files with multiple dots', () => {
    const fileName = 'file.name.with.multiple.dots.tar.gz'
    const result = truncateFileName(fileName, 25)

    expect(result.length).toBe(25)
    expect(result.endsWith('....gz')).toBe(true)
    expect(result.includes('...')).toBe(true)
  })

  it('should handle edge case where filename equals max length', () => {
    const fileName = 'exactly-twenty-chars.txt' // exactly 24 chars
    const result = truncateFileName(fileName, 24)

    expect(result).toBe(fileName)
  })

  it('should handle very short max lengths', () => {
    const fileName = 'document.pdf'
    const result = truncateFileName(fileName, 8)

    expect(result.length).toBe(8)
    expect(result.endsWith('....pdf')).toBe(true)
  })

  it('should handle empty filename', () => {
    const result = truncateFileName('')
    expect(result).toBe('')
  })

  it('should handle filename with only extension', () => {
    const fileName = '.gitignore'
    const result = truncateFileName(fileName, 20)

    expect(result).toBe('.gitignore')
  })

  it('should handle filename that is just dots', () => {
    const fileName = '...'
    const result = truncateFileName(fileName, 20)

    expect(result).toBe('...')
  })

  it('should calculate truncation correctly', () => {
    const fileName = 'very-long-document-name.pdf'
    const maxLength = 15
    const result = truncateFileName(fileName, maxLength)

    // Should be 15 chars total with "..." and ".pdf"
    expect(result.length).toBe(maxLength)
    expect(result.endsWith('....pdf')).toBe(true)
    expect(result.includes('...')).toBe(true)
  })

  it('should handle various file extensions', () => {
    const testCases = [
      { name: 'very-long-filename-example.jpg', maxLen: 20 },
      { name: 'another-long-document-name.docx', maxLen: 18 },
      { name: 'presentation-file-name.pptx', maxLen: 16 }
    ]

    testCases.forEach(({ name, maxLen }) => {
      const result = truncateFileName(name, maxLen)
      expect(result.length).toBe(maxLen)
      expect(result.includes('...')).toBe(true)
      expect(result.endsWith(getFileExtension(name))).toBe(true)
    })
  })

  it('should handle Unicode characters', () => {
    const fileName = 'документ-с-очень-длинным-именем.pdf'
    const result = truncateFileName(fileName, 20)

    expect(result.length).toBe(20)
    expect(result.endsWith('....pdf')).toBe(true)
  })

  it('should handle files with spaces', () => {
    const fileName = 'my very long document name with spaces.txt'
    const result = truncateFileName(fileName, 25)

    expect(result.length).toBe(25)
    expect(result.endsWith('....txt')).toBe(true)
    expect(result.includes('my very long')).toBe(true)
  })
})