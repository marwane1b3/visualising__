/**
 *    ChoubikAudioSaga
 *
 */
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { SET_AUDIO_OBJECT_ACTION } from './constants';
import { setAudioAction } from './actions';

// import { AxiosRequestConfig } from 'axios';
// import { MICROSERVICE_BASE_URL, request } from 'utils';

// const config: AxiosRequestConfig = {
//   method: 'get',
//   url: `${MICROSERVICE_BASE_URL.CONTENT}/city/60b607df45ee5200227268be/services`,
// };

export function* setAudio() {
  /** settingAudio */
}

export default function* FiltersContainerSaga() {
  yield takeLatest(SET_AUDIO_OBJECT_ACTION, setAudio);
}
