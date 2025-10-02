import { type FileStatus } from './FileStatusType'

export class FileStatusValue {
  private constructor(private readonly status: FileStatus) {}

  public static create(status?: FileStatus): FileStatusValue {
    const defaultStatus = status || 'pending'
    return new FileStatusValue(defaultStatus)
  }

  public getStatus(): FileStatus {
    return this.status
  }

  public isPending(): boolean {
    return this.status === 'pending'
  }

  public isUploading(): boolean {
    return this.status === 'uploading'
  }

  public isUploaded(): boolean {
    return this.status === 'uploaded'
  }

  public isProcessing(): boolean {
    return this.status === 'processing'
  }

  public isCompleted(): boolean {
    return this.status === 'completed'
  }

  public isFailed(): boolean {
    return this.status === 'failed'
  }

  public isActive(): boolean {
    return this.status === 'uploading' || this.status === 'processing'
  }

  public canRetry(): boolean {
    return this.status === 'failed'
  }
}