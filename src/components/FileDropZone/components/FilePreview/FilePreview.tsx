import React from 'react'
import { FileUpload } from '../../domain/FileUpload'
import { FileIcon } from '../../infrastructure/FileIcons'
import styles from '../../FileDropZone.module.css'

interface FilePreviewProps {
  fileUpload: FileUpload
}

export const FilePreview: React.FC<FilePreviewProps> = ({ fileUpload }) => {
  const file = fileUpload.getFile()
  const previewUrl = fileUpload.getPreviewUrl()
  const FileIconComponent = FileIcon

  return (
    <div className={styles.filePreview}>
      {previewUrl ? (
        <img
          src={previewUrl}
          alt={`Preview of ${file.name}`}
          className={styles.previewImage}
        />
      ) : (
        <FileIconComponent className={styles.fileIcon} />
      )}
    </div>
  )
}