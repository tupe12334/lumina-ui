import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { FilesListHeader } from './FilesListHeader'

const meta: Meta<typeof FilesListHeader> = {
  title: 'Components/FileDropZone/FilesListHeader',
  component: FilesListHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fileCount: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Number of files in the list',
    },
    showClearAll: {
      control: 'boolean',
      description: 'Whether to show the clear all button',
    },
  },
  args: {
    onClearAll: fn(),
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const SingleFile: Story = {
  args: {
    fileCount: 1,
    showClearAll: true,
  },
}

export const MultipleFiles: Story = {
  args: {
    fileCount: 5,
    showClearAll: true,
  },
}

export const WithoutClearButton: Story = {
  args: {
    fileCount: 3,
    showClearAll: false,
  },
}

export const ManyFiles: Story = {
  args: {
    fileCount: 25,
    showClearAll: true,
  },
}

export const ZeroFiles: Story = {
  args: {
    fileCount: 0,
    showClearAll: true,
  },
}