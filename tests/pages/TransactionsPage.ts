import { Page, Locator } from '@playwright/test';

export class TransactionsPage {
  readonly page: Page;
  readonly addBalanceButton: Locator;
  readonly addBalanceInput: Locator;
  readonly addButton: Locator;
  readonly balanceLabel: Locator;
  readonly transactionsTable: Locator;
  readonly tableRows: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addBalanceButton = page.getByRole('button', { name: /Add balance/i });
    this.addBalanceInput = page.locator('input.input[type="number"]');
    this.addButton = page.locator('button.confirm-btn');
    this.balanceLabel = page.locator('h2.header__link');
    this.transactionsTable = page.locator('table.transactions__table');
    this.tableRows = this.transactionsTable.locator('tbody tr');
    this.errorAlert = page.locator('div.snackbar');
  }

  async goto() {
    await this.page.goto('/transactions');
  }

  async openAddBalanceModal() {
    await this.addBalanceButton.click();
  }

  async topUp(amount: string) {
    await this.openAddBalanceModal();
    await this.addBalanceInput.fill(amount);
    await this.addButton.click();
  }

  async getTransactionCell(rowIndex: number, cellIndex: number): Promise<string> {
    return this.tableRows.nth(rowIndex).locator('td').nth(cellIndex).innerText();
  }

  async getLastTransactionRow(): Promise<Locator> {
    const rows = this.tableRows;
    const count = await rows.count();
    if (count === 0) throw new Error('No transactions found');
    return rows.nth(count - 1);
  }
}