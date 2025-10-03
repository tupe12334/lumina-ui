import { describe, it, expect, vi } from 'vitest'
import { BooleanAnswerService } from './BooleanAnswerService'
import { BooleanAnswerValue } from '../domain/BooleanAnswerValue'

describe('BooleanAnswerService', () => {
  describe('handleSelection', () => {
    it('should return new value when not disabled', () => {
      const currentValue = BooleanAnswerValue.create(false)
      const result = BooleanAnswerService.handleSelection(currentValue, true, false)

      expect(result.getValue()).toBe(true)
      expect(result.isTrue()).toBe(true)
    })

    it('should return current value when disabled', () => {
      const currentValue = BooleanAnswerValue.create(false)
      const result = BooleanAnswerService.handleSelection(currentValue, true, true)

      expect(result.getValue()).toBe(false)
      expect(result).toBe(currentValue)
    })

    it('should call onSelect callback when provided and not disabled', () => {
      const onSelect = vi.fn()
      const currentValue = BooleanAnswerValue.create(null)

      BooleanAnswerService.handleSelection(currentValue, true, false, onSelect)

      expect(onSelect).toHaveBeenCalledWith(true)
      expect(onSelect).toHaveBeenCalledTimes(1)
    })

    it('should not call onSelect callback when disabled', () => {
      const onSelect = vi.fn()
      const currentValue = BooleanAnswerValue.create(false)

      BooleanAnswerService.handleSelection(currentValue, true, true, onSelect)

      expect(onSelect).not.toHaveBeenCalled()
    })

    it('should work without onSelect callback', () => {
      const currentValue = BooleanAnswerValue.create(true)
      const result = BooleanAnswerService.handleSelection(currentValue, false, false)

      expect(result.getValue()).toBe(false)
      expect(result.isFalse()).toBe(true)
    })

    it('should handle selection of false value', () => {
      const currentValue = BooleanAnswerValue.create(true)
      const onSelect = vi.fn()

      const result = BooleanAnswerService.handleSelection(currentValue, false, false, onSelect)

      expect(result.getValue()).toBe(false)
      expect(onSelect).toHaveBeenCalledWith(false)
    })

    it('should create new BooleanAnswerValue instance', () => {
      const currentValue = BooleanAnswerValue.create(true)
      const result = BooleanAnswerService.handleSelection(currentValue, true, false)

      expect(result).not.toBe(currentValue)
      expect(result).toBeInstanceOf(BooleanAnswerValue)
    })

    it('should handle multiple selection changes', () => {
      const onSelect = vi.fn()
      let currentValue = BooleanAnswerValue.create(null)

      currentValue = BooleanAnswerService.handleSelection(currentValue, true, false, onSelect)
      expect(currentValue.getValue()).toBe(true)
      expect(onSelect).toHaveBeenLastCalledWith(true)

      currentValue = BooleanAnswerService.handleSelection(currentValue, false, false, onSelect)
      expect(currentValue.getValue()).toBe(false)
      expect(onSelect).toHaveBeenLastCalledWith(false)

      expect(onSelect).toHaveBeenCalledTimes(2)
    })
  })
})