import { FileUpload } from '../domain/FileUpload'
import { FileValidationRules } from '../domain/FileValidation'
import { DragState } from '../domain/DragState'

export class FileDropZoneService {
  public static validateAndCreateFiles(
    files: FileList | File[],
    validationRules: FileValidationRules,
    currentFiles?: FileUpload[]
  ): { validFiles: FileUpload[]; errors: string[] } {
    const currentFilesList = currentFiles || []
    const fileArray = Array.from(files)
    const validFiles: FileUpload[] = []
    const errors: string[] = []

    // Check if we can add any files
    const maxFiles = validationRules.getMaxFiles()
    const currentCount = currentFilesList.length
    const availableSlots = maxFiles - currentCount

    if (availableSlots <= 0) {
      const countError = validationRules.validateFileList(fileArray, currentFilesList.length)
      if (countError) {
        errors.push(countError)
      }
      return { validFiles, errors }
    }

    // Validate each file up to available slots
    let processedCount = 0
    for (const file of fileArray) {
      if (processedCount >= availableSlots) {
        // Add error for files that exceed the limit
        if (fileArray.length > availableSlots) {
          const countError = validationRules.validateFileList(fileArray, currentFilesList.length)
          if (countError) {
            errors.push(countError)
          }
        }
        break
      }

      const validationError = validationRules.validateFile(file)
      if (validationError) {
        errors.push(`${file.name}: ${validationError}`)
      } else {
        // Check for duplicate files
        const isDuplicate = currentFilesList.some(
          existingFile =>
            existingFile.getName() === file.name &&
            existingFile.getSize() === file.size
        )

        if (isDuplicate) {
          errors.push(`${file.name}: File already exists`)
        } else {
          validFiles.push(FileUpload.create(file))
          processedCount++
        }
      }
    }

    // Add count error if we're trying to add too many files
    if (fileArray.length + currentCount > maxFiles) {
      const countError = validationRules.validateFileList(fileArray, currentFilesList.length)
      if (countError && !errors.includes(countError)) {
        errors.push(countError)
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


}