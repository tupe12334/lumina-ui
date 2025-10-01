import copy from 'copy-to-clipboard'

export function copyToClipboard(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const success = copy(text)
    if (success) {
      resolve()
    } else {
      reject(new Error('Failed to copy to clipboard'))
    }
  })
}