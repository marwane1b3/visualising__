import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { AxiosRequestConfig } from 'axios';
import { MICROSERVICE_BASE_URL, request } from 'utils';
import {
  getPubGroupsActionSuccess,
  getPubGroupsActionFail,
  getPubGroupsActionSuccessBanner,
  getPubGroupsActionSuccessTabs,
} from './actions';
import { GET_PUB_GROUPS_ACTION } from './constants';
import { makeSelectPickedAddress } from 'containers/AddressesHandler/selectors';
import { makeSelectServiceId } from './selectors';

// Individual exports for testing

function* callPubEndpoint() {
  try {
    const pickedAddress: { cityId?: string } = yield select(
      makeSelectPickedAddress,
    ) || '';

    const serviceId = yield select(makeSelectServiceId()) || '';
    console.log(serviceId);

    let body;
    if (serviceId.length > 0) {
      body = {
        cityId: pickedAddress.cityId,
        serviceId: serviceId,
      };
    } else {
      body = {
        cityId: pickedAddress.cityId,
      };
    }

    const config: AxiosRequestConfig = {
      method: 'post',
      data: body,
      url: `${MICROSERVICE_BASE_URL.CONTENT}/publicity_groups/`,
    };
    const response: [{}] = yield call(async () => {
      const { data } = await request(config);
      return data;
    });
    console.log('publicityEndpoint ::', response);
    if (response.length > 0) {
      const Banner = response.filter((item: any) => item.format === 'Banner');
      const Tabs = response.filter((item: any) => item.format === 'Tabs');
      //    console.log('Taaabs', Tabs[0]);
      yield put(getPubGroupsActionSuccessBanner(Banner[0]));
      yield put(getPubGroupsActionSuccessTabs(Tabs[0]));
    } else {
      yield put(getPubGroupsActionFail('3'));
    }
  } catch (error) {
    console.log('publicityEndpoint error ::', JSON.stringify(error));
    yield put(getPubGroupsActionFail('4'));
  }
}

export default function* adBannierContainerSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_PUB_GROUPS_ACTION, callPubEndpoint);
}
