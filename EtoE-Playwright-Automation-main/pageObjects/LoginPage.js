const { LoginLocator } = require('../locators/LoginLocator');
const testdata = require('../test-data/EcommercePurchasedata.json');
const { ScreenshotHelper } = require('../Helper/ScreenshotHelper');

class LoginPage 
{
    constructor(page)
    {
        this.page = page;
        this.userEmail = page.locator(LoginLocator.userEmail);
        this.userPassword = page.locator(LoginLocator.userPassword);
        this.loginButton = page.locator(LoginLocator.loginButton);
    }

    async goTo()
    {
        await this.page.goto(testdata.url);
    }

    async validLogin(userName, password)
    {
    
        await this.userEmail.fill(userName);
        await this.userPassword.fill(password);
        await this.loginButton.click();
    }

    async Login()
    {
        ScreenshotHelper.clearScreenshots();
        await this.goTo();
        await this.validLogin(testdata.user.email, testdata.user.password);
        await ScreenshotHelper.captureFullPage(this.page, 'login-success');
    }
};

module.exports = { LoginPage };