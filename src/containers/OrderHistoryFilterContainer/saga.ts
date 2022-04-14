import { REQUEST_DATA, data } from './constants';
import { put, takeLatest } from 'redux-saga/effects';
import { setSelectedData, setData } from './actions';

export function* OrdersContainer() {
  yield put(setData(data));
  yield put(setSelectedData([data[0]]));
}

export default function* SingleMoreCatNameSsaga() {
  yield takeLatest(REQUEST_DATA, OrdersContainer);
}
