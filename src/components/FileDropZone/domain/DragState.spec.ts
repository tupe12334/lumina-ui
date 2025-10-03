import { describe, it, expect } from 'vitest'
import { DragState } from './DragState'

describe('DragState', () => {
  describe('create', () => {
    it('should create with idle state when no parameter provided', () => {
      const dragState = DragState.create()

      expect(dragState.getState()).toBe('idle')
      expect(dragState.isIdle()).toBe(true)
      expect(dragState.isDragOver()).toBe(false)
      expect(dragState.isDragLeave()).toBe(false)
      expect(dragState.isActive()).toBe(false)
    })

    it('should create with provided state', () => {
      const dragOverState = DragState.create('dragOver')
      expect(dragOverState.getState()).toBe('dragOver')
      expect(dragOverState.isDragOver()).toBe(true)

      const dragLeaveState = DragState.create('dragLeave')
      expect(dragLeaveState.getState()).toBe('dragLeave')
      expect(dragLeaveState.isDragLeave()).toBe(true)

      const idleState = DragState.create('idle')
      expect(idleState.getState()).toBe('idle')
      expect(idleState.isIdle()).toBe(true)
    })
  })

  describe('getState', () => {
    it('should return the correct state value', () => {
      expect(DragState.create('idle').getState()).toBe('idle')
      expect(DragState.create('dragOver').getState()).toBe('dragOver')
      expect(DragState.create('dragLeave').getState()).toBe('dragLeave')
    })
  })

  describe('state checking methods', () => {
    it('should correctly identify idle state', () => {
      const state = DragState.create('idle')

      expect(state.isIdle()).toBe(true)
      expect(state.isDragOver()).toBe(false)
      expect(state.isDragLeave()).toBe(false)
      expect(state.isActive()).toBe(false)
    })

    it('should correctly identify dragOver state', () => {
      const state = DragState.create('dragOver')

      expect(state.isIdle()).toBe(false)
      expect(state.isDragOver()).toBe(true)
      expect(state.isDragLeave()).toBe(false)
      expect(state.isActive()).toBe(true)
    })

    it('should correctly identify dragLeave state', () => {
      const state = DragState.create('dragLeave')

      expect(state.isIdle()).toBe(false)
      expect(state.isDragOver()).toBe(false)
      expect(state.isDragLeave()).toBe(true)
      expect(state.isActive()).toBe(false)
    })
  })

  describe('state transition methods', () => {
    it('should create new state when setting dragOver', () => {
      const originalState = DragState.create('idle')
      const newState = originalState.setDragOver()

      expect(originalState.getState()).toBe('idle') // Original unchanged
      expect(newState.getState()).toBe('dragOver') // New state created
      expect(newState.isDragOver()).toBe(true)
      expect(newState.isActive()).toBe(true)
    })

    it('should create new state when setting dragLeave', () => {
      const originalState = DragState.create('dragOver')
      const newState = originalState.setDragLeave()

      expect(originalState.getState()).toBe('dragOver') // Original unchanged
      expect(newState.getState()).toBe('dragLeave') // New state created
      expect(newState.isDragLeave()).toBe(true)
      expect(newState.isActive()).toBe(false)
    })

    it('should create new state when setting idle', () => {
      const originalState = DragState.create('dragOver')
      const newState = originalState.setIdle()

      expect(originalState.getState()).toBe('dragOver') // Original unchanged
      expect(newState.getState()).toBe('idle') // New state created
      expect(newState.isIdle()).toBe(true)
      expect(newState.isActive()).toBe(false)
    })
  })

  describe('immutability', () => {
    it('should not mutate original state when transitioning', () => {
      const originalState = DragState.create('idle')

      const dragOverState = originalState.setDragOver()
      const dragLeaveState = originalState.setDragLeave()
      const idleState = originalState.setIdle()

      // Original state should remain unchanged
      expect(originalState.getState()).toBe('idle')
      expect(originalState.isIdle()).toBe(true)

      // New states should be different instances
      expect(dragOverState).not.toBe(originalState)
      expect(dragLeaveState).not.toBe(originalState)
      expect(idleState).not.toBe(originalState)
    })
  })

  describe('isActive', () => {
    it('should return true only for dragOver state', () => {
      expect(DragState.create('dragOver').isActive()).toBe(true)
      expect(DragState.create('idle').isActive()).toBe(false)
      expect(DragState.create('dragLeave').isActive()).toBe(false)
    })
  })
})