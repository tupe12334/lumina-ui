import React from 'react'

interface IconProps {
  className?: string
  size?: number
}

export const UploadIcon: React.FC<IconProps> = ({ className, size }) => {
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
    <path className={className || ''} d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline className={className || ''} points="7,10 12,5 17,10" />
    <line className={className || ''} x1="12" y1="5" x2="12" y2="15" />
  </svg>
  )
}