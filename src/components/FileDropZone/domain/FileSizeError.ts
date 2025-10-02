import { FileValidationError } from './FileValidationError'

export class FileSizeError extends FileValidationError {
  constructor(actualSize: number, maxSize: number, fileId?: string) {
    const actualSizeMB = Math.round(actualSize / 1024 / 1024)
    const maxSizeMB = Math.round(maxSize / 1024 / 1024)
    super(`File size ${actualSizeMB}MB exceeds maximum allowed size of ${maxSizeMB}MB`, fileId)
    this.name = 'FileSizeError'
  }
}