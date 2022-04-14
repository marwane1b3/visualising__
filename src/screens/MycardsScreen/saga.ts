// import { AnyAction } from 'redux';
// import { take, call, put, select } from 'redux-saga/effects';
// import { DEFAULT_ACTION } from './constants';

import { call, put, takeLatest } from '@redux-saga/core/effects';
import { request } from '../../utils';
import {
  getUrlAddCardErrorAction,
  getUrlAddCardSuccessAction,
} from './actions';
import { GET_URL_ADD_CARD } from './constants';

// export function* getUrlAddCard({ data }: any) {
//   try {
//     const response = yield call(async () => {
//       const result = await request.post(
//         'https://882f70fc7c20.ngrok.io/api/v1/customer-payment/card',
//         data,
//       );
//       return result;
//     });
//     yield put(
//       getUrlAddCardSuccessAction((response.data || {}).paymentUrl || {}),
//     );
//   } catch (error) {
//     yield put(getUrlAddCardErrorAction(error));
//   }
// }

// Individual exports for testing
export default function* mycardsScreenSaga() {
  // See example in containers/HomePage/saga.js
}
