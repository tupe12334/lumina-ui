import type { Meta, StoryObj } from '@storybook/react'
import { FilePreview } from './FilePreview'
import { FileUpload } from '../../domain/FileUpload'

const mockTextFile = new File(['text content'], 'document.txt', { type: 'text/plain' })
const mockPdfFile = new File(['pdf content'], 'document.pdf', { type: 'application/pdf' })
const mockImageFile = new File(['image content'], 'image.jpg', { type: 'image/jpeg' })
const mockVideoFile = new File(['video content'], 'video.mp4', { type: 'video/mp4' })

const meta: Meta<typeof FilePreview> = {
  title: 'Components/FileDropZone/FilePreview',
  component: FilePreview,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const WithFileIcon: Story = {
  args: {
    fileUpload: FileUpload.create(mockTextFile, 'text-file'),
  },
}

export const PdfFile: Story = {
  args: {
    fileUpload: FileUpload.create(mockPdfFile, 'pdf-file'),
  },
}

export const VideoFile: Story = {
  args: {
    fileUpload: FileUpload.create(mockVideoFile, 'video-file'),
  },
}

export const WithPreviewImage: Story = {
  args: {
    fileUpload: FileUpload.create(mockImageFile, 'image-file')
      .withPreviewUrl('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNGRkY2QjQiLz48cGF0aCBkPSJNMjAgMjBMNDQgNDRMMjAgNDRaIiBmaWxsPSIjRkZGRkZGIi8+PC9zdmc+'),
  },
}

export const WithDataURL: Story = {
  args: {
    fileUpload: FileUpload.create(mockImageFile, 'data-url-file')
      .withPreviewUrl('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRkY2B0I0Ii8+CjxwYXRoIGQ9Ik0yMCAyMEw0NCA0NEwyMCA0NFoiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+'),
  },
}