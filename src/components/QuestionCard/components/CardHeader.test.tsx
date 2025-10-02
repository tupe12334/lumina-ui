import { render, screen } from '@testing-library/react'
import { CardHeader } from './CardHeader'

describe('CardHeader', () => {
  const defaultProps = {
    questionText: 'What is your favorite color?',
    multipartBadge: <span className="test-badge">Badge</span>,
    progressIndicator: <span className="test-progress">Progress</span>,
    isMobile: false,
  }

  test('renders correctly with default props', () => {
    const { container } = render(<CardHeader {...defaultProps} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('displays question text', () => {
    render(<CardHeader {...defaultProps} />)
    expect(screen.getByText('What is your favorite color?')).toBeInTheDocument()
  })

  test('displays multipart badge', () => {
    render(<CardHeader {...defaultProps} />)
    expect(screen.getByText('Badge')).toBeInTheDocument()
  })

  test('displays progress indicator', () => {
    render(<CardHeader {...defaultProps} />)
    expect(screen.getByText('Progress')).toBeInTheDocument()
  })

  test('applies mobile class when isMobile is true', () => {
    const { container } = render(<CardHeader {...defaultProps} isMobile={true} />)
    const rightElement = container.querySelector('.question-card-header-right')
    expect(rightElement).toHaveClass('mobile')
  })

  test('applies desktop class when isMobile is false', () => {
    const { container } = render(<CardHeader {...defaultProps} isMobile={false} />)
    const rightElement = container.querySelector('.question-card-header-right')
    expect(rightElement).toHaveClass('desktop')
  })

  test('renders with complex question text', () => {
    const complexQuestionText = (
      <div className="complex-question">
        <strong className="question-label">Question 1:</strong> What is your favorite programming language?
      </div>
    )

    render(<CardHeader {...defaultProps} questionText={complexQuestionText} />)
    expect(screen.getByText('Question 1:')).toBeInTheDocument()
    expect(screen.getByText('What is your favorite programming language?')).toBeInTheDocument()
  })

  test('renders with complex multipart badge', () => {
    const complexBadge = (
      <div className="badge-container">
        <span className="badge-text">Part 2 of 5</span>
      </div>
    )

    render(<CardHeader {...defaultProps} multipartBadge={complexBadge} />)
    expect(screen.getByText('Part 2 of 5')).toBeInTheDocument()
  })

  test('renders with complex progress indicator', () => {
    const complexProgress = (
      <div className="progress-container">
        <span className="progress-text">40% Complete</span>
        <div className="progress-bar"></div>
      </div>
    )

    render(<CardHeader {...defaultProps} progressIndicator={complexProgress} />)
    expect(screen.getByText('40% Complete')).toBeInTheDocument()
  })

  test('has correct structure with proper CSS classes', () => {
    const { container } = render(<CardHeader {...defaultProps} />)

    const header = container.querySelector('.question-card-header')
    const left = container.querySelector('.question-card-header-left')
    const right = container.querySelector('.question-card-header-right')

    expect(header).toBeInTheDocument()
    expect(left).toBeInTheDocument()
    expect(right).toBeInTheDocument()
  })
})