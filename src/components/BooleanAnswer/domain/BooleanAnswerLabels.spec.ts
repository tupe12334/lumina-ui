import { describe, it, expect } from 'vitest'
import { BooleanAnswerLabels } from './BooleanAnswerLabels'

describe('BooleanAnswerLabels', () => {
  describe('create', () => {
    it('should create with default labels when no parameters provided', () => {
      const labels = BooleanAnswerLabels.create()

      expect(labels.getTrueLabel()).toBe('True')
      expect(labels.getFalseLabel()).toBe('False')
    })

    it('should create with custom true label and default false label', () => {
      const labels = BooleanAnswerLabels.create('Yes')

      expect(labels.getTrueLabel()).toBe('Yes')
      expect(labels.getFalseLabel()).toBe('False')
    })

    it('should create with default true label and custom false label', () => {
      const labels = BooleanAnswerLabels.create(undefined, 'No')

      expect(labels.getTrueLabel()).toBe('True')
      expect(labels.getFalseLabel()).toBe('No')
    })

    it('should create with both custom labels', () => {
      const labels = BooleanAnswerLabels.create('Agree', 'Disagree')

      expect(labels.getTrueLabel()).toBe('Agree')
      expect(labels.getFalseLabel()).toBe('Disagree')
    })

    it('should handle empty string labels', () => {
      const labels = BooleanAnswerLabels.create('', '')

      expect(labels.getTrueLabel()).toBe('')
      expect(labels.getFalseLabel()).toBe('')
    })

    it('should handle special characters in labels', () => {
      const trueLabel = 'Oui! 🟢 ✓ @#$%'
      const falseLabel = 'Non! 🔴 ✗ @#$%'
      const labels = BooleanAnswerLabels.create(trueLabel, falseLabel)

      expect(labels.getTrueLabel()).toBe(trueLabel)
      expect(labels.getFalseLabel()).toBe(falseLabel)
    })
  })

  describe('getTrueLabel', () => {
    it('should return the correct true label', () => {
      const customLabel = 'Enabled'
      const labels = BooleanAnswerLabels.create(customLabel, 'Disabled')

      expect(labels.getTrueLabel()).toBe(customLabel)
    })
  })

  describe('getFalseLabel', () => {
    it('should return the correct false label', () => {
      const customLabel = 'Disabled'
      const labels = BooleanAnswerLabels.create('Enabled', customLabel)

      expect(labels.getFalseLabel()).toBe(customLabel)
    })
  })

  describe('common label patterns', () => {
    it('should work with Yes/No pattern', () => {
      const labels = BooleanAnswerLabels.create('Yes', 'No')

      expect(labels.getTrueLabel()).toBe('Yes')
      expect(labels.getFalseLabel()).toBe('No')
    })

    it('should work with On/Off pattern', () => {
      const labels = BooleanAnswerLabels.create('On', 'Off')

      expect(labels.getTrueLabel()).toBe('On')
      expect(labels.getFalseLabel()).toBe('Off')
    })

    it('should work with Active/Inactive pattern', () => {
      const labels = BooleanAnswerLabels.create('Active', 'Inactive')

      expect(labels.getTrueLabel()).toBe('Active')
      expect(labels.getFalseLabel()).toBe('Inactive')
    })
  })
})