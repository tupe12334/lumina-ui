import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QuestionsList } from './QuestionsList';
import type { QuestionsListProps } from './types';

describe('QuestionsList', () => {
  const mockQuestion = {
    id: 'q1',
    text: { en_text: 'Test Question', he_text: 'שאלת בדיקה' },
    type: 'selection',
    validationStatus: 'approved',
  };

  const mockStats = {
    totalSubmissions: 5,
    correctSubmissions: 3,
    incorrectSubmissions: 2,
    successRate: 0.6,
    latestSubmission: null,
    submissions: [],
  };

  const defaultProps: QuestionsListProps = {
    questions: [mockQuestion],
    language: 'en',
    isMobile: false,
    getStatsForQuestion: vi.fn(() => mockStats),
    hasMore: false,
    isLoading: false,
    isLoadingMore: false,
    onLoadMore: null,
    renderQuestionCard: ({ question }) => <div className="card">{question.text.en_text}</div>,
    renderInfiniteScrollContainer: null,
  };

  it('renders questions list', () => {
    render(<QuestionsList {...defaultProps} />);
    expect(screen.getByText('Test Question')).toBeInTheDocument();
  });

  it('applies correct className to container', () => {
    const { container } = render(<QuestionsList {...defaultProps} />);
    const listContainer = container.querySelector('.questions-list-container');
    expect(listContainer).toBeInTheDocument();
  });

  it('renders with infinite scroll when provided', () => {
    const propsWithScroll: QuestionsListProps = {
      ...defaultProps,
      onLoadMore: vi.fn(),
      renderInfiniteScrollContainer: ({ children }) => (
        <div className="infinite-scroll">{children}</div>
      ),
    };
    const { container } = render(<QuestionsList {...propsWithScroll} />);
    expect(container.querySelector('.infinite-scroll')).toBeInTheDocument();
  });
});
