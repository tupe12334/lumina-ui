import { type FileStatus } from './FileStatusType'

export interface FileUploadData {
  id: string
  file: File
  status: FileStatus
  progress: number
  error?: string
  previewUrl?: string
}