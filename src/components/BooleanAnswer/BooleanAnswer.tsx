import React, { useState } from 'react'
import { BooleanAnswerValue } from './domain/BooleanAnswerValue'
import { BooleanAnswerLabels } from './domain/BooleanAnswerLabels'
import { BooleanAnswerSize } from './domain/BooleanAnswerSize'
import { SizeType } from './domain/SizeType'
import { StylesProvider } from './infrastructure/StylesProvider'
import { BooleanAnswerService } from './application/BooleanAnswerService'

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
  size?: SizeType
}

/**
 * Boolean answer component for Yes/No and True/False questions.
 * Automatically detects question type and provides appropriate button labels.
 */
export const BooleanAnswer = React.forwardRef<HTMLDivElement, BooleanAnswerProps>(
  (props, ref): JSX.Element => {
    const {
      initialValue,
      onSelect,
      trueLabel,
      falseLabel,
      disabled,
      className,
      size,
      ...otherProps
    } = props

    const labels = BooleanAnswerLabels.create(trueLabel, falseLabel)
    const sizeObject = BooleanAnswerSize.create(size)
    const finalDisabled = disabled !== undefined ? disabled : false

    const initialValueObject = BooleanAnswerValue.create(initialValue)
    const [selectedValue, setSelectedValue] = useState<BooleanAnswerValue>(initialValueObject)

    const handleSelect = (value: boolean): void => {
      const newValue = BooleanAnswerService.handleSelection(
        selectedValue,
        value,
        finalDisabled,
        onSelect
      )
      setSelectedValue(newValue)
    }


    const sizeClass = StylesProvider.getSizeClass(sizeObject.getSize())

    return (
      <div
        ref={ref}
        className={StylesProvider.getContainerClasses(finalDisabled, className)}
        {...otherProps}
      >
        <button
          disabled={finalDisabled}
          onClick={() => handleSelect(true)}
          className={StylesProvider.getButtonClasses(selectedValue.isTrue(), true, sizeClass)}
          aria-pressed={selectedValue.isTrue()}
          aria-label={`${labels.getTrueLabel()} option`}
        >
          {labels.getTrueLabel()}
        </button>

        <button
          disabled={finalDisabled}
          onClick={() => handleSelect(false)}
          className={StylesProvider.getButtonClasses(selectedValue.isFalse(), false, sizeClass)}
          aria-pressed={selectedValue.isFalse()}
          aria-label={`${labels.getFalseLabel()} option`}
        >
          {labels.getFalseLabel()}
        </button>
      </div>
    )
  }
)

BooleanAnswer.displayName = 'BooleanAnswer'