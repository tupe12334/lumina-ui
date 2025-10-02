import type { Meta, StoryObj } from '@storybook/react'
import { DropZoneContent } from './DropZoneContent'

const mockValidationRules = {
  getMaxFileSizeMB: () => 10,
  getConfig: () => ({ maxFiles: 5 })
}

const meta: Meta<typeof DropZoneContent> = {
  title: 'Components/FileDropZone/DropZoneContent',
  component: DropZoneContent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Content component for the drop zone that displays title, description, icon, and browse button.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text displayed in the drop zone',
    },
    description: {
      control: 'text',
      description: 'Description text displayed in the drop zone',
    },
    buttonText: {
      control: 'text',
      description: 'Text for the browse button',
    },
    icon: {
      control: 'text',
      description: 'Emoji icon to display instead of default upload icon',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the browse button is disabled',
    },
    onButtonClick: {
      action: 'button clicked',
      description: 'Callback when browse button is clicked',
    },
    validationRules: {
      description: 'Validation rules object for displaying file limits',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Upload Files',
    description: 'Drag and drop your files here, or click to browse',
    buttonText: 'Browse Files',
    validationRules: mockValidationRules,
    disabled: false,
    onButtonClick: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Default drop zone content with upload icon.',
      },
    },
  },
}

export const WithEmojiIcon: Story = {
  args: {
    title: 'Upload Photos',
    description: 'Drag and drop your photos here, or click to browse',
    buttonText: 'Select Photos',
    icon: '📷',
    validationRules: mockValidationRules,
    disabled: false,
    onButtonClick: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Drop zone content with camera emoji icon.',
      },
    },
  },
}

export const DocumentUpload: Story = {
  args: {
    title: 'Upload Documents',
    description: 'PDF, Word, and PowerPoint files accepted',
    buttonText: 'Choose Documents',
    icon: '📄',
    validationRules: {
      getMaxFileSizeMB: () => 25,
      getConfig: () => ({ maxFiles: 3 })
    },
    disabled: false,
    onButtonClick: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Document upload with document emoji and custom limits.',
      },
    },
  },
}

export const VideoUpload: Story = {
  args: {
    title: 'Upload Videos',
    description: 'Share your video content with us',
    buttonText: 'Select Videos',
    icon: '🎬',
    validationRules: {
      getMaxFileSizeMB: () => 100,
      getConfig: () => ({ maxFiles: 2 })
    },
    disabled: false,
    onButtonClick: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Video upload with clapper board emoji and large file limits.',
      },
    },
  },
}

export const SingleFileUpload: Story = {
  args: {
    title: 'Upload Profile Picture',
    description: 'Choose a single image file for your profile',
    buttonText: 'Choose Image',
    icon: '🖼️',
    validationRules: {
      getMaxFileSizeMB: () => 5,
      getConfig: () => ({ maxFiles: 1 })
    },
    disabled: false,
    onButtonClick: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Single file upload configuration.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    title: 'Upload Disabled',
    description: 'File upload is currently not available',
    buttonText: 'Browse Files',
    validationRules: mockValidationRules,
    disabled: true,
    onButtonClick: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state with grayed out button.',
      },
    },
  },
}

export const CustomLimits: Story = {
  args: {
    title: 'Bulk File Upload',
    description: 'Upload multiple files at once',
    buttonText: 'Select Files',
    validationRules: {
      getMaxFileSizeMB: () => 50,
      getConfig: () => ({ maxFiles: 20 })
    },
    disabled: false,
    onButtonClick: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom file limits display.',
      },
    },
  },
}

export const MinimalText: Story = {
  args: {
    title: 'Upload',
    description: 'Drop files here',
    buttonText: 'Browse',
    validationRules: mockValidationRules,
    disabled: false,
    onButtonClick: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal text version for compact layouts.',
      },
    },
  },
}

export const VerboseText: Story = {
  args: {
    title: 'Upload Your Important Documents',
    description: 'Please drag and drop your files into this area, or alternatively click the button below to open a file browser and select your files manually',
    buttonText: 'Open File Browser',
    validationRules: mockValidationRules,
    disabled: false,
    onButtonClick: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Verbose text version with detailed instructions.',
      },
    },
  },
}

export const Interactive: Story = {
  args: {
    title: 'Interactive Upload',
    description: 'Click the button to see the callback in action',
    buttonText: 'Browse Files',
    icon: '📁',
    validationRules: mockValidationRules,
    disabled: false,
    onButtonClick: () => console.log('Browse button clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example with console logging for button clicks.',
      },
    },
  },
}