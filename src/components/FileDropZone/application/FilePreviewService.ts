import { FileUpload } from '../domain/FileUpload'

export class FilePreviewService {
  public static generatePreviewUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/')) {
        reject(new Error('File is not an image'))
        return
      }

      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result
        if (typeof result === 'string') {
          resolve(result)
        } else {
          reject(new Error('Failed to read file as string'))
        }
      }
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
            return fileUpload
          }
        }
        return fileUpload
      })
    )

    return filesWithPreviews
  }
}