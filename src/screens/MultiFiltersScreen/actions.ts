import {
  GET_MULTI_FILTERS_DATA,
  REQUEST_MULTI_FILTERS_DATA,
  DELETE,
} from './constants';

export function getMultiFilters(data: any) {
  return {
    type: GET_MULTI_FILTERS_DATA,
    filters: data,
  };
}

export function requestMultiFilters() {
  return {
    type: REQUEST_MULTI_FILTERS_DATA,
  };
}
export function deleteAll() {
  return {
    type: DELETE,
  };
}
