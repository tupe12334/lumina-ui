import { DropZoneIcon } from './DropZoneIcon'
import styles from '../FileDropZone.module.css'

interface DropZoneContentProps {
  icon?: string
  title: string
  description: string
  buttonText: string
  disabled: boolean
  maxFiles: number
  maxFileSize: number
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function DropZoneContent({
  icon,
  title,
  description,
  buttonText,
  disabled,
  maxFiles,
  maxFileSize,
  onButtonClick
}: DropZoneContentProps) {
  return (
    <div className={styles.content}>
      <DropZoneIcon icon={icon} />

      <h3 className={styles.title}>{title}</h3>

      <p className={styles.description}>{description}</p>

      <button
        type="button"
        className={styles.button}
        onClick={onButtonClick}
        disabled={disabled}
        aria-label="Browse files"
      >
        {buttonText}
      </button>

      <p className={styles.description}>
        Max {maxFiles} files • Max {maxFileSize}MB per file
      </p>
    </div>
  )
}