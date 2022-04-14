/*
 *
 * AddressesHandler reducer
 *
 */

import produce from 'immer';
import { date, object } from 'yup/lib/locale';
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
  DELETE_ADDRESS_ERROR,
  DELETE_ADDRESS_SUCCESS,
  //
  GET_CUSTOMER_GPS_SUCCESS,
  SET_PICKED_ADDRESS,
  SET_PICKUP_ADDRESS,
  SET_DESTINATIONS_ADDRESSES,
} from './constants';

export const initialState = {
  addressesList: [],
  loading: false,
  error: false,
  shippingAddress: false,
  cities: [],
  customerGPS: {
    latitude: -1,
    longitude: -1,
    inZone: false,
    gpsActive: false,
    updated: false,
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  pickedAddress: null,
  destinationAddresses: [
    {
      data: {
        address: 'Some Address for Destination',
        location: [0, 0],
        details: 'pres du marché',
      },
      // index: 0,
    },
  ],
};

/* eslint-disable default-case, no-param-reassign */
const addressesHandlerReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_CITIES:
    case GET_ADDRESSES_LIST:
    case ADD_ADDRESS:
    case UPDATE_ADDRESS:
    case DELETE_ADDRESS:
      draft.loading = true;
      draft.error = false;
      break;
    case GET_CITIES_ERROR:
    case GET_ADDRESSES_LIST_ERROR:
    case ADD_ADDRESS_ERROR:
    case UPDATE_ADDRESS_ERROR:
    case DELETE_ADDRESS_ERROR:
      draft.loading = false;
      draft.error = action.error;
      break;

    case GET_ADDRESSES_LIST_SUCCESS:
      draft.addressesList = action.addressesList;
      draft.loading = false;
      break;
    //
    case ADD_ADDRESS_SUCCESS:
      draft.addressesList = [...draft.addressesList, action.address];
      draft.pickedAddress = action.address;
      draft.loading = false;
      break;
    //
    case UPDATE_ADDRESS_SUCCESS:
      draft.addressesList = [
        action.address,
        ...draft.addressesList.filter(
          (address: any) => address._id != action.address._id,
        ),
      ];
      draft.loading = false;
      break;
    case DELETE_ADDRESS_SUCCESS:
      draft.addressesList = draft.addressesList.filter(
        (address: any) => address._id != action.address._id,
      );
      draft.loading = false;
      break;
    case GET_CITIES_SUCCESS:
      draft.cities = action.cities;
      draft.loading = false;
      break;

    case GET_CUSTOMER_GPS_SUCCESS:
      draft.customerGPS = {
        updatedAt: new Date(),
        ...action.customerGPS,
      };
      draft.pickedAddress = {
        address: 'Position Actuelle',
        cityId: action.customerGPS.cityId,
        cityName: action.customerGPS.cityName,
        createdAt: action.customerGPS.createdAt,
        updatedAt: action.customerGPS.updatedAt,
        details: '',
        label: '',
        latitudeDelta: 0,
        longitudeDelta: 0,
        picked: true,
        location: [action.customerGPS.latitude, action.customerGPS.longitude],
        type: 'home',
        fromGPS: true,
      };
      break;

    case SET_PICKED_ADDRESS:
      draft.pickedAddress = action.address;
      break;
    case SET_PICKUP_ADDRESS:
      draft.pickedAddress.address = action.address;
      break;
    case SET_DESTINATIONS_ADDRESSES:
      console.log('from addressHandlerReducer : ', action.index);
      //draft.destinationAddresses[action.index].data.address = action.address;

      draft.destinationAddresses[action.index] = action.address;
      break;
  }
}, initialState);

export default addressesHandlerReducer;
