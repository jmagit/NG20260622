import { test, expect } from '@playwright/test';

test('Botones de la calculadora', async ({ page }) => {
  await page.goto('http://localhost:4200/chisme/de/hacer/numeros');
  await page.getByRole('button', { name: '9' }).click();
  await page.getByRole('button', { name: '8' }).click();
  await page.getByRole('button', { name: '6' }).click();
  await page.getByRole('button', { name: '5' }).click();
  await page.getByRole('button', { name: '4' }).click();
  await page.getByRole('button', { name: '.' }).click();
  await page.getByRole('button', { name: '0' }).click();
  await page.getByRole('button', { name: '1' }).click();
  await page.getByRole('button', { name: '2' }).click();
  await page.getByRole('button', { name: '2' }).click();
  await page.getByRole('button', { name: '±' }).click();
  await expect(page.locator('calculadora')).toContainText('-98654.0122');
  await page.getByRole('button', { name: '⌫' }).click();
  await page.getByRole('button', { name: '⌫' }).click();
  await page.getByRole('button', { name: '⌫' }).click();
  await page.getByRole('button', { name: '⌫' }).click();
  await page.getByRole('button', { name: '⌫' }).click();
  await expect(page.locator('calculadora')).toContainText('-98654');
  await page.getByRole('button', { name: 'C' }).click();
  await expect(page.locator('calculadora')).toContainText('0');
});
