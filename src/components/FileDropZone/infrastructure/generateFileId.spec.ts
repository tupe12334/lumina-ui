import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generateFileId } from './generateFileId'
import { nanoid } from 'nanoid'

vi.mock('nanoid', () => ({
  nanoid: vi.fn(() => 'mocked-nanoid-123')
}))

const mockedNanoid = vi.mocked(nanoid)

describe('generateFileId', () => {
  let mockFile: File

  beforeEach(() => {
    mockFile = new File(['content'], 'test.txt', { type: 'text/plain' })
  })

  it('should generate ID with file name, size, and nanoid', () => {
    const result = generateFileId(mockFile)

    expect(result).toBe(`${mockFile.name}-${mockFile.size}-mocked-nanoid-123`)
    expect(result).toContain('test.txt')
    expect(result).toContain(mockFile.size.toString())
    expect(result).toContain('mocked-nanoid-123')
  })

  it('should include file name in the ID', () => {
    const file = new File(['content'], 'document.pdf', { type: 'application/pdf' })
    const result = generateFileId(file)

    expect(result).toContain('document.pdf')
    expect(result.startsWith('document.pdf-')).toBe(true)
  })

  it('should include file size in the ID', () => {
    const content = 'x'.repeat(1000)
    const file = new File([content], 'large.txt', { type: 'text/plain' })
    const result = generateFileId(file)

    expect(result).toContain(file.size.toString())
    expect(result).toContain(`-${file.size}-`)
  })

  it('should call nanoid for unique identifier', () => {

    generateFileId(mockFile)

    expect(mockedNanoid).toHaveBeenCalled()
  })

  it('should generate different IDs for different files', () => {
    nanoid.mockReturnValueOnce('id-1').mockReturnValueOnce('id-2')

    const file1 = new File(['content1'], 'file1.txt', { type: 'text/plain' })
    const file2 = new File(['content2'], 'file2.txt', { type: 'text/plain' })

    const id1 = generateFileId(file1)
    const id2 = generateFileId(file2)

    expect(id1).not.toBe(id2)
    expect(id1).toContain('file1.txt')
    expect(id2).toContain('file2.txt')
    expect(id1).toContain('id-1')
    expect(id2).toContain('id-2')
  })

  it('should handle files with same name but different sizes', () => {
    const file1 = new File(['short'], 'same.txt', { type: 'text/plain' })
    const file2 = new File(['much longer content'], 'same.txt', { type: 'text/plain' })

    const id1 = generateFileId(file1)
    const id2 = generateFileId(file2)

    expect(id1).not.toBe(id2)
    expect(id1).toContain(file1.size.toString())
    expect(id2).toContain(file2.size.toString())
  })

  it('should handle files with special characters in name', () => {
    const file = new File(['content'], 'file with spaces & symbols!.txt', { type: 'text/plain' })
    const result = generateFileId(file)

    expect(result).toContain('file with spaces & symbols!.txt')
    expect(result).toMatch(/^file with spaces & symbols!\.txt-\d+-mocked-nanoid-123$/)
  })

  it('should handle zero-size files', () => {
    const file = new File([], 'empty.txt', { type: 'text/plain' })
    const result = generateFileId(file)

    expect(result).toContain('empty.txt')
    expect(result).toContain('-0-')
    expect(result).toContain('mocked-nanoid-123')
  })

  it('should handle large files', () => {
    const largeSize = 1024 * 1024 * 100 // 100MB
    Object.defineProperty(mockFile, 'size', { value: largeSize })

    const result = generateFileId(mockFile)

    expect(result).toContain(largeSize.toString())
    expect(result).toContain(`-${largeSize}-`)
  })

  it('should create valid ID format', () => {
    const result = generateFileId(mockFile)
    const parts = result.split('-')

    expect(parts.length).toBeGreaterThanOrEqual(3)
    expect(parts[0]).toBe('test.txt')
    expect(parts[1]).toBe(mockFile.size.toString())
    expect(parts[parts.length - 1]).toBe('mocked-nanoid-123')
  })

  it('should generate unique IDs for identical files', () => {
    nanoid.mockReturnValueOnce('unique-1').mockReturnValueOnce('unique-2')

    const file1 = new File(['identical'], 'same.txt', { type: 'text/plain' })
    const file2 = new File(['identical'], 'same.txt', { type: 'text/plain' })

    const id1 = generateFileId(file1)
    const id2 = generateFileId(file2)

    expect(id1).not.toBe(id2)
    expect(id1).toContain('unique-1')
    expect(id2).toContain('unique-2')
  })
})