/*
 *
 * CardManagerScreen reducer
 *
 */

import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_CARDS,
  GET_CARDS_ERROR,
  GET_CARDS_SUCCESS,
} from './constants';

export const initialState = {
  customerId: null,
  cardList: null,
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const cardManagerScreenReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_CARDS:
      draft.cardList = null;
      draft.customerId = action.data.customerId;
      draft.loading = true;
      draft.error = false;
      break;
    case GET_CARDS_SUCCESS:
      draft.cardList = action.data;
      draft.loading = false;
      draft.error = false;
      break;
    case GET_CARDS_ERROR:
      draft.cardList = null;
      draft.loading = false;
      draft.error = true;
      break;
    case DEFAULT_ACTION:
      break;
  }
}, initialState);

export default cardManagerScreenReducer;
