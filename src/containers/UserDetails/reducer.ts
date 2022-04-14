/*
 *
 * UserDetails reducer
 *
 */

import produce from 'immer';
import {
  SET_USER_DETAILS,
  CLEAR_USER_DETAILS,
  //
  GET_USER_DETAILS,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_ERROR,
} from './constants';

export const initialState = {
  userDetails: {},
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const userDetailsReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      draft.userDetails = action.userDetails;
      break;
    case CLEAR_USER_DETAILS:
      draft.userDetails = {};
      break;

    case GET_USER_DETAILS:
      draft.loading = true;
      draft.error = false;
      break;
    case GET_USER_DETAILS_SUCCESS:
      draft.loading = false;
      draft.userDetails = action?.data?.user;
      break;
    case GET_USER_DETAILS_ERROR:
      draft.loading = false;
      draft.error = action.error;
      break;
  }
}, initialState);

export default userDetailsReducer;
