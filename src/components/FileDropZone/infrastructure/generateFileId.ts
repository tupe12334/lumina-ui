import { nanoid } from 'nanoid'

export function generateFileId(file: File): string {
  return `${file.name}-${file.size}-${nanoid()}`
}