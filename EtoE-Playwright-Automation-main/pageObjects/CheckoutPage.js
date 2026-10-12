const { expect } = require('@playwright/test');
const { CheckoutLocator } = require('../locators/CheckoutLocator');
const testdata = require('../test-data/EcommercePurchasedata.json');
const { ScreenshotHelper } = require('../Helper/ScreenshotHelper');

class CheckoutPage
{
    constructor(page)
    {
        this.page = page;
        this.countryInput = page.locator(CheckoutLocator.countryInput);
        this.dropdown = page.locator(CheckoutLocator.dropdown);
        this.dropdownlocator = this.dropdown.locator(CheckoutLocator.dropdownButton);
        this.cardNumberInput = page.locator(CheckoutLocator.cardNumberInput);
        this.expiryMonthSelect = page.locator(CheckoutLocator.expiryMonthSelect).nth(0);
        this.expiryYearSelect = page.locator(CheckoutLocator.expiryMonthSelect).nth(1);
        this.cvvInput = page.locator(CheckoutLocator.cvvInput);
        this.nameInput = page.locator(CheckoutLocator.nameInput);
        this.couponInput = page.locator(CheckoutLocator.couponInput);
        this.applyCouponButton = page.locator(CheckoutLocator.applyCouponButton);
        this.placeOrderButton = page.locator(CheckoutLocator.placeOrderButton);
        this.orderConfirmationMessage = page.getByText(CheckoutLocator.orderConfirmationText);
        this.orderIdLocator = page.locator(CheckoutLocator.orderIdLocator);
    }

    async selectCountry(countryInput,countryName)
    {
        await this.countryInput.click();
        await this.countryInput.pressSequentially(countryInput);
        await this.dropdown.waitFor();
        const optionscount = await this.dropdownlocator.count();
        for(let i=0; i<optionscount; ++i)
        {
        const text = await this.dropdownlocator.nth(i).textContent();
        if(text === countryName)
            {
                await this.dropdownlocator.nth(i).click();
                break;
            }
        }
    }

    async fillPaymentDetails(cardNumber,month,year,cvv,name)
    {
        await this.cardNumberInput.fill(cardNumber);
        await this.expiryMonthSelect.selectOption(month);
        await this.expiryYearSelect.selectOption(year);
        await this.cvvInput.fill(cvv);
        await this.nameInput.fill(name);
    }

    async applyCoupon(couponCode)
    {
        await this.couponInput.fill(couponCode);
        await this.applyCouponButton.click();
        await expect(this.page.getByText(CheckoutLocator.couponAppliedText)).toBeVisible();
    }

    async placeOrder()
    {
        await this.placeOrderButton.click();
        await expect(this.orderConfirmationMessage).toBeVisible();
        const OrderId = await this.orderIdLocator.textContent();
        console.log(`PASS: Order confirmation message is visible. Order ID: ${OrderId}`);
    }

    async verifyEmail(email)
    {
        await expect(this.page.locator(CheckoutLocator.emailLocator).first()).toHaveText(email);
    }

    async checkout()
    {
        await this.selectCountry(testdata.country.input, testdata.country.name);
        await this.fillPaymentDetails(
            testdata.payment.cardNumber,
            testdata.payment.expiryMonth,
            testdata.payment.expiryYear,
            testdata.payment.cvv,
            testdata.payment.nameOnCard
        );
        await this.applyCoupon(testdata.couponCode);
        await this.verifyEmail(testdata.user.email);
        await this.placeOrder();
        await ScreenshotHelper.captureFullPage(this.page, 'order-placed');
    }
}

module.exports = { CheckoutPage };