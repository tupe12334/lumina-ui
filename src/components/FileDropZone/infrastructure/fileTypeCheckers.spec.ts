import { describe, it, expect } from 'vitest'
import { isImageFile } from './fileTypeCheckers'

describe('fileTypeCheckers', () => {
  describe('isImageFile', () => {
    it('should return true for image files', () => {
      const imageFiles = [
        new File(['image'], 'photo.jpg', { type: 'image/jpeg' }),
        new File(['image'], 'picture.png', { type: 'image/png' }),
        new File(['image'], 'graphic.gif', { type: 'image/gif' }),
        new File(['image'], 'photo.webp', { type: 'image/webp' }),
        new File(['image'], 'vector.svg', { type: 'image/svg+xml' }),
        new File(['image'], 'bitmap.bmp', { type: 'image/bmp' }),
        new File(['image'], 'icon.ico', { type: 'image/x-icon' })
      ]

      imageFiles.forEach(file => {
        expect(isImageFile(file)).toBe(true)
      })
    })

    it('should return false for non-image files', () => {
      const nonImageFiles = [
        new File(['video'], 'movie.mp4', { type: 'video/mp4' }),
        new File(['audio'], 'song.mp3', { type: 'audio/mpeg' }),
        new File(['text'], 'document.txt', { type: 'text/plain' }),
        new File(['data'], 'data.json', { type: 'application/json' }),
        new File(['pdf'], 'document.pdf', { type: 'application/pdf' }),
        new File(['html'], 'page.html', { type: 'text/html' })
      ]

      nonImageFiles.forEach(file => {
        expect(isImageFile(file)).toBe(false)
      })
    })

    it('should return false for files with empty MIME type', () => {
      const file = new File(['content'], 'unknown', { type: '' })
      expect(isImageFile(file)).toBe(false)
    })

    it('should return false for files with undefined MIME type', () => {
      const file = new File(['content'], 'unknown')
      expect(isImageFile(file)).toBe(false)
    })

    it('should handle various image MIME types', () => {
      const imageMimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
        'image/bmp',
        'image/tiff',
        'image/x-icon',
        'image/heic',
        'image/avif'
      ]

      imageMimeTypes.forEach(mimeType => {
        const file = new File(['image'], 'test', { type: mimeType })
        expect(isImageFile(file)).toBe(true)
      })
    })

    it('should be case sensitive with MIME type', () => {
      const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' })
      // Mock the type property to be uppercase
      Object.defineProperty(file, 'type', { value: 'IMAGE/JPEG', writable: false })
      expect(isImageFile(file)).toBe(false)
    })

    it('should not match partial MIME types', () => {
      const partialMimeTypes = [
        'mage/jpeg', // missing 'i'
        'imagenjpeg', // missing '/'
        'application/image',
        'text/image'
      ]

      partialMimeTypes.forEach(mimeType => {
        const file = new File(['content'], 'test', { type: mimeType })
        expect(isImageFile(file)).toBe(false)
      })
    })

    it('should handle files with image in name but non-image MIME type', () => {
      const file = new File(['text'], 'image-description.txt', { type: 'text/plain' })
      expect(isImageFile(file)).toBe(false)
    })

    it('should handle custom image MIME types', () => {
      const customImageMimeTypes = [
        'image/x-custom',
        'image/proprietary',
        'image/experimental'
      ]

      customImageMimeTypes.forEach(mimeType => {
        const file = new File(['image'], 'custom', { type: mimeType })
        expect(isImageFile(file)).toBe(true)
      })
    })

    it('should work with zero-size image files', () => {
      const file = new File([], 'empty.jpg', { type: 'image/jpeg' })
      expect(isImageFile(file)).toBe(true)
    })

    it('should work with large image files', () => {
      const file = new File(['x'.repeat(1000000)], 'large.png', { type: 'image/png' })
      expect(isImageFile(file)).toBe(true)
    })

    it('should handle files with special characters in names', () => {
      const files = [
        new File(['image'], 'photo with spaces.jpg', { type: 'image/jpeg' }),
        new File(['image'], 'image-with-dashes.png', { type: 'image/png' }),
        new File(['image'], 'image_with_underscores.gif', { type: 'image/gif' }),
        new File(['image'], 'ïmägé.jpg', { type: 'image/jpeg' }),
        new File(['image'], '图片.png', { type: 'image/png' })
      ]

      files.forEach(file => {
        expect(isImageFile(file)).toBe(true)
      })
    })
  })
})