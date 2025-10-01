import { FileUpload } from '../domain/FileUpload'
import { FileValidationRules, type FileValidationConfig } from '../domain/FileValidation'
import { DragState } from '../domain/DragState'
import { DragEvent } from 'react'

export interface UseFileDropZoneConfig extends Partial<FileValidationConfig> {
  onFilesAdded?: (files: FileUpload[]) => void
  onFileRemoved?: (fileId: string) => void
  onFileRetried?: (fileId: string) => void
  onError?: (errors: string[]) => void
  autoUpload?: boolean
}

export interface UseFileDropZoneReturn {
  files: FileUpload[]
  dragState: DragState
  validationRules: FileValidationRules
  isDragActive: boolean

  // Event handlers
  handleDragEnter: (e: DragEvent<HTMLDivElement>) => void
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void
  handleDragLeave: (e: DragEvent<HTMLDivElement>) => void
  handleDrop: (e: DragEvent<HTMLDivElement>) => void
  handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void

  // Actions
  addFiles: (files: FileList | File[]) => void
  removeFile: (fileId: string) => void
  retryFile: (fileId: string) => void
  clearAll: () => void
  updateFileProgress: (fileId: string, progress: number) => void
  updateFileStatus: (fileId: string, status: 'pending' | 'uploading' | 'uploaded' | 'processing' | 'completed' | 'failed') => void
  updateFileError: (fileId: string, error: string) => void

  // Utils
  getFileInputProps: () => {
    type: 'file'
    multiple: boolean
    accept: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
}