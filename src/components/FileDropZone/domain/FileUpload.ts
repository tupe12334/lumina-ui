import { FileStatusValue, type FileStatus } from './FileStatus'

export interface FileUploadData {
  id: string
  file: File
  status: FileStatus
  progress: number
  error?: string
  previewUrl?: string
}

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
    const newStatus = FileStatusValue.create(status)
    return new FileUpload(
      this.id,
      this.file,
      newStatus,
      this.progress,
      this.error,
      this.previewUrl
    )
  }

  public withProgress(progress: number): FileUpload {
    const clampedProgress = Math.max(0, Math.min(100, progress))
    return new FileUpload(
      this.id,
      this.file,
      this.status,
      clampedProgress,
      this.error,
      this.previewUrl
    )
  }

  public withError(error: string): FileUpload {
    const failedStatus = FileStatusValue.create('failed')
    return new FileUpload(
      this.id,
      this.file,
      failedStatus,
      this.progress,
      error,
      this.previewUrl
    )
  }

  public withPreviewUrl(previewUrl: string): FileUpload {
    return new FileUpload(
      this.id,
      this.file,
      this.status,
      this.progress,
      this.error,
      previewUrl
    )
  }

  public clearError(): FileUpload {
    return new FileUpload(
      this.id,
      this.file,
      this.status,
      this.progress,
      undefined,
      this.previewUrl
    )
  }

  public toData(): FileUploadData {
    return {
      id: this.id,
      file: this.file,
      status: this.status.getStatus(),
      progress: this.progress,
      error: this.error,
      previewUrl: this.previewUrl
    }
  }
}