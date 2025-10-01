import React from 'react'
import { FileUpload } from '../domain/FileUpload'
import { FileIcon } from '../infrastructure/IconComponents'
import { RemoveIcon, RetryIcon } from '../infrastructure/ActionIcons'
import { SpinnerIcon } from '../infrastructure/StatusIcons'
import { cn, formatFileSize } from '../infrastructure/utils'
import styles from '../FileDropZone.module.css'

interface FilesListProps {
  files: FileUpload[]
  onRemoveFile: (fileId: string) => void
  onRetryFile: (fileId: string) => void
  onClearAll: () => void
  showClearAll?: boolean
}

export const FilesList: React.FC<FilesListProps> = ({
  files,
  onRemoveFile,
  onRetryFile,
  onClearAll,
  showClearAll = true
}) => {
  if (files.length === 0) {
    return null
  }

  return (
    <div className={styles.filesList}>
      <div className={styles.filesHeader}>
        <h3 className={styles.filesTitle}>
          {files.length} {files.length === 1 ? 'file' : 'files'}
        </h3>
        {showClearAll && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={onClearAll}
            aria-label="Clear all files"
          >
            Clear all
          </button>
        )}
      </div>

      <div role="list" aria-label="Uploaded files">
        {files.map((fileUpload) => {
          const file = fileUpload.getFile()
          const status = fileUpload.getStatus()
          const FileIconComponent = FileIcon

          return (
            <div
              key={fileUpload.getId()}
              className={styles.fileItem}
              role="listitem"
            >
              <div className={styles.filePreview}>
                {fileUpload.getPreviewUrl() ? (
                  <img
                    src={fileUpload.getPreviewUrl()}
                    alt={`Preview of ${file.name}`}
                    className={styles.previewImage}
                  />
                ) : (
                  <FileIconComponent className={styles.fileIcon} />
                )}
              </div>

              <div className={styles.fileInfo}>
                <p className={styles.fileName} title={file.name}>
                  {file.name}
                </p>
                <div className={styles.fileDetails}>
                  <span className={styles.fileSize}>
                    {formatFileSize(file.size)}
                  </span>
                  <div
                    className={cn(
                      styles.fileStatus,
                      styles[status.getStatus()]
                    )}
                    role="status"
                    aria-label={`File status: ${status.getStatus()}`}
                  >
                    {status.isActive() && (
                      <SpinnerIcon size={12} />
                    )}
                    {status.getStatus()}
                  </div>
                </div>

                {(status.isUploading() || status.isProcessing()) && (
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
                )}

                {fileUpload.getError() && (
                  <div className={styles.errorItem} role="alert">
                    <p className={styles.errorMessage}>
                      {fileUpload.getError()}
                    </p>
                  </div>
                )}
              </div>

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
            </div>
          )
        })}
      </div>
    </div>
  )
}