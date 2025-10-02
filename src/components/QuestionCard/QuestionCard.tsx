import type { ReactNode } from 'react';
import type { QuestionCardProps } from './types';
import { CardHeader } from './components/CardHeader';
import { CardContent } from './components/CardContent';
import { CardModules } from './components/CardModules';

function renderQuestionText(props: QuestionCardProps): ReactNode {
  const { question, renderText } = props;
  return renderText({
    questionId: question.id,
    text: question.text,
    size: '3',
    weight: 'medium',
  });
}

function renderMultipartBadge(props: QuestionCardProps): ReactNode {
  const { question, renderBadge, t } = props;
  if (!question.parts || question.parts.length === 0) {
    return null;
  }
  return renderBadge({
    questionId: question.id,
    color: 'purple',
    size: '1',
    text: `${t('multiPart', null)} (${question.parts.length})`,
  });
}

function renderProgress(props: QuestionCardProps): ReactNode {
  const { submissionStats, isAuthenticated, renderProgressIndicator, isMobile, question } = props;

  const hasSubmissions =
    isAuthenticated &&
    submissionStats !== null &&
    submissionStats.submissions.length > 0;

  if (!hasSubmissions || !renderProgressIndicator) {
    return null;
  }

  return renderProgressIndicator({
    questionId: question.id,
    submissions: submissionStats.submissions,
    stats: submissionStats,
    size: 'small',
    showTooltip: !isMobile,
    scoreOnly: isMobile,
    mode: 'knowledge',
  });
}

export function QuestionCard(props: QuestionCardProps): ReactNode {
  const { question, isMobile, renderLink, renderCard, renderBadge } = props;

  const questionText = renderQuestionText(props);
  const multipartBadge = renderMultipartBadge(props);
  const progressIndicator = renderProgress(props);

  const modulesContent = question.modules && question.modules.length > 0 ? (
    <CardModules questionId={question.id} modules={question.modules} renderBadge={renderBadge} />
  ) : null;

  const link = renderLink({
    to: `/questions/${question.id}`,
    questionId: question.id,
    children: renderCard({
      questionId: question.id,
      children: (
        <CardContent
          question={question}
          isMobile={isMobile}
          headerContent={<CardHeader questionText={questionText} multipartBadge={multipartBadge} progressIndicator={progressIndicator} isMobile={isMobile} />}
          modulesContent={modulesContent}
        />
      ),
    }),
  });

  return link;
}
