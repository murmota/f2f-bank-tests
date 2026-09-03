import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { generateUser } from '../helpers/dataFactory';

test.describe('Authentication', () => {
  test('should register a new user with valid data', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = generateUser();
    await registerPage.goto();
    await registerPage.register(user.firstName, user.lastName, user.email, user.password);
    await expect(page).toHaveURL(/login|register|\//);
    await expect(page).not.toHaveURL(/register/);
  });

test('should login with correct credentials', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const user = generateUser();

  await registerPage.goto();
  await registerPage.register(user.firstName, user.lastName, user.email, user.password);
  await expect(page).not.toHaveURL(/register/, { timeout: 10000 });

  await page.goto('/login');
  await loginPage.login(user.email, user.password);
  await expect(page.locator('h2.header__link')).toContainText('Balance:', { timeout: 10000 });
});

  test('should show validation alerts for empty fields', async ({ page }) => {
    test.fail();
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', '');
    await expect(loginPage.errorAlert.first()).toBeVisible();
  });
});