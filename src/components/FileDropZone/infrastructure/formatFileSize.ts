import { filesize } from 'filesize'

export function formatFileSize(bytes: number): string {
  return filesize(bytes, { standard: 'jedec' })
}