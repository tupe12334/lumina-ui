import { BooleanAnswerValueError } from './BooleanAnswerValueError'

export class BooleanAnswerValue {
  private constructor(private readonly value: boolean | null) {}

  public static create(value?: boolean | null): BooleanAnswerValue {
    if (value !== undefined && value !== null && typeof value !== 'boolean') {
      throw new BooleanAnswerValueError('BooleanAnswer value must be boolean, null, or undefined')
    }
    return new BooleanAnswerValue(value !== null && value !== undefined ? value : null)
  }

  public getValue(): boolean | null {
    return this.value
  }

  public isTrue(): boolean {
    return this.value === true
  }

  public isFalse(): boolean {
    return this.value === false
  }

  public isNull(): boolean {
    return this.value === null
  }
}