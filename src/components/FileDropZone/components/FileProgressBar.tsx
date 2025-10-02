import React from 'react'
import { FileUpload } from '../domain/FileUpload'
import { ProgressBase } from '../../ProgressBase'

interface FileProgressBarProps {
  fileUpload: FileUpload
}

export const FileProgressBar: React.FC<FileProgressBarProps> = ({ fileUpload }) => {
  const status = fileUpload.getStatus()

  if (!status.isUploading() && !status.isProcessing()) {
    return null
  }

  const getVariant = () => {
    if (status.isFailed()) return 'error'
    if (status.isCompleted()) return 'success'
    return 'default'
  }

  return (
    <ProgressBase
      value={fileUpload.getProgress()}
      variant={getVariant()}
      size="small"
      aria-label={`File upload progress: ${fileUpload.getProgress()}%`}
    />
  )
}