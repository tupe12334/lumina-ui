import { test, expect } from '@playwright/test'

test.describe('FileActions Component Visual Tests', () => {
  const fileActionsStories = [
    'components-filedropzone-fileactions--only-remove',
    'components-filedropzone-fileactions--with-retry',
    'components-filedropzone-fileactions--uploading-file',
    'components-filedropzone-fileactions--pending-file',
  ]

  fileActionsStories.forEach(story => {
    test(story, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story}&viewMode=story`)
      await page.waitForSelector('#storybook-root')
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story}.png`)
    })
  })

  test.describe('FileActions Button Interaction Tests', () => {
    test('button hover states', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-fileactions--with-retry&viewMode=story')
      await page.waitForSelector('#storybook-root')

      // Test remove button hover
      const removeButton = page.locator('button[aria-label*="Remove"]')
      await removeButton.hover()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('fileactions-remove-hover.png')

      // Test retry button hover
      const retryButton = page.locator('button[aria-label*="Retry"]')
      await retryButton.hover()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('fileactions-retry-hover.png')
    })

    test('button focus states', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-fileactions--with-retry&viewMode=story')
      await page.waitForSelector('#storybook-root')

      // Test remove button focus
      const removeButton = page.locator('button[aria-label*="Remove"]')
      await removeButton.focus()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('fileactions-remove-focus.png')

      // Test retry button focus
      const retryButton = page.locator('button[aria-label*="Retry"]')
      await retryButton.focus()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('fileactions-retry-focus.png')
    })

    test('button active states', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-fileactions--with-retry&viewMode=story')
      await page.waitForSelector('#storybook-root')

      // Test remove button active state
      const removeButton = page.locator('button[aria-label*="Remove"]')
      await removeButton.hover()
      await page.mouse.down()
      await page.waitForTimeout(100)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('fileactions-remove-active.png')
      await page.mouse.up()
    })
  })

  test.describe('FileActions Icon Tests', () => {
    test('icon consistency', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-fileactions--with-retry&viewMode=story')
      await page.waitForSelector('#storybook-root')

      // Verify icons are rendered properly
      const svgIcons = page.locator('svg')
      const iconCount = await svgIcons.count()
      expect(iconCount).toBe(2) // Should have remove and retry icons

      await expect(page.locator('#storybook-root')).toHaveScreenshot('fileactions-icons.png')
    })
  })

  test.describe('FileActions Responsive Tests', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
    ]

    viewports.forEach(viewport => {
      test(`FileActions responsive - ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height })
        await page.goto('/iframe.html?id=components-filedropzone-fileactions--with-retry&viewMode=story')
        await page.waitForSelector('#storybook-root')
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`fileactions-${viewport.name}.png`)
      })
    })
  })
})