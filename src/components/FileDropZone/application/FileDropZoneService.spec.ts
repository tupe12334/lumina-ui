import { describe, it, expect, beforeEach } from 'vitest'
import { FileDropZoneService } from './FileDropZoneService'
import { FileValidationRules } from '../domain/FileValidation'
import { FileUpload } from '../domain/FileUpload'
import { DragState } from '../domain/DragState'

describe('FileDropZoneService', () => {
  let mockFiles: File[]
  let validationRules: FileValidationRules

  beforeEach(() => {
    mockFiles = [
      new File(['content1'], 'file1.txt', { type: 'text/plain' }),
      new File(['content2'], 'file2.txt', { type: 'text/plain' })
    ]
    validationRules = FileValidationRules.create()
  })

  describe('validateAndCreateFiles', () => {
    it('should return valid files when validation passes', () => {
      const result = FileDropZoneService.validateAndCreateFiles(mockFiles, validationRules)

      expect(result.validFiles).toHaveLength(2)
      expect(result.errors).toHaveLength(0)
      expect(result.validFiles[0].getName()).toBe('file1.txt')
      expect(result.validFiles[1].getName()).toBe('file2.txt')
    })

    it('should return errors when file count exceeds limit', () => {
      const restrictiveRules = FileValidationRules.create({ maxFiles: 1 })
      const result = FileDropZoneService.validateAndCreateFiles(mockFiles, restrictiveRules)

      expect(result.validFiles).toHaveLength(1)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0]).toContain('Cannot upload more than 1 files total')
    })

    it('should return errors for invalid file types', () => {
      const typeRestrictiveRules = FileValidationRules.create({ acceptedTypes: ['image/jpeg'] })
      const result = FileDropZoneService.validateAndCreateFiles(mockFiles, typeRestrictiveRules)

      expect(result.validFiles).toHaveLength(0)
      expect(result.errors).toHaveLength(2)
      expect(result.errors[0]).toContain('file1.txt')
      expect(result.errors[0]).toContain('not allowed')
    })

    it('should return errors for files exceeding size limit', () => {
      const sizeRestrictiveRules = FileValidationRules.create({ maxFileSize: 1 })
      const result = FileDropZoneService.validateAndCreateFiles(mockFiles, sizeRestrictiveRules)

      expect(result.validFiles).toHaveLength(0)
      expect(result.errors).toHaveLength(2)
      expect(result.errors[0]).toContain('file1.txt')
      expect(result.errors[0]).toContain('size must be less than')
    })

    it('should detect duplicate files', () => {
      const existingFile = FileUpload.create(mockFiles[0])
      const currentFiles = [existingFile]

      const result = FileDropZoneService.validateAndCreateFiles(mockFiles, validationRules, currentFiles)

      expect(result.validFiles).toHaveLength(1)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0]).toBe('file1.txt: File already exists')
    })

    it('should consider current file count when validating', () => {
      const existingFiles = [
        FileUpload.create(new File(['existing'], 'existing.txt')),
        FileUpload.create(new File(['existing2'], 'existing2.txt'))
      ]
      const limitedRules = FileValidationRules.create({ maxFiles: 3 })

      const result = FileDropZoneService.validateAndCreateFiles(mockFiles, limitedRules, existingFiles)

      expect(result.validFiles).toHaveLength(1)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0]).toContain('Cannot upload more than 3 files total')
    })

    it('should work with FileList input', () => {
      const fileList = {
        length: mockFiles.length,
        item: (index: number) => mockFiles.at(index) || null,
        [Symbol.iterator]: function* () {
          for (const file of mockFiles) {
            yield file
          }
        }
      } as const

      const result = FileDropZoneService.validateAndCreateFiles(fileList, validationRules)

      expect(result.validFiles).toHaveLength(2)
      expect(result.errors).toHaveLength(0)
    })

    it('should handle empty file array', () => {
      const result = FileDropZoneService.validateAndCreateFiles([], validationRules)

      expect(result.validFiles).toHaveLength(0)
      expect(result.errors).toHaveLength(0)
    })
  })

  describe('handleDragOver', () => {
    it('should set drag over state when idle', () => {
      const idleState = DragState.create('idle')
      const result = FileDropZoneService.handleDragOver(idleState)

      expect(result.isDragOver()).toBe(true)
      expect(result).not.toBe(idleState)
    })

    it('should set drag over state when drag leave', () => {
      const dragLeaveState = DragState.create('dragLeave')
      const result = FileDropZoneService.handleDragOver(dragLeaveState)

      expect(result.isDragOver()).toBe(true)
      expect(result).not.toBe(dragLeaveState)
    })

    it('should return same state when already drag over', () => {
      const dragOverState = DragState.create('dragOver')
      const result = FileDropZoneService.handleDragOver(dragOverState)

      expect(result).toBe(dragOverState)
    })
  })

  describe('handleDragLeave', () => {
    it('should set drag leave state when drag over', () => {
      const dragOverState = DragState.create('dragOver')
      const result = FileDropZoneService.handleDragLeave(dragOverState)

      expect(result.isDragLeave()).toBe(true)
      expect(result).not.toBe(dragOverState)
    })

    it('should return same state when not drag over', () => {
      const idleState = DragState.create('idle')
      const result = FileDropZoneService.handleDragLeave(idleState)

      expect(result).toBe(idleState)
    })
  })

  describe('handleDrop', () => {
    it('should set idle state for any drag state', () => {
      const states = [
        DragState.create('idle'),
        DragState.create('dragOver'),
        DragState.create('dragLeave')
      ]

      states.forEach(state => {
        const result = FileDropZoneService.handleDrop(state)
        expect(result.isIdle()).toBe(true)
      })
    })

    it('should create new state instance', () => {
      const dragOverState = DragState.create('dragOver')
      const result = FileDropZoneService.handleDrop(dragOverState)

      expect(result).not.toBe(dragOverState)
      expect(result.isIdle()).toBe(true)
    })
  })
})