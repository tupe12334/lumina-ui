import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFileDropZone } from './useFileDropZone'
import { FileUpload } from '../domain/FileUpload'

vi.mock('../hooks/useFileActions', () => ({
  useFileActions: () => ({
    removeFile: vi.fn(),
    retryFile: vi.fn(),
    clearAll: vi.fn(),
    updateFileProgress: vi.fn(),
    updateFileStatus: vi.fn(),
    updateFileError: vi.fn()
  })
}))

vi.mock('../hooks/useDragHandlers', () => ({
  useDragHandlers: () => ({
    handleDragEnter: vi.fn(),
    handleDragOver: vi.fn(),
    handleDragLeave: vi.fn(),
    handleDrop: vi.fn()
  })
}))

vi.mock('./FilePreviewService', () => ({
  FilePreviewService: {
    addPreviewUrls: vi.fn(files => Promise.resolve(files))
  }
}))

describe('useFileDropZone', () => {
  let mockFiles: File[]

  beforeEach(() => {
    mockFiles = [
      new File(['content1'], 'file1.txt', { type: 'text/plain' }),
      new File(['content2'], 'file2.txt', { type: 'text/plain' })
    ]
    vi.clearAllMocks()
  })

  describe('initialization', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => useFileDropZone({}))

      expect(result.current.files).toEqual([])
      expect(result.current.dragState.isIdle()).toBe(true)
      expect(result.current.isDragActive).toBe(false)
      expect(result.current.validationRules).toBeDefined()
    })

    it('should initialize with provided config', () => {
      const config = {
        maxFileSize: 5 * 1024 * 1024,
        maxFiles: 3,
        acceptedTypes: ['image/*'],
        allowMultiple: true
      }

      const { result } = renderHook(() => useFileDropZone(config))
      const validationConfig = result.current.validationRules.getConfig()

      expect(validationConfig.maxFileSize).toBe(5 * 1024 * 1024)
      expect(validationConfig.maxFiles).toBe(3)
      expect(validationConfig.acceptedTypes).toEqual(['image/*'])
      expect(validationConfig.allowMultiple).toBe(true)
    })
  })

  describe('getFileInputProps', () => {
    it('should return correct input props for multiple files', () => {
      const config = { allowMultiple: true, acceptedTypes: ['image/*'] }
      const { result } = renderHook(() => useFileDropZone(config))

      const props = result.current.getFileInputProps()

      expect(props.type).toBe('file')
      expect(props.multiple).toBe(true)
      expect(props.accept).toBe('image/*')
      expect(typeof props.onChange).toBe('function')
    })

    it('should return correct input props for single file', () => {
      const config = { allowMultiple: false, acceptedTypes: ['text/plain'] }
      const { result } = renderHook(() => useFileDropZone(config))

      const props = result.current.getFileInputProps()

      expect(props.multiple).toBe(false)
      expect(props.accept).toBe('text/plain')
    })

    it('should return correct accept attribute for multiple types', () => {
      const config = { acceptedTypes: ['image/jpeg', 'image/png', 'application/pdf'] }
      const { result } = renderHook(() => useFileDropZone(config))

      const props = result.current.getFileInputProps()

      expect(props.accept).toBe('image/jpeg,image/png,application/pdf')
    })
  })

  describe('handleFileInput', () => {
    it('should process selected files from input', async () => {
      const onFilesAdded = vi.fn()
      const { result } = renderHook(() => useFileDropZone({ onFilesAdded }))

      const mockEvent = {
        target: {
          files: mockFiles,
          value: 'test.txt'
        }
      } as const

      await act(async () => {
        result.current.handleFileInput(mockEvent)
      })

      expect(mockEvent.target.value).toBe('')
      expect(onFilesAdded).toHaveBeenCalled()
    })

    it('should handle empty file selection', async () => {
      const onFilesAdded = vi.fn()
      const { result } = renderHook(() => useFileDropZone({ onFilesAdded }))

      const mockEvent = {
        target: {
          files: null,
          value: ''
        }
      } as const

      await act(async () => {
        result.current.handleFileInput(mockEvent)
      })

      expect(onFilesAdded).not.toHaveBeenCalled()
    })

    it('should clear input value after processing', async () => {
      const { result } = renderHook(() => useFileDropZone({}))

      const mockEvent = {
        target: {
          files: mockFiles,
          value: 'original-value'
        }
      } as const

      await act(async () => {
        result.current.handleFileInput(mockEvent)
      })

      expect(mockEvent.target.value).toBe('')
    })
  })

  describe('addFiles', () => {
    it('should add valid files to state', async () => {
      const onFilesAdded = vi.fn()
      const { result } = renderHook(() => useFileDropZone({ onFilesAdded }))

      await act(async () => {
        result.current.addFiles(mockFiles)
      })

      expect(result.current.files).toHaveLength(2)
      expect(result.current.files[0].getName()).toBe('file1.txt')
      expect(result.current.files[1].getName()).toBe('file2.txt')
      expect(onFilesAdded).toHaveBeenCalledWith(expect.any(Array))
    })

    it('should call onError when validation fails', async () => {
      const onError = vi.fn()
      const config = {
        maxFiles: 1,
        onError
      }
      const { result } = renderHook(() => useFileDropZone(config))

      await act(async () => {
        result.current.addFiles(mockFiles)
      })

      expect(onError).toHaveBeenCalledWith(expect.arrayContaining([expect.stringContaining('Cannot upload more than 1 files total')]))
    })

    it('should not add files when validation fails', async () => {
      const config = { maxFiles: 0 }
      const { result } = renderHook(() => useFileDropZone(config))

      await act(async () => {
        result.current.addFiles(mockFiles)
      })

      expect(result.current.files).toHaveLength(0)
    })

    it('should work with FileList input', async () => {
      const fileList = {
        length: mockFiles.length,
        item: (index: number) => mockFiles.at(index) || null,
        [Symbol.iterator]: function* () {
          for (const file of mockFiles) {
            yield file
          }
        }
      } as const

      const { result } = renderHook(() => useFileDropZone({}))

      await act(async () => {
        result.current.addFiles(fileList)
      })

      expect(result.current.files).toHaveLength(2)
    })
  })

  describe('config callbacks', () => {
    it('should call onFilesAdded when files are successfully added', async () => {
      const onFilesAdded = vi.fn()
      const { result } = renderHook(() => useFileDropZone({ onFilesAdded }))

      await act(async () => {
        result.current.addFiles(mockFiles)
      })

      expect(onFilesAdded).toHaveBeenCalledTimes(1)
      expect(onFilesAdded).toHaveBeenCalledWith(expect.arrayContaining([
        expect.objectContaining({ getName: expect.any(Function) })
      ]))
    })

    it('should not call onFilesAdded when no valid files', async () => {
      const onFilesAdded = vi.fn()
      const config = {
        maxFiles: 0,
        onFilesAdded
      }
      const { result } = renderHook(() => useFileDropZone(config))

      await act(async () => {
        result.current.addFiles(mockFiles)
      })

      expect(onFilesAdded).not.toHaveBeenCalled()
    })
  })

  describe('state management', () => {
    it('should maintain file state across multiple additions', async () => {
      const { result } = renderHook(() => useFileDropZone({}))

      await act(async () => {
        result.current.addFiles([mockFiles[0]])
      })

      expect(result.current.files).toHaveLength(1)

      await act(async () => {
        result.current.addFiles([mockFiles[1]])
      })

      expect(result.current.files).toHaveLength(2)
    })

    it('should update isDragActive based on drag state', () => {
      const { result } = renderHook(() => useFileDropZone({}))

      expect(result.current.isDragActive).toBe(false)
      expect(result.current.dragState.isIdle()).toBe(true)
    })
  })

  describe('integration with hooks', () => {
    it('should expose drag handlers from useDragHandlers', () => {
      const { result } = renderHook(() => useFileDropZone({}))

      expect(typeof result.current.handleDragEnter).toBe('function')
      expect(typeof result.current.handleDragOver).toBe('function')
      expect(typeof result.current.handleDragLeave).toBe('function')
      expect(typeof result.current.handleDrop).toBe('function')
    })

    it('should expose file actions from useFileActions', () => {
      const { result } = renderHook(() => useFileDropZone({}))

      expect(typeof result.current.removeFile).toBe('function')
      expect(typeof result.current.retryFile).toBe('function')
      expect(typeof result.current.clearAll).toBe('function')
      expect(typeof result.current.updateFileProgress).toBe('function')
      expect(typeof result.current.updateFileStatus).toBe('function')
      expect(typeof result.current.updateFileError).toBe('function')
    })
  })
})