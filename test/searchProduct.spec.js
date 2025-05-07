import { test, expect } from '@playwright/test';

test.describe('Fast search on onliner.by', () => {
    const productName = 'Смартфон Samsung Galaxy A52 SM-A525F/DS 4GB/128GB (черный)';

    test('should search via fast-search and open product page', async ({ page }) => {
        await page.goto('https://www.onliner.by/');
        
        const searchInput = page.locator('.fast-search__input');

        await searchInput.fill(productName);
        
        const searchFrame = page.frameLocator('.modal-iframe');
        
        await searchFrame.locator('.search__results').waitFor({ state: 'visible', timeout: 15_000 });
        
        const productList = searchFrame.locator('.product__title');

        await expect(productList).toContainText('Телефон Samsung Galaxy A52 SM-A525F/DS 4GB/128GB (черный)');
    });
});
