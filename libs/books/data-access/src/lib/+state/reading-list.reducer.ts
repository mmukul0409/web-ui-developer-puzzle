import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as ReadingListActions from './reading-list.actions';
import { ReadingListItem } from '@tmo/shared/models';

export const READING_LIST_FEATURE_KEY = 'readingList';

export interface State extends EntityState<ReadingListItem> {
  loaded: boolean;
  error: null | string;
  showSnackBar: boolean;
}

export interface ReadingListPartialState {
  readonly [READING_LIST_FEATURE_KEY]: State;
}

export const readingListAdapter: EntityAdapter<ReadingListItem> = createEntityAdapter<
  ReadingListItem
>({
  selectId: item => item.bookId
});

export const initialState: State = readingListAdapter.getInitialState({
  loaded: false,
  error: null,
  showSnackBar: false
});

const readingListReducer = createReducer(
  initialState,
  on(ReadingListActions.loadReadingList, state => {
    return {
      ...state,
      loaded: false,
      error: null
    };
  }),
  on(ReadingListActions.loadReadingListSuccess, (state, action) => {
    return readingListAdapter.setAll(action.list, {
      ...state,
      loaded: true
    });
  }),
  on(ReadingListActions.loadReadingListError, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(ReadingListActions.MarkAsFinished, (state, action) => {
    const updatedItem = {
      id: action.item.bookId,
      changes: {
        ...action.item
      }
    };
    return readingListAdapter.updateOne(updatedItem, state);
  }),
  on(ReadingListActions.confirmedMarkAsFinished, (state, action) => {
    return {
      ...state,
      showSnackBar: action.showSnackBar
    };
  }),
  on(ReadingListActions.failedMarkAsFinished, (state, action) => {
    const updatedItem = {
      id: action.item.bookId,
      changes: {
        ...action.item,
        finished: false,
        finishedDate: null
      }
    };
    return readingListAdapter.updateOne(updatedItem, state);
  }),

  on(ReadingListActions.RemoveMarkAsFinished, (state, action) => {
    const updatedItem = {
      id: action.item.bookId,
      changes: {
        ...action.item
      }
    };
    return readingListAdapter.updateOne(updatedItem, state);
  }),
  on(ReadingListActions.confirmedRemoveMarkAsFinished, (state, action) => {
    return {
      ...state,
      showSnackBar: action.showSnackBar
    };
  }),
  on(ReadingListActions.failedRemoveMarkAsFinished, (state, action) => {
    const updatedItem = {
      id: action.item.bookId,
      changes: {
        ...action.item,
        finished: true,
        finishedDate: new Date().toISOString()
      }
    };
    return readingListAdapter.updateOne(updatedItem, state);
  }),
  on(ReadingListActions.addToReadingList, (state, action) =>
    readingListAdapter.addOne({ bookId: action.book.id, ...action.book }, state)
  ),
  on(ReadingListActions.removeFromReadingList, (state, action) =>
    readingListAdapter.removeOne(action.item.bookId, state)
  ),
  on(ReadingListActions.failedAddToReadingList, (state, action) =>
    readingListAdapter.removeOne(action.book.id, state)
  ),
  on(ReadingListActions.failedRemoveFromReadingList, (state, action) =>
    readingListAdapter.addOne(action.item, state)
  ),
  on(ReadingListActions.undoMarkAsFinished, (state, action) => {
    const updatedItem = {
      id: action.item.bookId,
      changes: {
        ...action.item
      }
    };
    return readingListAdapter.updateOne(updatedItem, state);
  }),
  on(ReadingListActions.undoRemoveMarkAsFinished, (state, action) => {
    const updatedItem = {
      id: action.item.bookId,
      changes: {
        ...action.item
      }
    };
    return readingListAdapter.updateOne(updatedItem, state);
  }),
  on(ReadingListActions.toggleShowSnackBar, (state, action) => {
    return {
      ...state,
      showSnackBar: action.status
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return readingListReducer(state, action);
}
