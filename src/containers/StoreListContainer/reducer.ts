/*
 *
 * StoresListContainer reducer
 *
 */

import produce from 'immer';
import {
  GET_STORES_ACTION,
  GET_STORES_SUCCESS_ACTION,
  GET_STORES_ERROR_ACTION,
  SELECT_ID,
} from './constants';

export const initialState = {
  error: false,
  loading: false,
  stores: [],
  id: '',
};

/* eslint-disable default-case, no-param-reassign */
const storesListContainerReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_STORES_ACTION:
      draft.loading = true;
      draft.error = false;
      break;
    case GET_STORES_SUCCESS_ACTION:
      draft.loading = false;
      draft.error = false;
      draft.stores = action.stores;
      break;
    case SELECT_ID:
      draft.id = action.id;
      break;
    case GET_STORES_ERROR_ACTION:
      draft.loading = false;
      draft.error = action.error;
      break;
  }
}, initialState);

export default storesListContainerReducer;
