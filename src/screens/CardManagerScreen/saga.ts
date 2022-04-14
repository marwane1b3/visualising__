// import { AnyAction } from 'redux';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { request, MICROSERVICE_BASE_URL } from '../../utils';
import { GET_CARDS } from './constants';
import { AxiosRequestConfig } from 'axios';
import { getCardsErrorAction, getCardsSuccessAction } from './actions';
import { WEB_SERVICE } from './constants';
// import { DEFAULT_ACTION } from './constants';

// export function* defaultEffect({ payload }: AnyAction) {
// console.log({ payload });
// }
export function* getCardList({ data }: any) {
  try {
    const response: { data: any } = yield call(async () => {
      const result = await request
        .microservice(MICROSERVICE_BASE_URL.PAYMENT_SERV)
        .put(WEB_SERVICE.GET_CARDS, { customerId: data.customerId });
      return result;
    });
    console.log('data',response.data )
    yield put(getCardsSuccessAction((response.data || {}).result || {}));
  } catch (error) {
    yield put(getCardsErrorAction(error));
  }
}

// Individual exports for testing
export default function* cardManagerScreenSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_CARDS, getCardList);
}
