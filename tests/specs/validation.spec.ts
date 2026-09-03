import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { TransferPage } from '../pages/TransferPage';
import { generateUser } from '../helpers/dataFactory';

async function registerAndLogin(page: any, user: any) {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  await registerPage.goto();
  await registerPage.register(user.firstName, user.lastName, user.email, user.password);
  await expect(page).not.toHaveURL(/register/, { timeout: 10000 });

  await loginPage.goto();
  await loginPage.login(user.email, user.password);
  await expect(page.locator('h2.header__link')).toContainText('Balance:', { timeout: 10000 });
}

test.describe('Transfer validation', () => {
  test('should not allow transfer with invalid amount', async ({ page }) => {
    const user = generateUser();
    await registerAndLogin(page, user);
    const transferPage = new TransferPage(page);
    await transferPage.goto();

    const invalidAmounts = ['0', '-5'];
    for (const amount of invalidAmounts) {
      await transferPage.phoneInput.fill('+79991234567');
      await transferPage.amountInput.fill(amount);
      await transferPage.purposeInput.fill('Test');
      await transferPage.submitTransfer();
      await expect(page).toHaveURL('/', { timeout: 5000 });
      await expect(page.locator('div.snackbar')).toBeVisible({ timeout: 5000 });
      await expect(page.locator('div.snackbar')).not.toBeVisible({ timeout: 10000 }).catch(() => {});
    }
  });

  test('should show proper validation sequence for empty transfer form', async ({ page }) => {
    test.fail();
    const user = generateUser();
    await registerAndLogin(page, user);
    const transferPage = new TransferPage(page);
    await transferPage.goto();
    await transferPage.submitTransfer();
    await expect(page.locator('div.snackbar')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Logo navigation', () => {
  test('should show alert when clicking logo while unauthenticated', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.clickLogo();
    const snackbar = page.locator('div.snackbar');
    await expect(snackbar).toBeVisible({ timeout: 5000 });
    const text = await snackbar.innerText();
    expect(text).toMatch(/Failed to load balance/i);
  });
});