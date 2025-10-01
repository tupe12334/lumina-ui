import { test, expect } from '@playwright/test'

test.describe('FileDropZone Component Visual Tests', () => {
  const fileDropZoneStories = [
    'components-filedropzone--default',
    'components-filedropzone--single-file',
    'components-filedropzone--images-only',
    'components-filedropzone--pdf-only',
    'components-filedropzone--disabled',
    'components-filedropzone--hidden-files-list',
    'components-filedropzone--large-files',
    'components-filedropzone--custom-styling',
    'components-filedropzone--interactive',
    'components-filedropzone--validation-demo',
  ]

  fileDropZoneStories.forEach(story => {
    test(story, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story}&viewMode=story`)
      await page.waitForSelector('#storybook-root')
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story}.png`)
    })
  })

  // Responsive tests for FileDropZone
  test.describe('FileDropZone Responsive Tests', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1200, height: 800 },
    ]

    viewports.forEach(viewport => {
      test(`components-filedropzone--default - ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height })
        await page.goto('/iframe.html?id=components-filedropzone--default&viewMode=story')
        await page.waitForSelector('#storybook-root')
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`components-filedropzone--default-${viewport.name}.png`)
      })
    })
  })

  // Interaction tests for FileDropZone
  test.describe('FileDropZone Interaction Tests', () => {
    test('Drag over state', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone--default&viewMode=story')
      await page.waitForSelector('#storybook-root')

      // Test initial state
      await expect(page.locator('#storybook-root')).toHaveScreenshot('filedropzone-initial-state.png')

      // Simulate drag over (we can't easily test actual file drops in Playwright, but we can test the hover state)
      const dropzone = page.locator('[role="button"][aria-label="File upload area"]')
      await dropzone.hover()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('filedropzone-hover-state.png')
    })

    test('Disabled state interaction', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone--disabled&viewMode=story')
      await page.waitForSelector('#storybook-root')

      // Test disabled state
      await expect(page.locator('#storybook-root')).toHaveScreenshot('filedropzone-disabled-state.png')

      // Try to hover over disabled dropzone
      const dropzone = page.locator('[role="button"][aria-label="File upload area"]')
      await dropzone.hover()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('filedropzone-disabled-hover.png')
    })

    test('Focus state', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone--default&viewMode=story')
      await page.waitForSelector('#storybook-root')

      // Focus the dropzone using keyboard
      const dropzone = page.locator('[role="button"][aria-label="File upload area"]')
      await dropzone.focus()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('filedropzone-focus-state.png')
    })
  })

  // Different file type configurations
  test.describe('FileDropZone File Type Tests', () => {
    const fileTypeStories = [
      'components-filedropzone--images-only',
      'components-filedropzone--pdf-only',
      'components-filedropzone--single-file',
    ]

    fileTypeStories.forEach(story => {
      test(`${story} - file type specific styling`, async ({ page }) => {
        await page.goto(`/iframe.html?id=${story}&viewMode=story`)
        await page.waitForSelector('#storybook-root')
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story}-file-type.png`)
      })
    })
  })
})