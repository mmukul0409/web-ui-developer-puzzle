import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getReadingList,
  removeFromReadingList,
  updateMarkAsFinished,
  undoUpdateMarkAsFinished
} from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';

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
  }

  onFinishButtonClick(item: ReadingListItem) {
    this.store.dispatch(updateMarkAsFinished({ item }));

    let message = 'Marked Book as Finished';

    if (item.finished) {
      message = 'Removed Book as Finished';
    }

    let snackBarRef = this.snackBar.open(message, 'Undo', {
      duration: 5000
    });

    snackBarRef.onAction().subscribe(() => {
      item = {
        ...item,
        finished: !item.finished
      };
      this.store.dispatch(undoUpdateMarkAsFinished({ item }));
    });
  }
}
