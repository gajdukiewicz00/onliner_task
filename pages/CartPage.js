import {expect} from "@playwright/test";

export class CartPage {
    constructor(page) {

        const locators = {
            cartProducts: page.locator('.cart-form__offers-part_data .cart-form__description_base-alter.cart-form__description_font-weight_semibold .cart-form__link'),
            cartUrl: page.url()
        };

        this.goto = async () => {
            await page.goto('https://www.onliner.by/cart');
        };

        this.expectProductInCart = async () => {
            await expect(locators.cartProducts).toBeVisible();
        };

        this.expectCartUrl = async () => {
            await expect(page).toHaveURL(/.*\/cart/);
        };
    }
} 