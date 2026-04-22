import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/loginPage.ts';

const { Given, When, Then, Before } = createBdd();

let loginPage: LoginPage;

Before(async ({ page }) => {
  loginPage = new LoginPage(page);
});

Given('I am on the login page', async () => {
  await loginPage.goto();
});

When('I enter valid credentials', async () => {
  await loginPage.fillUsername('admin');
  await loginPage.fillPassword('password');
});

When('I enter invalid credentials', async () => {
  await loginPage.fillUsername('wrong');
  await loginPage.fillPassword('wrong');
});

When('I click the submit button', async () => {
  await loginPage.clickSubmit();
});

Then('I should be redirected to the dashboard', async () => {
  await loginPage.assertRedirectedToDashboard();
});

Then('I should see an error message', async () => {
    // Fix the capitalization for error message assertion (now located on loginPage.ts Page Object Model)
  await loginPage.assertErrorMessage();
});