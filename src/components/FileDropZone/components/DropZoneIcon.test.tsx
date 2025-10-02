import { render, screen } from '@testing-library/react'
import { DropZoneIcon } from './DropZoneIcon'

describe('DropZoneIcon', () => {
  test('renders correctly with default icon', () => {
    const { container } = render(<DropZoneIcon />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('renders default upload icon when no icon prop provided', () => {
    render(<DropZoneIcon />)

    // Check for SVG upload icon
    const svgIcon = document.querySelector('svg')
    expect(svgIcon).toBeInTheDocument()
  })

  test('renders emoji when icon prop is provided', () => {
    render(<DropZoneIcon icon="📁" />)

    expect(screen.getByText('📁')).toBeInTheDocument()
  })

  test('does not render SVG when emoji is provided', () => {
    render(<DropZoneIcon icon="📸" />)

    expect(screen.getByText('📸')).toBeInTheDocument()

    // SVG should not be present
    const svgIcon = document.querySelector('svg')
    expect(svgIcon).not.toBeInTheDocument()
  })

  test('applies correct CSS classes', () => {
    const { rerender } = render(<DropZoneIcon />)

    // Check default icon has correct class
    const svgIcon = document.querySelector('svg')
    expect(svgIcon).toHaveClass('icon')

    // Check emoji icon has correct class
    rerender(<DropZoneIcon icon="🎵" />)
    const emojiIcon = screen.getByText('🎵')
    expect(emojiIcon).toHaveClass('emojiIcon')
  })

  test('works with various emoji types', () => {
    const emojis = ['📁', '📸', '🎵', '📄', '🖼️', '🎬']

    emojis.forEach(emoji => {
      const { rerender } = render(<DropZoneIcon icon={emoji} />)
      expect(screen.getByText(emoji)).toBeInTheDocument()

      if (emoji !== emojis[0]) {
        rerender(<DropZoneIcon icon={emoji} />)
      }
    })
  })

  test('handles empty string icon prop', () => {
    render(<DropZoneIcon icon="" />)

    // Should render default SVG icon for empty string
    const svgIcon = document.querySelector('svg')
    expect(svgIcon).toBeInTheDocument()
  })
})