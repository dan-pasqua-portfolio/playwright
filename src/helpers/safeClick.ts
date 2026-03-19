import { type Locator, type Page } from "@playwright/test";

export type LoadState = 'load' | 'domcontentloaded' | 'networkidle';
export type ElementState = 'attached' | 'detached' | 'visible' | 'hidden';

export interface SafeClickOptions {
  waitForState?: ElementState;
  loadState?: LoadState;
  timeout?: number;
}

export async function safeClick(page: Page, locator: Locator, options: SafeClickOptions = {},): Promise<void> {
  const {
    waitForState = 'visible',
    loadState = 'domcontentloaded',
    timeout = 10_000
  } = options;

  await page.waitForLoadState(loadState, { timeout });
  await locator.waitFor({ state: waitForState, timeout });
  await locator.click({ timeout });
}
