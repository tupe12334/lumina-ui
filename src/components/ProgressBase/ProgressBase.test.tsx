import { render, screen } from '@testing-library/react'
import { ProgressBase } from './ProgressBase'

describe('ProgressBase', () => {
  test('renders correctly with default props', () => {
    const { container } = render(<ProgressBase value={50} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('displays correct progress value', () => {
    render(<ProgressBase value={75} />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '75')
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')
  })

  test('clamps value to min and max bounds', () => {
    const { rerender } = render(<ProgressBase value={150} min={0} max={100} />)

    let progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '100')

    rerender(<ProgressBase value={-10} min={0} max={100} />)
    progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '0')
  })

  test('applies correct CSS classes for variants', () => {
    const { container } = render(<ProgressBase value={50} variant="success" />)
    const progressBar = container.firstChild
    if (progressBar && 'className' in progressBar) {
      expect(progressBar.className).toMatch(/success/)
    }
  })

  test('applies correct CSS classes for sizes', () => {
    const { container } = render(<ProgressBase value={50} size="large" />)
    const progressBar = container.firstChild
    if (progressBar && 'className' in progressBar) {
      expect(progressBar.className).toMatch(/large/)
    }
  })

  test('applies custom className', () => {
    const { container } = render(<ProgressBase value={50} className="custom-class" />)
    const progressBar = container.firstChild
    expect(progressBar).toHaveClass('custom-class')
  })

  test('shows percentage text when showValue is true', () => {
    render(<ProgressBase value={75} showValue={true} />)

    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  test('hides percentage text when showValue is false', () => {
    render(<ProgressBase value={75} showValue={false} />)

    expect(screen.queryByText('75%')).not.toBeInTheDocument()
  })

  test('supports custom min and max values', () => {
    render(<ProgressBase value={15} min={10} max={20} />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '15')
    expect(progressBar).toHaveAttribute('aria-valuemin', '10')
    expect(progressBar).toHaveAttribute('aria-valuemax', '20')
  })

  test('calculates percentage correctly with custom range', () => {
    render(<ProgressBase value={15} min={10} max={20} showValue={true} />)

    // 15 in range 10-20 should be 50%
    expect(screen.getByText('50%')).toBeInTheDocument()
  })

  test('supports aria-label', () => {
    render(<ProgressBase value={50} aria-label="Upload progress" />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-label', 'Upload progress')
  })

  test('supports aria-labelledby', () => {
    render(<ProgressBase value={50} aria-labelledby="progress-label" />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-labelledby', 'progress-label')
  })

  test('progress fill has correct width style', () => {
    const { container } = render(<ProgressBase value={60} />)
    const progressFill = container.querySelector('[style*="width: 60%"]')
    expect(progressFill).toBeInTheDocument()
  })
})