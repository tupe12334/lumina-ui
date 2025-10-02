export function createDataTransferFromFiles(files: File[]): DataTransfer {
  const dataTransfer = new DataTransfer()
  files.forEach(file => dataTransfer.items.add(file))
  return dataTransfer
}