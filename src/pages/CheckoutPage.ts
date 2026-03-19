import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base/BasePage";

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  zipCode: string;
}

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;

  readonly summaryItems: Locator;
  readonly summaryTotal: Locator;
  readonly finishButton: Locator;

  readonly confirmationMsg: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput  = page.locator('[data-test="firstName"]');
    this.lastNameInput   = page.locator('[data-test="lastName"]');
    this.zipCodeInput    = page.locator('[data-test="postalCode"]');
    this.continueButton  = page.locator('[data-test="continue"]');
    this.cancelButton    = page.locator('[data-test="cancel"]');
    this.errorMessage    = page.locator('[data-test="error"]');
    this.summaryItems    = page.locator('.cart_item');
    this.summaryTotal    = page.locator('.summary_total_label');
    this.finishButton    = page.locator('[data-test="finish"]');
    this.confirmationMsg = page.locator('.complete-header');
  }

  async goto(): Promise<void> {
    await this.navigate('/checkout-step-one.html');
  }

  async fillInfo(info: CheckoutInfo): Promise<void> {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.zipCodeInput.fill(info.zipCode);
  }

  async continue(): Promise<void> {
    await this.safeClick(this.continueButton);
  }

  async cancel(): Promise<void> {
    await this.safeClick(this.cancelButton);
  }

  async fillInfoAndContinue(info: CheckoutInfo): Promise<void> {
    await this.fillInfo(info);
    await this.continue();
  }

  async finish(): Promise<void> {
    await this.safeClick(this.finishButton);
  }

  async getTotal(): Promise<string | null> {
    return this.summaryTotal.textContent();
  }

  async getConfirmationMessage(): Promise<string | null> {
    await this.confirmationMsg.waitFor({ state: 'visible' });
    return this.confirmationMsg.textContent();
  }

  async getErrorMessage(): Promise<string | null> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return this.errorMessage.textContent();
  }
}
