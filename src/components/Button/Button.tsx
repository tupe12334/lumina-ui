import React from 'react'
import { clsx } from 'clsx'
import styles from './Button.module.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, variant, size, children, ...otherProps } = props
    const finalVariant = variant !== undefined ? variant : 'primary'
    const finalSize = size !== undefined ? size : 'md'
    return (
      <button
        className={clsx(
          styles.button,
          styles[finalVariant],
          styles[finalSize],
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'