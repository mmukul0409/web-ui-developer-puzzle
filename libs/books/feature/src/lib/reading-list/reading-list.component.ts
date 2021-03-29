import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getReadingList,
  getShowRemoveSnackBar,
  removeFromReadingList,
  toggleRemoveSnackBar,
  undoRemoveFromReadingList
} from '@tmo/books/data-access';
import { ReadingListItem, Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit {
  readingList$ = this.store.select(getReadingList);
  item: ReadingListItem;

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.store.select(getShowRemoveSnackBar).subscribe(removeSnackBarStatus => {
      if (!removeSnackBarStatus) return;
      let snackBarRef = this.snackBar.open(
        'Book is removed from reading list',
        'Undo',
        {
          duration: 5000
        }
      );

      snackBarRef.afterDismissed().subscribe(() => {
        this.store.dispatch(toggleRemoveSnackBar({ status: false }));
      });

      snackBarRef.onAction().subscribe(() => {
        let book: Book = {
          ...this.item,
          id: this.item.bookId
        };
        this.store.dispatch(undoRemoveFromReadingList({ book }));
      });
    });
  }

  removeFromReadingList(item: ReadingListItem) {
    this.item = item;
    this.store.dispatch(removeFromReadingList({ item }));
  }
}
