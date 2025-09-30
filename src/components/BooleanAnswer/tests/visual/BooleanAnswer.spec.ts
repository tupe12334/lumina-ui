import { test, expect } from '@playwright/test'

// BooleanAnswer component stories
const booleanAnswerStories = [
  'components-booleananswer--true-false',
  'components-booleananswer--yes-no',
  'components-booleananswer--pre-selected-true',
  'components-booleananswer--pre-selected-false',
  'components-booleananswer--small',
  'components-booleananswer--large',
  'components-booleananswer--hebrew-labels',
  'components-booleananswer--disabled',
  'components-booleananswer--direct-labels',
  'components-booleananswer--custom-labels',
  'components-booleananswer--interactive',
  'components-booleananswer--label-types',
  'components-booleananswer--all-sizes',
]

test.describe('BooleanAnswer Component Visual Tests', () => {
  for (const story of booleanAnswerStories) {
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

  // Responsive tests for BooleanAnswer
  const responsiveStories = ['components-booleananswer--all-sizes']
  const viewports = [
    { name: 'mobile', width: 375, height: 667 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1200, height: 800 },
  ]

  test.describe('BooleanAnswer Responsive Tests', () => {
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

  // Interaction tests for BooleanAnswer
  test.describe('BooleanAnswer Interaction Tests', () => {
    test('Interactive selection states', async ({ page }) => {
      await page.goto('/iframe.html?id=components-booleananswer--interactive&viewMode=story')
      await page.waitForSelector('#storybook-root')

      // Test initial state
      await expect(page.locator('#storybook-root')).toHaveScreenshot('booleananswer-initial-state.png')

      // Click true button
      await page.locator('button:has-text("True")').click()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('booleananswer-true-selected.png')

      // Click false button
      await page.locator('button:has-text("False")').click()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('booleananswer-false-selected.png')
    })
  })
})