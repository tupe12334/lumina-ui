import type { Meta, StoryObj } from '@storybook/react'
import { FileError } from './FileError'
import { FileUpload } from '../domain/FileUpload'

const mockFile = new File(['test content'], 'sample.pdf', { type: 'application/pdf' })

const meta: Meta<typeof FileError> = {
  title: 'Components/FileDropZone/FileError',
  component: FileError,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Error message component that displays file upload errors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fileUpload: {
      description: 'FileUpload object that may contain an error message',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const NoError: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile).withStatus('completed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'No error message displayed (component renders nothing).',
      },
    },
  },
}

export const NetworkError: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile)
      .withStatus('failed')
      .withError('Network connection failed. Please check your internet connection and try again.'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Network connectivity error message.',
      },
    },
  },
}

export const FileSizeError: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile)
      .withStatus('failed')
      .withError('File size must be less than 10MB'),
  },
  parameters: {
    docs: {
      description: {
        story: 'File size validation error.',
      },
    },
  },
}

export const FileTypeError: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile)
      .withStatus('failed')
      .withError('File type "application/exe" is not allowed'),
  },
  parameters: {
    docs: {
      description: {
        story: 'File type validation error.',
      },
    },
  },
}

export const ServerError: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile)
      .withStatus('failed')
      .withError('Server error: Upload service temporarily unavailable (Error 503)'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Server-side error message.',
      },
    },
  },
}

export const TimeoutError: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile)
      .withStatus('failed')
      .withError('Upload timeout: File took too long to upload. Please try again.'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Upload timeout error.',
      },
    },
  },
}

export const AuthenticationError: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile)
      .withStatus('failed')
      .withError('Authentication required: Please log in to upload files'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Authentication error message.',
      },
    },
  },
}

export const StorageError: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile)
      .withStatus('failed')
      .withError('Storage quota exceeded: Not enough space to upload this file'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Storage quota error message.',
      },
    },
  },
}

export const LongError: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile)
      .withStatus('failed')
      .withError('This is a very long error message that demonstrates how the error component handles lengthy text that might wrap to multiple lines and still maintains good readability and accessibility.'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Long error message to test text wrapping.',
      },
    },
  },
}