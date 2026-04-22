import { Page, expect } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/products');
    await this.page.waitForLoadState('networkidle');
  }

  async clickAddProduct() {
    await this.page.getByTestId('add-product-button').click();
  }

  async fillName(name: string) {
    await this.page.getByTestId('product-name-input').locator('input').fill(name);
  }

  async fillPrice(price: string) {
    await this.page.getByTestId('product-price-input').locator('input').fill(price);
  }

  async fillCategory(category: string) {
    await this.page.getByTestId('product-category-input').locator('input').fill(category);
  }

  async fillDescription(description: string) {
    await this.page.getByTestId('product-description-input').locator('textarea').first().fill(description);
  }

  async clickSave() {
    await this.page.getByTestId('save-product-button').click();
    await this.page.waitForLoadState('networkidle');
  }

async closeDialogByClickingOutside() {
  await this.page.keyboard.press('Escape');
}

  async assertProductInGrid(name: string) {
    const grid = this.page.locator('[role="grid"]');
    await expect(grid).toContainText(name);
  }

  async assertProductNotInGrid(name: string) {
    const grid = this.page.locator('[role="grid"]');
    await expect(grid).not.toContainText(name);
  }

  async assertPriceForProduct(name: string, expectedPrice: string) {
    const row = this.page.locator('[role="row"]', { hasText: name });
    await expect(row).toContainText(expectedPrice);
  }

async assertNameFieldIsRequired() {
  const nameInput = this.page.getByTestId('product-name-input').locator('input');
  const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
  expect(isInvalid).toBe(true);
}

async assertDescriptionValidationError() {
  const textarea = this.page.getByTestId('product-description-input').locator('textarea').first();
  const isInvalid = await textarea.evaluate((el: HTMLTextAreaElement) => !el.validity.valid);
  expect(isInvalid).toBe(true);
}

  async assertDialogClosed() {
    await expect(
      this.page.getByText('Add New Product')
    ).not.toBeVisible();
  }

  async assertDialogOpen() {
    await expect(
      this.page.getByText('Add New Product')
    ).toBeVisible();
  }
}