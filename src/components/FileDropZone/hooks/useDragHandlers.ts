import { useCallback, useRef } from 'react'
import { DragState } from '../domain/DragState'
import { FileDropZoneService } from '../application/FileDropZoneService'

interface UseDragHandlersProps {
  setDragState: React.Dispatch<React.SetStateAction<DragState>>
  onDrop: (files: FileList) => void
}

export function useDragHandlers({ setDragState, onDrop }: UseDragHandlersProps) {
  const dragCounter = useRef(0)

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current += 1

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragState(currentState => FileDropZoneService.handleDragOver(currentState))
    }
  }, [setDragState])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current -= 1

    if (dragCounter.current === 0) {
      setDragState(currentState => FileDropZoneService.handleDragLeave(currentState))
    }
  }, [setDragState])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current = 0
    setDragState(currentState => FileDropZoneService.handleDrop(currentState))

    const droppedFiles = e.dataTransfer.files
    if (droppedFiles && droppedFiles.length > 0) {
      onDrop(droppedFiles)
    }
  }, [setDragState, onDrop])

  return {
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop
  }
}