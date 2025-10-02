import React from 'react'
import { FileUpload } from '../domain/FileUpload'
import { RemoveIcon } from '../infrastructure/RemoveIcon'
import { RetryIcon } from '../infrastructure/RetryIcon'
import { cn } from '../infrastructure/cn'
import styles from '../FileDropZone.module.css'

interface FileActionsProps {
  fileUpload: FileUpload
  onRemoveFile: (fileId: string) => void
  onRetryFile: (fileId: string) => void
}

export const FileActions: React.FC<FileActionsProps> = ({
  fileUpload,
  onRemoveFile,
  onRetryFile
}) => {
  const file = fileUpload.getFile()
  const status = fileUpload.getStatus()

  return (
    <div className={styles.fileActions}>
      {status.canRetry() && (
        <button
          type="button"
          className={cn(styles.actionButton, styles.retryButton)}
          onClick={() => onRetryFile(fileUpload.getId())}
          aria-label={`Retry upload for ${file.name}`}
          title="Retry upload"
        >
          <RetryIcon size={16} />
        </button>
      )}

      <button
        type="button"
        className={cn(styles.actionButton, styles.removeButton)}
        onClick={() => onRemoveFile(fileUpload.getId())}
        aria-label={`Remove ${file.name}`}
        title="Remove file"
      >
        <RemoveIcon size={16} />
      </button>
    </div>
  )
}