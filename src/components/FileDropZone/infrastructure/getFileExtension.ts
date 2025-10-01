import { extname } from 'path-browserify'

export function getFileExtension(fileName: string): string {
  return extname(fileName)
}