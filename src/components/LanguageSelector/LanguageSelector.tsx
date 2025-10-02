import React from 'react'
import { Selector, SelectorOption } from '../Selector/Selector'

export interface Language {
  code: string
  name: string
  nativeName: string
  flag?: string
}

export interface SimpleLanguageSelectorProps {
  languages?: Language[]
  value?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  showFlags?: boolean
  onChange?: (languageCode: string) => void
}

const defaultLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
]

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

    const finalLanguages = languages || defaultLanguages
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