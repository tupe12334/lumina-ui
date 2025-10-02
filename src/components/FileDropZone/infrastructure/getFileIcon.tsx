import React from 'react'
import { FileIcon } from './FileIcons'
import { ImageIcon } from './ImageIcon'
import { VideoIcon } from './VideoIcon'
import { PdfIcon } from './PdfIcon'

interface IconProps {
  className?: string
  size?: number
}

export function getFileIcon(fileType: string): React.FC<IconProps> {
  if (fileType.startsWith('image/')) {
    return ImageIcon
  }
  if (fileType.startsWith('video/')) {
    return VideoIcon
  }
  if (fileType === 'application/pdf') {
    return PdfIcon
  }
  return FileIcon
}