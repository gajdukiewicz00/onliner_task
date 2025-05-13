import {expect} from "@playwright/test";

export class ProductPage {
    constructor(page) {
        const locators = {
            productName: page.locator('.catalog-masthead__title'),
            addToCartButton: page.locator('(//a[contains(@class, \'product-aside__button_cart\') and contains(text(), \'В корзину\')])[1]'),
            productAddedBox: page.locator('.cart-form__offers-part_data .cart-form__description_base-alter.cart-form__description_font-weight_semibold .cart-form__link'),
        };

        this.goto = async () => {
            await page.goto('https://www.onliner.by/catalog/');
        };

        this.waitForPageLoad = async () => {
            await page.waitForSelector('.catalog-masthead', {
                state: 'visible',
                timeout: 10000
            });
            await page.waitForTimeout(1000);
        };

        this.expectProductName = async (expectedName) => {
            await this.waitForPageLoad();
            await expect(locators.productName).toContainText(expectedName);
        };

        this.addToCart = async () => {
            await locators.addToCartButton.click();
        };

        this.navigateToCart = async () => {
            await locators.addToCartButton.click();
        }

        this.expectProductAddedBoxVisible = async () => {
            await expect(locators.productAddedBox).toBeVisible();
        };
    }
} 