/*
 *
 * CheckoutScreen reducer
 *
 */

import produce from 'immer';
import {
  CREATE_PAYMENT,
  CREATE_PAYMENT_ERROR,
  CREATE_PAYMENT_SUCCESS,
  //
  UPDATE_PAYMENT,
  UPDATE_PAYMENT_ERROR,
  UPDATE_PAYMENT_SUCCESS,
  //
  DEFAULT_ACTION,
  GET_CARDS,
  GET_CARDS_ERROR,
  GET_CARDS_SUCCESS,
  GET_DATE_ACTION,
  GET_DELIVERY_PRICE,
  GET_DELIVERY_PRICE_ERROR,
  GET_DELIVERY_PRICE_SUCCESS,
  GET_TIME_DELIVERY_OPTION_ACTION,
  SET_TIME_DELIVERY_OPTION,
  CLEAN_UP_CHECKOUT_PAYMENT,
  //
  CREATE_ORDER_SUCCESS,
} from './constants';

export const initialState = {
  customerId: null,
  cardList: null,
  paymentDetail: null,
  error: false,
  DeliveryTimeOptions: [],
  loading: false,
  selectedDate: '',
  showFlag: false,
  deliveryPriceDetail: null,
  cleanUpAndGobackToHome: false,
};

const checkoutScreenReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_CARDS:
      draft.cardList = null;
      draft.customerId = action.data.customerId;
      draft.loading = true;
      draft.error = false;
      break;
    case GET_CARDS_SUCCESS:
      draft.cardList = action.data;
      draft.loading = false;
      draft.error = false;
      break;
    case GET_CARDS_ERROR:
      draft.cardList = null;
      draft.loading = false;
      draft.error = true;
      break;
    case CREATE_PAYMENT:
      draft.paymentDetail = null;
      draft.loading = true;
      draft.error = false;
      break;
    case CREATE_PAYMENT_SUCCESS:
      draft.paymentDetail = action.data;
      draft.loading = false;
      draft.error = false;
      break;
    case CREATE_PAYMENT_ERROR:
      draft.paymentDetail = null;
      draft.loading = false;
      draft.error = true;
      break;
    case UPDATE_PAYMENT:
      // draft.paymentDetail = null;
      draft.loading = true;
      draft.error = false;
      break;
    case UPDATE_PAYMENT_SUCCESS:
      draft.paymentDetail = action.payment;
      draft.loading = false;
      draft.error = false;
      break;
    case UPDATE_PAYMENT_ERROR:
      draft.paymentDetail = null;
      draft.loading = false;
      draft.error = true;
      break;
    case GET_TIME_DELIVERY_OPTION_ACTION:
      draft.loading = true;
      break;
    case SET_TIME_DELIVERY_OPTION:
      draft.loading = false;
      draft.DeliveryTimeOptions = action.DeliveryTimeOptions;
      break;
    case GET_DATE_ACTION:
      draft.loading = false;
      draft.selectedDate = action.date;
      break;
    case GET_DELIVERY_PRICE:
      draft.loading = true;
      draft.deliveryPriceDetail = null;
      break;
    case GET_DELIVERY_PRICE_SUCCESS:
      draft.loading = false;
      draft.loading = false;
      draft.deliveryPriceDetail = action.deliveryPriceDetail;
      break;
    case GET_DELIVERY_PRICE_ERROR:
      draft.loading = false;
      draft.error = true;
      draft.deliveryPriceDetail = null;
      break;
    case CLEAN_UP_CHECKOUT_PAYMENT:
      console.log("DRAFT TAKES INITIAL STATE")
      draft.paymentDetail =  null;
      draft.error = false;
      draft.loading = false;
      draft.cleanUpAndGobackToHome = false;
      break;
    case CREATE_ORDER_SUCCESS:
      draft.cleanUpAndGobackToHome = true;
        break;
    case DEFAULT_ACTION:
      break;
  }
}, initialState);

export default checkoutScreenReducer;
