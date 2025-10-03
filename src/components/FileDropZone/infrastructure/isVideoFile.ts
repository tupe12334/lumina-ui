export function isVideoFile(file: File): boolean {
  return file.type.startsWith('video/') && file.type === file.type.toLowerCase()
}