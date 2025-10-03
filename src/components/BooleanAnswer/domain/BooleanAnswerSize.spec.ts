import { describe, it, expect } from 'vitest'
import { BooleanAnswerSize } from './BooleanAnswerSize'

describe('BooleanAnswerSize', () => {
  describe('create', () => {
    it('should create with default medium size when no parameter provided', () => {
      const size = BooleanAnswerSize.create()

      expect(size.getSize()).toBe('md')
      expect(size.isMedium()).toBe(true)
      expect(size.isSmall()).toBe(false)
      expect(size.isLarge()).toBe(false)
    })

    it('should create with small size when sm provided', () => {
      const size = BooleanAnswerSize.create('sm')

      expect(size.getSize()).toBe('sm')
      expect(size.isSmall()).toBe(true)
      expect(size.isMedium()).toBe(false)
      expect(size.isLarge()).toBe(false)
    })

    it('should create with medium size when md provided', () => {
      const size = BooleanAnswerSize.create('md')

      expect(size.getSize()).toBe('md')
      expect(size.isMedium()).toBe(true)
      expect(size.isSmall()).toBe(false)
      expect(size.isLarge()).toBe(false)
    })

    it('should create with large size when lg provided', () => {
      const size = BooleanAnswerSize.create('lg')

      expect(size.getSize()).toBe('lg')
      expect(size.isLarge()).toBe(true)
      expect(size.isSmall()).toBe(false)
      expect(size.isMedium()).toBe(false)
    })
  })

  describe('getSize', () => {
    it('should return the correct size value', () => {
      expect(BooleanAnswerSize.create('sm').getSize()).toBe('sm')
      expect(BooleanAnswerSize.create('md').getSize()).toBe('md')
      expect(BooleanAnswerSize.create('lg').getSize()).toBe('lg')
    })
  })

  describe('isSmall', () => {
    it('should return true only for small size', () => {
      expect(BooleanAnswerSize.create('sm').isSmall()).toBe(true)
      expect(BooleanAnswerSize.create('md').isSmall()).toBe(false)
      expect(BooleanAnswerSize.create('lg').isSmall()).toBe(false)
    })
  })

  describe('isMedium', () => {
    it('should return true only for medium size', () => {
      expect(BooleanAnswerSize.create('md').isMedium()).toBe(true)
      expect(BooleanAnswerSize.create('sm').isMedium()).toBe(false)
      expect(BooleanAnswerSize.create('lg').isMedium()).toBe(false)
    })
  })

  describe('isLarge', () => {
    it('should return true only for large size', () => {
      expect(BooleanAnswerSize.create('lg').isLarge()).toBe(true)
      expect(BooleanAnswerSize.create('sm').isLarge()).toBe(false)
      expect(BooleanAnswerSize.create('md').isLarge()).toBe(false)
    })
  })

  describe('size validation', () => {
    it('should work with all valid size types', () => {
      const sizes = ['sm', 'md', 'lg'] as const

      sizes.forEach(sizeType => {
        const size = BooleanAnswerSize.create(sizeType)
        expect(size.getSize()).toBe(sizeType)
      })
    })
  })
})