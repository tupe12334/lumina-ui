import React from 'react'
import styles from '../../FileDropZone.module.css'

interface FilesListHeaderProps {
  fileCount: number
  onClearAll: () => void
  showClearAll?: boolean
}

export const FilesListHeader: React.FC<FilesListHeaderProps> = ({
  fileCount,
  onClearAll,
  showClearAll
}) => {
  const shouldShowClearAll = (showClearAll !== false) && fileCount > 1

  return (
    <div className={styles.filesHeader}>
      <h3 className={styles.filesTitle}>
        {fileCount} {fileCount === 1 ? 'file' : 'files'}
      </h3>
      {shouldShowClearAll && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={onClearAll}
          aria-label="Clear all files"
        >
          Clear all
        </button>
      )}
    </div>
  )
}