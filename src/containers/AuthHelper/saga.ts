const qs = require('qs');
import base64 from 'react-native-base64';
import { AxiosRequestConfig } from 'axios';

import { makeSelectUserDetailsData } from 'containers/UserDetails/selectors';
import { Platform } from 'react-native';
import { AnyAction } from 'redux';
import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import { MICROSERVICE_BASE_URL, request } from 'utils';

import { WEB_SERVICE, WEB_SERVICE_VARS, REGISTER, SIGN_IN } from './constants';
import { setUserDetailsAction } from 'containers/UserDetails/actions';

import {
  registerSuccessAction,
  registerErrorAction,
  //
  signInAction,
  signInErrorAction,
  signInSuccessAction,
} from './actions';

import {} from './selectors';

export function* register({ payload }: AnyAction) {
  try {
    const response: object = yield call(async () => {
      const { data } = await request
        .microservice(MICROSERVICE_BASE_URL.AUTH_SERV)
        .post(WEB_SERVICE.REGISTER, {
          entityType: WEB_SERVICE_VARS.ENTITY_TYPE,
          ...payload,
        });
      return data;
    });

    yield all([
      put(registerSuccessAction(response)),
      put(
        signInAction({ password: payload.password, username: payload.email }),
      ),
    ]);
  } catch (error) {
    console.log('register::', { status: error?.response?.status });
    yield put(registerErrorAction(error));
  }
}

export function* signIn({ payload }: AnyAction) {
  try {
    const data = qs.stringify({
      grant_type: 'password',
      ...payload,
    });

    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${MICROSERVICE_BASE_URL.AUTH_SERV}${WEB_SERVICE.SIGN_IN}`,
      headers: {
        Authorization: `Basic ${base64.encode('clientApp@kaalix.conf:secret')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    const response: { user: any } = yield call(async () => {
      const { data }: { data: object } = await request(config);
      return data;
    });

    yield all([
      put(signInSuccessAction(response)),
      put(setUserDetailsAction(response?.user)),
    ]);
  } catch (error) {
    console.log({ error });
    yield put(signInErrorAction(error));
  }
}

// export function* signInSuccess({ data }: AnyAction) {
//   // console.log({ data });
//   try {
//     const { accessToken, refreshToken, user } = data;

//     yield call(async () => {
//       await AsyncStorage.setItem('accessToken', accessToken);
//       await AsyncStorage.setItem('refreshToken', refreshToken);
//       return;
//     });

//     yield all([put(setTokenAction(accessToken))]);
//   } catch (error) {}
// }

// Individual exports for testing
export default function* authHelperSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REGISTER, register);
  yield takeLatest(SIGN_IN, signIn);
}
