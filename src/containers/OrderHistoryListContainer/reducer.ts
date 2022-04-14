/*
 *
 * OrderHistoryListContainer reducer
 *
 */

import produce from 'immer';
import {
  REQUEST_ORDERS_ACTION,
  GET_ORDERS_LIST_ACTION,
  SET_ORDERS_BUTTON_ACTIONS_DATA,
  SET_SELECTED_BUTTON_ACTION_DATA,
  POPULATE_ORDERS_BUTTON_ACTIONS,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  errorMsg: '',
  orderList: [],
  ordersbuttonActions: [
    {
      data: [
        { id: 0, name: 'Pourboire livreur', isSelect: false },
        { id: 1, name: 'Recommander', isSelect: false },
        { id: 2, name: 'Réclamation', isSelect: false },
      ],
    },
  ],
  selectedActionButton: [],
};

/* eslint-disable default-case, no-param-reassign */
const orderHistoryListContainerReducer = produce((draft, action) => {
  switch (action.type) {
    case REQUEST_ORDERS_ACTION:
      draft.loading = true;
      draft.error = false;
      break;
    case GET_ORDERS_LIST_ACTION:
      draft.loading = false;
      draft.error = false;
      draft.orderList = action.list;
      break;
    case GET_ORDERS_LIST_ACTION:
      draft.loading = false;
      draft.error = true;
      draft.errorMsg = action.erorr;
      break;
    case POPULATE_ORDERS_BUTTON_ACTIONS:
      draft.loading = false;
      draft.error = false;
      let newArray = Array(action.total).fill(draft.ordersbuttonActions[0]);

      draft.ordersbuttonActions = newArray;
      break;
    case SET_ORDERS_BUTTON_ACTIONS_DATA:
      // console.log(draft.ordersbuttonActions[action.index]);
      draft.loading = false;
      draft.error = false;
      draft.ordersbuttonActions[action.index].data = action.data;
      break;
    case SET_SELECTED_BUTTON_ACTION_DATA:
      draft.loading = false;
      draft.error = false;
      draft.selectedActionButton[action.index] = action.selectedData;
      break;
  }
}, initialState);

export default orderHistoryListContainerReducer;
