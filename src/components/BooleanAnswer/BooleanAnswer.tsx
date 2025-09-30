import React, { useState } from 'react'
import styles from './BooleanAnswer.module.css'

export interface BooleanAnswerProps {
  /**
   * Initial value for the boolean answer
   */
  initialValue?: boolean | null
  /**
   * Callback when user selects a boolean value
   */
  onSelect?: (value: boolean) => void
  /**
   * Label for the true/positive option
   */
  trueLabel?: string
  /**
   * Label for the false/negative option
   */
  falseLabel?: string
  /**
   * Whether the component is disabled
   */
  disabled?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Size of the buttons
   */
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Boolean answer component for Yes/No and True/False questions.
 * Automatically detects question type and provides appropriate button labels.
 */
export const BooleanAnswer = React.forwardRef<HTMLDivElement, BooleanAnswerProps>(
  ({
    initialValue,
    onSelect,
    trueLabel = 'True',
    falseLabel = 'False',
    disabled = false,
    className,
    size = 'md',
    ...props
  }, ref) => {
    if (
      initialValue !== undefined &&
      initialValue !== null &&
      typeof initialValue !== 'boolean'
    ) {
      throw new Error(
        'BooleanAnswer initialValue must be boolean, null, or undefined'
      )
    }

    const [selectedValue, setSelectedValue] = useState<boolean | null>(
      initialValue !== null && initialValue !== undefined ? initialValue : null
    )

    const handleSelect = (value: boolean) => {
      if (disabled) return

      setSelectedValue(value)
      onSelect && onSelect(value)
    }


    const getSizeClass = () => {
      switch (size) {
        case 'sm': return styles.small
        case 'lg': return styles.large
        default: return styles.medium
      }
    }

    const getButtonClasses = (isSelected: boolean, isTrue: boolean) => {
      return [
        styles.button,
        getSizeClass(),
        isSelected ? styles.selected : '',
        isSelected && isTrue ? styles.true : '',
        isSelected && !isTrue ? styles.false : ''
      ].filter(Boolean).join(' ')
    }

    const getContainerClasses = () => {
      return [
        styles.container,
        disabled ? styles.disabled : '',
        className
      ].filter(Boolean).join(' ')
    }

    return (
      <div
        ref={ref}
        className={getContainerClasses()}
        {...props}
      >
        <button
          disabled={disabled}
          onClick={() => handleSelect(true)}
          className={getButtonClasses(selectedValue === true, true)}
          aria-pressed={selectedValue === true}
          aria-label={`${trueLabel} option`}
        >
          {trueLabel}
        </button>

        <button
          disabled={disabled}
          onClick={() => handleSelect(false)}
          className={getButtonClasses(selectedValue === false, false)}
          aria-pressed={selectedValue === false}
          aria-label={`${falseLabel} option`}
        >
          {falseLabel}
        </button>
      </div>
    )
  }
)

BooleanAnswer.displayName = 'BooleanAnswer'