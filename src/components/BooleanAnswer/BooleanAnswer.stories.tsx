import type { Meta, StoryObj } from '@storybook/react'
import { BooleanAnswer } from './BooleanAnswer'

const meta: Meta<typeof BooleanAnswer> = {
  title: 'Components/BooleanAnswer',
  component: BooleanAnswer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Boolean answer component for Yes/No and True/False questions. Automatically detects question type based on question text and language.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    initialValue: {
      control: { type: 'select' },
      options: [true, false, null],
      description: 'Initial selected value',
    },
    onSelect: {
      action: 'selected',
      description: 'Callback when user selects a value',
    },
    trueLabel: {
      control: 'text',
      description: 'Label for the true/positive option',
    },
    falseLabel: {
      control: 'text',
      description: 'Label for the false/negative option',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the buttons',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic True/False question
export const TrueFalse: Story = {
  args: {
    trueLabel: 'True',
    falseLabel: 'False',
    size: 'md',
  },
}

// Yes/No question
export const YesNo: Story = {
  args: {
    trueLabel: 'Yes',
    falseLabel: 'No',
    size: 'md',
  },
}

// Pre-selected True
export const PreSelectedTrue: Story = {
  args: {
    trueLabel: 'True',
    falseLabel: 'False',
    initialValue: true,
    size: 'md',
  },
}

// Pre-selected False
export const PreSelectedFalse: Story = {
  args: {
    trueLabel: 'True',
    falseLabel: 'False',
    initialValue: false,
    size: 'md',
  },
}

// Small size
export const Small: Story = {
  args: {
    trueLabel: 'Yes',
    falseLabel: 'No',
    size: 'sm',
  },
}

// Large size
export const Large: Story = {
  args: {
    trueLabel: 'Yes',
    falseLabel: 'No',
    size: 'lg',
  },
}

// Hebrew Labels
export const HebrewLabels: Story = {
  args: {
    trueLabel: 'כן',
    falseLabel: 'לא',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hebrew labels example',
      },
    },
  },
}

// Disabled state
export const Disabled: Story = {
  args: {
    trueLabel: 'True',
    falseLabel: 'False',
    initialValue: true,
    disabled: true,
    size: 'md',
  },
}

// Direct Labels (Recommended)
export const DirectLabels: Story = {
  args: {
    trueLabel: 'Agree',
    falseLabel: 'Disagree',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Using direct labels instead of automatic detection - the recommended approach',
      },
    },
  },
}

// Custom Labels
export const CustomLabels: Story = {
  args: {
    trueLabel: 'Accept',
    falseLabel: 'Decline',
    size: 'md',
  },
}

// Interactive example
export const Interactive: Story = {
  args: {
    trueLabel: 'Yes',
    falseLabel: 'No',
    size: 'md',
    onSelect: (value: boolean) => {
      console.log('Selected:', value)
      // In a real app, you might update state, send analytics, etc.
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Click the buttons to see the callback in action (check browser console)',
      },
    },
  },
}

// Showcase different label types
export const LabelTypes: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-center">True/False</h3>
        <BooleanAnswer
          trueLabel="True"
          falseLabel="False"
          size="md"
          onSelect={(value) => console.log('True/False:', value)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-center">Yes/No</h3>
        <BooleanAnswer
          trueLabel="Yes"
          falseLabel="No"
          size="md"
          onSelect={(value) => console.log('Yes/No:', value)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-center">Agree/Disagree</h3>
        <BooleanAnswer
          trueLabel="Agree"
          falseLabel="Disagree"
          size="md"
          onSelect={(value) => console.log('Agree/Disagree:', value)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of different label types using direct props',
      },
    },
  },
}

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-sm font-medium mb-3 text-center">Small</h3>
        <BooleanAnswer
          trueLabel="Yes"
          falseLabel="No"
          size="sm"
        />
      </div>

      <div>
        <h3 className="text-base font-medium mb-3 text-center">Medium (Default)</h3>
        <BooleanAnswer
          trueLabel="Yes"
          falseLabel="No"
          size="md"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3 text-center">Large</h3>
        <BooleanAnswer
          trueLabel="Yes"
          falseLabel="No"
          size="lg"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available sizes',
      },
    },
  },
}