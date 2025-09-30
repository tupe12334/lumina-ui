import React, { useState } from 'react'
import { cn } from '@/utils/cn'
import { Button } from '../Button'

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


    return (
      <div
        ref={ref}
        className={cn(
          'relative flex justify-center items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm',
          {
            'opacity-75': disabled,
          },
          className
        )}
        {...props}
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/50 to-purple-50/30 opacity-0 transition-opacity duration-500 pointer-events-none" />

        <Button
          variant={selectedValue === true ? 'primary' : 'outline'}
          size={size}
          disabled={disabled}
          onClick={() => handleSelect(true)}
          className={cn(
            'relative min-w-[140px] font-semibold transition-all duration-300 ease-out transform-gpu',
            'border-2 shadow-md backdrop-blur-sm',
            {
              // Selected true state
              'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700':
                selectedValue === true,
              'border-emerald-500 text-white shadow-lg shadow-emerald-500/25':
                selectedValue === true,
              'ring-4 ring-emerald-200/50':
                selectedValue === true,

              // Unselected state
              'bg-white/80 hover:bg-white border-gray-200 hover:border-emerald-300':
                selectedValue !== true && !disabled,
              'text-gray-700 hover:text-emerald-700':
                selectedValue !== true && !disabled,
              'hover:shadow-lg hover:shadow-emerald-500/10':
                selectedValue !== true && !disabled,

              // Interactive effects
              'hover:scale-105 active:scale-95 hover:-translate-y-0.5': !disabled,
              'cursor-not-allowed opacity-50': disabled,
            }
          )}
          aria-pressed={selectedValue === true}
          aria-label={`${trueLabel} option`}
        >
          <span className="flex items-center gap-3 px-2">
            {selectedValue === true && (
              <span className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center text-emerald-600 font-bold text-sm animate-pulse">
                ✓
              </span>
            )}
            <span className="tracking-wide">{trueLabel}</span>
          </span>

          {/* Shine effect for selected state */}
          {selectedValue === true && (
            <div className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
          )}
        </Button>

        <Button
          variant={selectedValue === false ? 'primary' : 'outline'}
          size={size}
          disabled={disabled}
          onClick={() => handleSelect(false)}
          className={cn(
            'relative min-w-[140px] font-semibold transition-all duration-300 ease-out transform-gpu',
            'border-2 shadow-md backdrop-blur-sm',
            {
              // Selected false state
              'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700':
                selectedValue === false,
              'border-red-500 text-white shadow-lg shadow-red-500/25':
                selectedValue === false,
              'ring-4 ring-red-200/50':
                selectedValue === false,

              // Unselected state
              'bg-white/80 hover:bg-white border-gray-200 hover:border-red-300':
                selectedValue !== false && !disabled,
              'text-gray-700 hover:text-red-700':
                selectedValue !== false && !disabled,
              'hover:shadow-lg hover:shadow-red-500/10':
                selectedValue !== false && !disabled,

              // Interactive effects
              'hover:scale-105 active:scale-95 hover:-translate-y-0.5': !disabled,
              'cursor-not-allowed opacity-50': disabled,
            }
          )}
          aria-pressed={selectedValue === false}
          aria-label={`${falseLabel} option`}
        >
          <span className="flex items-center gap-3 px-2">
            {selectedValue === false && (
              <span className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center text-red-600 font-bold text-sm animate-pulse">
                ✗
              </span>
            )}
            <span className="tracking-wide">{falseLabel}</span>
          </span>

          {/* Shine effect for selected state */}
          {selectedValue === false && (
            <div className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
          )}
        </Button>


        {/* Decorative elements */}
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full opacity-30 animate-pulse delay-1000" />
      </div>
    )
  }
)

BooleanAnswer.displayName = 'BooleanAnswer'