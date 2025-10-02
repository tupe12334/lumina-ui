import type { Meta, StoryObj } from '@storybook/react';
import { QuestionsList } from './QuestionsList';

const meta = {
  title: 'Components/QuestionsList',
  component: QuestionsList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuestionsList>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockQuestions = [
  {
    id: '1',
    text: { en_text: 'What is React?', he_text: 'מה זה React?' },
    type: 'selection',
    validationStatus: 'approved',
  },
  {
    id: '2',
    text: { en_text: 'What is TypeScript?', he_text: 'מה זה TypeScript?' },
    type: 'boolean',
    validationStatus: 'approved',
  },
];

const mockStats = {
  totalSubmissions: 5,
  correctSubmissions: 3,
  incorrectSubmissions: 2,
  successRate: 0.6,
  latestSubmission: null,
  submissions: [],
};

export const Default: Story = {
  args: {
    questions: mockQuestions,
    language: 'en',
    isMobile: false,
    getStatsForQuestion: () => mockStats,
    hasMore: false,
    isLoading: false,
    isLoadingMore: false,
    onLoadMore: null,
    renderQuestionCard: ({ question }) => (
      <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '8px' }}>
        {question.text.en_text}
      </div>
    ),
    renderInfiniteScrollContainer: null,
  },
};

export const WithInfiniteScroll: Story = {
  args: {
    ...Default.args,
    hasMore: true,
    onLoadMore: () => console.log('Load more'),
    renderInfiniteScrollContainer: ({ children }) => (
      <div style={{ maxHeight: '400px', overflow: 'auto' }}>{children}</div>
    ),
  },
};
