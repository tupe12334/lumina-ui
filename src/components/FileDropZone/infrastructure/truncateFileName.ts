import { getFileExtension } from './getFileExtension'

export function truncateFileName(fileName: string, maxLength?: number): string {
  const maxLen = maxLength || 30
  if (fileName.length <= maxLen) {
    return fileName
  }

  const extension = getFileExtension(fileName)
  const nameWithoutExtension = fileName.slice(0, fileName.lastIndexOf('.'))
  const truncatedName = nameWithoutExtension.slice(0, maxLen - extension.length - 3)

  return `${truncatedName}...${extension}`
}