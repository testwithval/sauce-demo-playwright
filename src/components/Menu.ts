import { type Locator, type Page } from '@playwright/test';

export class Menu {
  readonly openButton: Locator;
  readonly logout: Locator;
  readonly reset: Locator;

  constructor(private readonly page: Page) {
    this.openButton = page.getByRole('button', { name: 'Open Menu' });
    this.logout = page.getByTestId('logout-sidebar-link');
    this.reset = page.getByTestId('reset-sidebar-link');
  }

  async open() {
    await this.openButton.click();
  }

  async logOut() {
    await this.open();
    await this.logout.click();
  }

  async resetAppState() {
    await this.open();
    await this.reset.click();
  }
}
