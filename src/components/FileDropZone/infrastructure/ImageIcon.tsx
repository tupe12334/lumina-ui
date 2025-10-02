import React from 'react'

interface IconProps {
  className?: string
  size?: number
}

export const ImageIcon: React.FC<IconProps> = ({ className, size }) => {
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
    >
      <rect className={className || ''} x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle className={className || ''} cx="8.5" cy="8.5" r="1.5" />
      <polyline className={className || ''} points="21,15 16,10 5,21" />
    </svg>
  )
}