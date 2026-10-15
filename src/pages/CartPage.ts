import { type Locator, type Page } from '@playwright/test';
import { Header } from '../components/Header';

export class CartPage {
  readonly header: Header;
  readonly itemNames: Locator;
  readonly checkout: Locator;

  constructor(private readonly page: Page) {
    this.header = new Header(page);
    this.itemNames = page.getByTestId('inventory-item-name');
    this.checkout = page.getByTestId('checkout');
  }

  item(name: string): Locator {
    return this.page.getByTestId('inventory-item').filter({ hasText: name });
  }

  async remove(name: string) {
    await this.item(name).getByRole('button', { name: 'Remove' }).click();
  }

  async openCheckout() {
    await this.checkout.click();
  }
}
