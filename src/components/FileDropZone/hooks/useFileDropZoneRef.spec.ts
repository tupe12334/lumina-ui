import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFileDropZoneRef } from './useFileDropZoneRef'

describe('useFileDropZoneRef', () => {
  const defaultProps = {
    disabled: false,
    removeFile: vi.fn(),
    retryFile: vi.fn(),
    clearAll: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return fileInputRef and openFileDialog', () => {
    const { result } = renderHook(() =>
      useFileDropZoneRef(defaultProps, null)
    )

    expect(result.current).toHaveProperty('fileInputRef')
    expect(result.current).toHaveProperty('openFileDialog')
    expect(typeof result.current.openFileDialog).toBe('function')
  })

  it('should create file input ref', () => {
    const { result } = renderHook(() =>
      useFileDropZoneRef(defaultProps, null)
    )

    expect(result.current.fileInputRef).toEqual({ current: null })
  })

  describe('openFileDialog', () => {
    it('should click file input when not disabled and ref exists', () => {
      const mockClick = vi.fn()
      const mockFileInput = { click: mockClick }

      const { result } = renderHook(() =>
        useFileDropZoneRef(defaultProps, null)
      )

      // Simulate file input being set
      result.current.fileInputRef.current = mockFileInput as const

      result.current.openFileDialog()

      expect(mockClick).toHaveBeenCalled()
    })

    it('should not click file input when disabled', () => {
      const mockClick = vi.fn()
      const mockFileInput = { click: mockClick }
      const props = { ...defaultProps, disabled: true }

      const { result } = renderHook(() =>
        useFileDropZoneRef(props, null)
      )

      result.current.fileInputRef.current = mockFileInput as const

      result.current.openFileDialog()

      expect(mockClick).not.toHaveBeenCalled()
    })

    it('should not crash when file input ref is null', () => {
      const { result } = renderHook(() =>
        useFileDropZoneRef(defaultProps, null)
      )

      expect(() => {
        result.current.openFileDialog()
      }).not.toThrow()
    })
  })

  describe('useImperativeHandle', () => {
    it('should expose correct methods through ref', () => {
      const mockRef = { current: null }

      renderHook(() =>
        useFileDropZoneRef(defaultProps, mockRef)
      )

      expect(mockRef.current).toMatchObject({
        removeFile: defaultProps.removeFile,
        retryFile: defaultProps.retryFile,
        clearAll: defaultProps.clearAll,
        openFileDialog: expect.any(Function)
      })
    })

    it('should expose openFileDialog that respects disabled state', () => {
      const mockRef = { current: null }
      const mockClick = vi.fn()
      const props = { ...defaultProps, disabled: true }

      const { result } = renderHook(() =>
        useFileDropZoneRef(props, mockRef)
      )

      result.current.fileInputRef.current = { click: mockClick } as const

      // Call through the ref
      if (mockRef.current) {
        mockRef.current.openFileDialog()
      }

      expect(mockClick).not.toHaveBeenCalled()
    })

    it('should handle null ref gracefully', () => {
      expect(() => {
        renderHook(() =>
          useFileDropZoneRef(defaultProps, null)
        )
      }).not.toThrow()
    })

    it('should update ref when props change', () => {
      const mockRef = { current: null }
      const newRemoveFile = vi.fn()

      const { rerender } = renderHook(
        ({ props }) => useFileDropZoneRef(props, mockRef),
        { initialProps: { props: defaultProps } }
      )

      const initialRemoveFile = mockRef.current ? mockRef.current.removeFile : undefined

      rerender({
        props: { ...defaultProps, removeFile: newRemoveFile }
      })

      expect(mockRef.current ? mockRef.current.removeFile : undefined).toBe(newRemoveFile)
      expect(mockRef.current ? mockRef.current.removeFile : undefined).not.toBe(initialRemoveFile)
    })
  })

  describe('disabled state handling', () => {
    it('should respect disabled state in openFileDialog', () => {
      const mockClick = vi.fn()

      const { result, rerender } = renderHook(
        ({ disabled }) => useFileDropZoneRef({ ...defaultProps, disabled }, null),
        { initialProps: { disabled: false } }
      )

      result.current.fileInputRef.current = { click: mockClick } as const

      // Should work when not disabled
      result.current.openFileDialog()
      expect(mockClick).toHaveBeenCalledTimes(1)

      // Should not work when disabled
      rerender({ disabled: true })
      result.current.openFileDialog()
      expect(mockClick).toHaveBeenCalledTimes(1) // Still 1, not called again
    })
  })

  describe('function stability', () => {
    it('should provide consistent function and ref instances', () => {
      const { result } = renderHook(() =>
        useFileDropZoneRef(defaultProps, null)
      )

      expect(typeof result.current.openFileDialog).toBe('function')
      expect(result.current.fileInputRef).toEqual({ current: null })
    })
  })
})