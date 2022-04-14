import { AnyAction } from 'redux';
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { GET_SERVICE_CATEGORIES_ACTION, WEB_SERVICE } from './constants';
import {
  getServiceCategoriesSuccessAction,
  getServiceCategoriesErrorAction,
} from './actions';
import { AxiosRequestConfig } from 'axios';
import { MICROSERVICE_BASE_URL, request } from 'utils';
import { makeSelectPickedAddress } from 'containers/AddressesHandler/selectors';

export function* fetchServiceCategories() {
  const pickedAddress: { cityId?: string } = yield select(
    makeSelectPickedAddress,
  ) || '';

  console.log({ message: 'HER', pickedAddress });
  //const cityId = '60eb76bc1f933a00220fae9c';
  const cityId = pickedAddress.cityId;

  const config: AxiosRequestConfig = {
    method: 'get',
    url: `${MICROSERVICE_BASE_URL.CONTENT}/city/${cityId}/services`,
  };

  try {
    if (cityId) {
      const response: object = yield call(async () => {
        const { data } = await request(config);
        return data;
      });

      const { services }: any = response;

      console.log(services);

      if (services) {
        yield put(getServiceCategoriesSuccessAction(services));
      }
    } else {
      yield put(getServiceCategoriesErrorAction('cityId is null'));
    }
  } catch (err) {
    console.log(err);
    yield put(getServiceCategoriesErrorAction(err.message));
  }
}

// Individual exports for testing
export default function* servicesListSaga() {
  yield takeLatest(GET_SERVICE_CATEGORIES_ACTION, fetchServiceCategories);
}
