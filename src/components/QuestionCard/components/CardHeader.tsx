import type { JSX, ReactNode } from 'react';

interface CardHeaderProps {
  questionText: ReactNode;
  multipartBadge: ReactNode;
  progressIndicator: ReactNode;
  isMobile: boolean;
}

export function CardHeader(props: CardHeaderProps): JSX.Element {
  const { questionText, multipartBadge, progressIndicator, isMobile } = props;

  return (
    <div className="question-card-header">
      <div className="question-card-header-left">
        {questionText}
        {multipartBadge}
      </div>
      <div className={`question-card-header-right ${isMobile ? 'mobile' : 'desktop'}`}>
        {progressIndicator}
      </div>
    </div>
  );
}
