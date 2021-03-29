import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';
import * as ReadingListActions from './reading-list.actions';
import { HttpClient } from '@angular/common/http';
import { ReadingListItem } from '@tmo/shared/models';
import { map } from 'rxjs/operators';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.loadReadingList),
      fetch({
        run: () => {
          return this.http
            .get<ReadingListItem[]>('/api/reading-list')
            .pipe(
              map(data =>
                ReadingListActions.loadReadingListSuccess({ list: data })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ReadingListActions.loadReadingListError({ error });
        }
      })
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      optimisticUpdate({
        run: ({ book }) => {
          return this.http.post('/api/reading-list', book).pipe(
            map(() =>
              ReadingListActions.confirmedAddToReadingList({
                book
              })
            )
          );
        },
        undoAction: ({ book }) => {
          return ReadingListActions.failedAddToReadingList({
            book
          });
        }
      })
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      optimisticUpdate({
        run: ({ item }) => {
          return this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
            map(() =>
              ReadingListActions.confirmedRemoveFromReadingList({
                item
              })
            )
          );
        },
        undoAction: ({ item }) => {
          return ReadingListActions.failedRemoveFromReadingList({
            item
          });
        }
      })
    )
  );

  markAsFinished$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.MarkAsFinished),
      optimisticUpdate({
        run: ({ item }) => {
          return this.http
            .put(`/api/reading-list/${item.bookId}/finished`, item)
            .pipe(
              map(() => {
                return ReadingListActions.confirmedMarkAsFinished({
                  showSnackBar: true
                });
              })
            );
        },
        undoAction: ({ item }) => {
          return ReadingListActions.failedMarkAsFinished({
            item
          });
        }
      })
    )
  );

  removeMarkAsFinished$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.RemoveMarkAsFinished),
      optimisticUpdate({
        run: ({ item }) => {
          return this.http
            .put(`/api/reading-list/${item.bookId}/finished`, item)
            .pipe(
              map(() => {
                return ReadingListActions.confirmedRemoveMarkAsFinished({
                  showSnackBar: true
                });
              })
            );
        },
        undoAction: ({ item }) => {
          return ReadingListActions.failedRemoveMarkAsFinished({
            item
          });
        }
      })
    )
  );

  undoMarkAsFinished$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.undoMarkAsFinished),
      optimisticUpdate({
        run: ({ item }) => {
          return this.http
            .put(`/api/reading-list/${item.bookId}/finished`, item)
            .pipe(
              map(() => {
                return ReadingListActions.confirmedRemoveMarkAsFinished({
                  showSnackBar: false
                });
              })
            );
        },
        undoAction: ({ item }) => {
          return ReadingListActions.failedRemoveMarkAsFinished({
            item
          });
        }
      })
    )
  );
  undoRemoveMarkAsFinished$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.undoRemoveMarkAsFinished),
      optimisticUpdate({
        run: ({ item }) => {
          return this.http
            .put(`/api/reading-list/${item.bookId}/finished`, item)
            .pipe(
              map(() => {
                return ReadingListActions.confirmedMarkAsFinished({
                  showSnackBar: false
                });
              })
            );
        },
        undoAction: ({ item }) => {
          return ReadingListActions.failedMarkAsFinished({
            item
          });
        }
      })
    )
  );

  ngrxOnInitEffects() {
    return ReadingListActions.loadReadingList();
  }

  constructor(private actions$: Actions, private http: HttpClient) {}
}
