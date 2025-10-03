import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFileActions } from './useFileActions'
import { FileUpload } from '../domain/FileUpload'

describe('useFileActions', () => {
  let mockSetFiles: ReturnType<typeof vi.fn>
  let mockConfig: { onFileRemoved?: (id: string) => void; onFileRetried?: (id: string) => void }

  beforeEach(() => {
    mockSetFiles = vi.fn()
    mockConfig = {}
  })

  describe('removeFile', () => {
    it('should call setFiles with filtered files', () => {
      const { result } = renderHook(() => useFileActions({ config: mockConfig, setFiles: mockSetFiles }))

      act(() => {
        result.current.removeFile('file-1')
      })

      expect(mockSetFiles).toHaveBeenCalledWith(expect.any(Function))

      const updateFunction = mockSetFiles.mock.calls[0][0]
      const mockFiles = [
        FileUpload.create(new File(['1'], 'file1.txt'), 'file-1'),
        FileUpload.create(new File(['2'], 'file2.txt'), 'file-2')
      ]

      const updatedFiles = updateFunction(mockFiles)
      expect(updatedFiles).toHaveLength(1)
      expect(updatedFiles[0].getId()).toBe('file-2')
    })

    it('should call onFileRemoved callback when provided', () => {
      const onFileRemoved = vi.fn()
      const config = { onFileRemoved }
      const { result } = renderHook(() => useFileActions({ config, setFiles: mockSetFiles }))

      act(() => {
        result.current.removeFile('file-1')
      })

      expect(onFileRemoved).toHaveBeenCalledWith('file-1')
    })

    it('should not call onFileRemoved when not provided', () => {
      const { result } = renderHook(() => useFileActions({ config: mockConfig, setFiles: mockSetFiles }))

      act(() => {
        result.current.removeFile('file-1')
      })

      expect(mockSetFiles).toHaveBeenCalled()
    })
  })

  describe('retryFile', () => {
    it('should call setFiles with retried file', () => {
      const { result } = renderHook(() => useFileActions({ config: mockConfig, setFiles: mockSetFiles }))

      act(() => {
        result.current.retryFile('file-1')
      })

      expect(mockSetFiles).toHaveBeenCalledWith(expect.any(Function))
    })

    it('should call onFileRetried callback when provided', () => {
      const onFileRetried = vi.fn()
      const config = { onFileRetried }
      const { result } = renderHook(() => useFileActions({ config, setFiles: mockSetFiles }))

      act(() => {
        result.current.retryFile('file-1')
      })

      expect(onFileRetried).toHaveBeenCalledWith('file-1')
    })

    it('should not call onFileRetried when not provided', () => {
      const { result } = renderHook(() => useFileActions({ config: mockConfig, setFiles: mockSetFiles }))

      act(() => {
        result.current.retryFile('file-1')
      })

      expect(mockSetFiles).toHaveBeenCalled()
    })
  })

  describe('clearAll', () => {
    it('should call setFiles with empty array', () => {
      const { result } = renderHook(() => useFileActions({ config: mockConfig, setFiles: mockSetFiles }))

      act(() => {
        result.current.clearAll()
      })

      expect(mockSetFiles).toHaveBeenCalledWith([])
    })
  })

  describe('updateFileProgress', () => {
    it('should call setFiles with updated progress', () => {
      const { result } = renderHook(() => useFileActions({ config: mockConfig, setFiles: mockSetFiles }))

      act(() => {
        result.current.updateFileProgress('file-1', 75)
      })

      expect(mockSetFiles).toHaveBeenCalledWith(expect.any(Function))

      const updateFunction = mockSetFiles.mock.calls[0][0]
      const mockFiles = [FileUpload.create(new File(['1'], 'file1.txt'), 'file-1')]
      const updatedFiles = updateFunction(mockFiles)

      expect(updatedFiles[0].getProgress()).toBe(75)
    })
  })

  describe('updateFileStatus', () => {
    it('should call setFiles with updated status', () => {
      const { result } = renderHook(() => useFileActions({ config: mockConfig, setFiles: mockSetFiles }))

      act(() => {
        result.current.updateFileStatus('file-1', 'completed')
      })

      expect(mockSetFiles).toHaveBeenCalledWith(expect.any(Function))

      const updateFunction = mockSetFiles.mock.calls[0][0]
      const mockFiles = [FileUpload.create(new File(['1'], 'file1.txt'), 'file-1')]
      const updatedFiles = updateFunction(mockFiles)

      expect(updatedFiles[0].getStatus().getStatus()).toBe('completed')
    })
  })

  describe('updateFileError', () => {
    it('should call setFiles with updated error', () => {
      const { result } = renderHook(() => useFileActions({ config: mockConfig, setFiles: mockSetFiles }))

      act(() => {
        result.current.updateFileError('file-1', 'Upload failed')
      })

      expect(mockSetFiles).toHaveBeenCalledWith(expect.any(Function))

      const updateFunction = mockSetFiles.mock.calls[0][0]
      const mockFiles = [FileUpload.create(new File(['1'], 'file1.txt'), 'file-1')]
      const updatedFiles = updateFunction(mockFiles)

      expect(updatedFiles[0].getError()).toBe('Upload failed')
    })
  })

  describe('memoization', () => {
    it('should memoize functions correctly', () => {
      const { result, rerender } = renderHook(
        ({ config, setFiles }) => useFileActions({ config, setFiles }),
        { initialProps: { config: mockConfig, setFiles: mockSetFiles } }
      )

      const firstRender = result.current

      rerender({ config: mockConfig, setFiles: mockSetFiles })

      expect(result.current.removeFile).toBe(firstRender.removeFile)
      expect(result.current.retryFile).toBe(firstRender.retryFile)
      expect(result.current.clearAll).toBe(firstRender.clearAll)
      expect(result.current.updateFileProgress).toBe(firstRender.updateFileProgress)
      expect(result.current.updateFileStatus).toBe(firstRender.updateFileStatus)
      expect(result.current.updateFileError).toBe(firstRender.updateFileError)
    })

    it('should update functions when config changes', () => {
      const { result, rerender } = renderHook(
        ({ config, setFiles }) => useFileActions({ config, setFiles }),
        { initialProps: { config: mockConfig, setFiles: mockSetFiles } }
      )

      const firstRender = result.current

      const newConfig = { onFileRemoved: vi.fn() }
      rerender({ config: newConfig, setFiles: mockSetFiles })

      expect(result.current.removeFile).not.toBe(firstRender.removeFile)
      expect(result.current.retryFile).not.toBe(firstRender.retryFile)
    })

    it('should update functions when setFiles changes', () => {
      const { result, rerender } = renderHook(
        ({ config, setFiles }) => useFileActions({ config, setFiles }),
        { initialProps: { config: mockConfig, setFiles: mockSetFiles } }
      )

      const firstRender = result.current

      const newSetFiles = vi.fn()
      rerender({ config: mockConfig, setFiles: newSetFiles })

      expect(result.current.clearAll).not.toBe(firstRender.clearAll)
      expect(result.current.updateFileProgress).not.toBe(firstRender.updateFileProgress)
    })
  })
})