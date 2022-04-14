import { AnyAction } from 'redux';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import { WEB_SERVICE,GET_ITEM_SPECIFICATIONS } from './constants';
import {
 getItemSpecificationsSuccessAction,
getItemSpecificationsErrorAction
} from './actions';
const qs = require('qs');
import base64 from 'react-native-base64';

import { AxiosRequestConfig } from 'axios';
import { MICROSERVICE_BASE_URL, request } from 'utils';

export function* getItemSpecifications({payload} : AnyAction) {
    console.log(`${MICROSERVICE_BASE_URL.CONTENT}${WEB_SERVICE.GET_ITEM_SPECIFICATIONS}${payload}`);
  try {
    
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${MICROSERVICE_BASE_URL.CONTENT}${WEB_SERVICE.GET_ITEM_SPECIFICATIONS}${payload}`,
      headers: {
        Authorization: `Basic ${base64.encode('clientApp@kaalix.conf:secret')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    };

    const response: { itemSpecifications: any } = yield call(async () => {
      const { data }: { data: object } = await request(config);
      return data;
    });
    yield   put(getItemSpecificationsSuccessAction(response))
  } catch (error) {
    console.log({ error });
    yield put(getItemSpecificationsErrorAction(error));
  }
}

// Individual exports for testing
export default function* itemSpecificationsScreenSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ITEM_SPECIFICATIONS, getItemSpecifications);
}
