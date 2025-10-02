import type { Meta, StoryObj } from '@storybook/react'
import { FileActions } from './FileActions'
import { FileUpload } from '../domain/FileUpload'

const mockFile = new File(['test content'], 'sample.pdf', { type: 'application/pdf' })

const meta: Meta<typeof FileActions> = {
  title: 'Components/FileDropZone/FileActions',
  component: FileActions,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Action buttons component for file items, showing remove and optional retry buttons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fileUpload: {
      description: 'FileUpload object containing file information and status',
    },
    onRemoveFile: {
      action: 'remove file',
      description: 'Callback when remove button is clicked',
    },
    onRetryFile: {
      action: 'retry file',
      description: 'Callback when retry button is clicked',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const OnlyRemove: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile, 'completed-file').withStatus('completed'),
    onRemoveFile: () => {},
    onRetryFile: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Only remove button shown for successful files.',
      },
    },
  },
}

export const WithRetry: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile, 'failed-file')
      .withStatus('failed')
      .withError('Upload failed'),
    onRemoveFile: () => {},
    onRetryFile: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Both remove and retry buttons shown for failed files.',
      },
    },
  },
}

export const UploadingFile: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile, 'uploading-file')
      .withStatus('uploading')
      .withProgress(50),
    onRemoveFile: () => {},
    onRetryFile: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Only remove button for uploading files (no retry option).',
      },
    },
  },
}

export const PendingFile: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile, 'pending-file').withStatus('pending'),
    onRemoveFile: () => {},
    onRetryFile: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Only remove button for pending files.',
      },
    },
  },
}

export const Interactive: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile, 'interactive-file')
      .withStatus('failed')
      .withError('Server timeout'),
    onRemoveFile: (fileId) => console.log('Remove file:', fileId),
    onRetryFile: (fileId) => console.log('Retry file:', fileId),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example showing button callbacks in the actions panel.',
      },
    },
  },
}