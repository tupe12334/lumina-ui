import { test, expect } from '@playwright/test'

test.describe('FileListItem Component Visual Tests', () => {
  const fileListItemStories = [
    'components-filedropzone-filelistitem--pending',
    'components-filedropzone-filelistitem--uploading',
    'components-filedropzone-filelistitem--processing',
    'components-filedropzone-filelistitem--completed',
    'components-filedropzone-filelistitem--failed',
    'components-filedropzone-filelistitem--with-preview',
    'components-filedropzone-filelistitem--large-file-name',
    'components-filedropzone-filelistitem--large-file',
  ]

  fileListItemStories.forEach(story => {
    test(story, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story}&viewMode=story`)
      await page.waitForSelector('#storybook-root')
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story}.png`)
    })
  })

  test.describe('FileListItem Interaction Tests', () => {
    test('hover state on buttons', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-filelistitem--failed&viewMode=story')
      await page.waitForSelector('#storybook-root')

      // Test remove button hover
      const removeButton = page.locator('button[aria-label*="Remove"]')
      await removeButton.hover()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('filelistitem-remove-hover.png')

      // Test retry button hover
      const retryButton = page.locator('button[aria-label*="Retry"]')
      await retryButton.hover()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('filelistitem-retry-hover.png')
    })

    test('focus states', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-filelistitem--failed&viewMode=story')
      await page.waitForSelector('#storybook-root')

      // Focus remove button
      const removeButton = page.locator('button[aria-label*="Remove"]')
      await removeButton.focus()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('filelistitem-remove-focus.png')

      // Focus retry button
      const retryButton = page.locator('button[aria-label*="Retry"]')
      await retryButton.focus()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('filelistitem-retry-focus.png')
    })
  })

  test.describe('FileListItem Responsive Tests', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
    ]

    viewports.forEach(viewport => {
      test(`FileListItem responsive - ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height })
        await page.goto('/iframe.html?id=components-filedropzone-filelistitem--uploading&viewMode=story')
        await page.waitForSelector('#storybook-root')
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`filelistitem-${viewport.name}.png`)
      })
    })
  })
})