import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QuestionCard } from './QuestionCard';
import type { QuestionCardProps } from './types';

describe('QuestionCard', () => {
  const mockQuestion = {
    id: 'q1',
    text: { en_text: 'Test Question', he_text: 'שאלת בדיקה' },
    type: 'selection',
    validationStatus: 'approved',
  };

  const defaultProps: QuestionCardProps = {
    question: mockQuestion,
    language: 'en',
    isMobile: false,
    submissionStats: null,
    isAuthenticated: false,
    renderLink: ({ children }) => <a href="/test" className="link">{children}</a>,
    renderCard: ({ children }) => <div className="card">{children}</div>,
    renderText: ({ text }) => <span className="text">{text}</span>,
    renderBadge: ({ text }) => <span className="badge">{text}</span>,
    renderProgressIndicator: null,
    translate: (text) => text.en_text,
    t: (key) => key,
  };

  it('renders question card', () => {
    render(<QuestionCard {...defaultProps} />);
    expect(screen.getByText('Test Question')).toBeInTheDocument();
  });

  it('renders multipart badge when question has parts', () => {
    const propsWithParts: QuestionCardProps = {
      ...defaultProps,
      question: {
        ...mockQuestion,
        parts: [
          { id: 'p1', order: 1 },
          { id: 'p2', order: 2 },
        ],
      },
    };
    render(<QuestionCard {...propsWithParts} />);
    expect(screen.getByText(/multiPart/)).toBeInTheDocument();
  });

  it('renders modules when available', () => {
    const propsWithModules: QuestionCardProps = {
      ...defaultProps,
      question: {
        ...mockQuestion,
        modules: [{ id: 'm1', name: { en_text: 'Math', he_text: 'מתמטיקה' } }],
      },
    };
    render(<QuestionCard {...propsWithModules} />);
    expect(screen.getByText('Math')).toBeInTheDocument();
  });
});
