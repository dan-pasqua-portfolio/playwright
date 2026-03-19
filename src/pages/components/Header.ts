import { type Locator, type Page } from '@playwright/test';

export class Header {
  readonly cartIcon: Locator;
  readonly menuButton: Locator;
  readonly cartBadge: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.cartIcon = page.getByTestId('shopping-cart-link');
    this.menuButton = page.getByTestId('open-menu');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.logoutLink = page.getByTestId('logout-sidebar-link');
  }

  async getCartCount(): Promise<string | null> {
    return this.cartBadge.textContent();
  }

  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.waitFor({ state: 'visible' });
    await this.logoutLink.click();
  }
}
