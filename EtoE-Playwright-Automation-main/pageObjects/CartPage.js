const { CartLocator } = require('../locators/CartLocator');
const { ScreenshotHelper } = require('../Helper/ScreenshotHelper');

class CartPage
{
    constructor(page)
    {
        this.page = page;
        this.checkoutButton = page.locator(CartLocator.checkoutButton);
        this.cartItems = page.locator(CartLocator.cartItems);
    }

    async verifyProductInDisplayed()
    {
        await this.cartItems.first().waitFor();
    }

    async checkout()
    {
        await this.checkoutButton.click();
    }

    async cart()
    {
        await this.verifyProductInDisplayed();
        await ScreenshotHelper.captureFullPage(this.page, 'cart-items');
        await this.checkout();
    }
}

module.exports = { CartPage };