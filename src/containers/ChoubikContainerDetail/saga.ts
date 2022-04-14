import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  selectedTimeOption,
  GET_TIME_DELIVERY_OPTION_ACTION,
  SET_TIME_DELIVERY_OPTION,
} from './constants';
import { setTimeDeliveryOption, getDateAction } from './actions';

export function* ChoubikContainerDetail() {
  yield put(setTimeDeliveryOption(selectedTimeOption));
}

export default function* FiltersContainerSaga() {
  yield takeLatest(GET_TIME_DELIVERY_OPTION_ACTION, ChoubikContainerDetail);
}
