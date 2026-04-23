import { Page, expect } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/products');
    await expect(this.page.getByRole('heading', { name: 'Products' })).toBeVisible();
  }

  async clickAddProduct() {
    await this.page.getByTestId('add-product-button').click();
    await expect(this.page.getByRole('dialog')).toBeVisible();
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
  }

  async clickCancel() {
    await this.page.getByRole('button', { name: 'Cancel' }).click();
  }

  async assertProductInGrid(name: string) {
    await expect(this.page.locator('[role="row"]', { hasText: name }).first()).toBeVisible();
  }

  async assertProductNotInGrid(name: string) {
    await expect(this.page.locator('[role="row"]', { hasText: name })).toHaveCount(0);
  }

  async assertPriceForProduct(name: string, expectedPrice: string) {
    const row = this.page.locator('[role="row"]', { hasText: name }).first();
    await expect(row).toContainText(expectedPrice);
  }

  async assertCategoryForProduct(name: string, expectedCategory: string) {
    const row = this.page.locator('[role="row"]', { hasText: name }).first();
    await expect(row).toContainText(expectedCategory);
  }

  async assertNameFieldIsRequired() {
  const nameInput = this.page.getByTestId('product-name-input').locator('input');
  const isInvalid = await nameInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
  expect(isInvalid).toBe(true);
}

  async assertDescriptionFieldIsRequired() {
    const textarea = this.page.getByTestId('product-description-input').locator('textarea').first();
    const isInvalid = await textarea.evaluate((el: HTMLTextAreaElement) => !el.validity.valid);
    expect(isInvalid).toBe(true);
  }

  async assertDialogClosed() {
    await expect(this.page.getByRole('dialog')).not.toBeVisible();
  }

  async assertDialogOpen() {
    await expect(this.page.getByRole('dialog')).toBeVisible();
  }
}