import { DropZoneContent } from './DropZoneContent'
import { cn } from '../infrastructure/utils'
import styles from '../FileDropZone.module.css'

interface DropZoneAreaProps {
  icon?: string
  title: string
  description: string
  buttonText: string
  disabled: boolean
  isDragActive: boolean
  maxFiles: number
  maxFileSize: number
  className?: string
  onDragEnter?: (e: React.DragEvent<HTMLDivElement>) => void
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void
  onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void
  onClick?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
}

export function DropZoneArea({
  icon,
  title,
  description,
  buttonText,
  disabled,
  isDragActive,
  maxFiles,
  maxFileSize,
  className,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  onKeyDown,
  onButtonClick,
  children
}: DropZoneAreaProps) {
  const dropZoneClasses = cn(
    styles.dropzone,
    {
      [styles.dragActive]: isDragActive && !disabled,
      [styles.disabled]: disabled
    },
    className
  )

  return (
    <div
      className={dropZoneClasses}
      onDragEnter={disabled ? undefined : onDragEnter}
      onDragOver={disabled ? undefined : onDragOver}
      onDragLeave={disabled ? undefined : onDragLeave}
      onDrop={disabled ? undefined : onDrop}
      onClick={disabled ? undefined : onClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="File upload area"
      aria-disabled={disabled}
      onKeyDown={onKeyDown}
    >
      <DropZoneContent
        icon={icon}
        title={title}
        description={description}
        buttonText={buttonText}
        disabled={disabled}
        maxFiles={maxFiles}
        maxFileSize={maxFileSize}
        onButtonClick={onButtonClick}
      />

      {children}
    </div>
  )
}