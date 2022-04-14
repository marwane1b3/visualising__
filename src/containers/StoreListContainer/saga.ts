import { AnyAction } from 'redux';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_STORES_ACTION } from './constants';
import { getStoresErrorAction, getStoresSuccessAction, getStoresAction } from './actions';
import { MICROSERVICE_BASE_URL, request } from 'utils/index';
import { AxiosRequestConfig } from 'axios';
import { makeSelectPickedAddress } from 'containers/AddressesHandler/selectors';

export function* fetchStores({ serviceId }: ReturnType<typeof getStoresAction>) {
  const pickedAddress: {
    cityId?: string;
    location: Array<number>;
  } = yield select(makeSelectPickedAddress) || '';

  const config: AxiosRequestConfig = {
    method: 'get',
    url: `${MICROSERVICE_BASE_URL.CONTENT}/services/${serviceId}/city/${pickedAddress.cityId}/stores?lat=${pickedAddress.location[0]}&lng=${pickedAddress.location[1]}`,
  };

  try {
    const response: { stores?: Array<object> } = yield call(async () => {
      const { data } = await request(config);
      return data;
    });

    if (response && response.stores) {
      yield put(getStoresSuccessAction(response));
    } else {
      yield put(getStoresErrorAction('no succes'));
    }
  } catch (err) {
    console.log(err);
    yield put(getStoresErrorAction(err.message));
  }
}

// Individual exports for testing
export default function* storesListScreenSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_STORES_ACTION, fetchStores);
}
