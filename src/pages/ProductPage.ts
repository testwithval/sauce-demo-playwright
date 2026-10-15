import { type Locator, type Page } from '@playwright/test';
import { Header } from '../components/Header';

export class ProductPage {
  readonly header: Header;
  readonly name: Locator;
  readonly price: Locator;
  readonly back: Locator;

  constructor(private readonly page: Page) {
    const details = page.locator('.inventory_details_container');
    this.header = new Header(page);
    this.name = details.getByTestId('inventory-item-name');
    this.price = details.getByTestId('inventory-item-price');
    this.back = page.getByTestId('back-to-products');
  }

  async addToCart() {
    await this.page.locator('.inventory_details_container').getByRole('button', { name: 'Add to cart' }).click();
  }

  async backToProducts() {
    await this.back.click();
  }
}
