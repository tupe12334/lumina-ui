import { describe, it, expect } from 'vitest'
import { isVideoFile } from './isVideoFile'

describe('isVideoFile', () => {
  it('should return true for video files', () => {
    const videoFiles = [
      new File(['video'], 'movie.mp4', { type: 'video/mp4' }),
      new File(['video'], 'clip.avi', { type: 'video/avi' }),
      new File(['video'], 'stream.mov', { type: 'video/quicktime' }),
      new File(['video'], 'recording.webm', { type: 'video/webm' }),
      new File(['video'], 'film.mkv', { type: 'video/x-matroska' }),
      new File(['video'], 'content.ogv', { type: 'video/ogg' })
    ]

    videoFiles.forEach(file => {
      expect(isVideoFile(file)).toBe(true)
    })
  })

  it('should return false for non-video files', () => {
    const nonVideoFiles = [
      new File(['audio'], 'song.mp3', { type: 'audio/mpeg' }),
      new File(['image'], 'photo.jpg', { type: 'image/jpeg' }),
      new File(['text'], 'document.txt', { type: 'text/plain' }),
      new File(['data'], 'data.json', { type: 'application/json' }),
      new File(['pdf'], 'document.pdf', { type: 'application/pdf' }),
      new File(['html'], 'page.html', { type: 'text/html' })
    ]

    nonVideoFiles.forEach(file => {
      expect(isVideoFile(file)).toBe(false)
    })
  })

  it('should return false for files with empty MIME type', () => {
    const file = new File(['content'], 'unknown', { type: '' })
    expect(isVideoFile(file)).toBe(false)
  })

  it('should return false for files with undefined MIME type', () => {
    const file = new File(['content'], 'unknown')
    expect(isVideoFile(file)).toBe(false)
  })

  it('should handle various video MIME types', () => {
    const videoMimeTypes = [
      'video/mp4',
      'video/mpeg',
      'video/quicktime',
      'video/x-msvideo',
      'video/webm',
      'video/ogg',
      'video/3gpp',
      'video/x-flv',
      'video/x-matroska'
    ]

    videoMimeTypes.forEach(mimeType => {
      const file = new File(['video'], 'test', { type: mimeType })
      expect(isVideoFile(file)).toBe(true)
    })
  })

  it('should be case sensitive with MIME type', () => {
    const file = new File(['video'], 'test.mp4', { type: 'video/mp4' })
    // Mock the type property to be uppercase
    Object.defineProperty(file, 'type', { value: 'VIDEO/MP4', writable: false })
    expect(isVideoFile(file)).toBe(false)
  })

  it('should not match partial MIME types', () => {
    const partialMimeTypes = [
      'ideo/mp4', // missing 'v'
      'videonmp4', // missing '/'
      'application/video',
      'text/video'
    ]

    partialMimeTypes.forEach(mimeType => {
      const file = new File(['content'], 'test', { type: mimeType })
      expect(isVideoFile(file)).toBe(false)
    })
  })

  it('should handle files with video in name but non-video MIME type', () => {
    const file = new File(['text'], 'video-transcript.txt', { type: 'text/plain' })
    expect(isVideoFile(file)).toBe(false)
  })

  it('should handle custom video MIME types', () => {
    const customVideoMimeTypes = [
      'video/x-custom',
      'video/proprietary',
      'video/experimental'
    ]

    customVideoMimeTypes.forEach(mimeType => {
      const file = new File(['video'], 'custom', { type: mimeType })
      expect(isVideoFile(file)).toBe(true)
    })
  })

  it('should work with zero-size video files', () => {
    const file = new File([], 'empty.mp4', { type: 'video/mp4' })
    expect(isVideoFile(file)).toBe(true)
  })

  it('should work with large video files', () => {
    const file = new File(['x'.repeat(1000000)], 'large.mp4', { type: 'video/mp4' })
    expect(isVideoFile(file)).toBe(true)
  })
})