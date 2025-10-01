import { FileUpload } from '../domain/FileUpload'
import { FileValidationRules } from '../domain/FileValidation'
import { DragState } from '../domain/DragState'
import { FileValidationError, FileCountError } from '../domain/FileDropZoneError'

export class FileDropZoneService {
  public static validateAndCreateFiles(
    files: FileList | File[],
    validationRules: FileValidationRules,
    currentFiles: FileUpload[] = []
  ): { validFiles: FileUpload[]; errors: string[] } {
    const fileArray = Array.from(files)
    const validFiles: FileUpload[] = []
    const errors: string[] = []

    // Validate file count
    const countError = validationRules.validateFileList(fileArray, currentFiles.length)
    if (countError) {
      errors.push(countError)
      return { validFiles, errors }
    }

    // Validate each file
    for (const file of fileArray) {
      const validationError = validationRules.validateFile(file)
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`)
      } else {
        // Check for duplicate files
        const isDuplicate = currentFiles.some(
          existingFile =>
            existingFile.getName() === file.name &&
            existingFile.getSize() === file.size
        )

        if (isDuplicate) {
          errors.push(`${file.name}: File already exists`)
        } else {
          validFiles.push(FileUpload.create(file))
        }
      }
    }

    return { validFiles, errors }
  }

  public static handleDragOver(dragState: DragState): DragState {
    if (dragState.isIdle() || dragState.isDragLeave()) {
      return dragState.setDragOver()
    }
    return dragState
  }

  public static handleDragLeave(dragState: DragState): DragState {
    if (dragState.isDragOver()) {
      return dragState.setDragLeave()
    }
    return dragState
  }

  public static handleDrop(dragState: DragState): DragState {
    return dragState.setIdle()
  }

  public static updateFileProgress(
    files: FileUpload[],
    fileId: string,
    progress: number
  ): FileUpload[] {
    return files.map(file =>
      file.getId() === fileId ? file.withProgress(progress) : file
    )
  }

  public static updateFileStatus(
    files: FileUpload[],
    fileId: string,
    status: 'pending' | 'uploading' | 'uploaded' | 'processing' | 'completed' | 'failed'
  ): FileUpload[] {
    return files.map(file =>
      file.getId() === fileId ? file.withStatus(status) : file
    )
  }

  public static updateFileError(
    files: FileUpload[],
    fileId: string,
    error: string
  ): FileUpload[] {
    return files.map(file =>
      file.getId() === fileId ? file.withError(error) : file
    )
  }

  public static removeFile(files: FileUpload[], fileId: string): FileUpload[] {
    return files.filter(file => file.getId() !== fileId)
  }

  public static clearAllFiles(): FileUpload[] {
    return []
  }

  public static retryFile(files: FileUpload[], fileId: string): FileUpload[] {
    return files.map(file =>
      file.getId() === fileId && file.getStatus().canRetry()
        ? file.clearError().withStatus('pending')
        : file
    )
  }

  public static generatePreviewUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('File is not an image'))
        return
      }

      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
  }

  public static async addPreviewUrls(files: FileUpload[]): Promise<FileUpload[]> {
    const filesWithPreviews = await Promise.all(
      files.map(async (fileUpload) => {
        const file = fileUpload.getFile()
        if (file.type.startsWith('image/')) {
          try {
            const previewUrl = await this.generatePreviewUrl(file)
            return fileUpload.withPreviewUrl(previewUrl)
          } catch {
            // If preview generation fails, return the file as is
            return fileUpload
          }
        }
        return fileUpload
      })
    )

    return filesWithPreviews
  }
}