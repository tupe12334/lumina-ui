import { debounce as lodashDebounce } from 'lodash-es'

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  return lodashDebounce(func, delay)
}