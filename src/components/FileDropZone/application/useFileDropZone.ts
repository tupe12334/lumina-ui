import { useState, useCallback, useMemo } from 'react'
import { FileUpload } from '../domain/FileUpload'
import { FileValidationRules } from '../domain/FileValidation'
import { DragState } from '../domain/DragState'
import { FileDropZoneService } from './FileDropZoneService'
import { FilePreviewService } from './FilePreviewService'
import { useFileActions } from '../hooks/useFileActions'
import { useDragHandlers } from '../hooks/useDragHandlers'
import { type UseFileDropZoneConfig } from './UseFileDropZoneConfig'
import { type UseFileDropZoneReturn } from './UseFileDropZoneReturn'

export function useFileDropZone(inputConfig: UseFileDropZoneConfig): UseFileDropZoneReturn {
  const config = useMemo(() => inputConfig || {}, [inputConfig])
  const [files, setFiles] = useState<FileUpload[]>([])
  const [dragState, setDragState] = useState(DragState.create())

  const validationRules = FileValidationRules.create(config)
  const fileActions = useFileActions({ config, setFiles })

  const handleFilesProcessing = useCallback(async (newFiles: FileUpload[]) => {
    const filesWithPreviews = await FilePreviewService.addPreviewUrls(newFiles)
    setFiles(currentFiles => [...currentFiles, ...filesWithPreviews])

    if (config.onFilesAdded) {
      config.onFilesAdded(filesWithPreviews)
    }
  }, [config])

  const addFiles = useCallback((fileList: FileList | File[]) => {
    const { validFiles, errors } = FileDropZoneService.validateAndCreateFiles(
      fileList,
      validationRules,
      files
    )

    if (errors.length > 0 && config.onError) {
      config.onError(errors)
    }

    if (validFiles.length > 0) {
      handleFilesProcessing(validFiles)
    }
  }, [files, validationRules, config, handleFilesProcessing])

  const dragHandlers = useDragHandlers({
    setDragState,
    onDrop: addFiles
  })

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      addFiles(selectedFiles)
    }
    e.target.value = ''
  }, [addFiles])

  const getFileInputProps = useCallback(() => ({
    type: 'file' as const,
    multiple: validationRules.getConfig().allowMultiple,
    accept: validationRules.getAcceptAttribute(),
    onChange: handleFileInput
  }), [validationRules, handleFileInput])

  return {
    files,
    dragState,
    validationRules,
    isDragActive: dragState.isActive(),
    ...dragHandlers,
    handleFileInput,
    addFiles,
    ...fileActions,
    getFileInputProps
  }
}