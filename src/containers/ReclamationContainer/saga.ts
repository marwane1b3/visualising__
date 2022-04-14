import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { AxiosRequestConfig } from 'axios';
import { MICROSERVICE_BASE_URL, request } from 'utils';

import { SET_RECLAMATION_BODY_ACTION } from './constants';
import { makeSelectBody } from './selectors';

import {
  setReclamationBodySuccessAction,
  setReclamationBodyFailAction,
} from './actions';
// Individual exports for testing
export function* reclamationContainerSaga() {
  try {
    const data: {
      customerId: string;
      description: string;
      status: string;

      orderId: string;
    } = yield select(makeSelectBody());

    const config: AxiosRequestConfig = {
      method: 'post',
      data: {
        customerId: data.customerId,
        description: data.description,
        status: data.status === 'Running' ? 'Pending' : null,
        orderId: data.orderId,
      },
      url: `${MICROSERVICE_BASE_URL.CUSTOMER_PAYMENT}/reclamation/`,
    };
    // console.log(' waiting data ? ' + JSON.stringify(data));
    const response: object = yield call(async () => {
      const { data } = await request(config);
      return data;
    });
    console.log(response);
    yield put(setReclamationBodySuccessAction(response));
  } catch (error) {
    yield put(setReclamationBodyFailAction('error from saga'));
  }
}
export default function* reclamationContainerSagaEntry() {
  yield takeLatest(SET_RECLAMATION_BODY_ACTION, reclamationContainerSaga);
}
