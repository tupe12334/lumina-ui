import React from 'react'

interface IconProps {
  className?: string
  size?: number
}

export const VideoIcon: React.FC<IconProps> = ({ className, size }) => {
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
      <polygon className={className || ''} points="23 7 16 12 23 17 23 7" />
      <rect className={className || ''} x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  )
}