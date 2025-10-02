import type { Meta, StoryObj } from '@storybook/react'
import { FileListItem } from './FileListItem'
import { FileUpload } from '../domain/FileUpload'

const mockFile = new File(['test content'], 'sample-document.pdf', {
  type: 'application/pdf',
  lastModified: Date.now()
})

const meta: Meta<typeof FileListItem> = {
  title: 'Components/FileDropZone/FileListItem',
  component: FileListItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Individual file item component that displays file information, progress, and action buttons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fileUpload: {
      description: 'FileUpload domain object containing file information and status',
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

export const Pending: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile, 'pending-file'),
    onRemoveFile: () => {},
    onRetryFile: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'File in pending state, waiting to be uploaded.',
      },
    },
  },
}

export const Uploading: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile, 'uploading-file')
      .withStatus('uploading')
      .withProgress(45),
    onRemoveFile: () => {},
    onRetryFile: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'File currently being uploaded with progress indicator.',
      },
    },
  },
}

export const Processing: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile, 'processing-file')
      .withStatus('processing')
      .withProgress(75),
    onRemoveFile: () => {},
    onRetryFile: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'File being processed after upload.',
      },
    },
  },
}

export const Completed: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile, 'completed-file')
      .withStatus('completed')
      .withProgress(100),
    onRemoveFile: () => {},
    onRetryFile: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Successfully uploaded and processed file.',
      },
    },
  },
}

export const Failed: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile, 'failed-file')
      .withStatus('failed')
      .withProgress(30)
      .withError('Upload failed due to network error'),
    onRemoveFile: () => {},
    onRetryFile: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Failed upload with error message and retry option.',
      },
    },
  },
}

export const WithPreview: Story = {
  args: {
    fileUpload: FileUpload.create(
      new File(['image content'], 'nature-photo.jpg', { type: 'image/jpeg' }),
      'preview-file'
    )
      .withStatus('completed')
      .withProgress(100)
      .withPreviewUrl('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRTVFN0VCIi8+CjxwYXRoIGQ9Ik0yMCAyNUw2IDM1SDE2LjVMMjAgMjVaIiBmaWxsPSIjQzVDNUM1Ii8+CjxjaXJjbGUgY3g9IjI4IiBjeT0iMTIiIHI9IjQiIGZpbGw9IiNGMTU5NTkiLz4KPC9zdmc+'),
    onRemoveFile: () => {},
    onRetryFile: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Image file with preview thumbnail.',
      },
    },
  },
}

export const LargeFileName: Story = {
  args: {
    fileUpload: FileUpload.create(
      new File(['content'], 'very-long-filename-that-should-be-truncated-in-the-display.pdf', {
        type: 'application/pdf'
      }),
      'long-name-file'
    )
      .withStatus('pending'),
    onRemoveFile: () => {},
    onRetryFile: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'File with a very long filename to test text truncation.',
      },
    },
  },
}

export const LargeFile: Story = {
  args: {
    fileUpload: FileUpload.create(
      new File([new ArrayBuffer(50 * 1024 * 1024)], 'large-video.mp4', {
        type: 'video/mp4'
      }),
      'large-file'
    )
      .withStatus('uploading')
      .withProgress(20),
    onRemoveFile: () => {},
    onRetryFile: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Large video file showing size formatting.',
      },
    },
  },
}

export const Interactive: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile, 'interactive-file')
      .withStatus('failed')
      .withError('Server timeout - please try again'),
    onRemoveFile: (fileId) => console.log('Remove file:', fileId),
    onRetryFile: (fileId) => console.log('Retry file:', fileId),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example showing button callbacks in action panel.',
      },
    },
  },
}