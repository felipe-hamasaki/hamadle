import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('HxH loads from the home, saves guesses, wins and resets independently', async ({
  page,
}) => {
  await page.clock.install({ time: new Date('2026-10-29T15:00:00Z') });
  await page.goto('/');
  await page.locator('a[href="/hxh"]').first().click();
  await expect(page).toHaveURL(/\/hxh$/);
  await expect(page.getByRole('combobox')).toBeEnabled();
  await page.evaluate(() =>
    localStorage.setItem('berserkdle:v2:2026-10-29', 'unchanged'),
  );
  await page.getByRole('combobox').fill('Killua');
  await page.getByRole('option').click();
  await expect(page.locator('tbody')).toContainText('Killua Zoldyck');
  await expect(
    page.getByRole('columnheader', { name: 'Tipo de Nen' }),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator('tbody')).toContainText('Killua Zoldyck');
  await page.getByRole('combobox').fill('Gon');
  await page.getByRole('combobox').press('ArrowDown');
  await page.getByRole('combobox').press('Enter');
  await expect(
    page.getByRole('heading', { name: 'Você encontrou Gon Freecss.' }),
  ).toBeVisible();
  await expect(page.getByRole('combobox')).toHaveCount(0);
  await page.getByRole('button', { name: /Resetar jogo/ }).click();
  await expect(page.getByRole('combobox')).toBeEnabled();
  expect(
    await page.evaluate(() => localStorage.getItem('berserkdle:v2:2026-10-29')),
  ).toBe('unchanged');
});

test('HxH help, portraits, mobile layout and daily rollover work', async ({
  page,
}) => {
  await page.clock.install({ time: new Date('2026-10-30T02:58:00Z') });
  await page.clock.setFixedTime(new Date('2026-10-30T02:59:59Z'));
  await page.goto('/hxh');
  await expect(page.getByRole('combobox')).toBeEnabled();
  await page.getByRole('button', { name: 'Como jogar' }).click();
  await expect(page.getByRole('dialog')).toContainText('31 personagens');
  await expect(page.getByRole('dialog')).not.toContainText('Griffith');
  await page.getByText('Consultar fichas do elenco').click();
  const images = page.locator('.roster img');
  await images.evaluateAll((nodes) =>
    nodes.forEach((node) => {
      (node as HTMLImageElement).loading = 'eager';
    }),
  );
  await expect
    .poll(() =>
      images.evaluateAll((nodes) =>
        nodes.every((node) => (node as HTMLImageElement).naturalWidth > 0),
      ),
    )
    .toBe(true);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
  await page.getByRole('button', { name: 'Fechar instruções' }).click();
  await page.clock.setFixedTime(new Date('2026-10-30T03:00:01Z'));
  await page.clock.fastForward(1000);
  await expect(
    page.getByText('Virou o dia em Brasília. Um novo desafio começou.'),
  ).toBeVisible();
  await page.getByRole('combobox').fill('Killua');
  await page.getByRole('option').click();
  await expect(
    page.getByRole('heading', { name: 'Você encontrou Killua Zoldyck.' }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
