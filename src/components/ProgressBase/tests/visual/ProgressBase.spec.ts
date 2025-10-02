import { test, expect } from '@playwright/test'

// ProgressBase component stories
const progressBaseStories = [
  'components-progressbase--default',
  'components-progressbase--success',
  'components-progressbase--error',
  'components-progressbase--warning',
  'components-progressbase--small',
  'components-progressbase--medium',
  'components-progressbase--large',
  'components-progressbase--with-value',
  'components-progressbase--complete',
  'components-progressbase--empty',
]

test.describe('ProgressBase Component Visual Tests', () => {
  for (const story of progressBaseStories) {
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

  // Responsive tests for ProgressBase
  const responsiveStories = ['components-progressbase--default']
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1200, height: 800 },
  ]

  test.describe('ProgressBase Responsive Tests', () => {
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