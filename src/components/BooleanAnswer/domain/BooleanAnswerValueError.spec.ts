import { describe, it, expect } from 'vitest'
import { BooleanAnswerValueError } from './BooleanAnswerValueError'

describe('BooleanAnswerValueError', () => {
  it('should create error with correct message', () => {
    const message = 'Test error message'
    const error = new BooleanAnswerValueError(message)

    expect(error.message).toBe(message)
    expect(error.name).toBe('BooleanAnswerValueError')
  })

  it('should be instance of Error', () => {
    const error = new BooleanAnswerValueError('Test message')

    expect(error).toBeInstanceOf(Error)
    expect(error).toBeInstanceOf(BooleanAnswerValueError)
  })

  it('should maintain error stack trace', () => {
    const error = new BooleanAnswerValueError('Test message')

    expect(error.stack).toBeDefined()
    expect(typeof error.stack).toBe('string')
  })

  it('should work with different message types', () => {
    const messages = [
      'Simple message',
      'Message with special chars: @#$%^&*()',
      'Multi-line\nmessage\nwith\nbreaks',
      '',
    ]

    messages.forEach(message => {
      const error = new BooleanAnswerValueError(message)
      expect(error.message).toBe(message)
      expect(error.name).toBe('BooleanAnswerValueError')
    })
  })
})