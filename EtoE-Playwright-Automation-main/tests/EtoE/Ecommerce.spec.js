const { test, expect } = require('@playwright/test');

test('page', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const productName = 'ZARA COAT 3';

    const email = 'example34@gmail.com';
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('Mutthu3234#');
    await page.locator('#login').click();

    const products = page.locator('.card-body');

    await page.locator('.card-body b').first().waitFor();
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click();

   
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();//use waitfor as isvisile doesn't support autowait 

    await page.locator('button:has-text("Checkout")').click();
    await page.getByPlaceholder('Select Country').pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionscount = await dropdown.locator("button").count();
    for(let i=0; i<optionscount; ++i)
        {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
            {
                await dropdown.locator("button").nth(i).click();
                break;
            }
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    
    await page.locator("input[value='4542 9931 9292 2293']").fill('1234 5678 9123 4567');

    await page.locator('div.field.small').locator('select').nth(0).selectOption('04');
    await page.locator('div.field.small').locator('select').nth(1).selectOption('28');
    await page.locator("//div[@class='payment__cc']//div[2]//input[1]").fill('324');
    await page.locator("//div[@class='payment__info']//div[3]//div[1]//input[1]").fill('Mutthuluri Varun Kumar');
    await page.locator('input[name="coupon"]').fill('rahulshettyacademy');
    await page.locator('button:has-text("Apply Coupon")').click();
    await expect(page.getByText('Coupon Applied')).toBeVisible();
    await page.locator('a.btnn.action__submit.ng-star-inserted').click();
    await expect(page.getByText('Thankyou for the order.')).toBeVisible();
    console.log('Order confirmation message is visible');
    const OrderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(OrderId);
    await page.getByRole('button', { name: 'ORDERS' }).click();

    await page.locator('button').filter({ hasText: 'View' }).first().click();



});

