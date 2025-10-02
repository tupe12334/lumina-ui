import React from 'react'
import { FileUpload } from '../domain/FileUpload'
import styles from '../FileDropZone.module.css'

interface FileErrorProps {
  fileUpload: FileUpload
}

export const FileError: React.FC<FileErrorProps> = ({ fileUpload }) => {
  const error = fileUpload.getError()

  if (!error) {
    return null
  }

  return (
    <div className={styles.errorItem} role="alert">
      <p className={styles.errorMessage}>
        {error}
      </p>
    </div>
  )
}