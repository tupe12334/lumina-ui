import { saveAs } from 'file-saver'

export function downloadFile(file: File, fileName?: string): void {
  saveAs(file, fileName || file.name)
}