import {test, expect} from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru widget ', () => {
    let widgetPage: WidgetPage;

    test.beforeEach(async ({page}) => {
        widgetPage = new WidgetPage(page);
        await page.goto('/');
        const openWidgetButton = widgetPage.getOpenWidgetButton();
        try {
            await openWidgetButton.waitFor({state: 'attached', timeout: 20000});
        } catch (e) {
            await page.reload();
            await openWidgetButton.waitFor({state: 'attached', timeout: 20000});
        }
    });


    test('shows popular articles', async () => {
        await widgetPage.openWidget();
        await expect(widgetPage.getPopularArticlesTitle()).toHaveText(/Популярные статьи/);
        const articles = await widgetPage.getPopularArticles();
        expect(articles.length).toBeGreaterThan(0);
        await expect(articles[0]).toBeVisible();
    });

    test('has correct title', async ({page}) => {
        await widgetPage.openWidget();
        await widgetPage.getPopularArticle(0).click();
        await widgetPage.clickWriteToUs();
        await expect(widgetPage.getTitle()).toHaveText(/Связь с поддержкой/);
    });

    test('opens', async ({page}) => {
        await widgetPage.openWidget();
        await expect(widgetPage.getWidgetBody()).toBeVisible()
    });
});
