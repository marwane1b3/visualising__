import { AnyAction } from 'redux';
import { takeLatest, call, put, select, all } from 'redux-saga/effects';
const qs = require('qs');
import base64 from 'react-native-base64';

import { AxiosRequestConfig } from 'axios';
import { MICROSERVICE_BASE_URL, request } from 'utils';

import { GET_USER_DETAILS, WEB_SERVICE, WEB_SERVICE_VARS } from './constants';

import {
  getUserDetailsSuccessAction,
  getUserDetailsErrorAction,
  setUserDetailsAction,
} from './actions';

export function* getUserDetails({ token }: AnyAction) {
  try {
    const data = qs.stringify({
      grant_type: WEB_SERVICE_VARS.REFRESH_TOKEN,
      refresh_token: token,
    });

    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${MICROSERVICE_BASE_URL.AUTH_SERV}${WEB_SERVICE.GET_USER_DETAILS}`,
      headers: {
        Authorization: `Basic ${base64.encode('clientApp@kaalix.conf:secret')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    const response: object = yield call(async () => {
      const { data } = await request(config);
      //  console.log(data);
      return data;
    });

    yield all([
      put(getUserDetailsSuccessAction(response)),
      // put(setUserDetailsAction(response?.user)),
    ]);
  } catch (error) {
    console.log({ error });
    yield put(getUserDetailsErrorAction(error));
  }
}

// Individual exports for testing
export default function* userDetailsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_USER_DETAILS, getUserDetails);
}
