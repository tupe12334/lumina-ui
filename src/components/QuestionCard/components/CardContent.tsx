import type { JSX, ReactNode } from 'react';
import type { Question, Language } from '../../../types/question';

interface CardContentProps {
  question: Question;
  language: Language;
  isMobile: boolean;
  headerContent: ReactNode;
  modulesContent: ReactNode;
}

export function CardContent(props: CardContentProps): JSX.Element {
  const { headerContent, modulesContent } = props;

  return (
    <div className="question-card-content">
      {headerContent}
      {modulesContent}
    </div>
  );
}
