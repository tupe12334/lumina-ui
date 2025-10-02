import { FileValidationError } from './FileValidationError'

export class FileTypeError extends FileValidationError {
  constructor(actualType: string, allowedTypes: string[], fileId?: string) {
    const typesList = allowedTypes.join(', ')
    super(`File type "${actualType}" is not allowed. Allowed types: ${typesList}`, fileId)
    this.name = 'FileTypeError'
  }
}