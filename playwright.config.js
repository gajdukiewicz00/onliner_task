// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
    timeout: 60_000,
    // Показывать тесты в понятном виде и HTML-отчет
    reporter: [
        ['list'],
        ['html', { open: 'never' }]  // после прогона зайдите в playwright-report/index.html
    ],
    use: {
        headless: false,                 // чтобы видеть, что происходит в браузере
        screenshot: 'only-on-failure',   // скриншот упавшего шага
        video: 'retain-on-failure',      // видео прогона упавшего теста
        trace: 'retain-on-failure',      // трейсы всех запросов/дерева компонентов
    },
});
