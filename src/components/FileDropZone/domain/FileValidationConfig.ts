export interface FileValidationConfig {
  maxFileSize: number // in bytes
  maxFiles: number
  acceptedTypes: string[]
  allowMultiple: boolean
}