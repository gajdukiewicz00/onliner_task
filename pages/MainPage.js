import {expect} from "@playwright/test";

export class MainPage {
    constructor(page) {
        const locators = {
            searchInput: page.locator('.fast-search__input'),
            searchFrame: page.frameLocator('.modal-iframe'),
            searchResultsContainer: () => locators.searchFrame.locator('.search__results'),
            searchResults: () => locators.searchFrame.locator('.product__title'),
            productPrice: () => locators.searchFrame.locator('.product__price-value'),
            productLink: () => locators.searchFrame.locator('.product__title a')
        };

        this.goto = async () => {
            await page.goto('https://www.onliner.by/');
        };

        this.searchForProduct = async (productName) => {
            await locators.searchInput.fill(productName);
            await locators.searchResultsContainer().waitFor({state: 'visible', timeout: 15000});
        };

        this.expectProductInResults = async (expectedText) => {
            const results = await locators.searchResults().all();
            const hasProduct = await Promise.all(
                results.map(result => result.textContent())
            ).then(texts => texts.some(text => text.includes(expectedText)));
            
            expect(hasProduct).toBeTruthy();
        };

        this.selectProductWithMinPrice = async () => {
            // Get all product prices
            const prices = await locators.productPrice().allTextContents();
            const numericPrices = prices.map(price => parseFloat(price.replace(/[^\d.]/g, '')));
            
            // Find index of minimum price
            const minPriceIndex = numericPrices.indexOf(Math.min(...numericPrices));
            
            // Get the product link and click it
            const productLink = locators.productLink().nth(minPriceIndex);
            const href = await productLink.getAttribute('href');
            
            // Ensure we're going to the main product page, not reviews
            const mainProductUrl = href.replace('/reviews', '');
            
            // Navigate to the product page with a more reliable strategy
            await page.goto(mainProductUrl, {
                waitUntil: 'domcontentloaded',
                timeout: 30000
            });
            
            // Wait for the main content to be visible
            await page.waitForSelector('.catalog-masthead', {
                state: 'visible',
                timeout: 10000
            });
        };
    }
}