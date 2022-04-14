import AsyncStorage from '@react-native-community/async-storage';
import { AnyAction } from 'redux';
import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import { setTokenAction } from './actions';
import { REHYDRATE_TOKEN, SET_TOKEN, DELETE_TOKEN } from './constants';

import { SIGN_IN_SUCCESS } from 'containers/AuthHelper/constants';
import { GET_USER_DETAILS_SUCCESS } from 'containers/UserDetails/constants';
import { delay } from 'lodash';

export function* rehydrateToken({}: AnyAction) {
    console.log('rehydrateToken');

  try {
    const token: string = yield call(async () => {
      const data = await AsyncStorage.getItem('accessToken');
      return data;
    });
    yield put(setTokenAction(token ? token : ''));
  } catch (error) {
    console.log('rehydrateToken::', { error });
  }
}

export function* setToken({ token }: AnyAction) {
    console.log('SET TOKEN');

  try {
    AsyncStorage.setItem('accessToken', token);
  } catch (error) {
    console.log('setToken::', { error });
  }
}

export function* deleteToken({ token }: AnyAction) {
  try {
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('refreshToken');
  } catch (error) {
    console.log('setToken::', { error });
  }
}

export function* persistTokens({
  data: { accessToken, refreshToken },
}: AnyAction) {
  console.log("PERSIISTING TOKENS")
  try {
    yield call(async () => {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      return;
    });
    yield all([put(setTokenAction(accessToken))]);
  } catch (error) {
    console.log('persistTokens::', { error });
  }
}

// Individual exports for testing
export default function* authProviderSaga() {
  // See example in containers/HomePage/saga.js

  yield takeLatest(REHYDRATE_TOKEN, rehydrateToken);
  yield takeLatest(SET_TOKEN, setToken);
  yield takeLatest(DELETE_TOKEN, deleteToken);

  yield takeLatest(GET_USER_DETAILS_SUCCESS, persistTokens);
  yield takeLatest(SIGN_IN_SUCCESS, persistTokens);
}
