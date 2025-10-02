import type { ReactNode } from 'react';
import type {
  Question,
  QuestionSubmissionStats,
} from '../../types/question';

export interface QuestionsListProps {
  questions: Question[];
  isMobile: boolean;
  getStatsForQuestion: (questionId: string) => QuestionSubmissionStats;
  hasMore: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  onLoadMore: (() => void) | null;
  renderQuestionCard: (props: {
    question: Question;
    isMobile: boolean;
    submissionStats: QuestionSubmissionStats;
  }) => ReactNode;
  renderInfiniteScrollContainer: ((props: {
    hasMore: boolean;
    isLoading: boolean;
    isLoadingMore: boolean;
    onLoadMore: () => void;
    children: ReactNode;
  }) => ReactNode) | null;
}
