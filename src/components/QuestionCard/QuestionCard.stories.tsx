import type { Meta, StoryObj } from '@storybook/react';
import { QuestionCard } from './QuestionCard';

const meta = {
  title: 'Components/QuestionCard',
  component: QuestionCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuestionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockQuestion = {
  id: '1',
  text: { en_text: 'What is React?', he_text: 'מה זה React?' },
  type: 'selection',
  validationStatus: 'approved',
};

export const Default: Story = {
  args: {
    question: mockQuestion,
    language: 'en',
    isMobile: false,
    submissionStats: null,
    isAuthenticated: false,
    renderLink: ({ children }) => <a href="/test">{children}</a>,
    renderCard: ({ children }) => (
      <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '8px' }}>
        {children}
      </div>
    ),
    renderText: ({ text }) => <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{text}</span>,
    renderBadge: ({ text, color }) => (
      <span style={{ padding: '4px 8px', backgroundColor: color, borderRadius: '4px', fontSize: '12px' }}>
        {text}
      </span>
    ),
    renderProgressIndicator: null,
    translate: (text) => text.en_text,
    t: (key) => key,
  },
};

export const WithModules: Story = {
  args: {
    ...Default.args,
    question: {
      ...mockQuestion,
      modules: [
        { id: 'm1', name: { en_text: 'Mathematics', he_text: 'מתמטיקה' } },
        { id: 'm2', name: { en_text: 'Algebra', he_text: 'אלגברה' } },
      ],
    },
  },
};

export const Multipart: Story = {
  args: {
    ...Default.args,
    question: {
      ...mockQuestion,
      parts: [
        { id: 'p1', order: 1 },
        { id: 'p2', order: 2 },
      ],
    },
  },
};
