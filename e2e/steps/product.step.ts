/* eslint-disable no-empty-pattern */
import { createBdd } from 'playwright-bdd';
import { ProductsPage } from '../pages/productPage';

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
  async ({}: object, name: string, price: string, category: string, description: string) => {
    await productsPage.fillName(name);
    await productsPage.fillPrice(price);
    await productsPage.fillCategory(category);
    await productsPage.fillDescription(description);
  }
);

When('I click the save product button', async () => {
  await productsPage.clickSave();
});

When('I close the dialog by clicking outside', async () => {
  await productsPage.closeDialogByClickingOutside();
});

Then('I should see {string} in the products grid', async ({}: object, name: string) => {
  await productsPage.assertProductInGrid(name);
});

Then('the products grid should not contain {string}', async ({}: object, name: string) => {
  await productsPage.assertProductNotInGrid(name);
});

Then('the price for {string} should display as {string}', async ({}: object, name: string, price: string) => {
  await productsPage.assertPriceForProduct(name, price);
});

Then('I should see a Description field validation error', async () => {
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