import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDragHandlers } from './useDragHandlers'
import { DragState } from '../domain/DragState'

describe('useDragHandlers', () => {
  let mockSetDragState: ReturnType<typeof vi.fn>
  let mockOnDrop: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockSetDragState = vi.fn()
    mockOnDrop = vi.fn()
  })

  const createMockDragEvent = (overrides = {}) => ({
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
    dataTransfer: {
      items: { length: 1 },
      files: []
    },
    ...overrides
  }) as const

  describe('handleDragEnter', () => {
    it('should prevent default and stop propagation', () => {
      const { result } = renderHook(() => useDragHandlers({ setDragState: mockSetDragState, onDrop: mockOnDrop }))
      const event = createMockDragEvent()

      act(() => {
        result.current.handleDragEnter(event)
      })

      expect(event.preventDefault).toHaveBeenCalled()
      expect(event.stopPropagation).toHaveBeenCalled()
    })

    it('should update drag state when items are present', () => {
      const { result } = renderHook(() => useDragHandlers({ setDragState: mockSetDragState, onDrop: mockOnDrop }))
      const event = createMockDragEvent({
        dataTransfer: { items: { length: 1 } }
      })

      act(() => {
        result.current.handleDragEnter(event)
      })

      expect(mockSetDragState).toHaveBeenCalledWith(expect.any(Function))
    })

    it('should not update drag state when no items present', () => {
      const { result } = renderHook(() => useDragHandlers({ setDragState: mockSetDragState, onDrop: mockOnDrop }))
      const event = createMockDragEvent({
        dataTransfer: { items: null }
      })

      act(() => {
        result.current.handleDragEnter(event)
      })

      expect(mockSetDragState).not.toHaveBeenCalled()
    })
  })

  describe('handleDragOver', () => {
    it('should prevent default and stop propagation', () => {
      const { result } = renderHook(() => useDragHandlers({ setDragState: mockSetDragState, onDrop: mockOnDrop }))
      const event = createMockDragEvent()

      act(() => {
        result.current.handleDragOver(event)
      })

      expect(event.preventDefault).toHaveBeenCalled()
      expect(event.stopPropagation).toHaveBeenCalled()
    })
  })

  describe('handleDragLeave', () => {
    it('should prevent default and stop propagation', () => {
      const { result } = renderHook(() => useDragHandlers({ setDragState: mockSetDragState, onDrop: mockOnDrop }))
      const event = createMockDragEvent()

      act(() => {
        result.current.handleDragLeave(event)
      })

      expect(event.preventDefault).toHaveBeenCalled()
      expect(event.stopPropagation).toHaveBeenCalled()
    })

    it('should update drag state when drag counter reaches zero', () => {
      const { result } = renderHook(() => useDragHandlers({ setDragState: mockSetDragState, onDrop: mockOnDrop }))
      const event = createMockDragEvent()

      // Enter first to increment counter
      act(() => {
        result.current.handleDragEnter(event)
      })

      mockSetDragState.mockClear()

      // Leave to decrement counter to zero
      act(() => {
        result.current.handleDragLeave(event)
      })

      expect(mockSetDragState).toHaveBeenCalledWith(expect.any(Function))
    })

    it('should not update drag state when drag counter is not zero', () => {
      const { result } = renderHook(() => useDragHandlers({ setDragState: mockSetDragState, onDrop: mockOnDrop }))
      const event = createMockDragEvent()

      // Enter twice
      act(() => {
        result.current.handleDragEnter(event)
        result.current.handleDragEnter(event)
      })

      mockSetDragState.mockClear()

      // Leave once (counter still > 0)
      act(() => {
        result.current.handleDragLeave(event)
      })

      expect(mockSetDragState).not.toHaveBeenCalled()
    })
  })

  describe('handleDrop', () => {
    it('should prevent default and stop propagation', () => {
      const { result } = renderHook(() => useDragHandlers({ setDragState: mockSetDragState, onDrop: mockOnDrop }))
      const event = createMockDragEvent()

      act(() => {
        result.current.handleDrop(event)
      })

      expect(event.preventDefault).toHaveBeenCalled()
      expect(event.stopPropagation).toHaveBeenCalled()
    })

    it('should reset drag counter and update state', () => {
      const { result } = renderHook(() => useDragHandlers({ setDragState: mockSetDragState, onDrop: mockOnDrop }))
      const event = createMockDragEvent()

      act(() => {
        result.current.handleDrop(event)
      })

      expect(mockSetDragState).toHaveBeenCalledWith(expect.any(Function))
    })

    it('should call onDrop when files are present', () => {
      const { result } = renderHook(() => useDragHandlers({ setDragState: mockSetDragState, onDrop: mockOnDrop }))
      const mockFiles = [new File(['test'], 'test.txt')] as const
      const event = createMockDragEvent({
        dataTransfer: { files: mockFiles }
      })

      act(() => {
        result.current.handleDrop(event)
      })

      expect(mockOnDrop).toHaveBeenCalledWith(mockFiles)
    })

    it('should not call onDrop when no files present', () => {
      const { result } = renderHook(() => useDragHandlers({ setDragState: mockSetDragState, onDrop: mockOnDrop }))
      const event = createMockDragEvent({
        dataTransfer: { files: null }
      })

      act(() => {
        result.current.handleDrop(event)
      })

      expect(mockOnDrop).not.toHaveBeenCalled()
    })
  })

  describe('drag counter management', () => {
    it('should properly track multiple drag enters and leaves', () => {
      const { result } = renderHook(() => useDragHandlers({ setDragState: mockSetDragState, onDrop: mockOnDrop }))
      const event = createMockDragEvent()

      // Multiple enters
      act(() => {
        result.current.handleDragEnter(event)
        result.current.handleDragEnter(event)
        result.current.handleDragEnter(event)
      })

      mockSetDragState.mockClear()

      // Leave twice (counter still > 0)
      act(() => {
        result.current.handleDragLeave(event)
        result.current.handleDragLeave(event)
      })

      expect(mockSetDragState).not.toHaveBeenCalled()

      // Final leave (counter reaches 0)
      act(() => {
        result.current.handleDragLeave(event)
      })

      expect(mockSetDragState).toHaveBeenCalledWith(expect.any(Function))
    })

    it('should reset counter on drop', () => {
      const { result } = renderHook(() => useDragHandlers({ setDragState: mockSetDragState, onDrop: mockOnDrop }))
      const event = createMockDragEvent()

      // Multiple enters
      act(() => {
        result.current.handleDragEnter(event)
        result.current.handleDragEnter(event)
      })

      // Drop should reset counter
      act(() => {
        result.current.handleDrop(event)
      })

      mockSetDragState.mockClear()

      // Next enter and leave should trigger state update (counter starts fresh from 0)
      act(() => {
        result.current.handleDragEnter(event)
        result.current.handleDragLeave(event)
      })

      expect(mockSetDragState).toHaveBeenCalled()
    })
  })
})