/*
 *
 * AddressesHandler constants
 *
 */

interface addressAPIPayload {
  customerId?: string;
  addressId?: string;
}

const scope = 'src/containers';

export const WEB_SERVICE = {
  GET_ADDRESSES_LIST: ({ customerId }: addressAPIPayload) =>
    `/${customerId}/address`,
  //
  ADD_ADDRESS: ({ customerId }: addressAPIPayload) => `/${customerId}/address`,
  //
  UPDATE_ADDRESS: ({ customerId, addressId }: addressAPIPayload) =>
    `/${customerId}/address/${addressId}`,
  DELETE_ADDRESS: ({ addressId }: addressAPIPayload) => `/address/${addressId}`,
  GET_CITIES: '/city/',
};

export const GET_CITIES = `${scope}/GET_CITIES`;
export const GET_CITIES_SUCCESS = `${scope}/GET_CITIES_SUCCESS`;
export const GET_CITIES_ERROR = `${scope}/GET_CITIES_ERROR`;

export const GET_ADDRESSES_LIST = `${scope}/GET_ADDRESSES_LIST`;
export const GET_ADDRESSES_LIST_SUCCESS = `${scope}/GET_ADDRESSES_LIST_SUCCESS`;
export const GET_ADDRESSES_LIST_ERROR = `${scope}/GET_ADDRESSES_LIST_ERROR`;

export const ADD_ADDRESS = `${scope}/ADD_ADDRESS`;
export const ADD_ADDRESS_SUCCESS = `${scope}/ADD_ADDRESS_SUCCESS`;
export const ADD_ADDRESS_ERROR = `${scope}/ADD_ADDRESS_ERROR`;

export const UPDATE_ADDRESS = `${scope}/UPDATE_ADDRESS`;
export const UPDATE_ADDRESS_SUCCESS = `${scope}/UPDATE_ADDRESS_SUCCESS`;
export const UPDATE_ADDRESS_ERROR = `${scope}/UPDATE_ADDRESS_ERROR`;

export const DELETE_ADDRESS = `${scope}/DELETE_ADDRESS`;
export const DELETE_ADDRESS_SUCCESS = `${scope}/DELETE_ADDRESS_SUCCESS`;
export const DELETE_ADDRESS_ERROR = `${scope}/DELETE_ADDRESS_ERROR`;

// export const SET_CUSTOMER_GPS = `${scope}/SET_CUSTOMER_GPS`;
export const GET_CUSTOMER_GPS = `${scope}/GET_CUSTOMER_GPS`;
export const GET_CUSTOMER_GPS_SUCCESS = `${scope}/GET_CUSTOMER_GPS_SUCCESS`;
export const GET_CUSTOMER_GPS_ERROR = `${scope}/GET_CUSTOMER_GPS_ERROR`;

export const SET_PICKED_ADDRESS = `${scope}/SET_PICKED_ADDRESS`;
export const SET_PICKUP_ADDRESS = `${scope}/SET_PICKUP_ADDRESS`;
export const SET_DESTINATIONS_ADDRESSES = `${scope}/SET_DESTINATIONS_ADDRESSES` ; 