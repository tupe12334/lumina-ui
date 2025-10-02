import React from 'react'
import { Selector, SelectorOption } from '../Selector/Selector'

export interface Language {
  code: string
  name: string
  nativeName: string
  flag?: string
}

export interface SimpleLanguageSelectorProps {
  languages: Language[]
  value?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  showFlags?: boolean
  onChange?: (languageCode: string) => void
}


export const LanguageSelector = React.forwardRef<HTMLDivElement, SimpleLanguageSelectorProps>(
  (props, ref) => {
    const {
      languages,
      value,
      placeholder,
      disabled,
      className,
      showFlags,
      onChange
    } = props

    const finalLanguages = languages
    const shouldShowFlags = showFlags !== false

    const options: SelectorOption[] = finalLanguages.map((language) => {
      let label = `${language.name}`

      if (language.nativeName !== language.name) {
        label += ` (${language.nativeName})`
      }

      if (shouldShowFlags && language.flag) {
        label = `${language.flag} ${label}`
      }

      return {
        value: language.code,
        label
      }
    })

    return (
      <Selector
        ref={ref}
        options={options}
        value={value}
        placeholder={placeholder || 'Select a language'}
        disabled={disabled}
        className={className}
        onChange={onChange}
      />
    )
  }
)

LanguageSelector.displayName = 'LanguageSelector'