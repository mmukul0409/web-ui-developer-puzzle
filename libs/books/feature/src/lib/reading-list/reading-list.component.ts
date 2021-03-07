import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getReadingList,
  removeFromReadingList,
  undoRemoveFromReadingList
} from '@tmo/books/data-access';
import { ReadingListItem, Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));

    let snackBarRef = this.snackBar.open(
      'Book is removed from reading list',
      'Undo',
      {
        duration: 5000
      }
    );

    snackBarRef.onAction().subscribe(() => {
      let book: Book = {
        ...item,
        id: item.bookId
      };
      this.store.dispatch(undoRemoveFromReadingList({ book }));
    });
  }
}
