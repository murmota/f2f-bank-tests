import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorAlert: Locator;
  readonly registerLink: Locator;
  readonly logoLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input.input[type="email"]');
    this.passwordInput = page.locator('input.input[type="password"]');
    this.submitButton = page.locator('button[type="submit"]').first();
    this.errorAlert = page.locator('div.snackbar');
    this.registerLink = page.locator('a[href="/register"]');
    this.logoLink = page.locator('a.header__title-container');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async clickLogo() {
    await this.logoLink.click();
  }
}