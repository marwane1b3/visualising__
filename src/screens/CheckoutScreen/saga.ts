// import { AnyAction } from 'redux';
// import { take, call, put, select } from 'redux-saga/effects';
// import { DEFAULT_ACTION } from './constants';

// export function* defaultEffect({ payload }: AnyAction) {
// console.log({ payload });
// }

import { MICROSERVICE_BASE_URL, request } from '../../utils';
import React from 'react';
import {
  createOrderErrorAction,
  createOrderSuccessAction,
  createPaymentErrorAction,
  createPaymentSuccessAction,
  getCardsErrorAction,
  getCardsSuccessAction,
  getDeliveryPriceErrorAction,
  getDeliveryPriceSuccessAction,
  setTimeDeliveryOption,
  updatePaymentSuccessAction,
  updatePaymentErrorAction,
  cleanUpCheckoutStateAction
} from './actions';
import {
  CLEAN_UP_CHECKOUT_PAYMENT,
  CREATE_ORDER,
  CREATE_ORDER_SUCCESS,
  CREATE_PAYMENT,
  CREATE_PAYMENT_SUCCESS,
  GET_CARDS,
  GET_DELIVERY_PRICE,
  GET_TIME_DELIVERY_OPTION_ACTION,
  selectedTimeOption,
  UPDATE_PAYMENT,
  WEB_SERVICE,
} from './constants';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import base64 from 'react-native-base64';

export function* createPayment({ payment }: any) {
  try {
    const response: { payment: any } = yield call(async () => {
      const { data } = await request
        .microservice(MICROSERVICE_BASE_URL.CUSTOMER_PAYMENT)
        .post(WEB_SERVICE.PAYMENT, payment);
      return data;
    });
    console.log({ response })
    yield put(createPaymentSuccessAction(response.payment));
  } catch (error) {
    yield put(createPaymentErrorAction(error));
  }
}

export function* updatePayment({ payment, paymentId }: any) {
  try {
    const response: { payment: any } = yield call(async () => {
      const { data } = await request
        .microservice(MICROSERVICE_BASE_URL.CUSTOMER_PAYMENT)
        .put(WEB_SERVICE.UPDATE_PAYMENT(paymentId), payment);
      return data;
    });
    yield put(updatePaymentSuccessAction(response.payment));
  } catch (error) {
    yield put(updatePaymentErrorAction(error));
  }
}

export function* createOrder({ order }: any) {
  try {
    console.log({orderToCreate: order})
    const response: { order: any } = yield call(async () => {
      const { data } = await request
        .microservice(MICROSERVICE_BASE_URL.ORDERS)
        .post(WEB_SERVICE.CREEATE_ORDER, order);
        console.log({data})
      return data;
    });
    console.log({ response });
    yield put(createOrderSuccessAction(response.order));
  } catch (error) {
    console.log({ error })
    yield put(createOrderErrorAction(error));
  }
}

export function* getCardList({ data }: any) {
  try {
    const response: { data: any } = yield call(async () => {
      const result = await request
        .microservice(MICROSERVICE_BASE_URL.CUSTOMER_PAYMENT)
        .put(WEB_SERVICE.GET_CARDS, { customerId: data.customerId });
      return result;
    });
    yield put(getCardsSuccessAction((response.data || {}).result || {}));
  } catch (error) {
    yield put(getCardsErrorAction(error));
  }
}
export function* ChoubikContainerDetail() {
  yield put(setTimeDeliveryOption(selectedTimeOption));
}
export function* getDeliveryPrice({ data }: any) {
  try {
    const response: { data: any } = yield call(async () => {
      const result = await request
        .microservice(MICROSERVICE_BASE_URL.CUSTOMER_PAYMENT)
        .post(
          WEB_SERVICE.DELIVERY_PRICE({
            storeId: data.storeId,
            cityId: data.cityId,
          }),
          { latLng:data.latLng },
        );
      return result;
    });
    console.log('responce ' ,response.data)
    yield put(getDeliveryPriceSuccessAction(response.data));
  } catch (error) {
    yield put(getDeliveryPriceErrorAction(error));
  }
}

// export function* cleanUpCheckout(){
//   yield put(cleanUpCheckoutStateAction())
// }

// Individual exports for testing
export default function* checkoutScreenSaga() {
  // See example in containers/HomePage/saga.js
  // yield takeLatest(DEFAULT_ACTION, defaultEffect);
  yield takeLatest(CREATE_PAYMENT, createPayment);
  // yield takeLatest(CREATE_ORDER_SUCCESS, cleanUpCheckout);
  yield takeLatest(UPDATE_PAYMENT, updatePayment)
  yield takeLatest(GET_CARDS, getCardList);
  yield takeLatest(GET_TIME_DELIVERY_OPTION_ACTION, ChoubikContainerDetail);
  yield takeLatest(GET_DELIVERY_PRICE, getDeliveryPrice);
  yield takeLatest(CREATE_ORDER, createOrder);
}
