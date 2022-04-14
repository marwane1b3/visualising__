import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectBody, makeSelectMoney } from './selectors';
import {
  setTipActionFail,
  setTipActionSuccess,
  checkKaalixLoyatySuccessAction,
  checkKaalixLoyaltyFailAction,
} from './actions';
import {
  SET_TIP_ACTION,
  CHECK_KAALIX_LOYALTY_ACTION,
  GET_CARD_LIST,
} from './constants';
import { AxiosRequestConfig } from 'axios';
import { MICROSERVICE_BASE_URL, request } from 'utils';
import { makeSelectUserDetailsData } from 'containers/UserDetails/selectors';

export function* KaalixPay() {
  try {
    const body: { deliveryManId: string; points: number } = yield select(
      makeSelectBody(),
    );

    const userDetails: { entityId: string } = yield select(
      makeSelectUserDetailsData,
    );

    // const customerId: { id: string } = yield select(makeSelectCustomerId());

    const config: AxiosRequestConfig = {
      method: 'post',
      data: {
        deliveryManId: body.deliveryManId,
        points: body.points,
      },
      url: `${MICROSERVICE_BASE_URL.CUSTOMER_PAYMENT}/tip/${userDetails.entityId}`,
    };
    const response: object = yield call(async () => {
      const { data } = await request(config);
      return data;
    });
    console.log(response);
    yield put(setTipActionSuccess(response));
  } catch (error) {
    yield put(setTipActionFail(error.message));
  }
}
export function* checkKaalixLoyalty() {
  try {
    const userDetails: { entityId: string } = yield select(
      makeSelectUserDetailsData,
    );
    const donation: number = yield select(makeSelectMoney());
    const config: AxiosRequestConfig = {
      method: 'get',

      url: `${MICROSERVICE_BASE_URL.CUSTOMER_PAYMENT}/loyalty/${userDetails.entityId}`,
    };

    const response: {
      customer: {
        kaalixLoyalty: number;
      };
    } = yield call(async () => {
      const { data } = await request(config);
      return data;
    });
    if (donation <= response?.customer?.kaalixLoyalty) {
      yield put(
        checkKaalixLoyatySuccessAction(response?.customer?.kaalixLoyalty),
      );
    } else {
      yield put(checkKaalixLoyaltyFailAction(2));
    }
  } catch (error) {
    yield put(checkKaalixLoyaltyFailAction(3));
  }
}

export function* cardList() {
  try {
    const userDetails: { entityId: string } = yield select(
      makeSelectUserDetailsData,
    );

    const config: AxiosRequestConfig = {
      method: 'put',
      data: { customerId: userDetails.entityId },
      url: `${MICROSERVICE_BASE_URL.CUSTOMER_PAYMENT}/card`,
    };

    const response: { result: []; total: number } = yield call(async () => {
      const { data } = await request(config);
      return data;
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
// Individual exports for testing
export default function* pourboirContainerSaga() {
  // See example in containers/HomePage/saga.js

  yield takeLatest(SET_TIP_ACTION, KaalixPay);
  yield takeLatest(CHECK_KAALIX_LOYALTY_ACTION, checkKaalixLoyalty);
  yield takeLatest(GET_CARD_LIST, cardList);
}
