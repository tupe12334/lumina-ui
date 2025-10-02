import { FileDropZoneError } from './FileDropZoneBaseError'

export class FileValidationError extends FileDropZoneError {
  constructor(message: string, fileId?: string) {
    super(message, 'VALIDATION_ERROR', fileId)
    this.name = 'FileValidationError'
  }
}