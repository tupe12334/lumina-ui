import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFileDropZoneComponent } from './useFileDropZoneComponent'
import { useFileDropZone } from '../application/useFileDropZone'
import { useFileDropZoneRef } from './useFileDropZoneRef'

vi.mock('../application/useFileDropZone', () => ({
  useFileDropZone: vi.fn(() => ({
    files: [],
    validationRules: {
      getConfig: vi.fn(() => ({ maxFiles: 5 })),
      getMaxFileSizeMB: vi.fn(() => 10)
    },
    isDragActive: false,
    handleDragEnter: vi.fn(),
    handleDragOver: vi.fn(),
    handleDragLeave: vi.fn(),
    handleDrop: vi.fn(),
    removeFile: vi.fn(),
    retryFile: vi.fn(),
    clearAll: vi.fn(),
    getFileInputProps: vi.fn()
  }))
}))

vi.mock('./useFileDropZoneRef', () => ({
  useFileDropZoneRef: vi.fn(() => ({
    fileInputRef: { current: null },
    openFileDialog: vi.fn()
  }))
}))

const mockedUseFileDropZone = vi.mocked(useFileDropZone)
const mockedUseFileDropZoneRef = vi.mocked(useFileDropZoneRef)

describe('useFileDropZoneComponent', () => {
  const defaultProps = {
    disabled: false,
    maxFileSize: 5 * 1024 * 1024,
    maxFiles: 3
  }

  it('should return all necessary properties and methods', () => {
    const { result } = renderHook(() =>
      useFileDropZoneComponent(defaultProps, null)
    )

    expect(result.current).toHaveProperty('files')
    expect(result.current).toHaveProperty('isDragActive')
    expect(result.current).toHaveProperty('handleDragEnter')
    expect(result.current).toHaveProperty('handleDragOver')
    expect(result.current).toHaveProperty('handleDragLeave')
    expect(result.current).toHaveProperty('handleDrop')
    expect(result.current).toHaveProperty('removeFile')
    expect(result.current).toHaveProperty('retryFile')
    expect(result.current).toHaveProperty('clearAll')
    expect(result.current).toHaveProperty('getFileInputProps')
    expect(result.current).toHaveProperty('fileInputRef')
    expect(result.current).toHaveProperty('openFileDialog')
    expect(result.current).toHaveProperty('maxFiles')
    expect(result.current).toHaveProperty('maxFileSize')
  })

  it('should pass config to useFileDropZone without disabled prop', () => {
    const props = {
      disabled: true,
      maxFileSize: 10 * 1024 * 1024,
      acceptedTypes: ['image/*']
    }

    renderHook(() => useFileDropZoneComponent(props, null))

    expect(mockedUseFileDropZone).toHaveBeenCalledWith({
      maxFileSize: 10 * 1024 * 1024,
      acceptedTypes: ['image/*']
    })
  })

  it('should pass disabled and actions to useFileDropZoneRef', () => {
    const mockRef = { current: null }
    const props = { ...defaultProps, disabled: true }

    renderHook(() => useFileDropZoneComponent(props, mockRef))

    expect(mockedUseFileDropZoneRef).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: true,
        removeFile: expect.any(Function),
        retryFile: expect.any(Function),
        clearAll: expect.any(Function)
      }),
      mockRef
    )
  })

  it('should extract maxFiles from validation rules', () => {
    const { result } = renderHook(() =>
      useFileDropZoneComponent(defaultProps, null)
    )

    expect(result.current.maxFiles).toBe(5)
  })

  it('should extract maxFileSize from validation rules', () => {
    const { result } = renderHook(() =>
      useFileDropZoneComponent(defaultProps, null)
    )

    expect(result.current.maxFileSize).toBe(10)
  })

  it('should handle ref forwarding', () => {
    const mockRef = { current: null }

    renderHook(() => useFileDropZoneComponent(defaultProps, mockRef))

    expect(mockedUseFileDropZoneRef).toHaveBeenCalledWith(
      expect.any(Object),
      mockRef
    )
  })

  it('should pass through all drag handlers', () => {
    const { result } = renderHook(() =>
      useFileDropZoneComponent(defaultProps, null)
    )

    expect(typeof result.current.handleDragEnter).toBe('function')
    expect(typeof result.current.handleDragOver).toBe('function')
    expect(typeof result.current.handleDragLeave).toBe('function')
    expect(typeof result.current.handleDrop).toBe('function')
  })

  it('should pass through all file management methods', () => {
    const { result } = renderHook(() =>
      useFileDropZoneComponent(defaultProps, null)
    )

    expect(typeof result.current.removeFile).toBe('function')
    expect(typeof result.current.retryFile).toBe('function')
    expect(typeof result.current.clearAll).toBe('function')
    expect(typeof result.current.getFileInputProps).toBe('function')
  })

  it('should handle empty config', () => {
    const props = { disabled: false }

    renderHook(() => useFileDropZoneComponent(props, null))

    expect(mockedUseFileDropZone).toHaveBeenCalledWith({})
  })

  it('should preserve additional config properties', () => {
    const props = {
      disabled: false,
      acceptedTypes: ['image/*', 'application/pdf'],
      allowMultiple: true,
      onFilesAdded: vi.fn(),
      onError: vi.fn()
    }

    renderHook(() => useFileDropZoneComponent(props, null))

    expect(mockedUseFileDropZone).toHaveBeenCalledWith({
      acceptedTypes: ['image/*', 'application/pdf'],
      allowMultiple: true,
      onFilesAdded: expect.any(Function),
      onError: expect.any(Function)
    })
  })
})