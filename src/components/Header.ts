import { type Locator, type Page } from '@playwright/test';

export class Header {
  readonly cart: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.cart = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async openCart() {
    await this.cart.click();
  }
}
