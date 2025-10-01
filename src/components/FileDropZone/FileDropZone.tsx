import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { useFileDropZone } from './application/useFileDropZone'
import { FilesList } from './components/FilesList'
import { UploadIcon } from './infrastructure/IconComponents'
import { cn } from './infrastructure/utils'
import { type UseFileDropZoneConfig } from './application/types'
import styles from './FileDropZone.module.css'

export interface FileDropZoneProps extends UseFileDropZoneConfig {
  title?: string
  description?: string
  buttonText?: string
  disabled?: boolean
  hideFilesList?: boolean
  className?: string
}

export interface FileDropZoneRef {
  removeFile: (fileId: string) => void
  retryFile: (fileId: string) => void
  clearAll: () => void
  openFileDialog: () => void
}

export const FileDropZone = forwardRef<FileDropZoneRef, FileDropZoneProps>(
  (props, ref) => {
    const {
      title = 'Upload Files',
      description = 'Drag and drop your files here, or click to browse',
      buttonText = 'Browse Files',
      disabled = false,
      hideFilesList = false,
      className,
      ...config
    } = props

    const fileInputRef = useRef<HTMLInputElement>(null)

    const {
      files,
      dragState,
      validationRules,
      isDragActive,
      handleDragEnter,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      handleFileInput,
      removeFile,
      retryFile,
      clearAll,
      getFileInputProps
    } = useFileDropZone(config)

    const openFileDialog = () => {
      if (!disabled && fileInputRef.current) {
        fileInputRef.current.click()
      }
    }

    useImperativeHandle(ref, () => ({
      removeFile,
      retryFile,
      clearAll,
      openFileDialog
    }))

    const dropZoneClasses = cn(
      styles.dropzone,
      {
        [styles.dragActive]: isDragActive && !disabled,
        [styles.disabled]: disabled
      },
      className
    )

    const maxFiles = validationRules.getConfig().maxFiles
    const maxFileSize = validationRules.getMaxFileSizeMB()

    return (
      <div className={styles.container}>
        <div
          className={dropZoneClasses}
          onDragEnter={disabled ? undefined : handleDragEnter}
          onDragOver={disabled ? undefined : handleDragOver}
          onDragLeave={disabled ? undefined : handleDragLeave}
          onDrop={disabled ? undefined : handleDrop}
          onClick={disabled ? undefined : openFileDialog}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label="File upload area"
          aria-disabled={disabled}
          onKeyDown={(e) => {
            if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              openFileDialog()
            }
          }}
        >
          <div className={styles.content}>
            <UploadIcon className={styles.icon} size={48} />

            <h3 className={styles.title}>{title}</h3>

            <p className={styles.description}>{description}</p>

            <button
              type="button"
              className={styles.button}
              onClick={(e) => {
                e.stopPropagation()
                openFileDialog()
              }}
              disabled={disabled}
              aria-label="Browse files"
            >
              {buttonText}
            </button>

            <p className={styles.description}>
              Max {maxFiles} files • Max {maxFileSize}MB per file
            </p>
          </div>

          <input
            {...getFileInputProps()}
            ref={fileInputRef}
            className={styles.hiddenInput}
            disabled={disabled}
            aria-hidden="true"
          />
        </div>

        {!hideFilesList && (
          <FilesList
            files={files}
            onRemoveFile={removeFile}
            onRetryFile={retryFile}
            onClearAll={clearAll}
            showClearAll={files.length > 1}
          />
        )}
      </div>
    )
  }
)

FileDropZone.displayName = 'FileDropZone'