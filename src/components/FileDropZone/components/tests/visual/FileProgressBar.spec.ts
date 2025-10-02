import { test, expect } from '@playwright/test'

test.describe('FileProgressBar Component Visual Tests', () => {
  const progressBarStories = [
    'components-filedropzone-fileprogressbar--not-shown',
    'components-filedropzone-fileprogressbar--zero-progress',
    'components-filedropzone-fileprogressbar--low-progress',
    'components-filedropzone-fileprogressbar--mid-progress',
    'components-filedropzone-fileprogressbar--high-progress',
    'components-filedropzone-fileprogressbar--complete-progress',
    'components-filedropzone-fileprogressbar--processing-progress',
    'components-filedropzone-fileprogressbar--completed-progress',
    'components-filedropzone-fileprogressbar--failed-progress',
  ]

  progressBarStories.forEach(story => {
    test(story, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story}&viewMode=story`)
      await page.waitForSelector('#storybook-root')
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story}.png`)
    })
  })

  test.describe('FileProgressBar Animation Tests', () => {
    test('progress bar width changes', async ({ page }) => {
      // Test different progress values for visual consistency
      const progressValues = [
        { story: 'components-filedropzone-fileprogressbar--zero-progress', name: '0-percent' },
        { story: 'components-filedropzone-fileprogressbar--mid-progress', name: '50-percent' },
        { story: 'components-filedropzone-fileprogressbar--complete-progress', name: '100-percent' },
      ]

      for (const { story, name } of progressValues) {
        await page.goto(`/iframe.html?id=${story}&viewMode=story`)
        await page.waitForSelector('#storybook-root')
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`progress-width-${name}.png`)
      }
    })
  })

  test.describe('FileProgressBar State Colors', () => {
    test('different status colors', async ({ page }) => {
      const statusTests = [
        { story: 'components-filedropzone-fileprogressbar--mid-progress', name: 'uploading' },
        { story: 'components-filedropzone-fileprogressbar--completed-progress', name: 'completed' },
        { story: 'components-filedropzone-fileprogressbar--failed-progress', name: 'failed' },
      ]

      for (const { story, name } of statusTests) {
        await page.goto(`/iframe.html?id=${story}&viewMode=story`)
        await page.waitForSelector('#storybook-root')
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`progress-color-${name}.png`)
      }
    })
  })

  test.describe('FileProgressBar Accessibility', () => {
    test('progress bar accessibility attributes', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-fileprogressbar--mid-progress&viewMode=story')
      await page.waitForSelector('#storybook-root')

      // Verify progress bar has proper ARIA attributes
      const progressBar = page.locator('[role="progressbar"]')
      await expect(progressBar).toBeVisible()

      // Take screenshot showing accessible progress bar
      await expect(page.locator('#storybook-root')).toHaveScreenshot('progress-accessibility.png')
    })
  })
})