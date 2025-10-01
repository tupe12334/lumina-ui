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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" className="" />
      <polyline points="7,10 12,5 17,10" className="" />
      <line x1="12" y1="5" x2="12" y2="15" className="" />
    </svg>
  )
}

export const FileIcon: React.FC<IconProps> = ({ className, size }) => {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" className="" />
      <polyline points="14,2 14,8 20,8" className="" />
    </svg>
  )
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
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" className="" />
      <circle cx="8.5" cy="8.5" r="1.5" className="" />
      <polyline points="21,15 16,10 5,21" className="" />
    </svg>
  )
}