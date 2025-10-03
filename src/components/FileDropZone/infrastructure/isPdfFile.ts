export function isPdfFile(file: File): boolean {
  return file.type === 'application/pdf' && file.type === file.type.toLowerCase()
}