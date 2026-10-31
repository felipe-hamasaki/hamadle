import { test, expect } from '@playwright/test';
test('Enter selects the first prefix match without arrow navigation', async ({page}) => {
 await page.goto('/kimetsu');
 const input=page.getByRole('combobox'); await expect(input).toBeEnabled();
 await input.fill('g');
 const first=await page.getByRole('option').first().innerText();
 await input.press('Enter');
 await expect(page.locator('tbody')).toContainText(first);
});
