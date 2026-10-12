import {Locator, Page} from "@playwright/test";

enum WidgetPageSelectors {
    WRAPPER = '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT = 'header h5',
    BUTTON_OPEN = '[data-test=openWidget]',
    BUTTON_WRITE_TO_US = '[data-test=button_feedback_form]',
    ARTICLE_POPULAR_TITLE = '[class^=popularTitle__]',
    ARTICLE_POPULAR_LIST = `${ARTICLE_POPULAR_TITLE} + ul[class^=articles__]`,
    ARTICLE_POPULAR_LIST_ITEM = `${ARTICLE_POPULAR_LIST} > li`,
}

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper() {
        return this.page.locator(WidgetPage.selector.WRAPPER)
    }

    getOpenWidgetButton(): Locator {
        return this.page.locator(WidgetPage.selector.BUTTON_OPEN)
    }

    async openWidget() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_OPEN).click();
    }

    async getPopularArticles() {
        return this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM).all()
    }

    getPopularArticle(index: number): Locator {
        return this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM).nth(index)
    }

    getPopularArticlesTitle(): Locator {
        return this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_TITLE)
    }

    async clickWriteToUs() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US).click();
    }

    getTitle(): Locator {
        return this.wrapper().locator(WidgetPage.selector.HEADER_TEXT)
    }

    getWidgetBody(): Locator {
        return this.page.locator(WidgetPage.selector.WIDGET_BODY)
    }
}
