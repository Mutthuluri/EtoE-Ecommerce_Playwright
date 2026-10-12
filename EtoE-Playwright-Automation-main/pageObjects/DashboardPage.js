const { DashboardLocator } = require('../locators/DashboardLocator');
const testdata = require('../test-data/EcommercePurchasedata.json');
const { ScreenshotHelper } = require('../Helper/ScreenshotHelper');

class DashboardPage 
{
    constructor(page)
    {
        this.page = page;
        this.products = page.locator(DashboardLocator.products);
        this.cartButton = page.locator(DashboardLocator.cartButton);
        this.productName = page.locator(DashboardLocator.productName);
    }

    async SearchandAddProductToCart(productName)
    {
        await this.productName.first().waitFor();
        await this.products.filter({hasText:productName}).getByRole("button",{name:DashboardLocator.addToCartButton}).click();
    }

    async gotoCart()
    {
        await this.cartButton.click();
    }

    async dashboard()
    {
        await this.SearchandAddProductToCart(testdata.productName);
        await ScreenshotHelper.captureFullPage(this.page, 'product-added');
        await this.gotoCart();
    }

}

module.exports = { DashboardPage };