import { test, expect } from '@playwright/test'

test.describe('FilesList Component Visual Tests', () => {
  const filesListStories = [
    'components-filedropzone-fileslist--multiple-files',
    'components-filedropzone-fileslist--single-file',
    'components-filedropzone-fileslist--no-clear-button',
    'components-filedropzone-fileslist--uploading-files',
    'components-filedropzone-fileslist--failed-files',
    'components-filedropzone-fileslist--with-preview-images',
  ]

  filesListStories.forEach(story => {
    test(story, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story}&viewMode=story`)
      await page.waitForSelector('#storybook-root')
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story}.png`)
    })
  })

  test.describe('FilesList Interaction Tests', () => {
    test('clear all button hover', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-fileslist--multiple-files&viewMode=story')
      await page.waitForSelector('#storybook-root')

      const clearButton = page.locator('button:has-text("Clear all")')
      await clearButton.hover()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('fileslist-clear-hover.png')
    })

    test('file list scroll behavior', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-fileslist--multiple-files&viewMode=story')
      await page.waitForSelector('#storybook-root')

      // Test with many files (if available) to show scroll behavior
      await expect(page.locator('#storybook-root')).toHaveScreenshot('fileslist-scroll-test.png')
    })
  })

  test.describe('FilesList Responsive Tests', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1200, height: 800 },
    ]

    viewports.forEach(viewport => {
      test(`FilesList responsive - ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height })
        await page.goto('/iframe.html?id=components-filedropzone-fileslist--multiple-files&viewMode=story')
        await page.waitForSelector('#storybook-root')
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`fileslist-${viewport.name}.png`)
      })
    })
  })

  test.describe('FilesList State Tests', () => {
    test('empty state handling', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-fileslist--empty-list&viewMode=story')
      await page.waitForSelector('#storybook-root')

      // Empty list should render nothing
      await expect(page.locator('#storybook-root')).toHaveScreenshot('fileslist-empty-state.png')

      // Verify no content is visible
      const content = await page.locator('#storybook-root').textContent()
      expect(content ? content.trim() : '').toBe('')
    })
  })
})