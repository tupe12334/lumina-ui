export class BooleanAnswerValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BooleanAnswerValueError'
  }
}