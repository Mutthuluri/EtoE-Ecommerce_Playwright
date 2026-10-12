const { test, expect } = require('../Fixtures/testFixture');

test('page', async ({ dashboardPage, cartPage, checkoutPage, ordersPage }) => {
  await dashboardPage.dashboard();
  await cartPage.cart();
  await checkoutPage.checkout();
  await ordersPage.orders();
});

