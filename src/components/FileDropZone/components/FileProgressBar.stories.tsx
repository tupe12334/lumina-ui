import type { Meta, StoryObj } from '@storybook/react'
import { FileProgressBar } from './FileProgressBar'
import { FileUpload } from '../domain/FileUpload'

const mockFile = new File(['test content'], 'sample.pdf', { type: 'application/pdf' })

const meta: Meta<typeof FileProgressBar> = {
  title: 'Components/FileDropZone/FileProgressBar',
  component: FileProgressBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Progress bar component that shows upload progress for files.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fileUpload: {
      description: 'FileUpload object containing progress information',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const NotShown: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile).withStatus('pending'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar is not shown for non-uploading files.',
      },
    },
  },
}

export const ZeroProgress: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile)
      .withStatus('uploading')
      .withProgress(0),
  },
  parameters: {
    docs: {
      description: {
        story: 'Upload just started (0% progress).',
      },
    },
  },
}

export const LowProgress: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile)
      .withStatus('uploading')
      .withProgress(25),
  },
  parameters: {
    docs: {
      description: {
        story: 'Upload in early stage (25% progress).',
      },
    },
  },
}

export const MidProgress: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile)
      .withStatus('uploading')
      .withProgress(50),
  },
  parameters: {
    docs: {
      description: {
        story: 'Upload halfway complete (50% progress).',
      },
    },
  },
}

export const HighProgress: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile)
      .withStatus('uploading')
      .withProgress(75),
  },
  parameters: {
    docs: {
      description: {
        story: 'Upload nearly complete (75% progress).',
      },
    },
  },
}

export const CompleteProgress: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile)
      .withStatus('uploading')
      .withProgress(100),
  },
  parameters: {
    docs: {
      description: {
        story: 'Upload complete (100% progress).',
      },
    },
  },
}

export const ProcessingProgress: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile)
      .withStatus('processing')
      .withProgress(60),
  },
  parameters: {
    docs: {
      description: {
        story: 'File being processed after upload (60% progress).',
      },
    },
  },
}

export const CompletedProgress: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile)
      .withStatus('completed')
      .withProgress(100),
  },
  parameters: {
    docs: {
      description: {
        story: 'Completed upload with green styling.',
      },
    },
  },
}

export const FailedProgress: Story = {
  args: {
    fileUpload: FileUpload.create(mockFile)
      .withStatus('failed')
      .withProgress(45),
  },
  parameters: {
    docs: {
      description: {
        story: 'Failed upload with red styling (stopped at 45%).',
      },
    },
  },
}