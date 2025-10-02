import { FileStatusValue } from './FileStatus'
import { type FileStatus } from './FileStatusType'
import { type FileUploadData } from './FileUploadData'
import { FileUploadMethods } from './FileUploadMethods'
import { FileUploadDataConverter } from './FileUploadDataConverter'

export class FileUpload {
  private constructor(
    private readonly id: string,
    private readonly file: File,
    private readonly status: FileStatusValue,
    private readonly progress: number,
    private readonly error?: string,
    private readonly previewUrl?: string
  ) {}

  public static create(file: File, id?: string): FileUpload {
    const fileId = id || `${file.name}-${file.size}-${Date.now()}`
    const status = FileStatusValue.create('pending')
    return new FileUpload(fileId, file, status, 0)
  }

  public static fromData(data: FileUploadData): FileUpload {
    const status = FileStatusValue.create(data.status)
    return new FileUpload(
      data.id,
      data.file,
      status,
      data.progress,
      data.error,
      data.previewUrl
    )
  }

  public getId(): string {
    return this.id
  }

  public getFile(): File {
    return this.file
  }

  public getStatus(): FileStatusValue {
    return this.status
  }

  public getProgress(): number {
    return this.progress
  }

  public getError(): string | undefined {
    return this.error
  }

  public getPreviewUrl(): string | undefined {
    return this.previewUrl
  }

  public getName(): string {
    return this.file.name
  }

  public getSize(): number {
    return this.file.size
  }

  public getType(): string {
    return this.file.type
  }

  public withStatus(status: FileStatus): FileUpload {
    const result = FileUploadMethods.withStatus(this.id, this.file, this.progress, this.error, this.previewUrl, status)
    return new FileUpload(result.id, result.file, result.status, result.progress, result.error, result.previewUrl)
  }

  public withProgress(progress: number): FileUpload {
    const result = FileUploadMethods.withProgress(this.id, this.file, this.status, this.error, this.previewUrl, progress)
    return new FileUpload(result.id, result.file, result.status, result.progress, result.error, result.previewUrl)
  }

  public withError(error: string): FileUpload {
    const result = FileUploadMethods.withError(this.id, this.file, this.progress, this.previewUrl, error)
    return new FileUpload(result.id, result.file, result.status, result.progress, result.error, result.previewUrl)
  }

  public withPreviewUrl(previewUrl: string): FileUpload {
    const result = FileUploadMethods.withPreviewUrl(this.id, this.file, this.status, this.progress, this.error, previewUrl)
    return new FileUpload(result.id, result.file, result.status, result.progress, result.error, result.previewUrl)
  }

  public clearError(): FileUpload {
    const result = FileUploadMethods.clearError(this.id, this.file, this.status, this.progress, this.previewUrl)
    return new FileUpload(result.id, result.file, result.status, result.progress, result.error, result.previewUrl)
  }

  public toData(): FileUploadData {
    return FileUploadDataConverter.toData(this.id, this.file, this.status, this.progress, this.error, this.previewUrl)
  }
}