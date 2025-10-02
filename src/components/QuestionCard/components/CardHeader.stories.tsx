import type { Meta, StoryObj } from '@storybook/react'
import { CardHeader } from './CardHeader'

const meta: Meta<typeof CardHeader> = {
  title: 'Components/QuestionCard/CardHeader',
  component: CardHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isMobile: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    questionText: 'What is your favorite programming language?',
    multipartBadge: <span className="badge">Part 1 of 3</span>,
    progressIndicator: <span className="progress">40% Complete</span>,
    isMobile: false,
  },
}

export const Mobile: Story = {
  args: {
    questionText: 'What is your favorite programming language?',
    multipartBadge: <span className="badge">Part 1 of 3</span>,
    progressIndicator: <span className="progress">40% Complete</span>,
    isMobile: true,
  },
}

export const LongQuestion: Story = {
  args: {
    questionText: 'This is a very long question that might span multiple lines and test how the component handles lengthy text content in the header section.',
    multipartBadge: <span className="badge">Part 2 of 5</span>,
    progressIndicator: <span className="progress">60% Complete</span>,
    isMobile: false,
  },
}

export const WithComplexContent: Story = {
  args: {
    questionText: (
      <div>
        <strong>Question 3:</strong> Which of the following best describes your experience with React?
      </div>
    ),
    multipartBadge: (
      <div style={{ padding: '4px 8px', backgroundColor: '#e3f2fd', borderRadius: '4px', fontSize: '12px' }}>
        Multi-part
      </div>
    ),
    progressIndicator: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>3/10</span>
        <div style={{ width: '60px', height: '4px', backgroundColor: '#e0e0e0', borderRadius: '2px' }}>
          <div style={{ width: '30%', height: '100%', backgroundColor: '#4caf50', borderRadius: '2px' }}></div>
        </div>
      </div>
    ),
    isMobile: false,
  },
}

export const WithoutBadge: Story = {
  args: {
    questionText: 'This is a single-part question without a multipart badge.',
    multipartBadge: null,
    progressIndicator: <span className="progress">75% Complete</span>,
    isMobile: false,
  },
}

export const WithoutProgress: Story = {
  args: {
    questionText: 'What is your preferred development environment?',
    multipartBadge: <span className="badge">Part 4 of 4</span>,
    progressIndicator: null,
    isMobile: false,
  },
}