import type { JSX } from 'react';
import type { QuestionsListProps } from './types';

export function QuestionsList(props: QuestionsListProps): JSX.Element {
  const {
    questions,
    isMobile,
    getStatsForQuestion,
    hasMore,
    isLoading,
    isLoadingMore,
    onLoadMore,
    renderQuestionCard,
    renderInfiniteScrollContainer,
  } = props;

  const questionsContent = (
    <div
      id="questions-list-container"
      className="questions-list-container"
    >
      {questions.map((question) => {
        const submissionStats = getStatsForQuestion(question.id);

        return (
          <div
            key={question.id}
            id={`question-item-${question.id}`}
            className="question-item"
          >
            {renderQuestionCard({
              question,
              isMobile,
              submissionStats,
            })}
          </div>
        );
      })}
    </div>
  );

  if (!onLoadMore || !renderInfiniteScrollContainer) {
    return questionsContent;
  }

  return (
    <div
      id="questions-infinite-scroll-wrapper"
      className="questions-infinite-scroll-wrapper"
    >
      {renderInfiniteScrollContainer({
        hasMore,
        isLoading,
        isLoadingMore,
        onLoadMore,
        children: questionsContent,
      })}
    </div>
  );
}
