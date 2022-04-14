import { REQUEST_MORE_SINGLE_CATEGORY } from './constants';
import { put, takeLatest } from 'redux-saga/effects';

export function* SingleMoreCatName() {
  yield;
}

export default function* SingleMoreCatNameSsaga() {
  yield takeLatest(REQUEST_MORE_SINGLE_CATEGORY, SingleMoreCatName);
}
