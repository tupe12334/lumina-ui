import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBase } from './ProgressBase'

const meta: Meta<typeof ProgressBase> = {
  title: 'Components/ProgressBase',
  component: ProgressBase,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
}

export default meta
type Story = StoryObj<typeof ProgressBase>

export const Default: Story = {
  args: {
    value: 50,
  },
}

export const Success: Story = {
  args: {
    value: 75,
    variant: 'success',
  },
}

export const Error: Story = {
  args: {
    value: 30,
    variant: 'error',
  },
}

export const Warning: Story = {
  args: {
    value: 60,
    variant: 'warning',
  },
}

export const Small: Story = {
  args: {
    value: 40,
    size: 'small',
  },
}

export const Medium: Story = {
  args: {
    value: 40,
    size: 'medium',
  },
}

export const Large: Story = {
  args: {
    value: 40,
    size: 'large',
  },
}

export const WithValue: Story = {
  args: {
    value: 65,
    showValue: true,
  },
}

export const Complete: Story = {
  args: {
    value: 100,
    variant: 'success',
  },
}

export const Empty: Story = {
  args: {
    value: 0,
  },
}