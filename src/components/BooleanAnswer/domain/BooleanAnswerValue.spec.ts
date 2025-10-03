import { describe, it, expect } from 'vitest'
import { BooleanAnswerValue } from './BooleanAnswerValue'
import { BooleanAnswerValueError } from './BooleanAnswerValueError'

describe('BooleanAnswerValue', () => {
  describe('create', () => {
    it('should create with null value when no parameter provided', () => {
      const value = BooleanAnswerValue.create()

      expect(value.getValue()).toBe(null)
      expect(value.isNull()).toBe(true)
    })

    it('should create with null value when null provided', () => {
      const value = BooleanAnswerValue.create(null)

      expect(value.getValue()).toBe(null)
      expect(value.isNull()).toBe(true)
    })

    it('should create with null value when undefined provided', () => {
      const value = BooleanAnswerValue.create(undefined)

      expect(value.getValue()).toBe(null)
      expect(value.isNull()).toBe(true)
    })

    it('should create with true value when true provided', () => {
      const value = BooleanAnswerValue.create(true)

      expect(value.getValue()).toBe(true)
      expect(value.isTrue()).toBe(true)
      expect(value.isNull()).toBe(false)
      expect(value.isFalse()).toBe(false)
    })

    it('should create with false value when false provided', () => {
      const value = BooleanAnswerValue.create(false)

      expect(value.getValue()).toBe(false)
      expect(value.isFalse()).toBe(true)
      expect(value.isNull()).toBe(false)
      expect(value.isTrue()).toBe(false)
    })

    it('should throw error when invalid type provided', () => {
      expect(() => BooleanAnswerValue.create('invalid' as const)).toThrow(BooleanAnswerValueError)
      expect(() => BooleanAnswerValue.create(123 as const)).toThrow(BooleanAnswerValueError)
      expect(() => BooleanAnswerValue.create({} as const)).toThrow(BooleanAnswerValueError)
      expect(() => BooleanAnswerValue.create([] as const)).toThrow(BooleanAnswerValueError)
    })
  })

  describe('getValue', () => {
    it('should return the correct boolean value', () => {
      expect(BooleanAnswerValue.create(true).getValue()).toBe(true)
      expect(BooleanAnswerValue.create(false).getValue()).toBe(false)
      expect(BooleanAnswerValue.create(null).getValue()).toBe(null)
    })
  })

  describe('isTrue', () => {
    it('should return true only when value is true', () => {
      expect(BooleanAnswerValue.create(true).isTrue()).toBe(true)
      expect(BooleanAnswerValue.create(false).isTrue()).toBe(false)
      expect(BooleanAnswerValue.create(null).isTrue()).toBe(false)
    })
  })

  describe('isFalse', () => {
    it('should return true only when value is false', () => {
      expect(BooleanAnswerValue.create(false).isFalse()).toBe(true)
      expect(BooleanAnswerValue.create(true).isFalse()).toBe(false)
      expect(BooleanAnswerValue.create(null).isFalse()).toBe(false)
    })
  })

  describe('isNull', () => {
    it('should return true only when value is null', () => {
      expect(BooleanAnswerValue.create(null).isNull()).toBe(true)
      expect(BooleanAnswerValue.create(undefined).isNull()).toBe(true)
      expect(BooleanAnswerValue.create(true).isNull()).toBe(false)
      expect(BooleanAnswerValue.create(false).isNull()).toBe(false)
    })
  })
})