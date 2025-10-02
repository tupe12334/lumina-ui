export interface QuestionSubmission {
  id: string;
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  timestamp: number;
  type: string;
}
