import { REQUEST_MULTI_PROMOS, dataPromo } from './constants';
import { put, takeLatest } from 'redux-saga/effects';
import { setMUltiPromoAction, setMultiPromoData } from './actions';

export function* MultiPromoName() {
  yield put(setMultiPromoData(dataPromo));
  yield put(setMUltiPromoAction([]));
}

export default function* SingleMoreCatNameSsaga() {
  yield takeLatest(REQUEST_MULTI_PROMOS, MultiPromoName);
}
