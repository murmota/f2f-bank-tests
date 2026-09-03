import { Page, Locator } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorAlert: Locator;
  readonly loginLink: Locator;
  readonly logoLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('input.input[type="text"]').first();
    this.lastNameInput = page.locator('input.input[type="text"]').nth(1);
    this.emailInput = page.locator('input.input[type="email"]');
    this.passwordInput = page.locator('input.input[type="password"]');
    this.submitButton = page.getByRole('button', { name: 'Register' });
    this.errorAlert = page.locator('div.snackbar');
    this.loginLink = page.locator('a[href="/login"]');
    this.logoLink = page.locator('a.header__title-container');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async register(firstName: string, lastName: string, email: string, password: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async clickLogo() {
    await this.logoLink.click();
  }
}