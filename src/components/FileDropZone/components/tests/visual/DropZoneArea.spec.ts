import { test, expect } from '@playwright/test'

test.describe('DropZoneArea Component Visual Tests', () => {
  const dropZoneAreaStories = [
    'components-filedropzone-dropzonearea--default',
    'components-filedropzone-dropzonearea--drag-active',
    'components-filedropzone-dropzonearea--disabled',
    'components-filedropzone-dropzonearea--custom-styling',
    'components-filedropzone-dropzonearea--with-icon',
  ]

  dropZoneAreaStories.forEach(story => {
    test(story, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story}&viewMode=story`)
      await page.waitForSelector('#storybook-root')
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story}.png`)
    })
  })

  test.describe('DropZoneArea Interaction Tests', () => {
    test('hover state', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-dropzonearea--default&viewMode=story')
      await page.waitForSelector('#storybook-root')

      const dropZone = page.locator('[role="button"][aria-label="File upload area"]')
      await dropZone.hover()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('dropzonearea-hover.png')
    })

    test('focus state', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-dropzonearea--default&viewMode=story')
      await page.waitForSelector('#storybook-root')

      const dropZone = page.locator('[role="button"][aria-label="File upload area"]')
      await dropZone.focus()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('dropzonearea-focus.png')
    })

    test('disabled interaction attempt', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-dropzonearea--disabled&viewMode=story')
      await page.waitForSelector('#storybook-root')

      const dropZone = page.locator('[role="button"][aria-label="File upload area"]')
      await dropZone.hover()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('dropzonearea-disabled-hover.png')
    })
  })

  test.describe('DropZoneArea State Comparison', () => {
    test('state comparison grid', async ({ page }) => {
      const states = [
        { story: 'components-filedropzone-dropzonearea--default', name: 'default' },
        { story: 'components-filedropzone-dropzonearea--drag-active', name: 'drag-active' },
        { story: 'components-filedropzone-dropzonearea--disabled', name: 'disabled' },
      ]

      for (const { story, name } of states) {
        await page.goto(`/iframe.html?id=${story}&viewMode=story`)
        await page.waitForSelector('#storybook-root')
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`dropzonearea-state-${name}.png`)
      }
    })
  })

  test.describe('DropZoneArea Responsive Tests', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1200, height: 800 },
    ]

    viewports.forEach(viewport => {
      test(`DropZoneArea responsive - ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height })
        await page.goto('/iframe.html?id=components-filedropzone-dropzonearea--default&viewMode=story')
        await page.waitForSelector('#storybook-root')
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`dropzonearea-${viewport.name}.png`)
      })
    })
  })

  test.describe('DropZoneArea Accessibility Tests', () => {
    test('keyboard navigation', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-dropzonearea--default&viewMode=story')
      await page.waitForSelector('#storybook-root')

      // Test tab navigation
      await page.keyboard.press('Tab')
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('dropzonearea-keyboard-focus.png')

      // Test Enter key activation
      await page.keyboard.press('Enter')
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('dropzonearea-keyboard-activate.png')
    })

    test('ARIA attributes verification', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-dropzonearea--default&viewMode=story')
      await page.waitForSelector('#storybook-root')

      const dropZone = page.locator('[role="button"]')
      await expect(dropZone).toHaveAttribute('aria-label', 'File upload area')
      await expect(dropZone).toHaveAttribute('tabindex', '0')
      await expect(dropZone).toHaveAttribute('aria-disabled', 'false')

      await expect(page.locator('#storybook-root')).toHaveScreenshot('dropzonearea-aria-verification.png')
    })
  })
})