import { describe, it, expect } from 'vitest'
import { type FileValidationConfig } from './FileValidationConfig'

describe('FileValidationConfig', () => {
  describe('interface structure', () => {
    it('should accept valid config object', () => {
      const config: FileValidationConfig = {
        maxFileSize: 1024 * 1024 * 5, // 5MB
        maxFiles: 10,
        acceptedTypes: ['image/jpeg', 'image/png'],
        allowMultiple: true
      }

      expect(config.maxFileSize).toBe(1024 * 1024 * 5)
      expect(config.maxFiles).toBe(10)
      expect(config.acceptedTypes).toEqual(['image/jpeg', 'image/png'])
      expect(config.allowMultiple).toBe(true)
    })

    it('should accept config with different file size values', () => {
      const configs: FileValidationConfig[] = [
        {
          maxFileSize: 1024, // 1KB
          maxFiles: 1,
          acceptedTypes: ['text/plain'],
          allowMultiple: false
        },
        {
          maxFileSize: 100 * 1024 * 1024, // 100MB
          maxFiles: 50,
          acceptedTypes: ['*/*'],
          allowMultiple: true
        }
      ]

      configs.forEach(config => {
        expect(typeof config.maxFileSize).toBe('number')
        expect(typeof config.maxFiles).toBe('number')
        expect(Array.isArray(config.acceptedTypes)).toBe(true)
        expect(typeof config.allowMultiple).toBe('boolean')
      })
    })

    it('should accept various accepted types formats', () => {
      const config: FileValidationConfig = {
        maxFileSize: 1024,
        maxFiles: 1,
        acceptedTypes: [
          'image/*',
          'application/pdf',
          'text/plain',
          'video/mp4',
          '*/*'
        ],
        allowMultiple: true
      }

      expect(config.acceptedTypes).toContain('image/*')
      expect(config.acceptedTypes).toContain('application/pdf')
      expect(config.acceptedTypes).toContain('*/*')
    })

    it('should accept empty accepted types array', () => {
      const config: FileValidationConfig = {
        maxFileSize: 1024,
        maxFiles: 1,
        acceptedTypes: [],
        allowMultiple: false
      }

      expect(config.acceptedTypes).toEqual([])
    })

    it('should accept zero values for numeric fields', () => {
      const config: FileValidationConfig = {
        maxFileSize: 0,
        maxFiles: 0,
        acceptedTypes: ['text/plain'],
        allowMultiple: false
      }

      expect(config.maxFileSize).toBe(0)
      expect(config.maxFiles).toBe(0)
    })

    it('should accept large values for numeric fields', () => {
      const config: FileValidationConfig = {
        maxFileSize: 1000 * 1024 * 1024, // 1GB
        maxFiles: 1000,
        acceptedTypes: ['*/*'],
        allowMultiple: true
      }

      expect(config.maxFileSize).toBe(1000 * 1024 * 1024)
      expect(config.maxFiles).toBe(1000)
    })
  })
})