import { BooleanAnswerValue } from '../domain/BooleanAnswerValue'

export class BooleanAnswerService {
  public static handleSelection(
    currentValue: BooleanAnswerValue,
    newValue: boolean,
    disabled: boolean,
    onSelect?: (value: boolean) => void
  ): BooleanAnswerValue {
    if (disabled) {
      return currentValue
    }

    if (onSelect) {
      onSelect(newValue)
    }

    return BooleanAnswerValue.create(newValue)
  }
}