import { test, expect } from '@playwright/test';

test.describe('QuestionsList', () => {
  test('matches snapshot - default', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-questionslist--default');
    await expect(page).toHaveScreenshot();
  });

  test('matches snapshot - with infinite scroll', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=components-questionslist--with-infinite-scroll');
    await expect(page).toHaveScreenshot();
  });
});
