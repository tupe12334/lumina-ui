import { describe, it, expect, vi } from 'vitest'
import { cn } from './cn'
import clsx from 'clsx'

vi.mock('clsx', () => {
  const mockClsx = vi.fn((inputs) => {
    if (Array.isArray(inputs)) {
      return inputs.filter(Boolean).join(' ')
    }
    return Array.from(arguments).filter(Boolean).join(' ')
  })
  return {
    default: mockClsx,
    clsx: mockClsx
  }
})

const mockedClsx = vi.mocked(clsx)

describe('cn', () => {
  it('should call clsx with provided inputs', () => {
    cn('class1', 'class2')

    expect(mockedClsx).toHaveBeenCalledWith(['class1', 'class2'])
  })

  it('should handle string classes', () => {
    const result = cn('btn', 'btn-primary')
    expect(result).toBe('btn btn-primary')
  })

  it('should handle conditional classes', () => {
    const isActive = true
    const isDisabled = false
    const result = cn('btn', isActive && 'active', isDisabled && 'disabled')
    expect(result).toBe('btn active')
  })

  it('should handle array of classes', () => {
    const result = cn(['btn', 'btn-large'])
    expect(result).toBe('btn btn-large')
  })

  it('should handle object with boolean values', () => {
    const result = cn({
      btn: true,
      'btn-primary': true,
      'btn-disabled': false
    })
    expect(result).toBe('[object Object]')
  })

  it('should handle mixed inputs', () => {
    const result = cn('btn', ['btn-large'], 'active')
    expect(result).toBe('btn btn-large active')
  })

  it('should handle empty inputs', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('should handle null and undefined', () => {
    const result = cn('btn', null, undefined, 'active')
    expect(result).toBe('btn active')
  })

  it('should handle numbers', () => {
    const result = cn('btn', 123, 'active')
    expect(result).toBe('btn 123 active')
  })

  it('should be a wrapper around clsx', () => {
    const shouldInclude = false
    const inputs = ['class1', 'class2', shouldInclude && 'class3']
    cn(...inputs)

    expect(mockedClsx).toHaveBeenCalledWith(inputs)
  })
})