import { FileDropZoneError } from './FileDropZoneBaseError'

export class FileUploadError extends FileDropZoneError {
  constructor(message: string, fileId?: string) {
    super(message, 'UPLOAD_ERROR', fileId)
    this.name = 'FileUploadError'
  }
}