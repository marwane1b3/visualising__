import { REQUEST_MULTI_FILTERS_DATA } from './constants';
import { put, takeLatest } from 'redux-saga/effects';
import { getMultiFilters } from './actions';

export function* multiFilters() {
  yield;
}

export default function* MultiFiltersSaga() {
  yield takeLatest(REQUEST_MULTI_FILTERS_DATA, multiFilters);
}
