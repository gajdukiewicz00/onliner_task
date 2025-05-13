import {MainPage} from './MainPage';
import {ProductPage} from './ProductPage';
import {CartPage} from './CartPage';

export class PageManager {
    constructor(page) {
        this.page = page;
        this.mainPage = new MainPage(page);
        this.productPage = new ProductPage(page);
        this.cartPage = new CartPage(page);
    }

    async init() {
        await this.page.setViewportSize({
            width: 1920,
            height: 1080
        });
        
        await this.page.evaluate(() => {
            window.moveTo(0, 0);
            window.resizeTo(
                window.screen.availWidth,
                window.screen.availHeight
            );
        });
    }

    async close() {
        await this.page.close();
    }
} 