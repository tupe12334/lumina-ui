import { test, expect } from '@playwright/test';

test.describe('QuestionCard', () => {
  test('matches snapshot - default', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-questioncard--default');
    await expect(page).toHaveScreenshot();
  });

  test('matches snapshot - with modules', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-questioncard--with-modules');
    await expect(page).toHaveScreenshot();
  });

  test('matches snapshot - multipart', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-questioncard--multipart');
    await expect(page).toHaveScreenshot();
  });
});
