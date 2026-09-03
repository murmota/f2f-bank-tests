import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { TransferPage } from '../pages/TransferPage';
import { TransactionsPage } from '../pages/TransactionsPage';
import { generateUser, generateLongString } from '../helpers/dataFactory';

async function registerAndLogin(page: any, user: any) {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  await registerPage.goto();
  await registerPage.register(user.firstName, user.lastName, user.email, user.password);
  await loginPage.goto();
  await loginPage.login(user.email, user.password);
  await page.goto('/');
  await expect(page.locator('h2.header__link')).toContainText('Balance:');
}

test.describe('Known bugs', () => {
test('BUG: Transfer with invalid phone (letters) succeeds', async ({ page }) => {
  test.fail();
  const user = generateUser();
  await registerAndLogin(page, user);
  const transferPage = new TransferPage(page);
  await transferPage.goto();
  await transferPage.fillTransferForm('+7(928) 153-03-5f', '100', 'Test');
  await transferPage.submitTransfer();
  await expect(page.locator('div.snackbar')).toBeVisible({ timeout: 5000 });
  await expect(page.locator('div.snackbar.error')).toBeVisible();
});

  test('BUG: No alerts when topping up with invalid amount (0)', async ({ page }) => {
    test.fail();
    const user = generateUser();
    await registerAndLogin(page, user);
    const transactionsPage = new TransactionsPage(page);
    await transactionsPage.goto();
    await transactionsPage.topUp('0');
    await expect(transactionsPage.errorAlert).toBeVisible();
  });

    test('BUG: No alerts when topping up with invalid amount (-)', async ({ page }) => {
    test.fail();
    const user = generateUser();
    await registerAndLogin(page, user);
    const transactionsPage = new TransactionsPage(page);
    await transactionsPage.goto();
    await transactionsPage.topUp('-5');
    await expect(transactionsPage.errorAlert).toBeVisible();
  });

  test('BUG: Page freezes with long payment purpose', async ({ page }) => {
    test.fail();
    const user = generateUser();
    await registerAndLogin(page, user);
    const transferPage = new TransferPage(page);
    await transferPage.goto();
    const longText = generateLongString(1000);
    await transferPage.purposeInput.fill(longText);
    await expect(transferPage.purposeInput).toBeEnabled();
  });
});