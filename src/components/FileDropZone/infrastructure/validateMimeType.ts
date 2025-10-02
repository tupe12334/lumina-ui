export function validateMimeType(file: File, acceptedTypes: string[]): boolean {
  if (acceptedTypes.includes('*/*')) {
    return true
  }

  return acceptedTypes.some(type => {
    if (type.endsWith('/*')) {
      const baseType = type.slice(0, -2)
      return file.type.startsWith(baseType)
    }
    return file.type === type
  })
}