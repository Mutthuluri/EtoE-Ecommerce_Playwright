const { test, expect } = require('../Fixtures/testFixture');
const { DashboardLocator } = require('../../locators/DashboardLocator');
const { CartLocator } = require('../../locators/CartLocator');
const { CheckoutLocator } = require('../../locators/CheckoutLocator');

test.describe('CheckoutPage module tests', () => {
  test.beforeEach(async ({ page, dashboardPage, cartPage, checkoutPage, testData }) => {
    await expect(page.locator(DashboardLocator.products).first()).toBeVisible({ timeout: 30000 });
    await dashboardPage.SearchandAddProductToCart(testData.productName);
    await dashboardPage.gotoCart();
    await expect(page.locator(CartLocator.checkoutButton)).toBeVisible({ timeout: 30000 });
    await cartPage.checkout();
  });

  test('TC-001 should complete checkout with valid customer and payment details', async ({ page, checkoutPage, testData }) => {
    await checkoutPage.selectCountry(testData.country.input, testData.country.name);
    await checkoutPage.fillPaymentDetails(
      testData.payment.cardNumber,
      testData.payment.expiryMonth,
      testData.payment.expiryYear,
      testData.payment.cvv,
      testData.payment.nameOnCard
    );
    await checkoutPage.applyCoupon(testData.couponCode);
    await checkoutPage.placeOrder();
    await expect(page.getByText(/Thankyou for the order/i)).toBeVisible({ timeout: 30000 });

    console.log('PASS: Checkout completed successfully with valid customer and payment data.');
  });

  test('TC-002 should select a valid country and fill payment details', async ({ checkoutPage, testData }) => {
    await checkoutPage.selectCountry(testData.country.input, testData.country.name);
    await checkoutPage.fillPaymentDetails(
      testData.payment.cardNumber,
      testData.payment.expiryMonth,
      testData.payment.expiryYear,
      testData.payment.cvv,
      testData.payment.nameOnCard
    );

    await expect(checkoutPage.countryInput).toHaveValue('India');
    await expect(checkoutPage.cardNumberInput).toHaveValue(testData.payment.cardNumber);
    await expect(checkoutPage.cvvInput).toHaveValue(testData.payment.cvv);

    console.log('PASS: Country and payment details were entered correctly.');
  });

  test('TC-003 should reject invalid coupon application', async ({ page, checkoutPage, testData }) => {
    await checkoutPage.selectCountry(testData.country.input, testData.country.name);
    await checkoutPage.fillPaymentDetails(
      testData.payment.cardNumber,
      testData.payment.expiryMonth,
      testData.payment.expiryYear,
      testData.payment.cvv,
      testData.payment.nameOnCard
    );

    await checkoutPage.couponInput.fill('invalidcoupon');
    await checkoutPage.applyCouponButton.click();
    await expect(page.getByText(/Coupon Applied/i)).not.toBeVisible();

    console.log('PASS: Invalid coupon is rejected during checkout.');
  });
});
