import React from 'react'
import { FileUpload } from '../domain/FileUpload'
import { FileListItem } from './FileListItem'
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
  showClearAll
}) => {
  const shouldShowClearAll = showClearAll !== false
  if (files.length === 0) {
    return null
  }

  return (
    <div className={styles.filesList}>
      <div className={styles.filesHeader}>
        <h3 className={styles.filesTitle}>
          {files.length} {files.length === 1 ? 'file' : 'files'}
        </h3>
        {shouldShowClearAll && (
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

      <div className={styles.filesList} role="list" aria-label="Uploaded files">
        {files.map((fileUpload) => (
          <FileListItem
            key={fileUpload.getId()}
            fileUpload={fileUpload}
            onRemoveFile={onRemoveFile}
            onRetryFile={onRetryFile}
          />
        ))}
      </div>
    </div>
  )
}