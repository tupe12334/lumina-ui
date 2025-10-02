import React from 'react'
import { FileUpload } from '../domain/FileUpload'
import { FileIcon } from '../infrastructure/FileIcons'
import { SpinnerIcon } from '../infrastructure/SpinnerIcon'
import { FileProgressBar } from './FileProgressBar'
import { FileError } from './FileError'
import { FileActions } from './FileActions'
import { cn } from '../infrastructure/cn'
import { formatFileSize } from '../infrastructure/formatFileSize'
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

        <FileProgressBar fileUpload={fileUpload} />
        <FileError fileUpload={fileUpload} />
      </div>

      <FileActions
        fileUpload={fileUpload}
        onRemoveFile={onRemoveFile}
        onRetryFile={onRetryFile}
      />
    </div>
  )
}