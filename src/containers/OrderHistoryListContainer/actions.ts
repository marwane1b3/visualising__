/*
 *
 * OrderHistoryListContainer actions
 *
 */

import {
  REQUEST_ORDERS_ACTION,
  GET_ORDERS_LIST_ACTION,
  GET_ORDERS_LIST_FAIL_ACTION,
  SET_ORDERS_BUTTON_ACTIONS_DATA,
  SET_SELECTED_BUTTON_ACTION_DATA,
  POPULATE_ORDERS_BUTTON_ACTIONS,
  SET_ORDERS_HISTORY_DATA,
} from './constants';

export function getOrdersListAction(list: []) {
  return {
    type: GET_ORDERS_LIST_ACTION,
    list,
  };
}

export function getOrdersListFailAction(error: string) {
  return {
    type: GET_ORDERS_LIST_FAIL_ACTION,
    error,
  };
}
export function requestOrdersAction() {
  return {
    type: REQUEST_ORDERS_ACTION,
  };
}
export function populateOrderButtons(total: number) {
  return {
    type: POPULATE_ORDERS_BUTTON_ACTIONS,

    total,
  };
}
export function setOrdersButtonActionsData(data: any, index: number) {
  return {
    type: SET_ORDERS_BUTTON_ACTIONS_DATA,
    data,
    index,
  };
}
export function setSelectedButtonActionData(selectedData: any, index: number) {
  return {
    type: SET_SELECTED_BUTTON_ACTION_DATA,
    selectedData,
    index,
  };
}

export function setOrderHistoryData(data: []) {
  return {
    type: SET_ORDERS_HISTORY_DATA,
    data,
  };
}
