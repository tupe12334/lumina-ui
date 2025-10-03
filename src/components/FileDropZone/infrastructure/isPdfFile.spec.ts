import { describe, it, expect } from 'vitest'
import { isPdfFile } from './isPdfFile'

describe('isPdfFile', () => {
  it('should return true for PDF files', () => {
    const pdfFile = new File(['pdf content'], 'document.pdf', { type: 'application/pdf' })
    expect(isPdfFile(pdfFile)).toBe(true)
  })

  it('should return false for non-PDF files', () => {
    const nonPdfFiles = [
      new File(['text'], 'document.txt', { type: 'text/plain' }),
      new File(['image'], 'photo.jpg', { type: 'image/jpeg' }),
      new File(['video'], 'movie.mp4', { type: 'video/mp4' }),
      new File(['audio'], 'song.mp3', { type: 'audio/mpeg' }),
      new File(['html'], 'page.html', { type: 'text/html' }),
      new File(['json'], 'data.json', { type: 'application/json' }),
      new File(['word'], 'document.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
    ]

    nonPdfFiles.forEach(file => {
      expect(isPdfFile(file)).toBe(false)
    })
  })

  it('should return false for files with empty MIME type', () => {
    const file = new File(['content'], 'document.pdf', { type: '' })
    expect(isPdfFile(file)).toBe(false)
  })

  it('should return false for files with undefined MIME type', () => {
    const file = new File(['content'], 'document.pdf')
    expect(isPdfFile(file)).toBe(false)
  })

  it('should be case sensitive with MIME type', () => {
    const file = new File(['pdf'], 'document.pdf', { type: 'APPLICATION/PDF' })
    expect(isPdfFile(file)).toBe(false)
  })

  it('should not match partial MIME types', () => {
    const partialMimeTypes = [
      'application/pdfx',
      'application/pdf-extended',
      'pdf',
      'application/',
      'text/pdf',
      'application/x-pdf'
    ]

    partialMimeTypes.forEach(mimeType => {
      const file = new File(['content'], 'test.pdf', { type: mimeType })
      expect(isPdfFile(file)).toBe(false)
    })
  })

  it('should handle files with PDF extension but wrong MIME type', () => {
    const file = new File(['text content'], 'fake.pdf', { type: 'text/plain' })
    expect(isPdfFile(file)).toBe(false)
  })

  it('should handle files without PDF extension but correct MIME type', () => {
    const file = new File(['pdf content'], 'document.txt', { type: 'application/pdf' })
    expect(isPdfFile(file)).toBe(true)
  })

  it('should work with zero-size PDF files', () => {
    const file = new File([], 'empty.pdf', { type: 'application/pdf' })
    expect(isPdfFile(file)).toBe(true)
  })

  it('should work with large PDF files', () => {
    const file = new File(['x'.repeat(1000000)], 'large.pdf', { type: 'application/pdf' })
    expect(isPdfFile(file)).toBe(true)
  })

  it('should be exact match for MIME type', () => {
    const exactMatch = new File(['pdf'], 'exact.pdf', { type: 'application/pdf' })
    const withWhitespace = new File(['pdf'], 'whitespace.pdf', { type: ' application/pdf ' })
    const withExtra = new File(['pdf'], 'extra.pdf', { type: 'application/pdf; charset=utf-8' })

    expect(isPdfFile(exactMatch)).toBe(true)
    expect(isPdfFile(withWhitespace)).toBe(false)
    expect(isPdfFile(withExtra)).toBe(false)
  })

  it('should handle special characters in file names', () => {
    const files = [
      new File(['pdf'], 'document with spaces.pdf', { type: 'application/pdf' }),
      new File(['pdf'], 'document-with-dashes.pdf', { type: 'application/pdf' }),
      new File(['pdf'], 'document_with_underscores.pdf', { type: 'application/pdf' }),
      new File(['pdf'], 'döcümént.pdf', { type: 'application/pdf' }),
      new File(['pdf'], '文档.pdf', { type: 'application/pdf' })
    ]

    files.forEach(file => {
      expect(isPdfFile(file)).toBe(true)
    })
  })
})