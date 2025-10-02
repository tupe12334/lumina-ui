import type { Meta, StoryObj } from '@storybook/react'
import { Selector } from './Selector'

const meta: Meta<typeof Selector> = {
  title: 'Components/Selector',
  component: Selector,
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
    error: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleOptions = [
  { value: 'apple', label: 'Apple', description: 'A sweet red fruit' },
  { value: 'banana', label: 'Banana', description: 'A yellow tropical fruit' },
  { value: 'orange', label: 'Orange', description: 'A citrus fruit' },
  { value: 'grape', label: 'Grape', description: 'Small purple fruits' },
  { value: 'strawberry', label: 'Strawberry', description: 'A red berry' },
  { value: 'disabled', label: 'Disabled Option', description: 'This option is disabled', disabled: true },
]

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select a fruit',
  },
}

export const WithValue: Story = {
  args: {
    options: sampleOptions,
    value: 'apple',
    placeholder: 'Select a fruit',
  },
}

export const Small: Story = {
  args: {
    options: sampleOptions,
    size: 'sm',
    placeholder: 'Select a fruit',
  },
}

export const Large: Story = {
  args: {
    options: sampleOptions,
    size: 'lg',
    placeholder: 'Select a fruit',
  },
}

export const ErrorState: Story = {
  args: {
    options: sampleOptions,
    variant: 'error',
    placeholder: 'Select a fruit',
  },
}

export const SuccessState: Story = {
  args: {
    options: sampleOptions,
    variant: 'success',
    value: 'apple',
    placeholder: 'Select a fruit',
  },
}

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    disabled: true,
    placeholder: 'Select a fruit',
  },
}

export const WithSearchAndClear: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Search and select a fruit',
    config: {
      searchable: true,
      clearable: true,
    },
  },
}

export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 50 }, (_, i) => ({
      value: `option-${i}`,
      label: `Option ${i + 1}`,
      description: `Description for option ${i + 1}`,
    })),
    placeholder: 'Select from many options',
    config: {
      searchable: true,
      maxHeight: 200,
    },
  },
}