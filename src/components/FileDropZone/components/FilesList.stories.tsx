import type { Meta, StoryObj } from '@storybook/react'
import { FilesList } from './FilesList'
import { FileUpload } from '../domain/FileUpload'

const createMockFiles = () => [
  FileUpload.create(
    new File(['content1'], 'document.pdf', { type: 'application/pdf' }),
    'file-1'
  ).withStatus('completed').withProgress(100),

  FileUpload.create(
    new File(['content2'], 'image.jpg', { type: 'image/jpeg' }),
    'file-2'
  ).withStatus('uploading').withProgress(65),

  FileUpload.create(
    new File(['content3'], 'presentation.pptx', { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }),
    'file-3'
  ).withStatus('failed').withError('File size too large'),
]

const meta: Meta<typeof FilesList> = {
  title: 'Components/FileDropZone/FilesList',
  component: FilesList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'List component that displays multiple uploaded files with their status and actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    files: {
      description: 'Array of FileUpload objects to display',
    },
    showClearAll: {
      control: 'boolean',
      description: 'Whether to show the clear all button',
    },
    onRemoveFile: {
      action: 'remove file',
      description: 'Callback when a file is removed',
    },
    onRetryFile: {
      action: 'retry file',
      description: 'Callback when a file retry is requested',
    },
    onClearAll: {
      action: 'clear all',
      description: 'Callback when clear all button is clicked',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const MultipleFiles: Story = {
  args: {
    files: createMockFiles(),
    showClearAll: true,
    onRemoveFile: () => {},
    onRetryFile: () => {},
    onClearAll: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'List with multiple files in different states.',
      },
    },
  },
}

export const SingleFile: Story = {
  args: {
    files: [
      FileUpload.create(
        new File(['content'], 'single-document.pdf', { type: 'application/pdf' }),
        'single-file'
      ).withStatus('completed').withProgress(100)
    ],
    showClearAll: true,
    onRemoveFile: () => {},
    onRetryFile: () => {},
    onClearAll: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'List with a single file (note singular text).',
      },
    },
  },
}

export const NoClearButton: Story = {
  args: {
    files: createMockFiles(),
    showClearAll: false,
    onRemoveFile: () => {},
    onRetryFile: () => {},
    onClearAll: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Files list without the clear all button.',
      },
    },
  },
}

export const EmptyList: Story = {
  args: {
    files: [],
    showClearAll: true,
    onRemoveFile: () => {},
    onRetryFile: () => {},
    onClearAll: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty files list (renders nothing).',
      },
    },
  },
}

export const UploadingFiles: Story = {
  args: {
    files: [
      FileUpload.create(
        new File(['content1'], 'upload1.jpg', { type: 'image/jpeg' }),
        'uploading-1'
      ).withStatus('uploading').withProgress(25),

      FileUpload.create(
        new File(['content2'], 'upload2.png', { type: 'image/png' }),
        'uploading-2'
      ).withStatus('uploading').withProgress(75),

      FileUpload.create(
        new File(['content3'], 'upload3.gif', { type: 'image/gif' }),
        'uploading-3'
      ).withStatus('processing').withProgress(90),
    ],
    showClearAll: true,
    onRemoveFile: () => {},
    onRetryFile: () => {},
    onClearAll: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Files in various uploading and processing states.',
      },
    },
  },
}

export const FailedFiles: Story = {
  args: {
    files: [
      FileUpload.create(
        new File(['content1'], 'failed1.pdf', { type: 'application/pdf' }),
        'failed-1'
      ).withStatus('failed').withError('Network timeout'),

      FileUpload.create(
        new File(['content2'], 'failed2.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }),
        'failed-2'
      ).withStatus('failed').withError('File type not supported'),

      FileUpload.create(
        new File(['content3'], 'failed3.txt', { type: 'text/plain' }),
        'failed-3'
      ).withStatus('failed').withError('File size exceeds limit'),
    ],
    showClearAll: true,
    onRemoveFile: () => {},
    onRetryFile: () => {},
    onClearAll: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Files that failed to upload with different error messages.',
      },
    },
  },
}

export const WithPreviewImages: Story = {
  args: {
    files: [
      FileUpload.create(
        new File(['content1'], 'photo1.jpg', { type: 'image/jpeg' }),
        'preview-1'
      ).withStatus('completed')
      .withProgress(100)
      .withPreviewUrl('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRTVFN0VCIi8+CjxwYXRoIGQ9Ik0yMCAyNUw2IDM1SDE2LjVMMjAgMjVaIiBmaWxsPSIjQzVDNUM1Ii8+CjxjaXJjbGUgY3g9IjI4IiBjeT0iMTIiIHI9IjQiIGZpbGw9IiNGMTU5NTkiLz4KPC9zdmc+'),

      FileUpload.create(
        new File(['content2'], 'photo2.png', { type: 'image/png' }),
        'preview-2'
      ).withStatus('completed')
      .withProgress(100)
      .withPreviewUrl('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjREREREREIi8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjgiIGZpbGw9IiM5OTk5OTkiLz4KPC9zdmc+'),
    ],
    showClearAll: true,
    onRemoveFile: () => {},
    onRetryFile: () => {},
    onClearAll: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Image files with preview thumbnails.',
      },
    },
  },
}

export const Interactive: Story = {
  args: {
    files: createMockFiles(),
    showClearAll: true,
    onRemoveFile: (fileId) => console.log('Remove file:', fileId),
    onRetryFile: (fileId) => console.log('Retry file:', fileId),
    onClearAll: () => console.log('Clear all files'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example with console logging for all actions.',
      },
    },
  },
}