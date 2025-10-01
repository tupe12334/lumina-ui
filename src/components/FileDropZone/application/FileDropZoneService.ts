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

    // Validate file count
    const countError = validationRules.validateFileList(fileArray, currentFilesList.length)
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
        const isDuplicate = currentFilesList.some(
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


}