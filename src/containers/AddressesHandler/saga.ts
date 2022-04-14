import { makeSelectUserDetailsData } from 'containers/UserDetails/selectors';
import { Platform } from 'react-native';
import { AnyAction } from 'redux';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { MICROSERVICE_BASE_URL, request } from 'utils';

import {
  WEB_SERVICE,
  //
  GET_ADDRESSES_LIST,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  GET_CITIES,
  GET_CUSTOMER_GPS,
} from './constants';

import {
  getCitiesSuccessAction,
  getCitiesErrorAction,
  //
  getAddressesListSuccessAction,
  getAddressesListErrorAction,
  //
  addAddressSuccessAction,
  addAddressErrorAction,
  //
  updateAddressSuccessAction,
  updateAddressErrorAction,
  //
  deleteAddressSuccessAction,
  deleteAddressErrorAction,
  //
  getCustomerGPSSuccess,
  getCustomerGPSAction,
} from './actions';

import {
  GET_POSITION_RESPONSES,
  getGPSPosition,
  checkAddressInZone,
  askForGpsEnableAndroid,
  askForGpsEnableIOS,
  requestAuthorisation,
} from './LocationHelper';
import { makeSelectCities } from './selectors';

export function* getAddressesList({ payload }: AnyAction) {
  try {
    const { customerId } = payload;

    const response: { addresses: object[] } = yield call(async () => {
      const { data } = await request
        .microservice(MICROSERVICE_BASE_URL.CUSTOMER)
        .get(WEB_SERVICE.GET_ADDRESSES_LIST({ customerId }));
      return data;
    });
    yield put(getAddressesListSuccessAction(response?.addresses));
  } catch (error) {
    console.log({ error });
    yield put(getAddressesListErrorAction(error));
  }
}

//
export function* addAddress({ payload }: AnyAction) {
  try {
    const { customerId, ...apiPayload } = payload;
    const response: { address: object } = yield call(async () => {
      const { data } = await request
        .microservice(MICROSERVICE_BASE_URL.CUSTOMER)
        .put(WEB_SERVICE.ADD_ADDRESS({ customerId }), { ...apiPayload });
      return data;
    });
    yield put(addAddressSuccessAction(response?.address));
  } catch (error) {
    console.log({ error });
    yield put(addAddressErrorAction(error));
  }
}

export function* updateAddress({ payload }: AnyAction) {
  try {
    const { customerId, addressId, ...apiPayload } = payload;
    const response: { address: object } = yield call(async () => {
      const { data } = await request
        .microservice(MICROSERVICE_BASE_URL.CUSTOMER)
        .put(WEB_SERVICE.UPDATE_ADDRESS({ customerId, addressId }), {
          ...apiPayload,
        });
      return data;
    });
    yield put(updateAddressSuccessAction(response?.address));
  } catch (error) {
    console.log({ error });
    yield put(updateAddressErrorAction(error));
  }
}

export function* deleteAddress({ payload }: AnyAction) {
  try {
    const { addressId } = payload;
    const response: { address: object } = yield call(async () => {
      const { data } = await request
        .microservice(MICROSERVICE_BASE_URL.CUSTOMER)
        .delete(WEB_SERVICE.DELETE_ADDRESS({ addressId }));
      return data;
    });
    yield put(deleteAddressSuccessAction(response?.address));
  } catch (error) {
    console.log({ error });
    yield put(deleteAddressErrorAction(error));
  }
}

export function* getCities() {
  try {
    const response: Array<object> = yield call(async () => {
      const { data } = await request
        .microservice(MICROSERVICE_BASE_URL.CONTENT)
        .get(WEB_SERVICE.GET_CITIES);
      return data;
    });
    yield put(getCitiesSuccessAction(response));
  } catch (error) {
    console.log({ error });
    yield put(getCitiesErrorAction(error));
  }
}

export function* getCustomerGPS() {
  try {
    const response: { code: number; location?: any } = yield call(async () => {
      const resp = getGPSPosition();
      return resp;
    });

    const cities: Array<any> = yield select(makeSelectCities) || [];

    console.log({ response });
    switch (response.code) {
      case GET_POSITION_RESPONSES.SUCCESS:
        const resp = checkAddressInZone(
          {
            latitude: response.location.coords.latitude,
            longitude: response.location.coords.longitude,
          },
          cities,
        );
        // console.log({resp})
        yield put(getCustomerGPSSuccess(resp));
        break;
      case GET_POSITION_RESPONSES.ASK_FOR_GPS_ENABLE:
        if (Platform.OS == 'android') {
          const gpsEnabledresp: string = yield call(async () => {
            return askForGpsEnableAndroid();
          });
          if(gpsEnabledresp){
            yield put(getCustomerGPSAction());
          }else{

          }
        } else{
          askForGpsEnableIOS();
        }
        break;
      case GET_POSITION_RESPONSES.REQUEST_AUTHORISATION:
        requestAuthorisation();
        break;
    }

  } catch (error) {
    console.log({ error });
    yield put(
      getCustomerGPSSuccess({
        latitude: -1,
        longitude: -1,
        inZone: false,
        gpsActive: false,
        // updated: true,
      }),
    );
  }
}

// Individual exports for testing
export default function* addressesHandlerSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ADDRESSES_LIST, getAddressesList);
  yield takeLatest(ADD_ADDRESS, addAddress);
  yield takeLatest(UPDATE_ADDRESS, updateAddress);
  yield takeLatest(DELETE_ADDRESS, deleteAddress);
  yield takeLatest(GET_CITIES, getCities);
  yield takeLatest(GET_CUSTOMER_GPS, getCustomerGPS);
}
