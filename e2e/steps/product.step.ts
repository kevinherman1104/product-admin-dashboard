/* eslint-disable no-empty-pattern */
import { createBdd } from 'playwright-bdd';
import { ProductsPage } from '../pages/productPage.ts';

const { Given, When, Then, Before } = createBdd();

let productsPage: ProductsPage;

Before(async ({ page }) => {
  productsPage = new ProductsPage(page);
});

Given('I am on the products page', async () => {
  await productsPage.goto();
});

When('I click the add product button', async () => {
  await productsPage.clickAddProduct();
});

When(
  'I fill in the product details with name {string}, price {string}, category {string} and description {string}',
  async ({}, name: string, price: string, category: string, description: string) => {
    await productsPage.fillName(name);
    await productsPage.fillPrice(price);
    await productsPage.fillCategory(category);
    await productsPage.fillDescription(description);
  }
);

When('I click the save product button', async () => {
  await productsPage.clickSave();
});

When('I click the cancel button', async () => {
  await productsPage.clickCancel();
});

Then('I should see {string} in the products grid', async ({}, name: string) => {
  await productsPage.assertProductInGrid(name);
});

Then('I should not see {string} in the products grid', async ({}, name: string) => {
  await productsPage.assertProductNotInGrid(name);
});

Then('the price for {string} should display as {string}', async ({}, name: string, price: string) => {
  await productsPage.assertPriceForProduct(name, price);
});

Then('the category for {string} should display as {string}', async ({}, name: string, category: string) => {
  await productsPage.assertCategoryForProduct(name, category);
});

Then('the description field should be marked as required', async () => {
  await productsPage.assertDescriptionFieldIsRequired();
});

Then('the dialog should be closed', async () => {
  await productsPage.assertDialogClosed();
});

Then('the dialog should remain open', async () => {
  await productsPage.assertDialogOpen();
});

Then('the product name field should be marked as required', async () => {
  await productsPage.assertNameFieldIsRequired();
});