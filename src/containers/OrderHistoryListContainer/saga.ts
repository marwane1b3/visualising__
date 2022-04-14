// import { take, call, put, select } from 'redux-saga/effects';
import { REQUEST_ORDERS_ACTION } from './constants';
import { put, takeLatest, call, select } from 'redux-saga/effects';
import {
  getOrdersListAction,
  getOrdersListFailAction,
  populateOrderButtons,
} from './actions';

import { AxiosRequestConfig } from 'axios';
import { MICROSERVICE_BASE_URL, request } from 'utils';
import { getSelectedHistoryFilerData } from 'containers/OrderHistoryFilterContainer/selectors';
// Individual exports for testing
import { makeSelectUserDetailsData } from 'containers/UserDetails/selectors';

export function* orderHistoryListContainerSaga() {
  // See example in containers/HomePage/saga.js

  try {
    const selectedFilter: [{ id: number; isSelect: boolean; name: string }] =
      yield select(getSelectedHistoryFilerData());
    console.log('from list container', selectedFilter[0].name);

    const userDetails: { entityId: string } = yield select(
      makeSelectUserDetailsData,
    );
    const configEncours: AxiosRequestConfig = {
      method: 'put',
      url: `${MICROSERVICE_BASE_URL.DISPATCHING}/order/customer/${userDetails.entityId}/current-orders`,
    };
    const configHistory: AxiosRequestConfig = {
      method: 'post',
      data: {
        //  searchKey: userDetails.entityId, // searchKey is the customerId
        searchKey: '60bf940491d2d50022dbe256',
      },
      url: `${MICROSERVICE_BASE_URL.HISTORY}`,
    };

    switch (selectedFilter[0].id) {
      case 0:
        const responseHistory: { values: [] } = yield call(async () => {
          const { data } = await request(configHistory);
          return data;
        });

        if (responseHistory) {
          console.log(responseHistory.values.length);
          yield put(populateOrderButtons(responseHistory.values.length));
          console.log('responseHistory', responseHistory.values);

          yield put(getOrdersListAction(responseHistory.values));
        } else {
          yield put(getOrdersListFailAction('error at saga'));
        }

        break;

      case 1:
        const responseEncours: [] = yield call(async () => {
          const { data } = await request(configEncours);
          return data;
        });
        if (responseEncours) {
          yield put(populateOrderButtons(responseEncours.length));
          yield put(getOrdersListAction(responseEncours));
        } else {
          yield put(getOrdersListFailAction('error at saga'));
        }

        break;
    }
  } catch (error) {
    yield put(getOrdersListFailAction('error :' + error));
  }
}

export function* getStoreItemsDetails() {
  try {
  } catch (error) {}
}

export default function* ordersHistoryM() {
  yield takeLatest(REQUEST_ORDERS_ACTION, orderHistoryListContainerSaga);
}
