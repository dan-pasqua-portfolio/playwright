import { type Locator, type Page } from "@playwright/test";
import { BasePage } from './base/BasePage';
import { Header } from "./components/Header";

export type SortOption = 
  | 'az'
  | 'za'
  | 'lohi'
  | 'hilo';

export class InventoryPage extends BasePage {
  readonly header: Header;
  readonly productList: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);

    this.header = new Header(page);
    this.productList = page.getByTestId('inventory-list');
    this.sortDropdown = page.getByTestId('product-sort-container');
  }

  async goto(): Promise<void> {
    await this.navigate('/inventory.html');
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async addItemToCart(itemName: string): Promise<void> {
    await this.page
      .locator(`.inventory-item:has-text("${itemName}')`)
      .locator('button')
      .click();
  }

  async removeItemFromCart(itemName: string): Promise<void> {
    await this.page
      .locator(`.inventory-item:has-text("${itemName}')`)
      .locator('button')
      .click();
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.page
      .locator('.inventory_item_price')
      .allTextContents();
    
    return priceTexts.map((p) => parseFloat(p.replace('$', '')));
  }
}
