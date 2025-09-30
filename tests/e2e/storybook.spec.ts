import { test, expect } from '@playwright/test'

test.describe('Storybook UI Tests', () => {
  test('should load Storybook homepage', async ({ page }) => {
    await page.goto('/')

    // Check if Storybook loaded
    await expect(page).toHaveTitle(/Storybook/)

    // Wait for sidebar to load and look for Button stories
    await page.waitForSelector('[data-item-id*="components-button"]', { timeout: 10000 })
    await expect(page.locator('[data-item-id*="components-button"]')).toBeVisible()
  })

  test('should display Button component stories', async ({ page }) => {
    await page.goto('/')

    // Wait for sidebar to load
    await page.waitForSelector('[data-item-id*="components-button"]', { timeout: 10000 })

    // Navigate to Button component
    await page.click('[data-item-id*="components-button"]')

    // Click on Primary story
    await page.click('[data-item-id*="primary"]')

    // Check if the button is rendered in the preview
    const preview = page.frameLocator('#storybook-preview-iframe')
    await expect(preview.getByRole('button', { name: 'Button' })).toBeVisible()
    await expect(preview.getByRole('button', { name: 'Button' })).toHaveText('Button')
  })

  test('should interact with Button variants', async ({ page }) => {
    await page.goto('/')

    // Wait for sidebar to load
    await page.waitForSelector('[data-item-id*="components-button"]', { timeout: 10000 })

    // Navigate to Button Primary story
    await page.click('[data-item-id*="primary"]')

    const preview = page.frameLocator('#storybook-preview-iframe')
    const button = preview.getByRole('button', { name: 'Button' })

    // Check button is clickable
    await expect(button).toBeEnabled()
    await button.click()

    // Navigate to Secondary variant
    await page.click('[data-item-id*="secondary"]')
    await expect(preview.getByRole('button', { name: 'Button' })).toBeVisible()

    // Navigate to Outline variant
    await page.click('[data-item-id*="outline"]')
    await expect(preview.getByRole('button', { name: 'Button' })).toBeVisible()
  })

  test('should verify Button styling variants', async ({ page }) => {
    await page.goto('/')

    // Wait for sidebar to load
    await page.waitForSelector('[data-item-id*="components-button"]', { timeout: 10000 })

    const preview = page.frameLocator('#storybook-preview-iframe')

    // Test Primary variant
    await page.click('[data-item-id*="primary"]')
    const primaryButton = preview.getByRole('button', { name: 'Button' })
    await expect(primaryButton).toHaveClass(/bg-blue-600/)

    // Test Secondary variant
    await page.click('[data-item-id*="secondary"]')
    const secondaryButton = preview.getByRole('button', { name: 'Button' })
    await expect(secondaryButton).toHaveClass(/bg-gray-100/)

    // Test Outline variant
    await page.click('[data-item-id*="outline"]')
    const outlineButton = preview.getByRole('button', { name: 'Button' })
    await expect(outlineButton).toHaveClass(/border/)
  })
})