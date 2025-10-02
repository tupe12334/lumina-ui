import { useCallback } from 'react'
import { FileUpload } from '../domain/FileUpload'
import { FileManagementService } from '../application/FileManagementService'
import { type UseFileDropZoneConfig } from '../application/UseFileDropZoneConfig'

interface UseFileActionsProps {
  config: UseFileDropZoneConfig
  setFiles: React.Dispatch<React.SetStateAction<FileUpload[]>>
}

export function useFileActions({ config, setFiles }: UseFileActionsProps) {
  const removeFile = useCallback((fileId: string) => {
    setFiles(currentFiles => FileManagementService.removeFile(currentFiles, fileId))
    if (config.onFileRemoved) {
      config.onFileRemoved(fileId)
    }
  }, [config, setFiles])

  const retryFile = useCallback((fileId: string) => {
    setFiles(currentFiles => FileManagementService.retryFile(currentFiles, fileId))
    if (config.onFileRetried) {
      config.onFileRetried(fileId)
    }
  }, [config, setFiles])

  const clearAll = useCallback(() => {
    setFiles(FileManagementService.clearAllFiles())
  }, [setFiles])

  const updateFileProgress = useCallback((fileId: string, progress: number) => {
    setFiles(currentFiles => FileManagementService.updateFileProgress(currentFiles, fileId, progress))
  }, [setFiles])

  const updateFileStatus = useCallback((fileId: string, status: 'pending' | 'uploading' | 'uploaded' | 'processing' | 'completed' | 'failed') => {
    setFiles(currentFiles => FileManagementService.updateFileStatus(currentFiles, fileId, status))
  }, [setFiles])

  const updateFileError = useCallback((fileId: string, error: string) => {
    setFiles(currentFiles => FileManagementService.updateFileError(currentFiles, fileId, error))
  }, [setFiles])

  return {
    removeFile,
    retryFile,
    clearAll,
    updateFileProgress,
    updateFileStatus,
    updateFileError
  }
}