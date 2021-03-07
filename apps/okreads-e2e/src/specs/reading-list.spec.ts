import { expect } from 'chai';
import { $, browser, ExpectedConditions, $$, by } from 'protractor';

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

describe('When: I select the want to read button', () => {
  it('Then: I should able to see the snackbar and click on undo feature', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const bookItems = $$('[data-testing="book-item"]');

    const itemsCount = await bookItems.count();
    let selectedBookElement = 0;

    for (let i = 0; i < itemsCount; i) {
      const bookItem = await bookItems.get(i);
      const addBtn = await bookItem.$('button[ng-reflect-disabled="false"]');

      if (await addBtn.isPresent()) {
        await addBtn.click();
        selectedBookElement = i;
        i = itemsCount;
      }
    }

    await browser.sleep(2000);

    const submit = await browser.driver.findElement(
      by.css('.mat-simple-snackbar-action')
    );

    await submit.click();

    const bookItem = await bookItems.get(selectedBookElement);
    const addBtn = await bookItem.$$('button[ng-reflect-disabled="false"]');
    await browser.sleep(1000);
    expect(addBtn.length).to.be.greaterThan(0, 'Count Found');
  });
});
