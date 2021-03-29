import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getReadingList,
  removeFromReadingList,
  RemoveMarkAsFinished,
  undoMarkAsFinished,
  undoRemoveMarkAsFinished,
  getShowSnackBar,
  MarkAsFinished,
  toggleShowSnackBar
} from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { ReturnStatement } from '@angular/compiler';

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
    this.store.select(getShowSnackBar).subscribe(showSnackBar => {
      if (!showSnackBar) return;

      let message = this.item.finished
        ? 'Marked Book as Finished'
        : 'Removed Book as Finished';

      let snackBarRef = this.snackBar.open(message, 'Undo', {
        duration: 5000
      });

      snackBarRef.afterDismissed().subscribe(() => {
        this.store.dispatch(toggleShowSnackBar({ status: false }));
      });

      snackBarRef.onAction().subscribe(() => {
        if (this.item.finished) {
          const item = {
            ...this.item,
            finished: false,
            finishedDate: null
          };
          this.store.dispatch(undoMarkAsFinished({ item }));
        } else {
          const item = {
            ...this.item,
            finished: true,
            finishedDate: new Date().toISOString()
          };
          this.store.dispatch(undoRemoveMarkAsFinished({ item }));
        }
      });
    });
  }

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  onFinishButtonClick(item: ReadingListItem) {
    if (item.finished) {
      const itemData = {
        ...item,
        finished: false,
        finishedDate: null
      };
      this.item = itemData;
      //call remove mark as finished
      this.store.dispatch(RemoveMarkAsFinished({ item: itemData }));
    } else {
      const itemData = {
        ...item,
        finished: true,
        finishedDate: new Date().toISOString()
      };
      this.item = itemData;
      this.store.dispatch(MarkAsFinished({ item: itemData }));
    }
  }
}
