/*
 *
 * OrderHistoryFilterContainer reducer
 *
 */

import produce from 'immer';
import {
  DEFAULT_ACTION,
  REQUEST_DATA,
  SET_DATA,
  SET_SELECTED_DATA,
} from './constants';

export const initialState = {
  data: [],
  selectedData: [],
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const orderHistoryFilterContainerReducer = produce((draft, action) => {
  switch (action.type) {
    case REQUEST_DATA:
      draft.loading = true;
      draft.error = false;
      break;
    case SET_DATA:
      draft.data = action.data;
      draft.loading = false;
      draft.error = false;
      break;
    case SET_SELECTED_DATA:
      draft.selectedData = action.selectedData;
      draft.loading = false;
      draft.error = false;
      break;
  }
}, initialState);

export default orderHistoryFilterContainerReducer;
