import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';

export const loadReadingList = createAction('[Reading List] Load list');

export const loadReadingListSuccess = createAction(
  '[Reading List] Load list success',
  props<{ list: ReadingListItem[] }>()
);
export const loadReadingListError = createAction(
  '[Reading List] Load list error',
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  '[Reading List] Add to list',
  props<{ book: Book }>()
);

export const failedAddToReadingList = createAction(
  '[Reading List] Failed add to list',
  props<{ book: Book }>()
);

export const confirmedAddToReadingList = createAction(
  '[Reading List] Confirmed add to list',
  props<{ book: Book; showAddSnackBar?: boolean }>()
);

export const removeFromReadingList = createAction(
  '[Reading List] Remove from list',
  props<{ item: ReadingListItem }>()
);

export const failedRemoveFromReadingList = createAction(
  '[Reading List] Failed remove from list',
  props<{ item: ReadingListItem }>()
);

export const confirmedRemoveFromReadingList = createAction(
  '[Reading List] Confirmed remove from list',
  props<{ item: ReadingListItem; showRemoveSnackBar?: boolean }>()
);

export const undoAddToReadingList = createAction(
  '[Reading List] Undo Add to list',
  props<{ item: ReadingListItem }>()
);

export const undoRemoveFromReadingList = createAction(
  '[Reading List] Undo Remove from list',
  props<{ book: Book }>()
);

export const toggleAddSnackBar = createAction(
  '[Reading List] Toggle add  snackbar',
  props<{ status: boolean }>()
);

export const toggleRemoveSnackBar = createAction(
  '[Reading List] Toggle  remove snackbar',
  props<{ status: boolean }>()
);
