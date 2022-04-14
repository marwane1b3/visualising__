// import { AnyAction } from 'redux';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { WEB_SERVICE,GET_USER_LOYALTY } from './constants';
import {
  getUserLoyaltySuccessAction,
  getUserLoyaltyErrorAction
} from './actions';
const qs = require('qs');
import base64 from 'react-native-base64';

import { AxiosRequestConfig } from 'axios';
import { MICROSERVICE_BASE_URL, request } from 'utils';

export function* getUserLoyalty({payload} : any) {
    console.log(`${MICROSERVICE_BASE_URL.CUSTOMER_PAYMENT}${WEB_SERVICE.GET_USER_LOYALTY}${payload}`);
  try {
    
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${MICROSERVICE_BASE_URL.CUSTOMER_PAYMENT}${WEB_SERVICE.GET_USER_LOYALTY}${payload}`,
      headers: {
        Authorization: `Basic ${base64.encode('clientApp@kaalix.conf:secret')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    };

    const response: { userLoyalty: any } = yield call(async () => {
      const { data }: { data: object } = await request(config);
      return data;
    });
    
    yield   put(getUserLoyaltySuccessAction(response))
  } catch (error) {
    console.log({ error });
    yield put(getUserLoyaltyErrorAction(error));
  }
}
// Individual exports for testing
export default function* kaalixUpSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_USER_LOYALTY, getUserLoyalty);
}
