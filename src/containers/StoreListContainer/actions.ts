/*
 *
 * StoresListContainer actions
 *
 */

import {
  GET_STORES_ACTION,
  GET_STORES_ERROR_ACTION,
  GET_STORES_SUCCESS_ACTION,
  SELECT_ID,
} from './constants';

export function getStoresAction(serviceId: string) {
  return {
    type: GET_STORES_ACTION,
    serviceId: serviceId,
  };
}

export function getStoresSuccessAction(response: { stores?: Array<object> }) {
  return {
    type: GET_STORES_SUCCESS_ACTION,
    stores: response.stores,
  };
}
export function getStoresErrorAction(error: string) {
  return {
    type: GET_STORES_ERROR_ACTION,
    error: error,
  };
}
export function getId(id: any) {
  return {
    type: SELECT_ID,
    id,
  };
}
