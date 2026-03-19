import { type Locator, type Page } from "@playwright/test";
import { BasePage } from './base/BasePage';
import { Header } from './components/Header';

export class CartPage extends BasePage {
  readonly header: Header;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueButton: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    super(page);

    this.header = new Header(page);
    this.cartItems = page.getByTestId('cart-list');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueButton = page.getByTestId('continue-shopping');
    this.removeButton = page.getByTestId('remove-sauce-labs-backpack');
  }

  async goto(): Promise<void> {
    await this.navigate('/cart.html');
  }

  async proceedToCheckout(): Promise<void> {
    await this.safeClick(this.checkoutButton);
  }

  async continueShopping(): Promise<void> {
    await this.safeClick(this.continueButton);
  }

  async removeItem(itemName: string): Promise<void> {
    await this.page
      .locator(`cart_item:has-text("${itemName})`)
      .locator('[data-test^="remove"]')
      .click();
  }

  async getCartItemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }
}
