import React from 'react'
import { clsx } from 'clsx'
import styles from './ProgressBase.module.css'

export interface ProgressBaseProps {
  value: number
  min?: number
  max?: number
  variant?: 'default' | 'success' | 'error' | 'warning'
  size?: 'small' | 'medium' | 'large'
  className?: string
  showValue?: boolean
  'aria-label'?: string
  'aria-labelledby'?: string
}

export const ProgressBase: React.FC<ProgressBaseProps> = (props) => {
  const {
    value,
    min,
    max,
    variant,
    size,
    className,
    showValue,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  } = props

  const minValue = min !== undefined ? min : 0
  const maxValue = max !== undefined ? max : 100
  const variantValue = variant !== undefined ? variant : 'default'
  const sizeValue = size !== undefined ? size : 'medium'
  const showValueFlag = showValue !== undefined ? showValue : false

  const clampedValue = Math.min(Math.max(value, minValue), maxValue)
  const percentage = ((clampedValue - minValue) / (maxValue - minValue)) * 100

  const getVariantClass = () => {
    if (variantValue === 'success') return styles.success
    if (variantValue === 'error') return styles.error
    if (variantValue === 'warning') return styles.warning
    return styles.default
  }

  const getSizeClass = () => {
    if (sizeValue === 'small') return styles.small
    if (sizeValue === 'large') return styles.large
    return styles.medium
  }

  return (
    <div
      className={clsx(
        styles.progressBar,
        getVariantClass(),
        getSizeClass(),
        className
      )}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={minValue}
      aria-valuemax={maxValue}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      <div
        className={styles.progressFill}
        style={{ width: `${percentage}%` }}
      />
      {showValueFlag && (
        <span className={styles.progressText} aria-hidden="true">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  )
}