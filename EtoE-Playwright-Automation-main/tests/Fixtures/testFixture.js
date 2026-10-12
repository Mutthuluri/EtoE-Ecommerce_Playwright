const base = require('@playwright/test');
const { LoginPage } = require('../../pageObjects/LoginPage');
const { DashboardPage } = require('../../pageObjects/DashboardPage');
const { CartPage } = require('../../pageObjects/CartPage');
const { CheckoutPage } = require('../../pageObjects/CheckoutPage');
const { OrdersPage } = require('../../pageObjects/OrdersPage');
const testData = require('../../test-data/EcommercePurchasedata.json');

const test = base.test.extend({
  testData: async ({}, use) => {
    await use(testData);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.Login();
    await use(loginPage);
  },

  dashboardPage: async ({ page, loginPage }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  cartPage: async ({ page, loginPage }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page, loginPage }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  ordersPage: async ({ page, loginPage }, use) => {
    const ordersPage = new OrdersPage(page);
    await use(ordersPage);
  }
});

module.exports = { test, expect: base.expect };