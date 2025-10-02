import React from 'react'
import { useFileDropZone } from '../application/useFileDropZone'
import { useFileDropZoneRef } from './useFileDropZoneRef'
import { type UseFileDropZoneConfig } from '../application/UseFileDropZoneConfig'
import { type FileDropZoneRef } from '../FileDropZone'

interface UseFileDropZoneComponentProps extends UseFileDropZoneConfig {
  disabled: boolean
}

export function useFileDropZoneComponent(props: UseFileDropZoneComponentProps, ref: React.ForwardedRef<FileDropZoneRef>) {
  const { disabled, ...config } = props

  const {
    files,
    validationRules,
    isDragActive,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeFile,
    retryFile,
    clearAll,
    getFileInputProps
  } = useFileDropZone(config)

  const { fileInputRef, openFileDialog } = useFileDropZoneRef({
    disabled,
    removeFile,
    retryFile,
    clearAll
  }, ref)

  const maxFiles = validationRules.getConfig().maxFiles
  const maxFileSize = validationRules.getMaxFileSizeMB()

  return {
    files,
    isDragActive,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeFile,
    retryFile,
    clearAll,
    getFileInputProps,
    fileInputRef,
    openFileDialog,
    maxFiles,
    maxFileSize
  }
}