import { describe, it, expect } from 'vitest'
import { type SizeType } from './SizeType'

describe('SizeType', (): void => {
  describe('type definition', (): void => {
    it('should accept all valid size values', () => {
      const validSizes: SizeType[] = ['sm', 'md', 'lg']

      validSizes.forEach(size => {
        const testSize: SizeType = size
        expect(testSize).toBe(size)
      })
    })

    it('should work in conditional logic', () => {
      const size: SizeType = 'md'

      const isSmall = size === 'sm'
      const isMedium = size === 'md'
      const isLarge = size === 'lg'

      expect(isSmall).toBe(false)
      expect(isMedium).toBe(true)
      expect(isLarge).toBe(false)
    })

    it('should work with switch statements', (): void => {
      const getSizeClass = (size: SizeType): string => {
        switch (size) {
          case 'sm':
            return 'text-sm py-1 px-2'
          case 'md':
            return 'text-base py-2 px-4'
          case 'lg':
            return 'text-lg py-3 px-6'
        }
      }

      expect(getSizeClass('sm')).toBe('text-sm py-1 px-2')
      expect(getSizeClass('md')).toBe('text-base py-2 px-4')
      expect(getSizeClass('lg')).toBe('text-lg py-3 px-6')
    })

    it('should work in arrays and sets', () => {
      const availableSizes: SizeType[] = ['sm', 'md', 'lg']
      const largeSizes = new Set<SizeType>(['lg'])

      expect(availableSizes).toContain('sm')
      expect(availableSizes).toContain('md')
      expect(availableSizes).toContain('lg')
      expect(largeSizes.has('lg')).toBe(true)
      expect(largeSizes.has('sm')).toBe(false)
    })

    it('should work with type guards', () => {
      const isValidSize = (value: string): value is SizeType => {
        return ['sm', 'md', 'lg'].includes(value)
      }

      expect(isValidSize('sm')).toBe(true)
      expect(isValidSize('md')).toBe(true)
      expect(isValidSize('lg')).toBe(true)
      expect(isValidSize('xl')).toBe(false)
      expect(isValidSize('invalid')).toBe(false)
    })

    it('should work with function parameters and return types', () => {
      const getNextSize = (current: SizeType): SizeType => {
        if (current === 'sm') return 'md'
        if (current === 'md') return 'lg'
        return 'lg'
      }

      const getPreviousSize = (current: SizeType): SizeType => {
        if (current === 'lg') return 'md'
        if (current === 'md') return 'sm'
        return 'sm'
      }

      expect(getNextSize('sm')).toBe('md')
      expect(getNextSize('md')).toBe('lg')
      expect(getNextSize('lg')).toBe('lg')

      expect(getPreviousSize('lg')).toBe('md')
      expect(getPreviousSize('md')).toBe('sm')
      expect(getPreviousSize('sm')).toBe('sm')
    })

    it('should work with mapping and filtering', (): void => {
      const sizes: SizeType[] = ['sm', 'md', 'lg']

      const getSizeLabel = (size: SizeType): string => {
        switch (size) {
          case 'sm':
            return 'Small'
          case 'md':
            return 'Medium'
          case 'lg':
            return 'Large'
        }
      }

      const sizeLabels = sizes.map(getSizeLabel)

      expect(sizeLabels).toEqual(['Small', 'Medium', 'Large'])

      const nonSmallSizes = sizes.filter(size => size !== 'sm')
      expect(nonSmallSizes).toEqual(['md', 'lg'])
    })
  })
})