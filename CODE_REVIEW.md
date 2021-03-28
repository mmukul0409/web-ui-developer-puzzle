## Code

1. Child Router Module is removed in books-feature.module.ts because root router is not used in the application.

2. Removed the subscribe for books\$ in book-search.component.ts for getting books and used async pipe.

3. Changed formatDate function to Date pipe with time zone and locale in book-search.component.ts

4. In books.actions.ts file, changed the error parameter datatype from any to string.

5. In total-count.component.ts file, removed the empty unimplemented ngOnInit Method and its interface.

6. In reading-list.reducer.ts file, the actions used should be 'confirmedAddToReadingList' and 'confirmedRemoveFromReadingList' instead of 'addToReadingList' and 'removeFromReadingList' actions.

7. In book-search.component.spec.ts file, renamed the text mentioned in describe method from 'ProductsListComponent' to 'BookSearchComponent'.

8. In reading-list.component.ts file, removed Implicit type like any in method parameter item and assigned type ReadingListItem.

9. Added Alt Tags and Title Tags for the img tags where ever needed.

## Accessibility

Implemented aria-label for all the buttons that don't have it.

### Contrast

1. Reading List Button changed the background color to #ad2352
2. P Tag changed the background color and also the text color for the accessibility check
3. Checked in the Chrome Lighthouse so that accessibility is 100%

## Test

Fixed all the test cases and made sure that all test cases are passed.
