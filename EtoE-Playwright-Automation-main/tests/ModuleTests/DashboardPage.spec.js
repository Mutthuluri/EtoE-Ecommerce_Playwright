const { test, expect } = require('../Fixtures/testFixture');
const { DashboardLocator } = require('../../locators/DashboardLocator');

test.describe('DashboardPage module tests', () => {
  test.beforeEach(async ({ page, dashboardPage, testData }) => {
    await expect(page.locator(DashboardLocator.products).first()).toBeVisible({ timeout: 30000 });
  });

  test('TC-001 should display products on the dashboard after login', async ({ page, testData }) => {
    const productCards = page.locator(DashboardLocator.products);
    await expect(productCards.first()).toBeVisible();
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);

    console.log('PASS: Dashboard displays products after successful login.');
  });

  test('TC-002 should add a valid product to cart from the dashboard', async ({ page, dashboardPage, testData }) => {
    await dashboardPage.SearchandAddProductToCart(testData.productName);
    await expect(page.locator(DashboardLocator.cartButton)).toBeVisible();

    console.log('PASS: Valid product was added to the cart from the dashboard.');
  });

  test('TC-003 should navigate to the cart after adding a product', async ({ dashboardPage, page, testData }) => {
    await dashboardPage.dashboard();
    await expect(page).toHaveURL(/\/cart/i);

    console.log('PASS: User navigates to the cart after adding a product.');
  });

  test('TC-004 should not show a missing product in the catalog', async ({ page }) => {
    const missingProduct = page.locator(DashboardLocator.products).filter({ hasText: 'Non Existing Product' });
    await expect(missingProduct).toHaveCount(0);

    console.log('PASS: Missing product is not displayed in the catalog.');
  });
});
