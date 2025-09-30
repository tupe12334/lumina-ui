import React from 'react'
import { cn } from './infrastructure/classNames'

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
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-blue-600 text-white hover:bg-blue-700': finalVariant === 'primary',
            'bg-gray-100 text-gray-900 hover:bg-gray-200': finalVariant === 'secondary',
            'border border-gray-300 bg-transparent hover:bg-gray-50': finalVariant === 'outline',
          },
          {
            'h-8 px-3 text-sm': finalSize === 'sm',
            'h-10 px-4': finalSize === 'md',
            'h-12 px-6 text-lg': finalSize === 'lg',
          },
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