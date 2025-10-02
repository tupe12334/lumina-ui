import { describe, it, expect } from 'vitest'
import { FileStatusValue } from './FileStatus'

describe('FileStatus', () => {
  describe('create', () => {
    it('should create a FileStatusValue with default status when no status provided', () => {
      const fileStatus = FileStatusValue.create()

      expect(fileStatus.getStatus()).toBe('pending')
      expect(fileStatus.isPending()).toBe(true)
    })

    it('should create a FileStatusValue with provided status', () => {
      const fileStatus = FileStatusValue.create('uploading')

      expect(fileStatus.getStatus()).toBe('uploading')
      expect(fileStatus.isUploading()).toBe(true)
    })
  })

  describe('status checks', () => {
    it('should correctly identify pending status', () => {
      const fileStatus = FileStatusValue.create('pending')

      expect(fileStatus.isPending()).toBe(true)
      expect(fileStatus.isUploading()).toBe(false)
      expect(fileStatus.isProcessing()).toBe(false)
      expect(fileStatus.isCompleted()).toBe(false)
      expect(fileStatus.isFailed()).toBe(false)
    })

    it('should correctly identify uploading status', () => {
      const fileStatus = FileStatusValue.create('uploading')

      expect(fileStatus.isPending()).toBe(false)
      expect(fileStatus.isUploading()).toBe(true)
      expect(fileStatus.isProcessing()).toBe(false)
      expect(fileStatus.isCompleted()).toBe(false)
      expect(fileStatus.isFailed()).toBe(false)
    })

    it('should correctly identify processing status', () => {
      const fileStatus = FileStatusValue.create('processing')

      expect(fileStatus.isPending()).toBe(false)
      expect(fileStatus.isUploading()).toBe(false)
      expect(fileStatus.isProcessing()).toBe(true)
      expect(fileStatus.isCompleted()).toBe(false)
      expect(fileStatus.isFailed()).toBe(false)
    })

    it('should correctly identify completed status', () => {
      const fileStatus = FileStatusValue.create('completed')

      expect(fileStatus.isPending()).toBe(false)
      expect(fileStatus.isUploading()).toBe(false)
      expect(fileStatus.isProcessing()).toBe(false)
      expect(fileStatus.isCompleted()).toBe(true)
      expect(fileStatus.isFailed()).toBe(false)
    })

    it('should correctly identify failed status', () => {
      const fileStatus = FileStatusValue.create('failed')

      expect(fileStatus.isPending()).toBe(false)
      expect(fileStatus.isUploading()).toBe(false)
      expect(fileStatus.isProcessing()).toBe(false)
      expect(fileStatus.isCompleted()).toBe(false)
      expect(fileStatus.isFailed()).toBe(true)
    })
  })

  describe('getStatus', () => {
    it('should return the correct status value', () => {
      const statuses = ['pending', 'uploading', 'processing', 'completed', 'failed'] as const

      statuses.forEach(status => {
        const fileStatus = FileStatusValue.create(status)
        expect(fileStatus.getStatus()).toBe(status)
      })
    })
  })
})