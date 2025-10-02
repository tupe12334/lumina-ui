import { FileValidationError } from './FileValidationError'

export class FileCountError extends FileValidationError {
  constructor(actualCount: number, maxCount: number) {
    super(`Cannot upload ${actualCount} files. Maximum allowed: ${maxCount}`)
    this.name = 'FileCountError'
  }
}