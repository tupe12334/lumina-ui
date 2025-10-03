import { describe, it, expect, vi } from 'vitest'
import { debounce } from './debounce'
import { debounce as lodashDebounce } from 'lodash-es'

vi.mock('lodash-es', () => ({
  debounce: vi.fn((func, delay) => {
    let timeoutId: NodeJS.Timeout
    return (...args: unknown[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  })
}))

const mockedLodashDebounce = vi.mocked(lodashDebounce)

describe('debounce', () => {
  beforeEach(() => {
    vi.clearAllTimers()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should call lodash debounce with function and delay', () => {
    const mockFunc = vi.fn()

    debounce(mockFunc, 100)

    expect(mockedLodashDebounce).toHaveBeenCalledWith(mockFunc, 100)
  })

  it('should return a debounced function', () => {
    const mockFunc = vi.fn()
    const debouncedFunc = debounce(mockFunc, 100)

    expect(typeof debouncedFunc).toBe('function')
  })

  it('should delay function execution', () => {
    const mockFunc = vi.fn()
    const debouncedFunc = debounce(mockFunc, 100)

    debouncedFunc('test')

    expect(mockFunc).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)

    expect(mockFunc).toHaveBeenCalledWith('test')
  })

  it('should cancel previous calls when called again', () => {
    const mockFunc = vi.fn()
    const debouncedFunc = debounce(mockFunc, 100)

    debouncedFunc('first')
    vi.advanceTimersByTime(50)

    debouncedFunc('second')
    vi.advanceTimersByTime(100)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(mockFunc).toHaveBeenCalledWith('second')
  })

  it('should handle multiple arguments', () => {
    const mockFunc = vi.fn()
    const debouncedFunc = debounce(mockFunc, 100)

    debouncedFunc('arg1', 'arg2', 'arg3')
    vi.advanceTimersByTime(100)

    expect(mockFunc).toHaveBeenCalledWith('arg1', 'arg2', 'arg3')
  })

  it('should work with different delay values', () => {
    const mockFunc1 = vi.fn()
    const mockFunc2 = vi.fn()
    const debouncedFunc1 = debounce(mockFunc1, 50)
    const debouncedFunc2 = debounce(mockFunc2, 200)

    debouncedFunc1('test1')
    debouncedFunc2('test2')

    vi.advanceTimersByTime(50)
    expect(mockFunc1).toHaveBeenCalledWith('test1')
    expect(mockFunc2).not.toHaveBeenCalled()

    vi.advanceTimersByTime(150)
    expect(mockFunc2).toHaveBeenCalledWith('test2')
  })

  it('should preserve function context and return type', () => {
    const mockFunc = vi.fn((x: number, y: string) => `${x}-${y}`)
    const debouncedFunc = debounce(mockFunc, 100)

    debouncedFunc(42, 'test')
    vi.advanceTimersByTime(100)

    expect(mockFunc).toHaveBeenCalledWith(42, 'test')
  })

  it('should handle no arguments', () => {
    const mockFunc = vi.fn()
    const debouncedFunc = debounce(mockFunc, 100)

    debouncedFunc()
    vi.advanceTimersByTime(100)

    expect(mockFunc).toHaveBeenCalledWith()
  })

  it('should work with async functions', () => {
    const mockAsyncFunc = vi.fn(async (value: string) => `async-${value}`)
    const debouncedFunc = debounce(mockAsyncFunc, 100)

    debouncedFunc('test')
    vi.advanceTimersByTime(100)

    expect(mockAsyncFunc).toHaveBeenCalledWith('test')
  })

  it('should handle rapid successive calls', () => {
    const mockFunc = vi.fn()
    const debouncedFunc = debounce(mockFunc, 100)

    // Rapidly call the function multiple times
    for (let i = 0; i < 10; i++) {
      debouncedFunc(`call-${i}`)
      vi.advanceTimersByTime(10)
    }

    // Only the last call should execute
    vi.advanceTimersByTime(100)

    expect(mockFunc).toHaveBeenCalledTimes(1)
    expect(mockFunc).toHaveBeenCalledWith('call-9')
  })
})