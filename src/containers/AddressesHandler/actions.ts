/*
 *
 * AddressesHandler actions
 *
 */

import {
  GET_CITIES,
  GET_CITIES_SUCCESS,
  GET_CITIES_ERROR,
  //
  GET_ADDRESSES_LIST,
  GET_ADDRESSES_LIST_SUCCESS,
  GET_ADDRESSES_LIST_ERROR,
  //
  ADD_ADDRESS,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_ERROR,
  //
  UPDATE_ADDRESS,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_ERROR,
  //
  DELETE_ADDRESS,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_ERROR,
  //
  GET_CUSTOMER_GPS,
  GET_CUSTOMER_GPS_ERROR,
  GET_CUSTOMER_GPS_SUCCESS,

  //
  SET_PICKED_ADDRESS,
  SET_PICKUP_ADDRESS,
  SET_DESTINATIONS_ADDRESSES,
} from './constants';

export function getCitiesAction() {
  return { type: GET_CITIES };
}
export function getCitiesSuccessAction(cities: Array<object>) {
  return { type: GET_CITIES_SUCCESS, cities };
}
export function getCitiesErrorAction(error: object) {
  return { type: GET_CITIES_ERROR, error };
}

export function getAddressesListAction(payload: object) {
  return { type: GET_ADDRESSES_LIST, payload };
}
export function getAddressesListSuccessAction(addressesList: Array<object>) {
  return { type: GET_ADDRESSES_LIST_SUCCESS, addressesList };
}
export function getAddressesListErrorAction(error: object) {
  return { type: GET_ADDRESSES_LIST_ERROR, error };
}

export function addAddressAction(payload: object) {
  return { type: ADD_ADDRESS, payload };
}
export function addAddressSuccessAction(address: object) {
  return { type: ADD_ADDRESS_SUCCESS, address };
}
export function addAddressErrorAction(error: object) {
  return { type: ADD_ADDRESS_ERROR, error };
}

export function updateAddressAction(payload: object) {
  return { type: UPDATE_ADDRESS, payload };
}
export function updateAddressSuccessAction(address: object) {
  return { type: UPDATE_ADDRESS_SUCCESS, address };
}
export function updateAddressErrorAction(error: object) {
  return { type: UPDATE_ADDRESS_ERROR, error };
}


export function deleteAddressAction(payload: object) {
  return { type: DELETE_ADDRESS, payload };
}
export function deleteAddressSuccessAction(address: object) {
  return { type: DELETE_ADDRESS_SUCCESS, address };
}
export function deleteAddressErrorAction(error: object) {
  return { type: DELETE_ADDRESS_ERROR, error };
}

export function setPickedAddress(address: any) {
  return { type: SET_PICKED_ADDRESS, address };
}

export function getCustomerGPSAction() {
  return { type: GET_CUSTOMER_GPS };
}

export function getCustomerGPSSuccess(customerGPS: {
  latitude: number;
  longitude: number;
  cityId?: string;
  cityName?: string; 
  inZone: boolean;
  gpsActive: boolean;
  updated?: boolean;
}) {
  return { type: GET_CUSTOMER_GPS_SUCCESS, customerGPS };
}

export function setAddressPickup(
  address: any,
  isPickup: boolean,
  index?: number,
) {
  return {
    type: SET_PICKUP_ADDRESS,
    address,
    isPickup,
    index,
  };
}
export function setAddressDestinations(
  address: any,
  isPickup: boolean,
  index: number,
) {
  return {
    type: SET_DESTINATIONS_ADDRESSES,
    address,
    isPickup,
    index,
  };
}
