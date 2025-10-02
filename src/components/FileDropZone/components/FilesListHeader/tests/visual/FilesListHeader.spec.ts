import { test, expect } from '@playwright/test'

const filesListHeaderStories = [
  'components-filedropzone-fileslistheader--single-file',
  'components-filedropzone-fileslistheader--multiple-files',
  'components-filedropzone-fileslistheader--without-clear-button',
  'components-filedropzone-fileslistheader--many-files',
  'components-filedropzone-fileslistheader--zero-files',
]

test.describe('FilesListHeader Component Visual Tests', () => {
  for (const story of filesListHeaderStories) {
    test(`${story}`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story}&viewMode=story`)
      await page.waitForSelector('#storybook-root')
      await page.waitForTimeout(500)

      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story}.png`)
    })
  }
})