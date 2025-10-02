import { test, expect } from '@playwright/test'

const fileInfoStories = [
  'components-filedropzone-fileinfo--pending',
  'components-filedropzone-fileinfo--uploading',
  'components-filedropzone-fileinfo--completed',
  'components-filedropzone-fileinfo--failed',
  'components-filedropzone-fileinfo--large-file',
  'components-filedropzone-fileinfo--processing',
]

test.describe('FileInfo Component Visual Tests', () => {
  for (const story of fileInfoStories) {
    test(`${story}`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story}&viewMode=story`)
      await page.waitForSelector('#storybook-root')
      await page.waitForTimeout(500)

      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story}.png`)
    })
  }
})