import { toggleAddSnackBar } from './../../../../data-access/src/lib/+state/reading-list.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  undoAddToReadingList,
  getShowAddSnackBar,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books$: Observable<ReadingListBook[]>;
  book: Book;

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.books$ = this.store.select(getAllBooks);

    this.store.select(getShowAddSnackBar).subscribe(addSnackbarStatus => {
      if (!addSnackbarStatus) return;

      let snackBarRef = this.snackBar.open(
        'Book is Added to Reading List',
        'Undo',
        {
          duration: 5000
        }
      );

      snackBarRef.afterDismissed().subscribe(() => {
        this.store.dispatch(toggleAddSnackBar({ status: false }));
      });

      snackBarRef.onAction().subscribe(() => {
        let readingListObj: ReadingListItem = {
          ...this.book,
          bookId: this.book.id
        };
        this.store.dispatch(undoAddToReadingList({ item: readingListObj }));
      });
    });
  }

  addBookToReadingList(book: Book) {
    this.book = book;
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
