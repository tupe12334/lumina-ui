import { describe, it, expect } from 'vitest'
import { type FileStatus } from './FileStatusType'

describe('FileStatus', (): void => {
  describe('type definition', (): void => {
    it('should accept all valid status values', () => {
      const validStatuses: FileStatus[] = [
        'pending',
        'uploading',
        'uploaded',
        'processing',
        'completed',
        'failed'
      ]

      validStatuses.forEach(status => {
        const testStatus: FileStatus = status
        expect(testStatus).toBe(status)
      })
    })

    it('should work in conditional logic', () => {
      const status: FileStatus = 'uploading'

      const isInProgress = status === 'uploading' || status === 'processing'
      const isComplete = status === 'completed'
      const hasError = status === 'failed'

      expect(isInProgress).toBe(true)
      expect(isComplete).toBe(false)
      expect(hasError).toBe(false)
    })

    it('should work with switch statements', (): void => {
      const getStatusMessage = (status: FileStatus): string => {
        switch (status) {
          case 'pending':
            return 'File is waiting to be uploaded'
          case 'uploading':
            return 'File is being uploaded'
          case 'uploaded':
            return 'File has been uploaded'
          case 'processing':
            return 'File is being processed'
          case 'completed':
            return 'File processing is complete'
          case 'failed':
            return 'File upload failed'
        }
      }

      expect(getStatusMessage('pending')).toBe('File is waiting to be uploaded')
      expect(getStatusMessage('uploading')).toBe('File is being uploaded')
      expect(getStatusMessage('uploaded')).toBe('File has been uploaded')
      expect(getStatusMessage('processing')).toBe('File is being processed')
      expect(getStatusMessage('completed')).toBe('File processing is complete')
      expect(getStatusMessage('failed')).toBe('File upload failed')
    })

    it('should work in arrays and sets', () => {
      const progressStatuses: FileStatus[] = ['pending', 'uploading', 'processing']
      const finalStatuses = new Set<FileStatus>(['completed', 'failed'])

      expect(progressStatuses).toContain('uploading')
      expect(finalStatuses.has('completed')).toBe(true)
      expect(finalStatuses.has('pending')).toBe(false)
    })

    it('should work with type guards', () => {
      const isActiveStatus = (status: string): status is FileStatus => {
        return ['pending', 'uploading', 'uploaded', 'processing', 'completed', 'failed'].includes(status)
      }

      expect(isActiveStatus('uploading')).toBe(true)
      expect(isActiveStatus('invalid')).toBe(false)
    })

    it('should work with function parameters and return types', () => {
      const processStatus = (status: FileStatus): FileStatus => {
        if (status === 'pending') return 'uploading'
        if (status === 'uploading') return 'uploaded'
        if (status === 'uploaded') return 'processing'
        if (status === 'processing') return 'completed'
        return status
      }

      expect(processStatus('pending')).toBe('uploading')
      expect(processStatus('uploading')).toBe('uploaded')
      expect(processStatus('failed')).toBe('failed')
    })
  })
})