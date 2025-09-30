export class BooleanAnswerLabels {
  private constructor(
    private readonly trueLabel: string,
    private readonly falseLabel: string
  ) {}

  public static create(trueLabel?: string, falseLabel?: string): BooleanAnswerLabels {
    const finalTrueLabel = trueLabel !== undefined ? trueLabel : 'True'
    const finalFalseLabel = falseLabel !== undefined ? falseLabel : 'False'
    return new BooleanAnswerLabels(finalTrueLabel, finalFalseLabel)
  }

  public getTrueLabel(): string {
    return this.trueLabel
  }

  public getFalseLabel(): string {
    return this.falseLabel
  }
}