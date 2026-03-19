import { type Locator, type Page } from "@playwright/test";
import { safeClick, SafeClickOptions } from '@helpers/safeClick';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = '/'): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async safeClick(locator: Locator, options?: SafeClickOptions): Promise<void> {
    await safeClick(this.page, locator, options);
  }

  async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForURL(pattern: string | RegExp): Promise<void> {
    await this.page.waitForURL(pattern);
  }
}
