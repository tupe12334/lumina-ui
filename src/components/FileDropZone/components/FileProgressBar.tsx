import React from 'react'
import { FileUpload } from '../domain/FileUpload'
import { cn } from '../infrastructure/cn'
import styles from '../FileDropZone.module.css'

interface FileProgressBarProps {
  fileUpload: FileUpload
}

export const FileProgressBar: React.FC<FileProgressBarProps> = ({ fileUpload }) => {
  const status = fileUpload.getStatus()

  if (!status.isUploading() && !status.isProcessing()) {
    return null
  }

  return (
    <div className={styles.progressBar} role="progressbar" aria-valuenow={fileUpload.getProgress()} aria-valuemin={0} aria-valuemax={100}>
      <div
        className={cn(
          styles.progressFill,
          status.isCompleted() && styles.completed,
          status.isFailed() && styles.failed
        )}
        style={{ width: `${fileUpload.getProgress()}%` }}
      />
    </div>
  )
}