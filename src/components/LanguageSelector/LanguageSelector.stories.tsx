import type { Meta, StoryObj } from '@storybook/react'
import { LanguageSelector } from './LanguageSelector'

const meta: Meta<typeof LanguageSelector> = {
  title: 'Components/LanguageSelector',
  component: LanguageSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Select a language',
  },
}

export const WithSelectedLanguage: Story = {
  args: {
    value: 'en',
    placeholder: 'Select a language',
  },
}

export const WithoutFlags: Story = {
  args: {
    placeholder: 'Select a language',
    config: {
      showFlags: false,
    },
  },
}

export const WithRegions: Story = {
  args: {
    placeholder: 'Select a language',
    config: {
      showFlags: true,
      showRegions: true,
    },
  },
}

export const WithRegionInLabel: Story = {
  args: {
    placeholder: 'Select a language',
    config: {
      showFlags: true,
      includeRegionInLabel: true,
    },
  },
}

export const Searchable: Story = {
  args: {
    placeholder: 'Search for a language',
    config: {
      searchable: true,
      showFlags: true,
    },
  },
}

export const Clearable: Story = {
  args: {
    value: 'fr',
    placeholder: 'Select a language',
    config: {
      clearable: true,
      showFlags: true,
    },
  },
}

export const CustomLanguages: Story = {
  args: {
    placeholder: 'Select a programming language',
    config: {
      showFlags: false,
      customLanguages: [
        { code: 'js', name: 'JavaScript', nativeName: 'JavaScript' },
        { code: 'ts', name: 'TypeScript', nativeName: 'TypeScript' },
        { code: 'py', name: 'Python', nativeName: 'Python' },
        { code: 'java', name: 'Java', nativeName: 'Java' },
        { code: 'cpp', name: 'C++', nativeName: 'C++' },
        { code: 'rust', name: 'Rust', nativeName: 'Rust' },
        { code: 'go', name: 'Go', nativeName: 'Go' },
      ],
    },
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Select a language',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Select a language',
  },
}

export const ErrorState: Story = {
  args: {
    variant: 'error',
    placeholder: 'Select a language',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Select a language',
  },
}