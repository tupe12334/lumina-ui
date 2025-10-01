import { useState, useCallback, useRef, DragEvent } from 'react'
import { FileUpload } from '../domain/FileUpload'
import { FileValidationRules } from '../domain/FileValidation'
import { DragState } from '../domain/DragState'
import { FileDropZoneService } from './FileDropZoneService'
import { type UseFileDropZoneConfig, type UseFileDropZoneReturn } from './types'

export function useFileDropZone(inputConfig: UseFileDropZoneConfig): UseFileDropZoneReturn {
  const config = inputConfig || {}
  const [files, setFiles] = useState<FileUpload[]>([])
  const [dragState, setDragState] = useState(DragState.create())
  const dragCounter = useRef(0)

  const validationRules = FileValidationRules.create(config)

  const handleFilesProcessing = useCallback(async (newFiles: FileUpload[]) => {
    const filesWithPreviews = await FileDropZoneService.addPreviewUrls(newFiles)
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

  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current += 1

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragState(currentState => FileDropZoneService.handleDragOver(currentState))
    }
  }, [])

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current -= 1

    if (dragCounter.current === 0) {
      setDragState(currentState => FileDropZoneService.handleDragLeave(currentState))
    }
  }, [])

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current = 0
    setDragState(currentState => FileDropZoneService.handleDrop(currentState))

    const droppedFiles = e.dataTransfer.files
    if (droppedFiles && droppedFiles.length > 0) {
      addFiles(droppedFiles)
    }
  }, [addFiles])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      addFiles(selectedFiles)
    }
    e.target.value = ''
  }, [addFiles])

  return {
    files,
    dragState,
    validationRules,
    isDragActive: dragState.isActive(),
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInput,
    addFiles,
    removeFile: useCallback((fileId: string) => {
      setFiles(currentFiles => FileDropZoneService.removeFile(currentFiles, fileId))
      if (config.onFileRemoved) {
        config.onFileRemoved(fileId)
      }
    }, [config]),
    retryFile: useCallback((fileId: string) => {
      setFiles(currentFiles => FileDropZoneService.retryFile(currentFiles, fileId))
      if (config.onFileRetried) {
        config.onFileRetried(fileId)
      }
    }, [config]),
    clearAll: useCallback(() => {
      setFiles(FileDropZoneService.clearAllFiles())
    }, []),
    updateFileProgress: useCallback((fileId: string, progress: number) => {
      setFiles(currentFiles => FileDropZoneService.updateFileProgress(currentFiles, fileId, progress))
    }, []),
    updateFileStatus: useCallback((fileId: string, status: 'pending' | 'uploading' | 'uploaded' | 'processing' | 'completed' | 'failed') => {
      setFiles(currentFiles => FileDropZoneService.updateFileStatus(currentFiles, fileId, status))
    }, []),
    updateFileError: useCallback((fileId: string, error: string) => {
      setFiles(currentFiles => FileDropZoneService.updateFileError(currentFiles, fileId, error))
    }, []),
    getFileInputProps: useCallback(() => ({
      type: 'file' as const,
      multiple: validationRules.getConfig().allowMultiple,
      accept: validationRules.getAcceptAttribute(),
      onChange: handleFileInput
    }), [validationRules, handleFileInput])
  }
}