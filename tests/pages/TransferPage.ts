import { Page, Locator } from '@playwright/test';

export class TransferPage {
  readonly page: Page;
  readonly phoneInput: Locator;
  readonly amountInput: Locator;
  readonly purposeInput: Locator;
  readonly submitButton: Locator;
  readonly balanceLabel: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.phoneInput = page.locator('input.input[type="text"]').first();
    this.purposeInput = page.locator('input.input[type="text"]').nth(1);
    this.amountInput = page.locator('input.input[type="number"]');
    this.submitButton = page.locator('button[type="submit"]').first();
    this.balanceLabel = page.locator('h2.header__link');
    this.errorAlert = page.locator('div.snackbar');
  }

  async goto() {
    await this.page.goto('/');
  }

  async fillTransferForm(phone: string, amount: string, purpose: string) {
    await this.phoneInput.fill(phone);
    await this.amountInput.fill(amount);
    await this.purposeInput.fill(purpose);
  }

  async submitTransfer() {
    await this.submitButton.click();
  }

  async getBalanceText(): Promise<string> {
    return this.balanceLabel.innerText();
  }
}