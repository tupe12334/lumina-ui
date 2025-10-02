import { FileStatusValue } from './FileStatus'
import { type FileStatus } from './FileStatusType'

export class FileUploadMethods {
  public static withStatus(
    id: string,
    file: File,
    progress: number,
    error: string | undefined,
    previewUrl: string | undefined,
    newStatus: FileStatus
  ) {
    const status = FileStatusValue.create(newStatus)
    return {
      id,
      file,
      status,
      progress,
      error,
      previewUrl
    }
  }

  public static withProgress(
    id: string,
    file: File,
    status: FileStatusValue,
    error: string | undefined,
    previewUrl: string | undefined,
    newProgress: number
  ) {
    const clampedProgress = Math.max(0, Math.min(100, newProgress))
    return {
      id,
      file,
      status,
      progress: clampedProgress,
      error,
      previewUrl
    }
  }

  public static withError(
    id: string,
    file: File,
    progress: number,
    previewUrl: string | undefined,
    newError: string
  ) {
    const failedStatus = FileStatusValue.create('failed')
    return {
      id,
      file,
      status: failedStatus,
      progress,
      error: newError,
      previewUrl
    }
  }

  public static withPreviewUrl(
    id: string,
    file: File,
    status: FileStatusValue,
    progress: number,
    error: string | undefined,
    newPreviewUrl: string
  ) {
    return {
      id,
      file,
      status,
      progress,
      error,
      previewUrl: newPreviewUrl
    }
  }

  public static clearError(
    id: string,
    file: File,
    status: FileStatusValue,
    progress: number,
    previewUrl: string | undefined
  ) {
    return {
      id,
      file,
      status,
      progress,
      error: undefined,
      previewUrl
    }
  }

}