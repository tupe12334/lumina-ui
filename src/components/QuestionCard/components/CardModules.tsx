import type { JSX, ReactNode } from 'react';
import type { ModuleRef, Language } from '../../../types/question';

interface CardModulesProps {
  questionId: string;
  modules: ModuleRef[];
  renderBadge: (props: {
    questionId: string;
    color: string;
    size: string;
    text: string;
  }) => ReactNode;
  translate: (text: { en_text: string; he_text: string }, language: Language) => string;
  language: Language;
}

export function CardModules(props: CardModulesProps): JSX.Element {
  const { questionId, modules, renderBadge, translate, language } = props;

  return (
    <div
      id={`question-modules-${questionId}`}
      className="question-card-modules"
    >
      {modules.map((module) =>
        renderBadge({
          questionId,
          color: 'blue',
          size: '1',
          text: translate(module.name, language),
        })
      )}
    </div>
  );
}
