import React from 'react'

interface IconProps {
  className?: string
  size?: number
}

export const SpinnerIcon: React.FC<IconProps> = ({ className, size }) => {
  const iconSize = size || 24
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || ''}
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <path d="M21 12a9 9 0 11-6.219-8.56" className="" />
    </svg>
  )
}