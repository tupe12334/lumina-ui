import { test, expect } from '@playwright/test'

test.describe('FileError Component Visual Tests', () => {
  const fileErrorStories = [
    'components-filedropzone-fileerror--no-error',
    'components-filedropzone-fileerror--network-error',
    'components-filedropzone-fileerror--file-size-error',
    'components-filedropzone-fileerror--file-type-error',
    'components-filedropzone-fileerror--server-error',
    'components-filedropzone-fileerror--timeout-error',
    'components-filedropzone-fileerror--authentication-error',
    'components-filedropzone-fileerror--storage-error',
    'components-filedropzone-fileerror--long-error',
  ]

  fileErrorStories.forEach(story => {
    test(story, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story}&viewMode=story`)
      await page.waitForSelector('#storybook-root')
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story}.png`)
    })
  })

  test.describe('FileError Text Wrapping Tests', () => {
    test('long error message wrapping', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-fileerror--long-error&viewMode=story')
      await page.waitForSelector('#storybook-root')

      // Test how long error messages wrap in different container sizes
      await expect(page.locator('#storybook-root')).toHaveScreenshot('fileerror-long-text.png')
    })
  })

  test.describe('FileError Responsive Tests', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
    ]

    viewports.forEach(viewport => {
      test(`FileError responsive - ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height })
        await page.goto('/iframe.html?id=components-filedropzone-fileerror--network-error&viewMode=story')
        await page.waitForSelector('#storybook-root')
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`fileerror-${viewport.name}.png`)
      })
    })
  })

  test.describe('FileError Accessibility Tests', () => {
    test('error alert accessibility', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-fileerror--file-size-error&viewMode=story')
      await page.waitForSelector('#storybook-root')

      // Verify error has proper ARIA role
      const errorAlert = page.locator('[role="alert"]')
      await expect(errorAlert).toBeVisible()

      await expect(page.locator('#storybook-root')).toHaveScreenshot('fileerror-accessibility.png')
    })
  })
})