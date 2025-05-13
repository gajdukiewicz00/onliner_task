import {test} from '@playwright/test';
import {PageManager} from '../pages/PageManager';
import path from 'path';
import fs from 'fs';

const screenshotsDir = path.join(process.cwd(), 'test-results', 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
}

test.describe('Product and Cart Tests', () => {
    let pageManager;

    test.beforeEach(async ({page}) => {
        test.setTimeout(30000);
        pageManager = new PageManager(page);
        await pageManager.init();
    });

    test.afterEach(async ({page}, testInfo) => {
        if (testInfo.status === 'failed') {
            const screenshotPath = path.join(screenshotsDir, `${testInfo.title.replace(/\s+/g, '_')}_${Date.now()}.png`);
            await page.screenshot({ path: screenshotPath, fullPage: true });
            console.log(`Screenshot saved to: ${screenshotPath}`);
        }
        await pageManager.close();
    });

    test('Add product to cart and verify cart', async () => {
        const expectedProductName = 'Apple iPhone 13 128GB';

        await pageManager.mainPage.goto();
        await pageManager.mainPage.searchForProduct(expectedProductName);
        await pageManager.mainPage.expectProductInResults(expectedProductName);
        await pageManager.mainPage.selectProductWithMinPrice();

        await pageManager.productPage.expectProductName(expectedProductName);
        await pageManager.productPage.addToCart();
        await pageManager.productPage.navigateToCart();
        await pageManager.productPage.expectProductAddedBoxVisible();
    });

    test('Navigate to cart and verify product', async () => {
        const expectedProductName = 'Apple iPhone 13 128GB';

        await pageManager.mainPage.goto();
        await pageManager.mainPage.searchForProduct(expectedProductName);
        await pageManager.mainPage.expectProductInResults(expectedProductName);
        await pageManager.mainPage.selectProductWithMinPrice();
        
        await pageManager.productPage.addToCart();
        await pageManager.productPage.navigateToCart();

        await pageManager.cartPage.expectCartUrl();
        await pageManager.cartPage.expectProductInCart(expectedProductName);
    });
}); 