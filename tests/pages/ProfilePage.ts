import { Page, Locator } from '@playwright/test';

export class ProfilePage {
  readonly page: Page;
  readonly nameValue: Locator;
  readonly surnameValue: Locator;
  readonly emailValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameValue = page.locator('p:has(span.label:has-text("Name:"))');
    this.surnameValue = page.locator('p:has(span.label:has-text("Surname:"))');
    this.emailValue = page.locator('p:has(span.label:has-text("Email:"))');
  }

  async goto() {
    await this.page.goto('/profile');
  }

  async getName(): Promise<string> {
    return this.nameValue.innerText();
  }

  async getSurname(): Promise<string> {
    return this.surnameValue.innerText();
  }

  async getEmail(): Promise<string> {
    return this.emailValue.innerText();
  }
}