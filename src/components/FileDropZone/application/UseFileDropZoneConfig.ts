import { FileUpload } from '../domain/FileUpload'
import { type FileValidationConfig } from '../domain/FileValidationConfig'

export interface UseFileDropZoneConfig extends Partial<FileValidationConfig> {
  onFilesAdded?: (files: FileUpload[]) => void
  onFileRemoved?: (fileId: string) => void
  onFileRetried?: (fileId: string) => void
  onError?: (errors: string[]) => void
  autoUpload?: boolean
}