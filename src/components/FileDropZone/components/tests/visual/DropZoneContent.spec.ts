import { test, expect } from '@playwright/test'

test.describe('DropZoneContent Component Visual Tests', () => {
  const dropZoneContentStories = [
    'components-filedropzone-dropzonecontent--default',
    'components-filedropzone-dropzonecontent--with-emoji-icon',
    'components-filedropzone-dropzonecontent--document-upload',
    'components-filedropzone-dropzonecontent--video-upload',
    'components-filedropzone-dropzonecontent--single-file-upload',
    'components-filedropzone-dropzonecontent--disabled',
    'components-filedropzone-dropzonecontent--custom-limits',
    'components-filedropzone-dropzonecontent--minimal-text',
    'components-filedropzone-dropzonecontent--verbose-text',
  ]

  dropZoneContentStories.forEach(story => {
    test(story, async ({ page }) => {
      await page.goto(`/iframe.html?id=${story}&viewMode=story`)
      await page.waitForSelector('#storybook-root')
      await expect(page.locator('#storybook-root')).toHaveScreenshot(`${story}.png`)
    })
  })

  test.describe('DropZoneContent Button Interaction Tests', () => {
    test('button hover state', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-dropzonecontent--default&viewMode=story')
      await page.waitForSelector('#storybook-root')

      const browseButton = page.locator('button:has-text("Browse Files")')
      await browseButton.hover()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('dropzonecontent-button-hover.png')
    })

    test('button focus state', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-dropzonecontent--default&viewMode=story')
      await page.waitForSelector('#storybook-root')

      const browseButton = page.locator('button:has-text("Browse Files")')
      await browseButton.focus()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('dropzonecontent-button-focus.png')
    })

    test('disabled button state', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-dropzonecontent--disabled&viewMode=story')
      await page.waitForSelector('#storybook-root')

      const browseButton = page.locator('button')
      await browseButton.hover()
      await page.waitForTimeout(300)
      await expect(page.locator('#storybook-root')).toHaveScreenshot('dropzonecontent-button-disabled.png')
    })
  })

  test.describe('DropZoneContent Icon Tests', () => {
    test('icon comparison - SVG vs Emoji', async ({ page }) => {
      // Test default SVG icon
      await page.goto('/iframe.html?id=components-filedropzone-dropzonecontent--default&viewMode=story')
      await page.waitForSelector('#storybook-root')
      await expect(page.locator('#storybook-root')).toHaveScreenshot('dropzonecontent-svg-icon.png')

      // Test emoji icon
      await page.goto('/iframe.html?id=components-filedropzone-dropzonecontent--with-emoji-icon&viewMode=story')
      await page.waitForSelector('#storybook-root')
      await expect(page.locator('#storybook-root')).toHaveScreenshot('dropzonecontent-emoji-icon.png')
    })

    test('different emoji icons', async ({ page }) => {
      const emojiStories = [
        { story: 'components-filedropzone-dropzonecontent--with-emoji-icon', name: 'camera' },
        { story: 'components-filedropzone-dropzonecontent--document-upload', name: 'document' },
        { story: 'components-filedropzone-dropzonecontent--video-upload', name: 'video' },
      ]

      for (const { story, name } of emojiStories) {
        await page.goto(`/iframe.html?id=${story}&viewMode=story`)
        await page.waitForSelector('#storybook-root')
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`dropzonecontent-emoji-${name}.png`)
      }
    })
  })

  test.describe('DropZoneContent Text Length Tests', () => {
    test('text length variations', async ({ page }) => {
      const textVariations = [
        { story: 'components-filedropzone-dropzonecontent--minimal-text', name: 'minimal' },
        { story: 'components-filedropzone-dropzonecontent--default', name: 'normal' },
        { story: 'components-filedropzone-dropzonecontent--verbose-text', name: 'verbose' },
      ]

      for (const { story, name } of textVariations) {
        await page.goto(`/iframe.html?id=${story}&viewMode=story`)
        await page.waitForSelector('#storybook-root')
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`dropzonecontent-text-${name}.png`)
      }
    })
  })

  test.describe('DropZoneContent Responsive Tests', () => {
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1200, height: 800 },
    ]

    viewports.forEach(viewport => {
      test(`DropZoneContent responsive - ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height })
        await page.goto('/iframe.html?id=components-filedropzone-dropzonecontent--default&viewMode=story')
        await page.waitForSelector('#storybook-root')
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`dropzonecontent-${viewport.name}.png`)
      })
    })
  })

  test.describe('DropZoneContent Validation Text Tests', () => {
    test('different validation limits display', async ({ page }) => {
      const limitStories = [
        { story: 'components-filedropzone-dropzonecontent--single-file-upload', name: 'single-file' },
        { story: 'components-filedropzone-dropzonecontent--custom-limits', name: 'custom-limits' },
        { story: 'components-filedropzone-dropzonecontent--video-upload', name: 'large-files' },
      ]

      for (const { story, name } of limitStories) {
        await page.goto(`/iframe.html?id=${story}&viewMode=story`)
        await page.waitForSelector('#storybook-root')
        await expect(page.locator('#storybook-root')).toHaveScreenshot(`dropzonecontent-limits-${name}.png`)
      }
    })
  })

  test.describe('DropZoneContent Accessibility Tests', () => {
    test('content structure accessibility', async ({ page }) => {
      await page.goto('/iframe.html?id=components-filedropzone-dropzonecontent--default&viewMode=story')
      await page.waitForSelector('#storybook-root')

      // Verify heading structure
      const title = page.locator('h3')
      await expect(title).toBeVisible()

      // Verify button accessibility
      const browseButton = page.locator('button')
      await expect(browseButton).toHaveAttribute('type', 'button')

      await expect(page.locator('#storybook-root')).toHaveScreenshot('dropzonecontent-accessibility.png')
    })
  })
})