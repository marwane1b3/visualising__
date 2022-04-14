/*
 *
 * AuthProvider reducer
 *
 */

import produce from 'immer';
import { SET_TOKEN, DELETE_TOKEN, REHYDRATE_TOKEN } from './constants';

export const initialState = {
  token: false,
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const authProviderReducer = produce((draft, action) => {
  switch (action.type) {
    case REHYDRATE_TOKEN:
      draft.loading = true;
      break;
    case SET_TOKEN:
      draft.token = action.token;
      draft.loading = false;
      break;
    case DELETE_TOKEN:
      draft.token = false;
      break;
  }
}, initialState);

export default authProviderReducer;
