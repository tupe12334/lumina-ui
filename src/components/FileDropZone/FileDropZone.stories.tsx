import type { Meta, StoryObj } from '@storybook/react'
import { FileDropZone } from './FileDropZone'

const meta: Meta<typeof FileDropZone> = {
  title: 'Components/FileDropZone',
  component: FileDropZone,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modern file upload component with drag-and-drop support, file validation, and progress tracking.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    maxFiles: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Maximum number of files allowed',
    },
    maxFileSize: {
      control: { type: 'number' },
      description: 'Maximum file size in bytes',
    },
    acceptedTypes: {
      control: { type: 'object' },
      description: 'Array of accepted file types',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Whether multiple files can be selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
    },
    hideFilesList: {
      control: 'boolean',
      description: 'Whether to hide the files list',
    },
    title: {
      control: 'text',
      description: 'Title text for the drop zone',
    },
    description: {
      control: 'text',
      description: 'Description text for the drop zone',
    },
    buttonText: {
      control: 'text',
      description: 'Text for the browse button',
    },
    onFilesAdded: {
      action: 'files added',
      description: 'Callback when files are added',
    },
    onFileRemoved: {
      action: 'file removed',
      description: 'Callback when a file is removed',
    },
    onError: {
      action: 'error',
      description: 'Callback when validation errors occur',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic file drop zone
export const Default: Story = {
  args: {
    title: 'Upload Files',
    description: 'Drag and drop your files here, or click to browse',
    buttonText: 'Browse Files',
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    acceptedTypes: ['*/*'],
    allowMultiple: true,
  },
}

// Single file upload
export const SingleFile: Story = {
  args: {
    title: 'Upload Document',
    description: 'Select a single document to upload',
    buttonText: 'Choose File',
    maxFiles: 1,
    allowMultiple: false,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    acceptedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  },
}

// Image upload only
export const ImagesOnly: Story = {
  args: {
    title: 'Upload Images',
    description: 'Drag and drop your images here, or click to browse',
    buttonText: 'Select Images',
    maxFiles: 10,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    acceptedTypes: ['image/*'],
    allowMultiple: true,
  },
}

// PDF documents only
export const PdfOnly: Story = {
  args: {
    title: 'Upload PDF Documents',
    description: 'Only PDF files are accepted',
    buttonText: 'Choose PDFs',
    maxFiles: 3,
    maxFileSize: 20 * 1024 * 1024, // 20MB
    acceptedTypes: ['application/pdf'],
    allowMultiple: true,
  },
}

// Disabled state
export const Disabled: Story = {
  args: {
    title: 'Upload Disabled',
    description: 'File upload is currently disabled',
    buttonText: 'Browse Files',
    disabled: true,
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
  },
}

// Hidden files list
export const HiddenFilesList: Story = {
  args: {
    title: 'Upload Files',
    description: 'Files list is hidden for this example',
    buttonText: 'Browse Files',
    hideFilesList: true,
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
  },
}

// Large file support
export const LargeFiles: Story = {
  args: {
    title: 'Upload Large Files',
    description: 'Upload files up to 100MB in size',
    buttonText: 'Select Large Files',
    maxFiles: 2,
    maxFileSize: 100 * 1024 * 1024, // 100MB
    acceptedTypes: ['*/*'],
    allowMultiple: true,
  },
}

// Custom styling
export const CustomStyling: Story = {
  args: {
    title: 'Custom Styled Upload',
    description: 'This drop zone has custom styling applied',
    buttonText: 'Upload Now',
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    className: 'custom-dropzone',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with custom CSS class applied for styling customization.',
      },
    },
  },
}

// Interactive example with callbacks
export const Interactive: Story = {
  args: {
    title: 'Interactive Upload',
    description: 'Check the Actions panel to see callback events',
    buttonText: 'Browse Files',
    maxFiles: 5,
    maxFileSize: 10 * 1024 * 1024,
    onFilesAdded: (files) => {
      console.log('Files added:', files)
    },
    onFileRemoved: (fileId) => {
      console.log('File removed:', fileId)
    },
    onError: (errors) => {
      console.log('Validation errors:', errors)
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example that logs events to the console. Open your browser developer tools to see the callback outputs.',
      },
    },
  },
}

// Small file limit for testing validation
export const ValidationDemo: Story = {
  args: {
    title: 'Validation Demo',
    description: 'Try uploading more than 2 files or files larger than 1MB',
    buttonText: 'Test Validation',
    maxFiles: 2,
    maxFileSize: 1024 * 1024, // 1MB
    acceptedTypes: ['image/*', 'application/pdf'],
    allowMultiple: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates file validation with strict limits. Try uploading files that exceed the limits to see validation in action.',
      },
    },
  },
}