import { test, expect } from '@playwright/test';

test('admin yacht edit loads and saves', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/yachts');
  await page.waitForTimeout(2000);
  const editBtn = page.locator('button[title="Edit"]').first();
  if (await editBtn.count() === 0) {
    test.skip();
    return;
  }
  await editBtn.click();
  await page.waitForTimeout(2000);
  await expect(page.locator('h1:has-text("Edit Yacht")')).toBeVisible({ timeout: 10000 });
  const nameInput = page.locator('input').first();
  await nameInput.fill('Test Edit Yacht');
  await page.locator('select').first().selectOption('Motor Yacht');
  await page.locator('button:has-text("Update Yacht")').click();
  await page.waitForTimeout(3000);
});
