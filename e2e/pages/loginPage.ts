import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async fillUsername(username: string) {
    await this.page.getByTestId('login-username').fill(username);
  }

  async fillPassword(password: string) {
    await this.page.getByTestId('login-password').fill(password);
  }

  async clickSubmit() {
    await this.page.getByTestId('login-submit').click();
  }

  async loginAsAdmin() {
    await this.fillUsername('admin');
    await this.fillPassword('password');
    await this.clickSubmit();
    await this.page.waitForLoadState('networkidle');
  }

  async assertRedirectedToDashboard() {
    await expect(this.page).toHaveURL('/');
    await expect(this.page.getByTestId('dashboard-title')).toHaveText('Dashboard');
  }

  async assertErrorMessage() {
    await expect(this.page.getByTestId('login-error')).toHaveText('Invalid credentials');
  }
}