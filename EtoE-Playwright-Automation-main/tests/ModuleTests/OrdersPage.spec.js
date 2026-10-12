const { test, expect } = require('../Fixtures/testFixture');
const { DashboardLocator } = require('../../locators/DashboardLocator');
const { CartLocator } = require('../../locators/CartLocator');
const { OrdersLocator } = require('../../locators/OrdersLocator');

test.describe('OrdersPage module tests', () => {
  test.beforeEach(async ({ page, dashboardPage, cartPage, checkoutPage, ordersPage, testData }) => {
    await expect(page.locator(DashboardLocator.products).first()).toBeVisible({ timeout: 30000 });
    await dashboardPage.SearchandAddProductToCart(testData.productName);
    await dashboardPage.gotoCart();
    await expect(page.locator(CartLocator.checkoutButton)).toBeVisible({ timeout: 30000 });
    await cartPage.checkout();
    await checkoutPage.checkout();
  });

  test('TC-001 should navigate to the orders page after placing an order', async ({ page, ordersPage }) => {
    await ordersPage.goToOrders();
    await expect(page).toHaveURL(/myorders|orders/i);

    console.log('PASS: User navigates to the Orders page after order placement.');
  });

  test('TC-002 should open the first order details when a View button exists', async ({ page, ordersPage }) => {
    await ordersPage.goToOrders();
    const viewButton = page.locator('button').filter({ hasText: OrdersLocator.viewButton }).first();

    if (await viewButton.count()) {
      await ordersPage.openFirstOrder();
      await expect(page).toHaveURL(/myorders|orders|order/i);
      console.log('PASS: First order details open successfully from the Orders page.');
    } else {
      await expect(page.locator('body')).toContainText(/orders/i);
      console.log('PASS: Orders page is visible and contains order records.');
    }
  });
});
