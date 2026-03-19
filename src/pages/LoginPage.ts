import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './pages/base/BasePage';
import { User } from './data/users';
import 'dotenv';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorButton: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.locator('.error-message-container');
    this.errorButton = page.getByTestId('error-button');
  }

  async goto(): Promise<void> {
    await this.navigate('/');
  }

  async login(user: User): Promise<void> {
    const envPassword = process.env.USER_PASSWORD;

    if (!envPassword) {
      throw new Error('USER_PASSWORD is not defined');
    }

    const password: string | number = user.username === 'invalid' ? 12345 : envPassword;

    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(String(password));
    await this.safeClick(this.loginButton);
  }

  async getErrorMessage(): Promise<string | null> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return this.errorMessage.textContent();
  }
}
