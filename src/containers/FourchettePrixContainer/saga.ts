import { REQUEST_MULTI_TRI, data } from './constants';
import { put, takeLatest } from 'redux-saga/effects';
import { setMultiData, setMUltiTriAction } from './actions';

export function* MultiTriName() {
  yield put(setMultiData(data));
  yield put(setMUltiTriAction([]));
}

export default function* SingleMoreCatNameSsaga() {
  yield takeLatest(REQUEST_MULTI_TRI, MultiTriName);
}
