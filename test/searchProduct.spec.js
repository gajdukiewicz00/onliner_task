import { test } from '@playwright/test';
import { MainPage } from '../pages/MainPage.js';

test.describe('Fast search on onliner.by', () => {
    const productName = 'Смартфон Samsung Galaxy A52 SM-A525F/DS 4GB/128GB (черный)';
    const expectedText = 'Телефон Samsung Galaxy A52 SM-A525F/DS 4GB/128GB (черный)';

    test('should search via fast-search and open product page', async ({ page }) => {
        const mainPage = new MainPage(page);

        await mainPage.goto();
        await mainPage.searchForProduct(productName);
        await mainPage.expectProductInResults(expectedText);
    });
});