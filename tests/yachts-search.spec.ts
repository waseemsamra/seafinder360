import { test, expect } from '@playwright/test';

test('admin yachts search bar', async ({ page }) => {
  await page.goto('http://localhost:3000/admin/yachts');
  await page.waitForTimeout(2000);
  await expect(page.locator('input[placeholder="Search yachts by name..."]')).toBeVisible({ timeout: 10000 });
  await page.fill('input[placeholder="Search yachts by name..."]', 'Skywalker');
  await page.waitForTimeout(1000);
  const rows = await page.locator('table tbody tr').count();
  console.log('rows:', rows);
});
