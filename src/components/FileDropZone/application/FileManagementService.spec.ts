import { describe, it, expect, beforeEach } from 'vitest'
import { FileManagementService } from './FileManagementService'
import { FileUpload } from '../domain/FileUpload'

describe('FileManagementService', () => {
  let mockFiles: FileUpload[]

  beforeEach(() => {
    const file1 = new File(['content1'], 'file1.txt', { type: 'text/plain' })
    const file2 = new File(['content2'], 'file2.txt', { type: 'text/plain' })
    const file3 = new File(['content3'], 'file3.txt', { type: 'text/plain' })

    mockFiles = [
      FileUpload.create(file1, 'file-1'),
      FileUpload.create(file2, 'file-2'),
      FileUpload.create(file3, 'file-3')
    ]
  })

  describe('updateFileProgress', () => {
    it('should update progress for specified file', () => {
      const result = FileManagementService.updateFileProgress(mockFiles, 'file-2', 75)

      expect(result).toHaveLength(3)
      expect(result[0].getProgress()).toBe(0) // unchanged
      expect(result[1].getProgress()).toBe(75) // updated
      expect(result[2].getProgress()).toBe(0) // unchanged
      expect(result[1].getId()).toBe('file-2')
    })

    it('should not modify other files when updating progress', () => {
      const result = FileManagementService.updateFileProgress(mockFiles, 'file-1', 50)

      expect(result[1]).toBe(mockFiles[1]) // same reference
      expect(result[2]).toBe(mockFiles[2]) // same reference
      expect(result[0]).not.toBe(mockFiles[0]) // new reference for updated file
    })

    it('should return unchanged array when file ID not found', () => {
      const result = FileManagementService.updateFileProgress(mockFiles, 'non-existent', 100)

      expect(result).toEqual(mockFiles)
      result.forEach((file, index) => {
        expect(file).toBe(mockFiles.at(index))
      })
    })

    it('should handle empty files array', () => {
      const result = FileManagementService.updateFileProgress([], 'file-1', 50)
      expect(result).toEqual([])
    })
  })

  describe('updateFileStatus', () => {
    it('should update status for specified file', () => {
      const result = FileManagementService.updateFileStatus(mockFiles, 'file-2', 'uploading')

      expect(result).toHaveLength(3)
      expect(result[0].getStatus().getStatus()).toBe('pending') // unchanged
      expect(result[1].getStatus().getStatus()).toBe('uploading') // updated
      expect(result[2].getStatus().getStatus()).toBe('pending') // unchanged
    })

    it('should work with all valid status values', () => {
      const statuses = ['pending', 'uploading', 'uploaded', 'processing', 'completed', 'failed'] as const

      statuses.forEach(status => {
        const result = FileManagementService.updateFileStatus(mockFiles, 'file-1', status)
        expect(result[0].getStatus().getStatus()).toBe(status)
      })
    })

    it('should not modify other files when updating status', () => {
      const result = FileManagementService.updateFileStatus(mockFiles, 'file-3', 'completed')

      expect(result[0]).toBe(mockFiles[0])
      expect(result[1]).toBe(mockFiles[1])
      expect(result[2]).not.toBe(mockFiles[2])
    })

    it('should return unchanged array when file ID not found', () => {
      const result = FileManagementService.updateFileStatus(mockFiles, 'missing', 'completed')

      expect(result).toEqual(mockFiles)
    })
  })

  describe('updateFileError', () => {
    it('should update error for specified file', () => {
      const errorMessage = 'Upload failed'
      const result = FileManagementService.updateFileError(mockFiles, 'file-1', errorMessage)

      expect(result[0].getError()).toBe(errorMessage)
      expect(result[0].getStatus().getStatus()).toBe('error')
      expect(result[1].getError()).toBeUndefined()
      expect(result[2].getError()).toBeUndefined()
    })

    it('should set status to error when adding error', () => {
      const result = FileManagementService.updateFileError(mockFiles, 'file-2', 'Network error')

      expect(result[1].getError()).toBe('Network error')
      expect(result[1].getStatus().getStatus()).toBe('error')
    })

    it('should not modify other files when updating error', () => {
      const result = FileManagementService.updateFileError(mockFiles, 'file-1', 'Error message')

      expect(result[1]).toBe(mockFiles[1])
      expect(result[2]).toBe(mockFiles[2])
      expect(result[0]).not.toBe(mockFiles[0])
    })

    it('should return unchanged array when file ID not found', () => {
      const result = FileManagementService.updateFileError(mockFiles, 'invalid-id', 'Error')

      expect(result).toEqual(mockFiles)
    })
  })

  describe('removeFile', () => {
    it('should remove file with specified ID', () => {
      const result = FileManagementService.removeFile(mockFiles, 'file-2')

      expect(result).toHaveLength(2)
      expect(result[0].getId()).toBe('file-1')
      expect(result[1].getId()).toBe('file-3')
      expect(result.find(file => file.getId() === 'file-2')).toBeUndefined()
    })

    it('should return unchanged array when file ID not found', () => {
      const result = FileManagementService.removeFile(mockFiles, 'non-existent')

      expect(result).toEqual(mockFiles)
      expect(result).toHaveLength(3)
    })

    it('should handle removing the only file', () => {
      const singleFile = [mockFiles[0]]
      const result = FileManagementService.removeFile(singleFile, 'file-1')

      expect(result).toEqual([])
    })

    it('should handle empty files array', () => {
      const result = FileManagementService.removeFile([], 'file-1')
      expect(result).toEqual([])
    })
  })

  describe('clearAllFiles', () => {
    it('should return empty array', () => {
      const result = FileManagementService.clearAllFiles()
      expect(result).toEqual([])
    })

    it('should always return new empty array', () => {
      const result1 = FileManagementService.clearAllFiles()
      const result2 = FileManagementService.clearAllFiles()

      expect(result1).toEqual([])
      expect(result2).toEqual([])
      expect(result1).not.toBe(result2)
    })
  })

  describe('retryFile', () => {
    it('should retry file with error status', () => {
      const errorFile = mockFiles[0].withError('Upload failed')
      const filesWithError = [errorFile, ...mockFiles.slice(1)]

      const result = FileManagementService.retryFile(filesWithError, 'file-1')

      expect(result[0].getError()).toBeUndefined()
      expect(result[0].getStatus().getStatus()).toBe('pending')
      expect(result[1]).toBe(mockFiles[1])
      expect(result[2]).toBe(mockFiles[2])
    })

    it('should not retry file without retryable status', () => {
      const completedFile = mockFiles[0].withStatus('completed')
      const filesWithCompleted = [completedFile, ...mockFiles.slice(1)]

      const result = FileManagementService.retryFile(filesWithCompleted, 'file-1')

      expect(result[0]).toBe(completedFile)
      expect(result[0].getStatus().getStatus()).toBe('completed')
    })

    it('should not modify other files when retrying', () => {
      const errorFile = mockFiles[1].withError('Network error')
      const filesWithError = [mockFiles[0], errorFile, mockFiles[2]]

      const result = FileManagementService.retryFile(filesWithError, 'file-2')

      expect(result[0]).toBe(mockFiles[0])
      expect(result[2]).toBe(mockFiles[2])
      expect(result[1]).not.toBe(errorFile)
    })

    it('should return unchanged array when file ID not found', () => {
      const result = FileManagementService.retryFile(mockFiles, 'missing-id')

      expect(result).toEqual(mockFiles)
    })

    it('should handle empty files array', () => {
      const result = FileManagementService.retryFile([], 'file-1')
      expect(result).toEqual([])
    })
  })
})