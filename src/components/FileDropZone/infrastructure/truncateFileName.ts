import { getFileExtension } from './getFileExtension'

export function truncateFileName(fileName: string, maxLength?: number): string {
  const maxLen = maxLength || 30
  if (fileName.length <= maxLen) {
    return fileName
  }

  const extension = getFileExtension(fileName)
  const lastDotIndex = fileName.lastIndexOf('.')
  const nameWithoutExtension = lastDotIndex > 0 ? fileName.slice(0, lastDotIndex) : fileName

  // For files without extensions, we only need to subtract 3 for the "..."
  // For files with extensions, we subtract 3 for "..." plus the extension length
  const ellipsisLength = 3
  const reservedLength = extension.length > 0 ? extension.length + ellipsisLength : ellipsisLength
  const truncatedName = nameWithoutExtension.slice(0, maxLen - reservedLength)

  return `${truncatedName}...${extension}`
}