import { test, expect } from '@playwright/test'

test.describe('DropZoneIcon Component Visual Tests', () => {
  const dropZoneIconStories = [
    'components-filedropzone-dropzoneicon--default',
    'components-filedropzone-dropzoneicon--folder-emoji',
    'components-filedropzone-dropzoneicon--camera-emoji',
    'components-filedropzone-dropzoneicon--document-emoji',
    'components-filedropzone-dropzoneicon--image-emoji',
    'components-filedropzone-dropzoneicon--video-emoji',
    'components-filedropzone-dropzoneicon--music-emoji',
    'components-filedropzone-dropzoneicon--cloud-emoji',
    'components-filedropzone-dropzoneicon--package-emoji',
    'components-filedropzone-dropzoneicon--database-emoji',
  ]

  dropZoneIconStories.forEach(story => {
    test(story, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story}&viewMode=story`)
      await page.waitForSelector('#storybook-root')
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story}.png`)
    })
  })

  test.describe('DropZoneIcon Comparison Tests', () => {
    test('default vs emoji comparison', async ({ page }) => {
      // Test side-by-side comparison of default and emoji icons
      await page.goto('/iframe.html?id=components-filedropzone-dropzoneicon--default&viewMode=story')
      await page.waitForSelector('#storybook-root')
      await expect(page.locator('#storybook-root')).toHaveScreenshot('dropzoneicon-default-comparison.png')

      await page.goto('/iframe.html?id=components-filedropzone-dropzoneicon--folder-emoji&viewMode=story')
      await page.waitForSelector('#storybook-root')
      await expect(page.locator('#storybook-root')).toHaveScreenshot('dropzoneicon-emoji-comparison.png')
    })
  })

  test.describe('DropZoneIcon Size Tests', () => {
    const iconSizes = [
      { story: 'components-filedropzone-dropzoneicon--default', name: 'default-size' },
      { story: 'components-filedropzone-dropzoneicon--camera-emoji', name: 'emoji-size' },
    ]

    iconSizes.forEach(({ story, name }) => {
      test(`icon size consistency - ${name}`, async ({ page }) => {
        await page.goto(`/iframe.html?id=${story}&viewMode=story`)
        await page.waitForSelector('#storybook-root')

        // Take screenshot with specific focus on icon sizing
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`dropzoneicon-size-${name}.png`)
      })
    })
  })
})