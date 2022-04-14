// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { call, put, takeLatest } from '@redux-saga/core/effects';
import {MICROSERVICE_BASE_URL, request} from '../../utils';
import {
  getCardsErrorAction,
  getCardsSuccessAction,
  getUrlAddCardErrorAction,
  getUrlAddCardSuccessAction,
  selectedCardErrorAction,
  selectedCardSuccessAction,
} from './actions';
import {GET_CARD_LIST, GET_URL_ADD_CARD, SELECTED_CARD, WEB_SERVICE} from './constants';

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

export function* getUrlAddCard({ data }: any) {
  try {
    console.log('i am here '  , MICROSERVICE_BASE_URL.CUSTOMER_PAYMENT , WEB_SERVICE.ADD_CARD)
    const response: { data: any } = yield call(async () => {
      const result = await request
          .microservice(MICROSERVICE_BASE_URL.CUSTOMER_PAYMENT)
          .post(WEB_SERVICE.ADD_CARD, data);
      return result;
    });
    console.log(response)
    yield put(
      getUrlAddCardSuccessAction((response.data || {}).paymentUrl || {}),
    );
  } catch (error) {
    yield put(getUrlAddCardErrorAction(error));
  }
}

export function* selectedCard({ data }: any) {
  try {
    const response: { data: any } = yield call(async () => {
      const result = await request
        .microservice(MICROSERVICE_BASE_URL.CUSTOMER_PAYMENT)
        .post(WEB_SERVICE.SELECTED_CARD, {
          id: data.selectedCard._id,
          selected: data.selectedCard.selected,
        });
      return result;
    });
    yield put(selectedCardSuccessAction((response.data || {}).result || {}));
  } catch (error) {
    yield put(selectedCardErrorAction(error));
  }
}

export default function* cardListSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_CARD_LIST, getCardList);
  yield takeLatest(GET_URL_ADD_CARD, getUrlAddCard);
  yield takeLatest(SELECTED_CARD, selectedCard);
}
