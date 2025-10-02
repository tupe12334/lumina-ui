import { test, expect } from '@playwright/test'

const filePreviewStories = [
  'components-filedropzone-filepreview--with-file-icon',
  'components-filedropzone-filepreview--pdf-file',
  'components-filedropzone-filepreview--video-file',
  'components-filedropzone-filepreview--with-preview-image',
  'components-filedropzone-filepreview--with-data-url',
]

test.describe('FilePreview Component Visual Tests', () => {
  for (const story of filePreviewStories) {
    test(`${story}`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story}&viewMode=story`)
      await page.waitForSelector('#storybook-root')
      await page.waitForTimeout(500)

      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story}.png`)
    })
  }
})