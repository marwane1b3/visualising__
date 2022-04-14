/**
 *   Express
 *
 */
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  SET_AUDIO_OBJECT_ACTION,
  selectedTimeOption,
  GET_TIME_DELIVERY_OPTION_ACTION,
} from './constants';
import { setAudioAction } from './actions';
import { setTimeDeliveryOption, getDateAction } from './actions';

// import { AxiosRequestConfig } from 'axios';
// import { MICROSERVICE_BASE_URL, request } from 'utils';

// const config: AxiosRequestConfig = {
//   method: 'get',
//   url: `${MICROSERVICE_BASE_URL.CONTENT}/city/60b607df45ee5200227268be/services`,
// };

export function* expressSagaHandler() {
  yield put(setTimeDeliveryOption(selectedTimeOption));
}

export default function* ExpressScreenSaga() {
  yield takeLatest(GET_TIME_DELIVERY_OPTION_ACTION, expressSagaHandler);
}
