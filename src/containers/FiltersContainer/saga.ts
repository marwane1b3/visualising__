import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { } from './constants';
import {
} from './actions';

import { DumbCategories, newDumbCatgories } from './Dcategories';
import { AxiosRequestConfig } from 'axios';
import { MICROSERVICE_BASE_URL, request } from 'utils';

// Individual exports for testing
export default function* FiltersContainerSaga() {
  // See example in containers/HomePage/saga.js
  // yield takeLatest(REQUEST_CAT_LIST, getList);
}
