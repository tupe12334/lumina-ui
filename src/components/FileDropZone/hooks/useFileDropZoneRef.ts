import { useRef, useImperativeHandle } from 'react'
import { FileDropZoneRef } from '../FileDropZone'

interface UseFileDropZoneRefProps {
  disabled: boolean
  removeFile: (fileId: string) => void
  retryFile: (fileId: string) => void
  clearAll: () => void
}

export function useFileDropZoneRef({
  disabled,
  removeFile,
  retryFile,
  clearAll
}: UseFileDropZoneRefProps, ref: React.ForwardedRef<FileDropZoneRef>) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const openFileDialog = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  useImperativeHandle(ref, () => ({
    removeFile,
    retryFile,
    clearAll,
    openFileDialog
  }))

  return {
    fileInputRef,
    openFileDialog
  }
}