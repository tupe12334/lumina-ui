import React from 'react'

interface IconProps {
  className?: string
  size?: number
}

export const RemoveIcon: React.FC<IconProps> = ({ className, size }) => {
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
      <polyline className={className || ''} points="3,6 5,6 21,6" />
      <path className={className || ''} d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
      <line className={className || ''} x1="10" y1="11" x2="10" y2="17" />
      <line className={className || ''} x1="14" y1="11" x2="14" y2="17" />
    </svg>
  )
}