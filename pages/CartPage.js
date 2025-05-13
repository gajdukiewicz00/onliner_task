import {expect} from "@playwright/test";

export class CartPage {
    constructor(page) {
        const locators = {
            cartProducts: page.locator('[data-testid="cart-product"]'),
            cartUrl: page.url()
        };

        this.goto = async () => {
            await page.goto('https://www.onliner.by/cart');
        };

        this.expectProductInCart = async (productName) => {
            await expect(locators.cartProducts).toContainText(productName);
        };

        this.expectCartUrl = async () => {
            await expect(page).toHaveURL(/.*\/cart/);
        };
    }
} 