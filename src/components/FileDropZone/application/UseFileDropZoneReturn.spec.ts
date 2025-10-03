import { describe, it, expect, vi } from 'vitest'
import { type UseFileDropZoneReturn } from './UseFileDropZoneReturn'
import { FileUpload } from '../domain/FileUpload'
import { FileValidationRules } from '../domain/FileValidation'
import { DragState } from '../domain/DragState'

describe('UseFileDropZoneReturn', () => {
  describe('interface structure', () => {
    it('should accept valid UseFileDropZoneReturn object', () => {
      const mockFiles = [FileUpload.create(new File(['test'], 'test.txt'))]
      const mockDragState = DragState.create('idle')
      const mockValidationRules = FileValidationRules.create()

      const mockReturn: UseFileDropZoneReturn = {
        files: mockFiles,
        dragState: mockDragState,
        validationRules: mockValidationRules,
        isDragActive: false,
        handleDragEnter: vi.fn(),
        handleDragOver: vi.fn(),
        handleDragLeave: vi.fn(),
        handleDrop: vi.fn(),
        handleFileInput: vi.fn(),
        addFiles: vi.fn(),
        removeFile: vi.fn(),
        retryFile: vi.fn(),
        clearAll: vi.fn(),
        updateFileProgress: vi.fn(),
        updateFileStatus: vi.fn(),
        updateFileError: vi.fn(),
        getFileInputProps: vi.fn(() => ({
          type: 'file' as const,
          multiple: true,
          accept: '*/*',
          onChange: vi.fn()
        }))
      }

      expect(mockReturn.files).toBe(mockFiles)
      expect(mockReturn.dragState).toBe(mockDragState)
      expect(mockReturn.validationRules).toBe(mockValidationRules)
      expect(mockReturn.isDragActive).toBe(false)
      expect(typeof mockReturn.handleDragEnter).toBe('function')
      expect(typeof mockReturn.addFiles).toBe('function')
      expect(typeof mockReturn.getFileInputProps).toBe('function')
    })

    it('should have correct event handler signatures', () => {
      const mockDragEvent = {} as const
      const mockChangeEvent = {} as const

      const eventHandlers: Pick<UseFileDropZoneReturn, 'handleDragEnter' | 'handleDragOver' | 'handleDragLeave' | 'handleDrop' | 'handleFileInput'> = {
        handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => {
          expect(e).toBe(mockDragEvent)
        },
        handleDragOver: (e: React.DragEvent<HTMLDivElement>) => {
          expect(e).toBe(mockDragEvent)
        },
        handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => {
          expect(e).toBe(mockDragEvent)
        },
        handleDrop: (e: React.DragEvent<HTMLDivElement>) => {
          expect(e).toBe(mockDragEvent)
        },
        handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => {
          expect(e).toBe(mockChangeEvent)
        }
      }

      eventHandlers.handleDragEnter(mockDragEvent)
      eventHandlers.handleFileInput(mockChangeEvent)
    })

    it('should have correct action method signatures', () => {
      const mockFiles = [new File(['test'], 'test.txt')]
      const mockFileList = {
        length: 1,
        item: () => mockFiles[0],
        [Symbol.iterator]: function* () { yield mockFiles[0] }
      } as const

      const actions: Pick<UseFileDropZoneReturn, 'addFiles' | 'removeFile' | 'retryFile' | 'updateFileProgress' | 'updateFileStatus' | 'updateFileError'> = {
        addFiles: (files: FileList | File[]) => {
          expect(Array.isArray(files) || files instanceof FileList).toBe(true)
        },
        removeFile: (fileId: string) => {
          expect(typeof fileId).toBe('string')
        },
        retryFile: (fileId: string) => {
          expect(typeof fileId).toBe('string')
        },
        updateFileProgress: (fileId: string, progress: number) => {
          expect(typeof fileId).toBe('string')
          expect(typeof progress).toBe('number')
        },
        updateFileStatus: (fileId: string, status) => {
          expect(typeof fileId).toBe('string')
          expect(['pending', 'uploading', 'uploaded', 'processing', 'completed', 'failed']).toContain(status)
        },
        updateFileError: (fileId: string, error: string) => {
          expect(typeof fileId).toBe('string')
          expect(typeof error).toBe('string')
        }
      }

      actions.addFiles(mockFiles)
      actions.addFiles(mockFileList)
      actions.removeFile('file-123')
      actions.updateFileProgress('file-123', 50)
      actions.updateFileStatus('file-123', 'uploading')
      actions.updateFileError('file-123', 'Error message')
    })

    it('should have correct getFileInputProps return type', () => {
      const getFileInputProps = (): ReturnType<UseFileDropZoneReturn['getFileInputProps']> => ({
        type: 'file',
        multiple: true,
        accept: 'image/*',
        onChange: vi.fn()
      })

      const props = getFileInputProps()
      expect(props.type).toBe('file')
      expect(typeof props.multiple).toBe('boolean')
      expect(typeof props.accept).toBe('string')
      expect(typeof props.onChange).toBe('function')
    })

    it('should work with different isDragActive values', () => {
      const createMockReturn = (isDragActive: boolean): Pick<UseFileDropZoneReturn, 'isDragActive'> => ({
        isDragActive
      })

      expect(createMockReturn(true).isDragActive).toBe(true)
      expect(createMockReturn(false).isDragActive).toBe(false)
    })

    it('should accept empty files array', () => {
      const mockReturn: Pick<UseFileDropZoneReturn, 'files'> = {
        files: []
      }

      expect(mockReturn.files).toEqual([])
      expect(Array.isArray(mockReturn.files)).toBe(true)
    })

    it('should work with different file status values', () => {
      const statusValues = ['pending', 'uploading', 'uploaded', 'processing', 'completed', 'failed'] as const

      statusValues.forEach(status => {
        const updateFileStatus: UseFileDropZoneReturn['updateFileStatus'] = (fileId, newStatus) => {
          expect(newStatus).toBe(status)
        }
        updateFileStatus('test-id', status)
      })
    })
  })
})