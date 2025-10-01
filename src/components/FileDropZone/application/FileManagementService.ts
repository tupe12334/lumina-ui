import { FileUpload } from '../domain/FileUpload'

export class FileManagementService {
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
}