import { test, expect } from '@playwright/test';
import { challenge } from '../../src/lib/dark-souls-game';

test('play from the portal, restore a guess, win and start the next day', async ({
  page,
}) => {
  await page.clock.install({ time: new Date('2026-11-09T15:00:00Z') });
  await page.goto('/');
  await page.locator('a[href="/dark-souls"]').click();
  const input = page.getByRole('combobox');
  await expect(input).toBeEnabled();
  await page.getByRole('button', { name: 'Como jogar' }).click();
  await expect(page.getByRole('dialog')).toContainText('seis expansões');
  await page.getByRole('button', { name: 'Fechar instruções' }).click();
  await input.fill('Lapp');
  await page.getByRole('option', { name: /Patches/ }).click();
  await page.reload();
  await expect(page.locator('tbody')).toContainText('Patches');
  await expect(
    page.getByRole('columnheader', { name: 'Pacto associado' }),
  ).toBeVisible();
  const answer = challenge('2026-11-09').answer.name;
  await input.fill(answer);
  await input.press('ArrowDown');
  await input.press('Enter');
  await expect(
    page.getByRole('heading', { name: 'Você encontrou ' + answer + '.' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: /Compartilhar resultado/ }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.clock.setFixedTime(new Date('2026-11-10T03:00:01Z'));
  await page.clock.fastForward(1100);
  await expect(input).toBeEnabled();
  await expect(page.locator('tbody')).toHaveCount(0);
});
