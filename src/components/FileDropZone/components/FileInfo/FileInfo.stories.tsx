import type { Meta, StoryObj } from '@storybook/react'
import { FileInfo } from './FileInfo'
import { FileUpload } from '../../domain/FileUpload'

const mockFile = new File(['test content'], 'document.pdf', { type: 'application/pdf' })
const mockImageFile = new File(['image content'], 'image.jpg', { type: 'image/jpeg' })
const mockLargeFile = new File(['large content'], 'large-file.zip', { type: 'application/zip' })

// Create mock file with specific size
Object.defineProperty(mockLargeFile, 'size', {
  value: 15728640, // 15MB
  writable: false
})

const meta: Meta<typeof FileInfo> = {
  title: 'Components/FileDropZone/FileInfo',
  component: FileInfo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Pending: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile, 'pending-file'),
  },
}

export const Uploading: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile, 'uploading-file')
      .withStatus('uploading')
      .withProgress(45),
  },
}

export const Completed: Story = {
  args: {
    fileUpload: FileUpload.create(mockImageFile, 'completed-file')
      .withStatus('completed')
      .withProgress(100),
  },
}

export const Failed: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile, 'failed-file')
      .withStatus('failed')
      .withError('Upload failed due to network error'),
  },
}

export const LargeFile: Story = {
  args: {
    fileUpload: FileUpload.create(mockLargeFile, 'large-file')
      .withStatus('uploading')
      .withProgress(23),
  },
}

export const Processing: Story = {
  args: {
    fileUpload: FileUpload.create(mockImageFile, 'processing-file')
      .withStatus('processing')
      .withProgress(100),
  },
}