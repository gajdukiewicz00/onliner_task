import {expect} from "@playwright/test";

export class MainPage {
    constructor(page) {
        const locators = {
            searchInput: page.locator('.fast-search__input'),
            searchFrame: page.frameLocator('.modal-iframe'),
            searchResultsContainer: () => locators.searchFrame.locator('.search__results'),
            searchResults: () => locators.searchFrame.locator('.product__title'),
        };

        this.goto = async () => {
            await page.goto('https://www.onliner.by/');
        };

        this.searchForProduct = async (productName) => {
            await locators.searchInput.fill(productName);
            await locators.searchResultsContainer().waitFor({state: 'visible', timeout: 15000});
        };

        this.expectProductInResults = async (expectedText) => {
            await expect(locators.searchResults()).toContainText(expectedText);
        };
    }
}