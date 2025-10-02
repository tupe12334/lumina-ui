import type { Meta, StoryObj } from '@storybook/react'
import { LanguageSelector, Language } from './LanguageSelector'

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

const meta: Meta<typeof LanguageSelector> = {
  title: 'Components/LanguageSelector',
  component: LanguageSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    showFlags: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    languages: defaultLanguages,
    placeholder: 'Select a language',
  },
}

export const WithSelectedLanguage: Story = {
  args: {
    languages: defaultLanguages,
    value: 'en',
    placeholder: 'Select a language',
  },
}

export const WithoutFlags: Story = {
  args: {
    languages: defaultLanguages,
    placeholder: 'Select a language',
    showFlags: false,
  },
}

export const CustomLanguages: Story = {
  args: {
    languages: [
      { code: 'js', name: 'JavaScript', nativeName: 'JavaScript' },
      { code: 'ts', name: 'TypeScript', nativeName: 'TypeScript' },
      { code: 'py', name: 'Python', nativeName: 'Python' },
      { code: 'java', name: 'Java', nativeName: 'Java' },
      { code: 'cpp', name: 'C++', nativeName: 'C++' },
      { code: 'rust', name: 'Rust', nativeName: 'Rust' },
      { code: 'go', name: 'Go', nativeName: 'Go' },
    ],
    placeholder: 'Select a programming language',
    showFlags: false,
  },
}

export const Disabled: Story = {
  args: {
    languages: defaultLanguages,
    disabled: true,
    placeholder: 'Select a language',
  },
}