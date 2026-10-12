const { OrdersLocator } = require('../locators/OrdersLocator');
const { ScreenshotHelper } = require('../Helper/ScreenshotHelper');

class OrdersPage {
    constructor(page) {
        this.page = page;
        this.ordersButton = page.getByRole('button', { name: OrdersLocator.ordersButton });
        this.viewButtons = page.locator('button').filter({ hasText: OrdersLocator.viewButton });
    }

    async goToOrders() {
        await this.ordersButton.click();
    }

    async openFirstOrder() {
        await this.viewButtons.first().click();
    }

    async orders()
    {
        await this.goToOrders();
        await this.openFirstOrder();
        await ScreenshotHelper.captureFullPage(this.page, 'order-details');
    }
}

module.exports = { OrdersPage };
