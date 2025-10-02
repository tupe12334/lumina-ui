import React from 'react'
import { FileUpload } from '../domain/FileUpload'
import { FilePreview } from './FilePreview/FilePreview'
import { FileInfo } from './FileInfo/FileInfo'
import { FileActions } from './FileActions'
import styles from '../FileDropZone.module.css'

interface FileListItemProps {
  fileUpload: FileUpload
  onRemoveFile: (fileId: string) => void
  onRetryFile: (fileId: string) => void
}

export const FileListItem: React.FC<FileListItemProps> = ({
  fileUpload,
  onRemoveFile,
  onRetryFile
}) => {
  return (
    <div
      key={fileUpload.getId()}
      className={styles.fileItem}
      role="listitem"
    >
      <FilePreview fileUpload={fileUpload} />
      <FileInfo fileUpload={fileUpload} />
      <FileActions
        fileUpload={fileUpload}
        onRemoveFile={onRemoveFile}
        onRetryFile={onRetryFile}
      />
    </div>
  )
}