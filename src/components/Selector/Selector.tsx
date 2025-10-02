import React, { useState, useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import styles from './Selector.module.css'

export interface SelectorOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SimpleSelectorProps {
  options: SelectorOption[]
  value?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  onChange?: (value: string) => void
}

function useSelectorState(options: SelectorOption[], value?: string, onChange?: (value: string) => void) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value)
  const selectedOption = options.find(option => option.value === selectedValue)
  const displayText = selectedOption ? selectedOption.label : 'Select option'
  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue)
    setIsOpen(false)
    if (onChange) onChange(optionValue)
  }
  useEffect(() => setSelectedValue(value), [value])
  return { isOpen, setIsOpen, selectedValue, displayText, handleSelect }
}

export const Selector = React.forwardRef<HTMLDivElement, SimpleSelectorProps>(
  (props, ref) => {
    const { options, value, placeholder, disabled, className, onChange } = props
    const buttonRef = useRef<HTMLButtonElement>(null)
    const listRef = useRef<HTMLUListElement>(null)

    const { isOpen, setIsOpen, selectedValue, displayText, handleSelect } = useSelectorState(options, value, onChange)
    const finalDisplayText = displayText !== 'Select option' ? displayText : placeholder || 'Select option'
    const handleToggle = () => { if (!disabled) setIsOpen(!isOpen) }
    const handleKeyDown = (event: React.KeyboardEvent) => { if (event.key === 'Escape') setIsOpen(false) }

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        const target = event.target
        if (
          isOpen &&
          buttonRef.current &&
          listRef.current &&
          target instanceof Node &&
          !buttonRef.current.contains(target) &&
          !listRef.current.contains(target)
        ) {
          setIsOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, setIsOpen])

    return (
      <div ref={ref} className={clsx(styles.selector, className)}>
        <button
          ref={buttonRef}
          type="button"
          disabled={disabled}
          className={clsx(styles.trigger)}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
        >
          <span className={clsx(styles.value)}>{finalDisplayText}</span>
          <span className={clsx(styles.icon)} aria-hidden="true">▼</span>
        </button>

        {isOpen && (
          <ul ref={listRef} className={clsx(styles.listbox)}>
            {options.map((option) => (
              <li
                key={option.value}
                className={clsx(styles.option, {
                  [styles.optionSelected]: option.value === selectedValue,
                  [styles.optionDisabled]: option.disabled
                })}
                onClick={() => !option.disabled && handleSelect(option.value)}
              >
                <span className={clsx(styles.optionLabel)}>{option.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)

Selector.displayName = 'Selector'