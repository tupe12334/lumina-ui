import React from 'react'
import { FileUpload } from '../../domain/FileUpload'
import { SpinnerIcon } from '../../infrastructure/SpinnerIcon'
import { FileProgressBar } from '../FileProgressBar'
import { FileError } from '../FileError'
import { cn } from '../../infrastructure/cn'
import { formatFileSize } from '../../infrastructure/formatFileSize'
import styles from '../../FileDropZone.module.css'

interface FileInfoProps {
  fileUpload: FileUpload
}

export const FileInfo: React.FC<FileInfoProps> = ({ fileUpload }) => {
  const file = fileUpload.getFile()
  const status = fileUpload.getStatus()

  return (
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
  )
}