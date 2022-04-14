/*
 *
 * CheckoutScreen actions
 *
 */

import {
  CREATE_PAYMENT,
  CREATE_PAYMENT_ERROR,
  CREATE_PAYMENT_SUCCESS,
  //
  UPDATE_PAYMENT,
  UPDATE_PAYMENT_ERROR,
  UPDATE_PAYMENT_SUCCESS,
  //
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_SUCCESS,
  //
  DEFAULT_ACTION,
  //
  GET_CARDS,
  GET_CARDS_ERROR,
  GET_CARDS_SUCCESS,
  //
  GET_DATE_ACTION,
  //
  GET_DELIVERY_PRICE,
  GET_DELIVERY_PRICE_ERROR,
  GET_DELIVERY_PRICE_SUCCESS,
  //
  GET_TIME_DELIVERY_OPTION_ACTION,
  SET_TIME_DELIVERY_OPTION,
  CLEAN_UP_CHECKOUT_PAYMENT,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function createPaymentAction(payment: any) {
  return {
    type: CREATE_PAYMENT,
    payment,
  };
}
export function createPaymentSuccessAction(data: any) {
  return {
    type: CREATE_PAYMENT_SUCCESS,
    data,
  };
}
export function createPaymentErrorAction(error: any) {
  return {
    type: CREATE_PAYMENT_ERROR,
    error,
  };
}
export function updatePaymentAction(payment: any, paymentId: any) {
  return {
    type: UPDATE_PAYMENT,
    payment,
    paymentId,
  };
}
export function updatePaymentSuccessAction(payment: any) {
  return {
    type: UPDATE_PAYMENT_SUCCESS,
    payment,
  };
}
export function updatePaymentErrorAction(error: any) {
  return {
    type: UPDATE_PAYMENT_ERROR,
    error,
  };
}

export function createOrderAction(order: any) {
  return {
    type: CREATE_ORDER,
    order,
  };
}
export function createOrderSuccessAction(order: any) {
  return {
    type: CREATE_ORDER_SUCCESS,
    order,
  };
}
export function createOrderErrorAction(error: any) {
  return {
    type: CREATE_ORDER_ERROR,
    error,
  };
}

export function getCardsAction(data: any) {
  return {
    type: GET_CARDS,
    data,
  };
}
export function getCardsSuccessAction(data: any) {
  return {
    type: GET_CARDS_SUCCESS,
    data,
  };
}
export function getCardsErrorAction(data: any) {
  return {
    type: GET_CARDS_ERROR,
    data,
  };
}
export function requestTimeDeliveryOptionAction() {
  return {
    type: GET_TIME_DELIVERY_OPTION_ACTION,
  };
}

export function setTimeDeliveryOption(DeliveryTimeOptions: any) {
  return {
    type: SET_TIME_DELIVERY_OPTION,
    DeliveryTimeOptions,
  };
}

export function getDateAction(date: any) {
  return {
    type: GET_DATE_ACTION,
    date,
  };
}

export function getDeliveryPriceAction(data: any) {
  return {
    type: GET_DELIVERY_PRICE,
    data,
  };
}
export function getDeliveryPriceSuccessAction(deliveryPriceDetail: any) {
  return {
    type: GET_DELIVERY_PRICE_SUCCESS,
    deliveryPriceDetail,
  };
}
export function getDeliveryPriceErrorAction(error: any) {
  return {
    type: GET_DELIVERY_PRICE_ERROR,
    error,
  };
}

export function cleanUpCheckoutStateAction(){
  return {
    type: CLEAN_UP_CHECKOUT_PAYMENT
  }
}
