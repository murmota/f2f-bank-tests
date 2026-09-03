import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { TransferPage } from '../pages/TransferPage';
import { TransactionsPage } from '../pages/TransactionsPage';
import { generateUser } from '../helpers/dataFactory';

test.describe('Transfer', () => {
  test('should transfer money successfully', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const transferPage = new TransferPage(page);
    const transactionsPage = new TransactionsPage(page);
    const user = generateUser();

    await registerPage.goto();
    await registerPage.register(user.firstName, user.lastName, user.email, user.password);
    await expect(page).not.toHaveURL(/register/, { timeout: 10000 });
    await loginPage.goto();
    await loginPage.login(user.email, user.password);
    await expect(page.locator('h2.header__link')).toContainText('Balance:', { timeout: 10000 });
    await transactionsPage.goto();
    await transactionsPage.topUp('1000');
    await expect(transactionsPage.tableRows.first()).toBeVisible({ timeout: 10000 });
    await expect(transactionsPage.balanceLabel).toContainText('1000');
    await transferPage.goto();
    await transferPage.fillTransferForm('+79991234567', '100', 'Test payment');
    await transferPage.submitTransfer();

    await expect(page.locator('div.snackbar')).toContainText('Transfer completed successfully', { timeout: 10000 });
  });
});