import { forwardRef } from 'react'
import { useFileDropZoneComponent } from './hooks/useFileDropZoneComponent'
import { FilesList } from './components/FilesList'
import { DropZoneArea } from './components/DropZoneArea'
import { type UseFileDropZoneConfig } from './application/types'
import styles from './FileDropZone.module.css'

export interface FileDropZoneProps extends UseFileDropZoneConfig {
  title?: string
  description?: string
  buttonText?: string
  icon?: string
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
      icon,
      disabled = false,
      hideFilesList = false,
      className,
      ...config
    } = props

    const {
      files,
      isDragActive,
      handleDragEnter,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      removeFile,
      retryFile,
      clearAll,
      getFileInputProps,
      fileInputRef,
      openFileDialog,
      maxFiles,
      maxFileSize
    } = useFileDropZoneComponent({ disabled, ...config }, ref)

    return (
      <div className={styles.container}>
        <DropZoneArea
          icon={icon}
          title={title}
          description={description}
          buttonText={buttonText}
          disabled={disabled}
          isDragActive={isDragActive}
          maxFiles={maxFiles}
          maxFileSize={maxFileSize}
          className={className}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
          onKeyDown={(e) => {
            if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              openFileDialog()
            }
          }}
          onButtonClick={(e) => { e.stopPropagation(); openFileDialog() }}
        >
          <input
            {...getFileInputProps()}
            ref={fileInputRef}
            className={styles.hiddenInput}
            disabled={disabled}
            aria-hidden="true"
          />
        </DropZoneArea>

        {!hideFilesList && files.length > 0 && (
          <FilesList files={files} onRemoveFile={removeFile} onRetryFile={retryFile} onClearAll={clearAll} showClearAll={files.length > 1} />
        )}
      </div>
    )
  }
)

FileDropZone.displayName = 'FileDropZone'