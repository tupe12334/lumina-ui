import React from 'react'

interface IconProps {
  className?: string
  size?: number
}

export const PdfIcon: React.FC<IconProps> = ({ className, size }) => {
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
      <path className={className || ''} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline className={className || ''} points="14,2 14,8 20,8" />
      <line className={className || ''} x1="16" y1="13" x2="8" y2="13" />
      <line className={className || ''} x1="16" y1="17" x2="8" y2="17" />
      <polyline className={className || ''} points="10,9 9,9 8,9" />
    </svg>
  )
}