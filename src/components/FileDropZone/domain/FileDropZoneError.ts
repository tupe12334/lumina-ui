export class FileDropZoneError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly fileId?: string
  ) {
    super(message)
    this.name = 'FileDropZoneError'
  }
}

export class FileValidationError extends FileDropZoneError {
  constructor(message: string, fileId?: string) {
    super(message, 'VALIDATION_ERROR', fileId)
    this.name = 'FileValidationError'
  }
}

export class FileUploadError extends FileDropZoneError {
  constructor(message: string, fileId?: string) {
    super(message, 'UPLOAD_ERROR', fileId)
    this.name = 'FileUploadError'
  }
}

export class FileSizeError extends FileValidationError {
  constructor(actualSize: number, maxSize: number, fileId?: string) {
    const actualSizeMB = Math.round(actualSize / 1024 / 1024)
    const maxSizeMB = Math.round(maxSize / 1024 / 1024)
    super(`File size ${actualSizeMB}MB exceeds maximum allowed size of ${maxSizeMB}MB`, fileId)
    this.name = 'FileSizeError'
  }
}

export class FileTypeError extends FileValidationError {
  constructor(actualType: string, allowedTypes: string[], fileId?: string) {
    const typesList = allowedTypes.join(', ')
    super(`File type "${actualType}" is not allowed. Allowed types: ${typesList}`, fileId)
    this.name = 'FileTypeError'
  }
}

export class FileCountError extends FileValidationError {
  constructor(actualCount: number, maxCount: number) {
    super(`Cannot upload ${actualCount} files. Maximum allowed: ${maxCount}`)
    this.name = 'FileCountError'
  }
}