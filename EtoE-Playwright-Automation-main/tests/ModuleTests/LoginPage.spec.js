const { test, expect } = require('../Fixtures/testFixture');
const { LoginPage } = require('../../pageObjects/LoginPage');
const { LoginLocator } = require('../../locators/LoginLocator');
const { DashboardLocator } = require('../../locators/DashboardLocator');
const testData = require('../../test-data/EcommercePurchasedata.json');

test.describe('LoginPage module tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goTo();
  });

  const loginScenarios = [
    {
      name: 'should login successfully with valid email and valid password',
      email: testData.user.email,
      password: testData.user.password,
      expectedToLogin: true,
    },
    {
      name: 'should not login with valid email and invalid password',
      email: testData.user.email,
      password: testData.invalidUser.password,
      expectedToLogin: false,
    },
    {
      name: 'should not login with invalid email and valid password',
      email: testData.invalidUser.email,
      password: testData.user.password,
      expectedToLogin: false,
    },
    {
      name: 'should not login with invalid email and invalid password',
      email: testData.invalidUser.email,
      password: testData.invalidUser.password,
      expectedToLogin: false,
    },
  ];

  for (const scenario of loginScenarios) {
    test(scenario.name, async ({ page }) => {
      await loginPage.validLogin(scenario.email, scenario.password);

      if (scenario.expectedToLogin) {
        await expect(page.locator(DashboardLocator.products).first()).toBeVisible({ timeout: 30000 });
      } else {
        await expect(page).toHaveURL(/\/auth\/login/i);
        await expect(page.locator(LoginLocator.loginButton)).toBeVisible();
      }

      console.log(`PASS: Login validation confirmed for: ${scenario.name}`);
    });
  }

  test('should keep the user on the login page after a failed login attempt', async ({ page }) => {
    await loginPage.validLogin(testData.user.email, testData.invalidUser.password);

    await expect(page).toHaveURL(/\/auth\/login/i);
    await expect(page.locator(LoginLocator.userEmail)).toHaveValue(testData.user.email);
    await expect(page.locator(LoginLocator.loginButton)).toBeVisible();

    console.log('PASS: Login flow correctly rejected the invalid credentials and kept the user on the login page.');
  });
});
