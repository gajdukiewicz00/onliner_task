import {expect} from "@playwright/test";

export class ProductPage {
    constructor(page) {
        const locators = {
            productName: page.locator('.catalog-masthead__title'),
            descriptionModule: page.locator('.catalog-masthead__description, .catalog-masthead__details, .catalog-masthead__subtitle, .catalog-masthead__content, .catalog-masthead__info'),
            addToCartButton: page.locator('.catalog-masthead__buy-button'),
            productAddedBox: page.locator('.catalog-masthead__buy-button'),
            cartCount: page.locator('.auth-bar__counter'),
            goToCartButton: page.locator('.auth-bar__cart'),
            continueShoppingButton: page.locator('.catalog-masthead__buy-button'),
            sortByPrice: page.locator('.catalog-masthead__buy-button'),
            productItems: page.locator('.catalog-masthead__buy-button')
        };

        this.goto = async () => {
            await page.goto('https://www.onliner.by/catalog/');
        };

        this.waitForPageLoad = async () => {
            // Wait for the main product container with a more reliable strategy
            await page.waitForSelector('.catalog-masthead', {
                state: 'visible',
                timeout: 10000
            });
            
            // Additional wait for dynamic content
            await page.waitForTimeout(1000);
        };

        this.expectProductName = async (expectedName) => {
            await this.waitForPageLoad();
            await expect(locators.productName).toContainText(expectedName);
        };

        this.expectDescriptionVisible = async () => {
            await this.waitForPageLoad();
            
            // Wait for any of the description elements with retry
            let isVisible = false;
            for (let i = 0; i < 3; i++) {
                isVisible = await page.evaluate(() => {
                    const selectors = [
                        '.catalog-masthead__description',
                        '.catalog-masthead__details',
                        '.catalog-masthead__subtitle',
                        '.catalog-masthead__content',
                        '.catalog-masthead__info'
                    ];
                    return selectors.some(selector => document.querySelector(selector) !== null);
                });
                
                if (isVisible) break;
                await page.waitForTimeout(1000);
            }
            
            expect(isVisible).toBeTruthy();
        };

        this.addToCart = async () => {
            await locators.addToCartButton.click();
        };

        this.expectProductAddedBoxVisible = async () => {
            await expect(locators.productAddedBox).toBeVisible();
        };

        this.expectCartCount = async (expectedCount) => {
            await expect(locators.cartCount).toHaveText(expectedCount);
        };

        this.goToCart = async () => {
            await locators.goToCartButton.click();
        };

        this.continueShopping = async () => {
            await locators.continueShoppingButton.click();
        };

        this.selectMinPriceProduct = async () => {
            await locators.sortByPrice.click();
            await locators.productItems.first().click();
        };
    }
} 