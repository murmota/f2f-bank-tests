import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { TransactionsPage } from '../pages/TransactionsPage';
import { generateUser } from '../helpers/dataFactory';

test.describe('Transactions', () => {
  test('should add balance and show correct transaction type/status', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const transactionsPage = new TransactionsPage(page);
    const user = generateUser();

    await registerPage.goto();
    await registerPage.register(user.firstName, user.lastName, user.email, user.password);
    await expect(page).not.toHaveURL(/register/, { timeout: 10000 });
    await loginPage.goto();
    await loginPage.login(user.email, user.password);
    await expect(page.locator('h2.header__link')).toContainText('Balance:', { timeout: 10000 });
    await transactionsPage.goto();
    await transactionsPage.topUp('500');
    await expect(transactionsPage.tableRows.first()).toBeVisible({ timeout: 10000 });
    const lastRow = await transactionsPage.getLastTransactionRow();

    const operationType = await lastRow.locator('td').nth(2).innerText();
    const operationStatus = await lastRow.locator('td').nth(3).innerText();

    test.fail();
    await expect(operationType).toBe('deposit');
    await expect(operationStatus).toBe('complete');
  });
});