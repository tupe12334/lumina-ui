import styles from '../BooleanAnswer.module.css'
import { SizeType } from '../domain/SizeType'

export class StylesProvider {
  public static getSizeClass(size: SizeType): string {
    if (size === 'sm') {
      return styles.small
    }
    if (size === 'lg') {
      return styles.large
    }
    return styles.medium
  }

  public static getButtonClasses(isSelected: boolean, isTrue: boolean, sizeClass: string): string {
    return [
      styles.button,
      sizeClass,
      isSelected ? styles.selected : '',
      isSelected && isTrue ? styles.true : '',
      isSelected && !isTrue ? styles.false : ''
    ].filter(Boolean).join(' ')
  }

  public static getContainerClasses(disabled: boolean, className?: string): string {
    return [
      styles.container,
      disabled ? styles.disabled : '',
      className
    ].filter(Boolean).join(' ')
  }
}