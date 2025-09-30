import React, { useState } from 'react'

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


    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      opacity: disabled ? 0.75 : 1,
    }

    const getButtonStyle = (isSelected: boolean): React.CSSProperties => ({
      minWidth: '100px',
      padding: size === 'sm' ? '8px 16px' : size === 'lg' ? '12px 24px' : '10px 20px',
      borderRadius: '12px',
      border: '2px solid',
      fontWeight: 500,
      fontSize: size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      backgroundColor: isSelected ? '#ef4444' : '#ffffff',
      borderColor: isSelected ? '#ef4444' : '#d1d5db',
      color: isSelected ? '#ffffff' : '#374151',
      opacity: disabled ? 0.5 : 1,
    })

    return (
      <div
        ref={ref}
        style={{...containerStyle, ...className}}
        {...props}
      >
        <button
          disabled={disabled}
          onClick={() => handleSelect(true)}
          style={getButtonStyle(selectedValue === true)}
          aria-pressed={selectedValue === true}
          aria-label={`${trueLabel} option`}
          onMouseEnter={(e) => {
            if (!disabled && selectedValue !== true) {
              e.currentTarget.style.borderColor = '#9ca3af'
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled && selectedValue !== true) {
              e.currentTarget.style.borderColor = '#d1d5db'
            }
          }}
        >
          {trueLabel}
        </button>

        <button
          disabled={disabled}
          onClick={() => handleSelect(false)}
          style={getButtonStyle(selectedValue === false)}
          aria-pressed={selectedValue === false}
          aria-label={`${falseLabel} option`}
          onMouseEnter={(e) => {
            if (!disabled && selectedValue !== false) {
              e.currentTarget.style.borderColor = '#9ca3af'
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled && selectedValue !== false) {
              e.currentTarget.style.borderColor = '#d1d5db'
            }
          }}
        >
          {falseLabel}
        </button>
      </div>
    )
  }
)

BooleanAnswer.displayName = 'BooleanAnswer'