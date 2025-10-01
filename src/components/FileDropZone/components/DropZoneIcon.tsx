import { UploadIcon } from '../infrastructure/IconComponents'
import styles from '../FileDropZone.module.css'

interface DropZoneIconProps {
  icon?: string
}

export function DropZoneIcon({ icon }: DropZoneIconProps) {
  if (icon) {
    return <span className={styles.emojiIcon}>{icon}</span>
  }

  return <UploadIcon className={styles.icon} size={48} />
}