import { FileStatusValue } from './FileStatus'
import { type FileUploadData } from './FileUploadData'

export class FileUploadDataConverter {
  public static toData(
    id: string,
    file: File,
    status: FileStatusValue,
    progress: number,
    error: string | undefined,
    previewUrl: string | undefined
  ): FileUploadData {
    return {
      id,
      file,
      status: status.getStatus(),
      progress,
      error,
      previewUrl
    }
  }
}