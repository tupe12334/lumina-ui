export type DragStateType = 'idle' | 'dragOver' | 'dragLeave'

export class DragState {
  private constructor(private readonly state: DragStateType) {}

  public static create(state: DragStateType = 'idle'): DragState {
    return new DragState(state)
  }

  public getState(): DragStateType {
    return this.state
  }

  public isIdle(): boolean {
    return this.state === 'idle'
  }

  public isDragOver(): boolean {
    return this.state === 'dragOver'
  }

  public isDragLeave(): boolean {
    return this.state === 'dragLeave'
  }

  public isActive(): boolean {
    return this.state === 'dragOver'
  }

  public setDragOver(): DragState {
    return new DragState('dragOver')
  }

  public setDragLeave(): DragState {
    return new DragState('dragLeave')
  }

  public setIdle(): DragState {
    return new DragState('idle')
  }
}