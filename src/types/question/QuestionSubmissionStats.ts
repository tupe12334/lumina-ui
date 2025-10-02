import type { QuestionSubmission } from './QuestionSubmission';

export interface QuestionSubmissionStats {
  totalSubmissions: number;
  correctSubmissions: number;
  incorrectSubmissions: number;
  successRate: number;
  latestSubmission: QuestionSubmission | null;
  submissions: QuestionSubmission[];
  knowledgeScore?: {
    score: number;
    level: string;
    color: string;
  };
}
