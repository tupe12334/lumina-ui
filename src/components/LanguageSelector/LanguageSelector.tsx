import React from 'react'
import { countryCode } from 'emoji-flags'
import { Selector, SelectorOption } from '../Selector/Selector'

export interface Language {
  code: string
  name: string
  nativeName: string
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


const languageToCountryMap = new Map([
  ['en', 'US'], ['es', 'ES'], ['fr', 'FR'], ['de', 'DE'], ['it', 'IT'], ['pt', 'PT'],
  ['ru', 'RU'], ['ja', 'JP'], ['ko', 'KR'], ['zh', 'CN'], ['ar', 'SA'], ['hi', 'IN'],
  ['nl', 'NL'], ['sv', 'SE'], ['no', 'NO'], ['da', 'DK'], ['fi', 'FI'], ['pl', 'PL'],
  ['tr', 'TR'], ['th', 'TH'], ['vi', 'VN'], ['id', 'ID'], ['ms', 'MY'], ['he', 'IL'],
  ['cs', 'CZ'], ['sk', 'SK'], ['hu', 'HU'], ['ro', 'RO'], ['bg', 'BG'], ['hr', 'HR'],
  ['sl', 'SI'], ['et', 'EE'], ['lv', 'LV'], ['lt', 'LT'], ['uk', 'UA'], ['be', 'BY'],
  ['ka', 'GE'], ['hy', 'AM'], ['az', 'AZ'], ['kk', 'KZ'], ['ky', 'KG'], ['uz', 'UZ'],
  ['tg', 'TJ'], ['mn', 'MN']
])

const getCountryCodeFromLanguage = (languageCode: string): string => {
  return languageToCountryMap.get(languageCode) || languageCode.toUpperCase()
}

const createLanguageOption = (language: Language, showFlags: boolean): SelectorOption => {
  let label = `${language.name}`

  if (language.nativeName !== language.name) {
    label += ` (${language.nativeName})`
  }

  if (showFlags) {
    const languageCountryCode = getCountryCodeFromLanguage(language.code)
    const flagData = countryCode(languageCountryCode)
    if (flagData && flagData.emoji) {
      label = `${flagData.emoji} ${label}`
    }
  }

  return { value: language.code, label }
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

    const shouldShowFlags = showFlags !== false
    const options = languages.map((language) => createLanguageOption(language, shouldShowFlags))

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