import { test, expect } from '@playwright/test'

// LanguageSelector component stories
const languageSelectorStories = [
  'components-languageselector--default',
  'components-languageselector--with-selected-language',
  'components-languageselector--without-flags',
  'components-languageselector--with-regions',
  'components-languageselector--small',
  'components-languageselector--large',
  'components-languageselector--error-state',
  'components-languageselector--disabled',
]

test.describe('LanguageSelector Component Visual Tests', () => {
  for (const story of languageSelectorStories) {
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

  // Test dropdown open state with languages
  test('components-languageselector--default-open', async ({ page }) => {
    await page.goto('/iframe.html?id=components-languageselector--default&viewMode=story')
    await page.waitForSelector('#storybook-root')

    // Click to open dropdown
    await page.click('button')
    await page.waitForTimeout(300)

    await expect(page.locator('#storybook-root')).toHaveScreenshot('components-languageselector--default-open.png')
  })

  // Test custom languages story
  test('components-languageselector--custom-languages', async ({ page }) => {
    await page.goto('/iframe.html?id=components-languageselector--custom-languages&viewMode=story')
    await page.waitForSelector('#storybook-root')
    await page.waitForTimeout(500)

    await expect(page.locator('#storybook-root')).toHaveScreenshot('components-languageselector--custom-languages.png')
  })

  // Responsive tests for LanguageSelector
  const responsiveStories = ['components-languageselector--default']
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1200, height: 800 },
  ]

  test.describe('LanguageSelector Responsive Tests', () => {
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