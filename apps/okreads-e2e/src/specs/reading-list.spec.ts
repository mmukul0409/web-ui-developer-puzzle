import { $, browser, ExpectedConditions, $$ } from 'protractor';

describe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });
});

describe('When: I mark the Reading List as finished', () => {
  it('Then: I should mark the reading list as finished', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const bookItems = $$('[data-testing="book-item"]');
    const itemsCount = await $$('[data-testing="book-item"]').count();
    console.log(itemsCount);

    for (let i = 0; i < itemsCount; i++) {
      const bookItem = await bookItems.get(i);
      const addBtn = await bookItem.$('button[ng-reflect-disabled="false"]');

      if (await addBtn.isPresent()) {
        await addBtn.click();
        i = itemsCount;
      }
    }

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    const readingListItems = $$('[data-testing="reading-list-item"]');
    const readingListItem = await readingListItems.get(0);
    const finishBtn = await readingListItem.$(
      'mat-slide-toggle[data-testing="finish-book-toggle"]'
    );
    await finishBtn.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="finish-label"]'),
        'Finished'
      )
    );
  });
});
