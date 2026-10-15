import { type Locator, type Page } from '@playwright/test';
import { Header } from '../components/Header';

export type SortOrder = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  readonly header: Header;
  readonly title: Locator;
  readonly sort: Locator;
  readonly itemNames: Locator;
  readonly prices: Locator;

  constructor(private readonly page: Page) {
    this.header = new Header(page);
    this.title = page.getByTestId('title');
    this.sort = page.getByTestId('product-sort-container');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.prices = page.getByTestId('inventory-item-price');
  }

  async open() {
    await this.page.goto('/inventory.html');
  }

  item(name: string): Locator {
    return this.page.getByTestId('inventory-item').filter({ hasText: name });
  }

  async addToCart(name: string) {
    await this.item(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async openDetails(name: string) {
    await this.item(name).getByTestId('inventory-item-name').click();
    await this.page.waitForURL(/inventory-item\.html/);
  }

  async sortBy(order: SortOrder) {
    await this.sort.selectOption(order);
  }
}
