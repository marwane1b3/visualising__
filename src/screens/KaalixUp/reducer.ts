/*
 *
 * KaalixUp reducer
 *
 */

import produce from 'immer';
import { GET_USER_LOYALTY ,GET_USER_LOYALTY_SUCCESS,GET_USER_LOYALTY_FAIL} from './constants';

export const initialState = {
  userLoyalty:{},
  loading:false,
  error:false
};

/* eslint-disable default-case, no-param-reassign */
const kaalixUpReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_USER_LOYALTY:
      draft.loading = true;
      draft.error = false;
      break;
    case GET_USER_LOYALTY_SUCCESS:
      draft.loading = false;
      draft.userLoyalty = action?.data?.customer;
      break;
    case GET_USER_LOYALTY_FAIL:
      draft.loading = false;
      draft.error = action.error;
      break;
  }
}, initialState);

export default kaalixUpReducer;
