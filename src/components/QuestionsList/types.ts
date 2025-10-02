import type { ReactNode } from 'react';
import type {
  Question,
  Language,
  QuestionSubmissionStats,
} from '../../types/question';

export interface QuestionsListProps {
  questions: Question[];
  language: Language;
  isMobile: boolean;
  getStatsForQuestion: (questionId: string) => QuestionSubmissionStats;
  hasMore: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  onLoadMore: (() => void) | null;
  renderQuestionCard: (props: {
    question: Question;
    language: Language;
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
