import { SizeType } from './SizeType'

export class BooleanAnswerSize {
  private constructor(private readonly size: SizeType) {}

  public static create(size?: SizeType): BooleanAnswerSize {
    const finalSize = size !== undefined ? size : 'md'
    return new BooleanAnswerSize(finalSize)
  }

  public getSize(): SizeType {
    return this.size
  }

  public isSmall(): boolean {
    return this.size === 'sm'
  }

  public isMedium(): boolean {
    return this.size === 'md'
  }

  public isLarge(): boolean {
    return this.size === 'lg'
  }
}