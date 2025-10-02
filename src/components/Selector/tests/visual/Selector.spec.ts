import { test, expect } from '@playwright/test'

// Selector component stories
const selectorStories = [
  'components-selector--default',
  'components-selector--with-value',
  'components-selector--small',
  'components-selector--large',
  'components-selector--error-state',
  'components-selector--success-state',
  'components-selector--disabled',
]

test.describe('Selector Component Visual Tests', () => {
  for (const story of selectorStories) {
    test(`${story}`, async ({ page }) => {
      // Navigate to the story
      await page.goto(`/iframe.html?id=${story}&viewMode=story`)

      // Wait for the story to load
      await page.waitForSelector('#storybook-root')

      // Wait for any animations to complete
      await page.waitForTimeout(500)

      // Take screenshot and compare
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story}.png`)
    })
  }

  // Test dropdown open state
  test('components-selector--default-open', async ({ page }) => {
    await page.goto('/iframe.html?id=components-selector--default&viewMode=story')
    await page.waitForSelector('#storybook-root')

    // Click to open dropdown
    await page.click('button')
    await page.waitForTimeout(300)

    await expect(page.locator('#storybook-root')).toHaveScreenshot('components-selector--default-open.png')
  })

  // Responsive tests for Selector
  const responsiveStories = ['components-selector--default']
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1200, height: 800 },
  ]

  test.describe('Selector Responsive Tests', () => {
    for (const story of responsiveStories) {
      for (const viewport of viewports) {
        test(`${story} - ${viewport.name}`, async ({ page }) => {
          await page.setViewportSize({ width: viewport.width, height: viewport.height })
          await page.goto(`/iframe.html?id=${story}&viewMode=story`)
          await page.waitForSelector('#storybook-root')
          await page.waitForTimeout(500)

          await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story}-${viewport.name}.png`)
        })
      }
    }
  })
})