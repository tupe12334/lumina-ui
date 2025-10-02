import type { Meta, StoryObj } from '@storybook/react'
import { DropZoneArea } from './DropZoneArea'

const meta: Meta<typeof DropZoneArea> = {
  title: 'Components/FileDropZone/DropZoneArea',
  component: DropZoneArea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The main drop zone area that handles drag and drop interactions and click events.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isDragActive: {
      control: 'boolean',
      description: 'Whether files are currently being dragged over the drop zone',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the drop zone is disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
    children: {
      description: 'Content to display inside the drop zone',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback when the drop zone is clicked',
    },
    onDragEnter: {
      action: 'drag enter',
      description: 'Callback when drag enters the drop zone',
    },
    onDragLeave: {
      action: 'drag leave',
      description: 'Callback when drag leaves the drop zone',
    },
    onDragOver: {
      action: 'drag over',
      description: 'Callback when dragging over the drop zone',
    },
    onDrop: {
      action: 'dropped',
      description: 'Callback when files are dropped',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isDragActive: false,
    disabled: false,
    children: (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h3>Drop your files here</h3>
        <p>Or click to browse</p>
      </div>
    ),
    onClick: () => {},
    onDragEnter: () => {},
    onDragLeave: () => {},
    onDragOver: () => {},
    onDrop: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Default drop zone area in normal state.',
      },
    },
  },
}

export const DragActive: Story = {
  args: {
    isDragActive: true,
    disabled: false,
    children: (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h3>Drop your files here</h3>
        <p>Release to upload</p>
      </div>
    ),
    onClick: () => {},
    onDragEnter: () => {},
    onDragLeave: () => {},
    onDragOver: () => {},
    onDrop: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Drop zone in active drag state (files being dragged over).',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    isDragActive: false,
    disabled: true,
    children: (
      <div style={{ padding: '40px', textAlign: 'center', opacity: 0.6 }}>
        <h3>Upload Disabled</h3>
        <p>File upload is currently disabled</p>
      </div>
    ),
    onClick: () => {},
    onDragEnter: () => {},
    onDragLeave: () => {},
    onDragOver: () => {},
    onDrop: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled drop zone that does not accept interactions.',
      },
    },
  },
}

export const CustomStyling: Story = {
  args: {
    isDragActive: false,
    disabled: false,
    className: 'custom-dropzone',
    children: (
      <div style={{
        padding: '60px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '12px'
      }}>
        <h3>Custom Styled Drop Zone</h3>
        <p>This drop zone has custom styling applied</p>
      </div>
    ),
    onClick: () => {},
    onDragEnter: () => {},
    onDragLeave: () => {},
    onDragOver: () => {},
    onDrop: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Drop zone with custom styling and className.',
      },
    },
  },
}

export const WithIcon: Story = {
  args: {
    isDragActive: false,
    disabled: false,
    children: (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
        <h3>Upload Documents</h3>
        <p>Drag and drop your documents here</p>
      </div>
    ),
    onClick: () => {},
    onDragEnter: () => {},
    onDragLeave: () => {},
    onDragOver: () => {},
    onDrop: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Drop zone with emoji icon content.',
      },
    },
  },
}

export const Interactive: Story = {
  args: {
    isDragActive: false,
    disabled: false,
    children: (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h3>Interactive Drop Zone</h3>
        <p>Check the Actions panel for event callbacks</p>
      </div>
    ),
    onClick: () => console.log('Drop zone clicked'),
    onDragEnter: () => console.log('Drag enter'),
    onDragLeave: () => console.log('Drag leave'),
    onDragOver: () => console.log('Drag over'),
    onDrop: (files) => console.log('Files dropped:', files),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example with all event callbacks logged to console.',
      },
    },
  },
}