import { describe, it, expect, vi } from 'vitest'
import { StylesProvider } from './StylesProvider'

vi.mock('../BooleanAnswer.module.css', () => ({
  default: {
    container: 'container-class',
    button: 'button-class',
    small: 'small-class',
    medium: 'medium-class',
    large: 'large-class',
    selected: 'selected-class',
    true: 'true-class',
    false: 'false-class',
    disabled: 'disabled-class'
  }
}))

describe('StylesProvider', () => {
  describe('getSizeClass', () => {
    it('should return small class for sm size', () => {
      const result = StylesProvider.getSizeClass('sm')
      expect(result).toBe('small-class')
    })

    it('should return large class for lg size', () => {
      const result = StylesProvider.getSizeClass('lg')
      expect(result).toBe('large-class')
    })

    it('should return medium class for md size', () => {
      const result = StylesProvider.getSizeClass('md')
      expect(result).toBe('medium-class')
    })

    it('should return medium class as default for any other value', () => {
      const result = StylesProvider.getSizeClass('md')
      expect(result).toBe('medium-class')
    })
  })

  describe('getButtonClasses', () => {
    it('should return base button class when not selected', () => {
      const result = StylesProvider.getButtonClasses(false, false, 'size-class')
      expect(result).toBe('button-class size-class')
    })

    it('should include selected class when selected', () => {
      const result = StylesProvider.getButtonClasses(true, false, 'size-class')
      expect(result).toBe('button-class size-class selected-class false-class')
    })

    it('should include true class when selected and true', () => {
      const result = StylesProvider.getButtonClasses(true, true, 'size-class')
      expect(result).toBe('button-class size-class selected-class true-class')
    })

    it('should include false class when selected and false', () => {
      const result = StylesProvider.getButtonClasses(true, false, 'size-class')
      expect(result).toBe('button-class size-class selected-class false-class')
    })

    it('should handle empty size class', () => {
      const result = StylesProvider.getButtonClasses(false, false, '')
      expect(result).toBe('button-class')
    })

    it('should filter out empty strings correctly', () => {
      const result = StylesProvider.getButtonClasses(false, true, 'size-class')
      expect(result).toBe('button-class size-class')
      expect(result).not.toContain('  ') // no double spaces
    })
  })

  describe('getContainerClasses', () => {
    it('should return base container class when not disabled', () => {
      const result = StylesProvider.getContainerClasses(false)
      expect(result).toBe('container-class')
    })

    it('should include disabled class when disabled', () => {
      const result = StylesProvider.getContainerClasses(true)
      expect(result).toBe('container-class disabled-class')
    })

    it('should include custom className when provided', () => {
      const result = StylesProvider.getContainerClasses(false, 'custom-class')
      expect(result).toBe('container-class custom-class')
    })

    it('should include both disabled and custom classes', () => {
      const result = StylesProvider.getContainerClasses(true, 'custom-class')
      expect(result).toBe('container-class disabled-class custom-class')
    })

    it('should handle undefined className', () => {
      const result = StylesProvider.getContainerClasses(false, undefined)
      expect(result).toBe('container-class')
    })

    it('should handle empty className', () => {
      const result = StylesProvider.getContainerClasses(false, '')
      expect(result).toBe('container-class')
    })

    it('should filter out falsy values correctly', () => {
      const result = StylesProvider.getContainerClasses(false, '')
      expect(result).toBe('container-class')
      expect(result).not.toContain('  ') // no double spaces
    })
  })

  describe('class combination logic', () => {
    it('should handle multiple scenarios correctly', () => {
      const scenarios = [
        {
          isSelected: false,
          isTrue: false,
          disabled: false,
          expected: { button: 'button-class size-class', container: 'container-class' }
        },
        {
          isSelected: true,
          isTrue: true,
          disabled: true,
          expected: {
            button: 'button-class size-class selected-class true-class',
            container: 'container-class disabled-class'
          }
        },
        {
          isSelected: true,
          isTrue: false,
          disabled: false,
          expected: {
            button: 'button-class size-class selected-class false-class',
            container: 'container-class'
          }
        }
      ]

      scenarios.forEach(({ isSelected, isTrue, disabled, expected }) => {
        const buttonResult = StylesProvider.getButtonClasses(isSelected, isTrue, 'size-class')
        const containerResult = StylesProvider.getContainerClasses(disabled)

        expect(buttonResult).toBe(expected.button)
        expect(containerResult).toBe(expected.container)
      })
    })
  })
})