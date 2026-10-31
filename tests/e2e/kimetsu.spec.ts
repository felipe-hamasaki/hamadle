import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Kimetsu saves, wins, shares and resets independently', async ({
  page,
}) => {
  await page.clock.install({ time: new Date('2026-10-30T15:00:00Z') });
  await page.goto('/');
  await page.locator('a[href="/kimetsu"]').first().click();
  await expect(page.getByRole('combobox')).toBeEnabled();
  await page.evaluate(() =>
    localStorage.setItem('hxh:v1:2026-10-30', 'unchanged'),
  );
  await page.getByRole('combobox').fill('Nezuko');
  await page.getByRole('option').click();
  await expect(
    page.getByRole('columnheader', { name: 'Respiração / poder' }),
  ).toBeVisible();
  await page.reload();
  await expect(page.locator('tbody')).toContainText('Nezuko');
  await page.getByRole('combobox').fill('Tanjiro');
  await page.getByRole('combobox').press('ArrowDown');
  await page.getByRole('combobox').press('Enter');
  await expect(
    page.getByRole('heading', { name: 'Você encontrou Tanjiro Kamado.' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: /Compartilhar resultado/ }),
  ).toBeVisible();
  await page.getByRole('button', { name: /Resetar jogo/ }).click();
  await expect(page.getByRole('combobox')).toBeEnabled();
  expect(
    await page.evaluate(() => localStorage.getItem('hxh:v1:2026-10-30')),
  ).toBe('unchanged');
});

test('Kimetsu portraits, accessibility, layout and rollover', async ({
  page,
}) => {
  await page.clock.install({ time: new Date('2026-10-31T02:59:58Z') });
  await page.goto('/kimetsu');
  await expect(page.getByRole('combobox')).toBeEnabled();
  await page.screenshot({
    path: `test-results/kimetsu-${test.info().project.name}.png`,
    fullPage: true,
    animations: 'disabled',
  });
  await page.getByRole('button', { name: 'Como jogar' }).click();
  await expect(page.getByRole('dialog')).toContainText('29 personagens');
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
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole('button', { name: 'Fechar instruções' }).click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.clock.setFixedTime(new Date('2026-10-31T03:00:01Z'));
  await page.clock.fastForward(1000);
  await expect(
    page.getByText('Virou o dia em Brasília. Um novo desafio começou.'),
  ).toBeVisible();
  await page.getByRole('combobox').fill('Nezuko');
  await page.getByRole('option').click();
  await expect(
    page.getByRole('heading', { name: 'Você encontrou Nezuko Kamado.' }),
  ).toBeVisible();
});
