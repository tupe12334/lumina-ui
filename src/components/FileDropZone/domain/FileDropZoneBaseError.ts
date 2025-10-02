export class FileDropZoneError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly fileId?: string
  ) {
    super(message)
    this.name = 'FileDropZoneError'
  }
}