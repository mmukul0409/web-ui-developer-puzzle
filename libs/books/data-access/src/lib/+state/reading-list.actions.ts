import { Update } from '@ngrx/entity';
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
  props<{ book: Book }>()
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
  props<{ item: ReadingListItem }>()
);

export const MarkAsFinished = createAction(
  '[Reading List] Mark as Finished',
  props<{ item: ReadingListItem }>()
);

export const RemoveMarkAsFinished = createAction(
  '[Reading List] Remove Mark as Finished',
  props<{ item: ReadingListItem }>()
);

export const confirmedMarkAsFinished = createAction(
  '[Reading List] Confirmed  Mark as Finished',
  props<{ showSnackBar?: boolean }>()
);

export const confirmedRemoveMarkAsFinished = createAction(
  '[Reading List] Confirmed Remove Mark as Finished',
  props<{ showSnackBar: boolean }>()
);

export const failedMarkAsFinished = createAction(
  '[Reading List] Failed Mark as Finished',
  props<{ item: ReadingListItem }>()
);

export const failedRemoveMarkAsFinished = createAction(
  '[Reading List] Failed Remove Mark as Finished',
  props<{ item: ReadingListItem }>()
);

export const toggleShowSnackBar = createAction(
  '[Reading List] toggle show Snack Bar',
  props<{ status: boolean }>()
);

export const undoMarkAsFinished = createAction(
  '[Reading List] Undo Mark As Finished',
  props<{ item: ReadingListItem }>()
);

export const undoRemoveMarkAsFinished = createAction(
  '[Reading List] Undo Remove Mark As Finished',
  props<{ item: ReadingListItem }>()
);
