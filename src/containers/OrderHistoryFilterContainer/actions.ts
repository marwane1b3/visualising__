/*
 *
 * OrderHistoryFilterContainer actions
 *
 */

import {
  DEFAULT_ACTION,
  REQUEST_DATA,
  SET_DATA,
  SET_SELECTED_DATA,
} from './constants';

export function requestData() {
  return {
    type: REQUEST_DATA,
  };
}

export function setData(data: any) {
  return {
    type: SET_DATA,
    data,
  };
}
export function setSelectedData(selectedData: any) {
  return {
    type: SET_SELECTED_DATA,
    selectedData,
  };
}
