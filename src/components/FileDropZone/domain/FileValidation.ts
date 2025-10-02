import { type FileValidationConfig } from './FileValidationConfig'

export class FileValidationRules {
  private constructor(private readonly config: FileValidationConfig) {}

  public static create(config?: Partial<FileValidationConfig>): FileValidationRules {
    const inputConfig = config || {}
    const defaultConfig: FileValidationConfig = {
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
      acceptedTypes: ['*/*'],
      allowMultiple: true
    }

    return new FileValidationRules({
      ...defaultConfig,
      ...inputConfig
    })
  }

  public getConfig(): FileValidationConfig {
    return { ...this.config }
  }

  public validateFile(file: File): string | null {
    // Check file size
    if (file.size > this.config.maxFileSize) {
      const maxSizeMB = Math.round(this.config.maxFileSize / 1024 / 1024)
      return `File size must be less than ${maxSizeMB}MB`
    }

    // Check file type if specific types are specified
    if (!this.config.acceptedTypes.includes('*/*')) {
      const isAccepted = this.config.acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          const baseType = type.slice(0, -2)
          return file.type.startsWith(baseType)
        }
        return file.type === type
      })

      if (!isAccepted) {
        return `File type "${file.type}" is not allowed`
      }
    }

    return null
  }

  public validateFileList(files: File[], currentCount?: number): string | null {
    const count = currentCount || 0
    // Check max files limit
    if (!this.config.allowMultiple && files.length > 1) {
      return 'Only one file is allowed'
    }

    if (count + files.length > this.config.maxFiles) {
      return `Cannot upload more than ${this.config.maxFiles} files total`
    }

    return null
  }

  public getAcceptAttribute(): string {
    if (this.config.acceptedTypes.includes('*/*')) {
      return '*/*'
    }
    return this.config.acceptedTypes.join(',')
  }

  public getMaxFileSizeMB(): number {
    return Math.round(this.config.maxFileSize / 1024 / 1024)
  }

  public formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    if (i >= sizes.length || i < 0) {
      return 'File too large'
    }
    const sizeUnit = sizes[Math.min(i, sizes.length - 1)]
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizeUnit
  }
}