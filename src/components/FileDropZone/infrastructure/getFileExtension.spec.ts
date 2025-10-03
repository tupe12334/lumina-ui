import { describe, it, expect } from 'vitest'
import { getFileExtension } from './getFileExtension'

describe('getFileExtension', () => {
  it('should return file extension for common file types', () => {
    const testCases = [
      { fileName: 'document.pdf', expected: '.pdf' },
      { fileName: 'image.jpg', expected: '.jpg' },
      { fileName: 'image.jpeg', expected: '.jpeg' },
      { fileName: 'image.png', expected: '.png' },
      { fileName: 'script.js', expected: '.js' },
      { fileName: 'style.css', expected: '.css' },
      { fileName: 'data.json', expected: '.json' },
      { fileName: 'text.txt', expected: '.txt' }
    ]

    testCases.forEach(({ fileName, expected }) => {
      expect(getFileExtension(fileName)).toBe(expected)
    })
  })

  it('should handle files with multiple dots', () => {
    const testCases = [
      { fileName: 'file.name.with.dots.txt', expected: '.txt' },
      { fileName: 'archive.tar.gz', expected: '.gz' },
      { fileName: 'config.local.json', expected: '.json' },
      { fileName: 'test.spec.ts', expected: '.ts' }
    ]

    testCases.forEach(({ fileName, expected }) => {
      expect(getFileExtension(fileName)).toBe(expected)
    })
  })

  it('should return empty string for files without extension', () => {
    const testCases = [
      'README',
      'Makefile',
      'LICENSE',
      'dockerfile',
      'file-without-extension'
    ]

    testCases.forEach(fileName => {
      expect(getFileExtension(fileName)).toBe('')
    })
  })

  it('should handle file paths with directories', () => {
    const testCases = [
      { fileName: '/path/to/file.txt', expected: '.txt' },
      { fileName: './relative/path/image.png', expected: '.png' },
      { fileName: '../parent/document.pdf', expected: '.pdf' },
      { fileName: 'folder/subfolder/script.js', expected: '.js' }
    ]

    testCases.forEach(({ fileName, expected }) => {
      expect(getFileExtension(fileName)).toBe(expected)
    })
  })

  it('should handle files that start with a dot', () => {
    const testCases = [
      { fileName: '.gitignore', expected: '' },
      { fileName: '.env', expected: '' },
      { fileName: '.hidden.txt', expected: '.txt' },
      { fileName: '.config.json', expected: '.json' }
    ]

    testCases.forEach(({ fileName, expected }) => {
      expect(getFileExtension(fileName)).toBe(expected)
    })
  })

  it('should handle case-sensitive extensions', () => {
    const testCases = [
      { fileName: 'file.PDF', expected: '.PDF' },
      { fileName: 'image.JPG', expected: '.JPG' },
      { fileName: 'document.TXT', expected: '.TXT' },
      { fileName: 'script.JS', expected: '.JS' }
    ]

    testCases.forEach(({ fileName, expected }) => {
      expect(getFileExtension(fileName)).toBe(expected)
    })
  })

  it('should handle edge cases', () => {
    const testCases = [
      { fileName: '', expected: '' },
      { fileName: '.', expected: '' },
      { fileName: '..', expected: '' },
      { fileName: 'file.', expected: '.' },
      { fileName: '.file.', expected: '.' }
    ]

    testCases.forEach(({ fileName, expected }) => {
      expect(getFileExtension(fileName)).toBe(expected)
    })
  })

  it('should handle Windows-style paths', () => {
    const testCases = [
      { fileName: 'C:\\Users\\Documents\\file.txt', expected: '.txt' },
      { fileName: 'D:\\Projects\\image.png', expected: '.png' },
      { fileName: '\\server\\share\\document.pdf', expected: '.pdf' }
    ]

    testCases.forEach(({ fileName, expected }) => {
      expect(getFileExtension(fileName)).toBe(expected)
    })
  })

  it('should handle files with unusual but valid extensions', () => {
    const testCases = [
      { fileName: 'backup.bak', expected: '.bak' },
      { fileName: 'template.tpl', expected: '.tpl' },
      { fileName: 'data.sql', expected: '.sql' },
      { fileName: 'archive.zip', expected: '.zip' },
      { fileName: 'font.woff2', expected: '.woff2' }
    ]

    testCases.forEach(({ fileName, expected }) => {
      expect(getFileExtension(fileName)).toBe(expected)
    })
  })
})