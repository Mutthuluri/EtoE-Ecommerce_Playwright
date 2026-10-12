const { test, expect } = require('../Fixtures/testFixture');
const { DashboardLocator } = require('../../locators/DashboardLocator');
const { CartLocator } = require('../../locators/CartLocator');

test.describe('CartPage module tests', () => {
  test.beforeEach(async ({ page, dashboardPage, cartPage, testData }) => {
    await expect(page.locator(DashboardLocator.products).first()).toBeVisible({ timeout: 30000 });
  });

  test('TC-001 should display the selected product in the cart', async ({ page, dashboardPage, cartPage, testData }) => {
    await dashboardPage.SearchandAddProductToCart(testData.productName);
    await dashboardPage.gotoCart();
    await cartPage.verifyProductInDisplayed();
    await expect(page.locator(CartLocator.cartItems).first()).toBeVisible();
    await expect(page.locator(CartLocator.checkoutButton)).toBeVisible();

    console.log('PASS: Selected product is visible in the cart and checkout is available.');
  });

  test('TC-002 should proceed to checkout with a valid cart', async ({ page, dashboardPage, cartPage, testData }) => {
    await dashboardPage.SearchandAddProductToCart(testData.productName);
    await dashboardPage.gotoCart();
    await expect(page.locator(CartLocator.checkoutButton)).toBeVisible({ timeout: 30000 });
    await cartPage.checkout();
    await expect(page).toHaveURL(/\/order/i);

    console.log('PASS: Valid cart proceeds to checkout successfully.');
  });

  test('TC-003 should retain the added product in cart summary', async ({ page, dashboardPage, cartPage, testData }) => {
    await dashboardPage.SearchandAddProductToCart(testData.productName);
    await dashboardPage.gotoCart();
    await cartPage.verifyProductInDisplayed();
    const totalItems = await page.locator(CartLocator.cartItems).count();
    expect(totalItems).toBeGreaterThan(0);

    console.log('PASS: Cart summary retains the added product item.');
  });
});
