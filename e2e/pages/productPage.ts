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
    //Uses click to a location outside of the dialog to close it, simulating a user clicking outside the dialog to dismiss it
  await this.page
    .locator('.MuiDialog-root')
    .click({ position: { x: 10, y: 10 } });
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
  const nameInput = this.page
    .getByTestId('product-name-input')
    .locator('input');
  await expect(nameInput).toHaveAttribute('required');
}

async assertDescriptionFieldIsRequired() {
  const descriptionInput = this.page
    .getByTestId('product-description-input')
    .locator('textarea').first();
  await expect(descriptionInput).toHaveAttribute('required');
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