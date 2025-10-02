import React from 'react'
import { FileUpload } from '../domain/FileUpload'
import { FileListItem } from './FileListItem'
import { FilesListHeader } from './FilesListHeader/FilesListHeader'
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
  if (files.length === 0) {
    return null
  }

  return (
    <div className={styles.filesList}>
      <FilesListHeader
        fileCount={files.length}
        onClearAll={onClearAll}
        showClearAll={showClearAll}
      />

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