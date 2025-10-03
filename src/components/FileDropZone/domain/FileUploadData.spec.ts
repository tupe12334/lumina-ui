import { describe, it, expect, beforeEach } from 'vitest'
import { type FileUploadData } from './FileUploadData'

describe('FileUploadData', () => {
  let mockFile: File

  beforeEach(() => {
    mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' })
  })

  describe('interface structure', () => {
    it('should accept valid FileUploadData object with all properties', () => {
      const data: FileUploadData = {
        id: 'file-123',
        file: mockFile,
        status: 'uploading',
        progress: 75,
        error: 'Upload error',
        previewUrl: 'http://example.com/preview.jpg'
      }

      expect(data.id).toBe('file-123')
      expect(data.file).toBe(mockFile)
      expect(data.status).toBe('uploading')
      expect(data.progress).toBe(75)
      expect(data.error).toBe('Upload error')
      expect(data.previewUrl).toBe('http://example.com/preview.jpg')
    })

    it('should accept FileUploadData with only required properties', () => {
      const data: FileUploadData = {
        id: 'minimal-file',
        file: mockFile,
        status: 'pending',
        progress: 0
      }

      expect(data.id).toBe('minimal-file')
      expect(data.file).toBe(mockFile)
      expect(data.status).toBe('pending')
      expect(data.progress).toBe(0)
      expect(data.error).toBeUndefined()
      expect(data.previewUrl).toBeUndefined()
    })

    it('should accept all valid status values', () => {
      const statuses = ['pending', 'uploading', 'completed', 'failed', 'error'] as const

      statuses.forEach(status => {
        const data: FileUploadData = {
          id: `file-${status}`,
          file: mockFile,
          status,
          progress: 0
        }

        expect(data.status).toBe(status)
      })
    })

    it('should accept various progress values', () => {
      const progressValues = [0, 25, 50, 75, 100]

      progressValues.forEach(progress => {
        const data: FileUploadData = {
          id: 'progress-test',
          file: mockFile,
          status: 'uploading',
          progress
        }

        expect(data.progress).toBe(progress)
      })
    })

    it('should accept different file types', () => {
      const files = [
        new File(['text'], 'doc.txt', { type: 'text/plain' }),
        new File(['<html>'], 'page.html', { type: 'text/html' }),
        new File(['{}'], 'data.json', { type: 'application/json' }),
        new File([new ArrayBuffer(8)], 'image.jpg', { type: 'image/jpeg' })
      ]

      files.forEach((file, index) => {
        const data: FileUploadData = {
          id: `file-${index}`,
          file,
          status: 'pending',
          progress: 0
        }

        expect(data.file).toBe(file)
        expect(data.file.type).toBe(file.type)
      })
    })

    it('should accept empty string for error and previewUrl', () => {
      const data: FileUploadData = {
        id: 'empty-strings',
        file: mockFile,
        status: 'failed',
        progress: 0,
        error: '',
        previewUrl: ''
      }

      expect(data.error).toBe('')
      expect(data.previewUrl).toBe('')
    })

    it('should accept various ID formats', () => {
      const ids = [
        'simple-id',
        'uuid-abc-123-def-456',
        'file_with_underscores',
        '12345',
        'CamelCaseId',
        'with.dots.and-dashes'
      ]

      ids.forEach(id => {
        const data: FileUploadData = {
          id,
          file: mockFile,
          status: 'pending',
          progress: 0
        }

        expect(data.id).toBe(id)
      })
    })

    it('should accept various URL formats for previewUrl', () => {
      const urls = [
        'http://example.com/preview.jpg',
        'https://secure.example.com/image.png',
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ',
        'blob:http://localhost:3000/abc-123',
        '/local/path/image.jpg'
      ]

      urls.forEach(url => {
        const data: FileUploadData = {
          id: 'url-test',
          file: mockFile,
          status: 'completed',
          progress: 100,
          previewUrl: url
        }

        expect(data.previewUrl).toBe(url)
      })
    })
  })
})