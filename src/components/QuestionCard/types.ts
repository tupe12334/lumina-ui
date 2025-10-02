import type { ReactNode } from 'react';
import type {
  Question,
  QuestionSubmission,
  QuestionSubmissionStats,
} from '../../types/question';

export interface QuestionCardProps {
  question: Question;
  isMobile: boolean;
  submissionStats: QuestionSubmissionStats | null;
  isAuthenticated: boolean;
  renderLink: (props: {
    to: string;
    questionId: string;
    children: ReactNode;
  }) => ReactNode;
  renderCard: (props: { questionId: string; children: ReactNode }) => ReactNode;
  renderText: (props: {
    questionId: string;
    text: string;
    size: string;
    weight: string;
  }) => ReactNode;
  renderBadge: (props: {
    questionId: string;
    color: string;
    size: string;
    text: string;
  }) => ReactNode;
  renderProgressIndicator: ((props: {
    questionId: string;
    submissions: QuestionSubmission[];
    stats: QuestionSubmissionStats | null;
    size: string;
    showTooltip: boolean;
    scoreOnly: boolean;
    mode: string;
  }) => ReactNode) | null;
  t: (key: string, options: Record<string, unknown> | null) => string;
}
