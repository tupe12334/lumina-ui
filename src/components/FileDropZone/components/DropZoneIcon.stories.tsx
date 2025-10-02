import type { Meta, StoryObj } from '@storybook/react'
import { DropZoneIcon } from './DropZoneIcon'

const meta: Meta<typeof DropZoneIcon> = {
  title: 'Components/FileDropZone/DropZoneIcon',
  component: DropZoneIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icon component for the file drop zone that can display either the default SVG upload icon or a custom emoji.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'Emoji icon to display instead of the default upload icon',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default upload icon (SVG).',
      },
    },
  },
}

export const FolderEmoji: Story = {
  args: {
    icon: '📁',
  },
  parameters: {
    docs: {
      description: {
        story: 'Folder emoji icon for document uploads.',
      },
    },
  },
}

export const CameraEmoji: Story = {
  args: {
    icon: '📷',
  },
  parameters: {
    docs: {
      description: {
        story: 'Camera emoji icon for photo uploads.',
      },
    },
  },
}

export const DocumentEmoji: Story = {
  args: {
    icon: '📄',
  },
  parameters: {
    docs: {
      description: {
        story: 'Document emoji icon for file uploads.',
      },
    },
  },
}

export const ImageEmoji: Story = {
  args: {
    icon: '🖼️',
  },
  parameters: {
    docs: {
      description: {
        story: 'Picture frame emoji icon for image uploads.',
      },
    },
  },
}

export const VideoEmoji: Story = {
  args: {
    icon: '🎬',
  },
  parameters: {
    docs: {
      description: {
        story: 'Clapper board emoji icon for video uploads.',
      },
    },
  },
}

export const MusicEmoji: Story = {
  args: {
    icon: '🎵',
  },
  parameters: {
    docs: {
      description: {
        story: 'Musical note emoji icon for audio uploads.',
      },
    },
  },
}

export const CloudEmoji: Story = {
  args: {
    icon: '☁️',
  },
  parameters: {
    docs: {
      description: {
        story: 'Cloud emoji icon for cloud storage uploads.',
      },
    },
  },
}

export const PackageEmoji: Story = {
  args: {
    icon: '📦',
  },
  parameters: {
    docs: {
      description: {
        story: 'Package emoji icon for archive uploads.',
      },
    },
  },
}

export const DatabaseEmoji: Story = {
  args: {
    icon: '🗄️',
  },
  parameters: {
    docs: {
      description: {
        story: 'File cabinet emoji icon for data uploads.',
      },
    },
  },
}